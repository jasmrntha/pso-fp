export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface ApiError {
  code?: number;
  message: string;
  status: number;
}

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

export interface PaginatedApiResponse<T> {
  code: number;
  status: string;
  data: T;
  meta: {
    last_page: number;
    total: number;
  };
}
