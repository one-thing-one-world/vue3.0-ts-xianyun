import * as axios from 'axios'

declare module 'axios' {
  interface AxiosResponse<T> {
    tel: string;
    code: string;

    data: T;
    total: number;
    id: string;
    


  }
}