import api from './api';

export async function getActivitiesByDateAndLocalId(localId, date, token) {
  const response = await api.get('/activities/' + localId + '/' + date, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getDateActivities(token) {
  const response = await api.get('/activities/dates', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
