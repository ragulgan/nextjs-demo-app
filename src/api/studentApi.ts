import AxiosInterceptor from '@/api/AxiosInterceptor';

export const getStudents = (params?: any) => AxiosInterceptor.get('/student', { params });
export const getStudentById = (id: string) => AxiosInterceptor.get(`/student/${id}`);
export const createStudent = (data: any) => AxiosInterceptor.post('/student', data);
export const updateStudent = (id: string, data: any) => AxiosInterceptor.put(`/student/${id}`, data);
export const deleteStudent = (id: string) => AxiosInterceptor.delete(`/student/${id}`);

