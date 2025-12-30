import AxiosInterceptor from '@/api/AxiosInterceptor';

export const getDashboardStats = () => AxiosInterceptor.get('/dashboard/stats');
export const getRecentActivities = () => AxiosInterceptor.get('/dashboard/activities');
export const getChartData = (type: string) => AxiosInterceptor.get(`/dashboard/charts/${type}`);

