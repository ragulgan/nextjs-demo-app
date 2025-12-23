import AxiosInterceptor from '@/api/AxiosInterceptor';

export const loginAdmin = (credentials: any) => AxiosInterceptor.post('/auth/login/admin', credentials);
export const loginUser = (credentials: any) => AxiosInterceptor.post('/auth/login/user', credentials);
export const userList = (credentials: any) => AxiosInterceptor.get('/user', credentials);
export const userAdd = (credentials: any) => AxiosInterceptor.post('/user', credentials);
export const userUpdate = (id: any, credentials: any) => AxiosInterceptor.put(`/user/${id}`, credentials);