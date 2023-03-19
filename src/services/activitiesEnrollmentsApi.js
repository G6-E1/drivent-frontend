import api from './api';

export async function postActivityEnrollment(body, token) {
  const response = await api.post('/activities-enrollments/', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function deleteActivityEnrollment(activityId, token) {
  const response = await api.delete(`/activities-enrollments/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
