import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { getAllStudents } from '../api/studentService'
import type { GetAllHookProps } from '@/types'

export const useGetAllStudents = ({ limit, page, search, field, order }: GetAllHookProps) =>
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
