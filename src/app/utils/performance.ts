import api from "./axios";

export const getSalesMetrics = async () => {
  const response = await api.get("/performance/metrics");
  return response.data;
};

export const getBestSellingProducts = async (limit: number = 5) => {
  const response = await api.get(`/performance/best-sellers?limit=${limit}`);
  return response.data;
};

export const getSalesTrends = async () => {
  const response = await api.get("/performance/trends");
  return response.data;
};
