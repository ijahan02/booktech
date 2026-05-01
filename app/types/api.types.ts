// app/types/api.types.ts

export interface ApiError {
  statusCode: number
  message: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
}
