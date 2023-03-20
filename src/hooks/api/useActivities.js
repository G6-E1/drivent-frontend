import useToken from '../useToken';
import * as activitiesApi from '../../services/activitiesApi';
import useAsync from '../useAsync';

export function useGetActivitiesByDateAndLocalId(localId, date) {
  const token = useToken();

  const {
    data: activitiesByDateAndLocalId,
    loading: getActivitiesByDateAndLocalIdLoading,
    error: getActivitiesByDateAndLocalIdError,
    act: getActivitiesByDateAndLocalId,
  } = useAsync(() => activitiesApi.getActivitiesByDateAndLocalId(localId, date, token), false);

  return {
    activitiesByDateAndLocalId,
    getActivitiesByDateAndLocalIdLoading,
    getActivitiesByDateAndLocalIdError,
    getActivitiesByDateAndLocalId,
  };
};

export function useGetActiviesDates() {
  const token = useToken();

  const {
    data: dateActivities,
    loading: getDateActivitiesLoading,
    error: getDateActivitiesError,
    act: getDateActivities,
  } = useAsync(() => activitiesApi.getDateActivities(token), false);

  return {
    dateActivities,
    getDateActivitiesLoading,
    getDateActivitiesError,
    getDateActivities,
  };
};
