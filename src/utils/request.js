import axios from 'axios'
import curry from 'lodash/curry'
import omit from 'lodash/omit'
import { ApiBaseName } from '../constants/api'
import globalTips from './globalTips'
import path from 'path'
import pathToRegexp from 'path-to-regexp'
import querystring from 'querystring'

const GLOBAL_ERROR = {
  40006: {
    message: '登录信息已过期，请重新登录',
    code: 'LOGIN_EXPIRE',
    type: 'info',
    goLogin: true
  },
  40010: {
    message: '当前账号没有该操作权限',
    code: 'FORBIDDEN_ACTION'
  }
}

export function checkTips(res) {
  return res
    ? globalTips(
        GLOBAL_ERROR[res.errorCode] || {
          message: res.errorMessage || `${res.status}`,
          code: res.errorCode
        }
      )
    : void 0
}

/**
 *  根据状态处理错误报文
 * @param {status:number} http状态码
 * @param {data: {errorCode: number, errorMessage: string}} 错误对象
 */
function handleResponseStatusError({ status, data }) {
  switch (status) {
    // case 500:
    //     break;
    default:
      return checkTips(data)
  }
}

export default function request(endpoint, method, data = {}, options = {}) {
  let contentType = 'application/x-www-form-urlencoded'
  method = method.toUpperCase()
  if (method === 'POST' || method === 'PUT') {
    contentType = 'application/json'
    if (typeof data !== 'string' && typeof data === 'object') {
      data = JSON.stringify(data)
    }
  }
  let keyValue = ''
  data &&
    Object.keys(data).forEach((item) => {
      keyValue += item + '=' + data[item] + '&'
    })
  // 表示endpoint自带host
  const host = options.useOriginHost ? '' : ApiBaseName
  const endpoint1 = method === 'GET' ? `${host}${endpoint}?${keyValue}`.slice(0, -1) : `${host}${endpoint}`

  const myHeaders = {
    'Content-Type': contentType
  }
  const jwt = localStorage.getItem('jwt') || ''
  if (jwt.length > 0) {
    myHeaders.Authorization = `Bearer ${jwt}`
  }

  const instance = axios.create({
    baseURL: ApiBaseName,
    headers: myHeaders,
    responseType: endpoint.indexOf('responseType') > 0 ? 'blob' : '' // 二进制流文件下载
  })
  // 确保是promise对象
  return new Promise((resolve, reject) => {
    instance
      .request({
        url: endpoint,
        method: method || 'post',
        params: method === 'GET' ? data || {} : void 0,
        data: method !== 'GET' ? data || {} : void 0
      })
      .then((res) => {
        if ((res && res.status === 200) || res.status === 201) {
          const response = res.data
          try {
            Object.defineProperty(response, 'getResponse', {
              configurable: false,
              writable: false,
              enumerable: false,
              value: () => res
            })
          } catch (err) {
            console.warn(
              "Oops.. Object.defineProperty getResponse failed. Checkout the HTTP Response if it's a no-object."
            )
          }
          return resolve(response)
        } else if (res?.status === 501) {
          reject(res)
          return options.noTips ? null : checkTips(res)
        } else if (res?.status !== 501) {
          return reject(res)
        }
        return reject(res)
      })
      .catch((err) => {
        console.log('reject', err, err.message)
        if (err && err.message && err.message.toLowerCase() === 'network error') {
          !options.noTips &&
            globalTips({
              message: '网络错误请重试' || '',
              code: 'GLOBAL_ERROR_NETWORK'
            })
          return reject({
            code: 'GLOBAL_ERROR_NETWORK',
            message: '网络错误',
            param: '',
            data: {}
          })
        }
        err.status = err.response && err.response.status
        err.data = err.response && err.response.data
        !options.noTips && handleResponseStatusError({ ...err })
        err.headers = err.response && err.response.headers
        err.statusText = err.response && err.response.statusText
        return reject(err)
      })
  })
}

// 后台的服务名称
export const requestX = curry((method, apiPath, { urlData = {}, bodyData = null }) => {
  let apiUrl = pathToRegexp.compile(`/${apiPath}`)({
    ...urlData
  })
  const { $params = {} } = urlData || {}
  const strParamsQueryString = querystring.stringify($params)
  if (strParamsQueryString) {
    apiUrl = `${apiUrl}?${strParamsQueryString}`
  }
  return request(apiUrl, method, bodyData)
})

// POST 请求
export const postX = curry((apiPath, data) => {
  return requestX('POST', apiPath, {
    urlData: { $params: data?.$params },
    bodyData:
      typeof data === typeof void 0
        ? {}
        : typeof data === 'object' && !(data instanceof Array)
        ? omit(data, ['$params'])
        : data
  })
})

/**
 * 使用方法示例:
 *    1) 不需要queryString的时候, 'v1/role/:roleId' 传入 { roleId: 1 } 会自动拼接为 'v1/role/1'
 *    2) 需要queryString的时候, 'v1/role/:roleId'
 *       传入 { roleId: 1, $param: { a: 1 } } 会自动拼接为 'v1/role/1?a=1'
 */
// GET 请求
export const getX = curry((apiPath, data) => {
  return requestX('GET', apiPath, { urlData: data })
})

// PUT 请求
export const putX = curry((apiPath, data) => {
  return requestX('PUT', apiPath, {
    urlData: { $params: data?.$params },
    bodyData:
      typeof data === typeof void 0
        ? {}
        : typeof data === 'object' && !(data instanceof Array)
        ? omit(data, ['$params'])
        : data
  })
})

// DELETE 请求
// 用法参考 getX
export const deleteX = curry((apiPath, data) => {
  return requestX('DELETE', apiPath, { urlData: data })
})
