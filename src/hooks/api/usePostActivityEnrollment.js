import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesEnrollmentsApi from '../../services/activitiesEnrollmentsApi';

export default function usePostActivityEnrollment() {
  const token = useToken();

  const {
    loading: postActivityEnrollmentLoading,
    error: postActivityEnrollmentError,
    act: postActivityEnrollment,
  } = useAsync((data) => activitiesEnrollmentsApi.postActivityEnrollment(data, token), false);

  return {
    postActivityEnrollmentLoading,
    postActivityEnrollmentError,
    postActivityEnrollment,
  };
}
