import { getX, postX, putX } from '@/utils/request'

export const list = async () => getX('table.json')({ useOriginHost: '/' })
