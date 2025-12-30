import AxiosInterceptor from '@/api/AxiosInterceptor';

export const getFaculties = (params?: any) => AxiosInterceptor.get('/faculty', { params });
export const getFacultyById = (id: string) => AxiosInterceptor.get(`/faculty/${id}`);
export const createFaculty = (data: any) => AxiosInterceptor.post('/faculty', data);
export const updateFaculty = (id: string, data: any) => AxiosInterceptor.put(`/faculty/${id}`, data);
export const deleteFaculty = (id: string) => AxiosInterceptor.delete(`/faculty/${id}`);

