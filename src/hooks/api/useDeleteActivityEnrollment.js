import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesEnrollmentsApi from '../../services/activitiesEnrollmentsApi';

export default function useDeleteActivityEnrollment() {
  const token = useToken();

  const {
    loading: deleteActivityEnrollmentLoading,
    error: deleteActivityEnrollmentError,
    act: deleteActivityEnrollment,
  } = useAsync((activityId) => activitiesEnrollmentsApi.deleteActivityEnrollment(activityId, token), false);

  return {
    deleteActivityEnrollmentLoading,
    deleteActivityEnrollmentError,
    deleteActivityEnrollment,
  };
}
