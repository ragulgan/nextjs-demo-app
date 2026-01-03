import AxiosInterceptor from '@/api/AxiosInterceptor';

export const loginAdmin = (credentials: any) => AxiosInterceptor.post('/auth/login/admin', credentials);
export const loginUser = (credentials: any) => AxiosInterceptor.post('/auth/login/user', credentials);

export const userList = (params: any) => AxiosInterceptor.get('/user', params);
export const userAdd = (data: any) => AxiosInterceptor.post('/user', data);
export const userUpdate = (id: any, data: any) => AxiosInterceptor.put(`/user/${id}`, data);

export const collegeList = (params?: any) => AxiosInterceptor.get('/college', { params });
export const getCollegeById = (id: string) => AxiosInterceptor.get(`/college/${id}`);
export const collegeAdd = (data: any) => AxiosInterceptor.post('/college', data);
export const collegeUpdate = (id: any, data: any) => AxiosInterceptor.put(`/college/${id}`, data);
export const deleteCollege = (id: string) => AxiosInterceptor.delete(`/college/${id}`);