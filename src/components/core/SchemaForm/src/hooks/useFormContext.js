import { provide, inject } from 'vue'

const key = Symbol('schema-form')

export async function createFormContext(instance) {
  provide(key, instance)
}

export function useFormContext(formProps = {}) {
  return inject(key, formProps)
}
