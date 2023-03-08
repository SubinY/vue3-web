import { createRouter as _createRouter, createWebHistory } from 'vue-router'

// const pages = import.meta.glob('../src/pages/**/*.vue')
// const routes = Object.keys(pages).map((path)=>{
//   let name = path.match(/\/pages(.*)\.vue$/)[1].toLowerCase();
//   if(name.substring(name.length - 5) == 'index'){
//     name = name.slice(0, -5);//去掉最后的index
//   }
//   return {
//     path: name === '/home' ? '/': name,
//     component: pages[path]
//   }
// })

const routes = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/view/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/data-resources',
        name: 'DataResources',
        meta: {
          title: 'DataResources'
        },
        children: [
          {
            path: '/data-resources',
            name: 'DataResources',
            component: () => import('@/view/dataResources/list.vue'),
            meta: {
              title: 'DataResources'
            }
          },
          {
            path: '/data-resources/detail',
            name: 'DataResource Detail',
            component: () => import('@/view/dataResources/detail.vue'),
            meta: {
              title: 'DataResources Detail'
            }
          }
        ]
      },
      {
        path: '/about',
        name: 'About',
        redirect: '/about/1',
        meta: {
          title: 'About'
        },
        children: [
          {
            path: '/about/1',
            name: 'What is EELS?',
            component: () => import('@/view/about/wathIsEELS.vue'),
            meta: {
              title: 'About丨What is EELS'
            }
          },
          {
            path: '/about/2',
            name: 'About Source',
            component: () => import('@/view/about/aboutSource.vue'),
            meta: {
              title: 'About丨About Source'
            }
          },
          {
            path: '/about/3',
            name: 'About Us',
            component: () => import('@/view/about/aboutUs.vue'),
            meta: {
              title: 'About丨About Us'
            }
          }
        ]
      },
      {
        path: '/question',
        name: 'question',
        component: () => import('@/view/question/index.vue'),
        props: true,
        meta: {
          title: 'question'
        }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/view/user/login.vue'),
        props: true,
        meta: {
          title: 'login'
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/view/user/register.vue'),
        props: true,
        meta: {
          title: 'register'
        }
      },
      {
        path: '/demo',
        name: 'Demo',
        component: () => import('@/view/demo.vue'),
        meta: {
          title: 'Demo'
        }
      }
    ]
  }
]

export function createRouter() {
  return _createRouter({
    history: createWebHistory(),
    routes
  })
}
