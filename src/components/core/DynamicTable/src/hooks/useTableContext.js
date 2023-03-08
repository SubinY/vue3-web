import { provide, inject } from 'vue'

const key = Symbol('dynamic-table')

export function createTableContext(instance) {
  provide(key, instance)
}

export function useTableContext() {
  return inject(key)
}
