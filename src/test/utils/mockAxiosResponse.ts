// src/tests/utils/mockAxiosResponse.ts
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const mockedAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: {},
  } as InternalAxiosRequestConfig,
});
