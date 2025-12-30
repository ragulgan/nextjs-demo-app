import AxiosInterceptor from '@/api/AxiosInterceptor';

export const getEnrollments = (params?: any) => AxiosInterceptor.get('/enrollment', { params });
export const getEnrollmentById = (id: string) => AxiosInterceptor.get(`/enrollment/${id}`);
export const createEnrollment = (data: any) => AxiosInterceptor.post('/enrollment', data);
export const updateEnrollment = (id: string, data: any) => AxiosInterceptor.put(`/enrollment/${id}`, data);
export const deleteEnrollment = (id: string) => AxiosInterceptor.delete(`/enrollment/${id}`);

