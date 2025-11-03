import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { getAllUsers } from '../api/userService'
import type { GetAllHookProps } from '@/types'

export const useGetAllUsers = ({ limit, page, search, field, order }: GetAllHookProps) =>
  useQuery({
    queryKey: ['users', search, limit, page, field, order],
    queryFn: () =>
      getAllUsers({
        search: search.value,
        limit: limit.value,
        page: page.value,
        field: field.value,
        order: order.value,
      }),
    placeholderData: keepPreviousData,
  })
