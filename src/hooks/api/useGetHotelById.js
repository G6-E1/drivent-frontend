import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useGetHotelById() {
  const token = useToken();

  const {
    data: hotel,
    loading: getHotelByIdLoading,
    error: getHotelByIdError,
    act: getHotelById,
  } = useAsync((hotelId) => hotelApi.getHotelById(hotelId, token), false);

  return {
    hotel,
    getHotelByIdLoading,
    getHotelByIdError,
    getHotelById,
  };
}
