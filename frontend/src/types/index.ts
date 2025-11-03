import type { ComputedRef, Ref } from 'vue'
import type { DataTableSortItem } from 'vuetify'
export * from './Auth'
export * from './Paginate'
export * from './Student'
export * from './User'

export interface GetAllApiProps {
  search?: string
  limit: number
  page: number
  field: string
  order: DataTableSortItem['order']
}

export interface GetAllHookProps {
  search: ComputedRef<string>
  limit: Ref<number>
  page: Ref<number>
  field: Ref<string>
  order: Ref<DataTableSortItem['order']>
}
