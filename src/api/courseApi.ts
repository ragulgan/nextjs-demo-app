import AxiosInterceptor from '@/api/AxiosInterceptor';

export const getCourses = (params?: any) => AxiosInterceptor.get('/course', { params });
export const getCourseById = (id: string) => AxiosInterceptor.get(`/course/${id}`);
export const createCourse = (data: any) => AxiosInterceptor.post('/course', data);
export const updateCourse = (id: string, data: any) => AxiosInterceptor.put(`/course/${id}`, data);
export const deleteCourse = (id: string) => AxiosInterceptor.delete(`/course/${id}`);

