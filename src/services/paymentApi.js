import api from './api';

export async function payTicket(body, token) {
  const response = await api.post('/payments/process', { roomID: body }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
