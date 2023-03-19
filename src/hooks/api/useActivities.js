import useToken from '../useToken';
import * as activitiesApi from '../../services/activitiesApi';
import useAsync from '../useAsync';

export default function useGetActiviesDates() {
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
