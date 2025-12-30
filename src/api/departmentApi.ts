import AxiosInterceptor from '@/api/AxiosInterceptor';

export const getDepartments = (params?: any) => AxiosInterceptor.get('/department', { params });
export const getDepartmentById = (id: string) => AxiosInterceptor.get(`/department/${id}`);
export const createDepartment = (data: any) => AxiosInterceptor.post('/department', data);
export const updateDepartment = (id: string, data: any) => AxiosInterceptor.put(`/department/${id}`, data);
export const deleteDepartment = (id: string) => AxiosInterceptor.delete(`/department/${id}`);

