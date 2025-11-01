import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { getAllStudents } from '../api/studentService'
import type { ComputedRef, Ref } from 'vue'
import type { DataTableSortItem } from 'vuetify'

interface GetAllStudentsProps {
  search: ComputedRef<string>
  limit: Ref<number>
  page: Ref<number>
  field: Ref<string>
  order: Ref<DataTableSortItem['order']>
}

export const useGetAllStudents = ({ limit, page, search, field, order }: GetAllStudentsProps) =>
  useQuery({
    queryKey: ['students', search, limit, page, field, order],
    queryFn: () =>
      getAllStudents({
        search: search.value,
        limit: limit.value,
        page: page.value,
        field: field.value,
        order: order.value,
      }),
    placeholderData: keepPreviousData,
  })
