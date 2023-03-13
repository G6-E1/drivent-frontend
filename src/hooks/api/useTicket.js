import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export function useGetTicket() {
  const token = useToken();

  const {
    loading: getTicketLoading,
    error: getTicketError,
    act: getTicket,
  } = useAsync(() => ticketApi.getTicket(token), false);

  return {
    getTicketLoading,
    getTicketError,
    getTicket,
  };
}

export function useGetTicketsTypes() {
  const token = useToken();
  const {
    loading: getTicketsTypesLoading,
    error: getTicketsTypesError,
    act: getTicketsTypes,
  } = useAsync(() => ticketApi.getTicketsTypes(token), false);
  return {
    getTicketsTypesLoading,
    getTicketsTypesError,
    getTicketsTypes,
  };
}
