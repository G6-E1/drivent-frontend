import api from './api';

export async function getLocals(token) {
  const response = await api.get('/locals', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
