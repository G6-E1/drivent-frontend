import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePayTicket() {
  const token = useToken();

  const {
    loading: payTicketLoading,
    error: payTicketError,
    act: payTicket,
  } = useAsync((data) => paymentApi.payTicket(data, token), false);

  return {
    payTicketLoading,
    payTicketError,
    payTicket,
  };
}
