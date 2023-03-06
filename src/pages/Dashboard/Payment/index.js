import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PaymentConfirmedElement from '../../../components/Dashboard/Payment';
import PaymentForm from '../../../components/Form/PaymentForm';
import Typography from '@material-ui/core/Typography';
import TicketType from '../../../components/Dashboard/Payment/TicketType';

import ReserveOnlineTicket from '../../../components/Dashboard/Payment/ReserveTicket';
import { getTicket, getTicketsTypes } from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';
import { getAllTicketsTypes } from '../../../services/getTypes';

export default function Payment() {
  const [isPaid, setIsPaid] = useState(false);
  const [isReserved, setIsReserved] = useState(null);
  const token = useToken();

  const [ticketsTypes, setTicketsTypes] = useState(null);
  useEffect(() => {
    getTicketsTypes(token)
      .then((res) => setTicketsTypes([...res]))
      .catch((e) => {
        toast('Não foi possível obter os tickets types');
      });

    getTicket(token).then((res) => {
      if (res.status === 'RESERVED') setIsReserved(true);
      if (res.status === 'PAID') {
        setIsReserved(true);
        setIsPaid(true);
      }
    });
  }, []);

  return (
    <TicketAndPaymentContainer>
      <StyledTypography variant="h4">Ingressos e pagamento</StyledTypography>
      {!isReserved && (
        <>
          <TicketType setIsReserved={setIsReserved} ticketsTypes={ticketsTypes} />
        </>
      )}

      {isReserved && (
        <>
          {isPaid ? <PaymentConfirmedElement /> : <PaymentForm setIsPaid={setIsPaid} setIsReserved={setIsReserved} />}
        </>
      )}
    </TicketAndPaymentContainer>
  );
}

const TicketAndPaymentContainer = styled.div`
  display: flex;
  flex-direction: column;

  font-family: 'Roboto', sans-serif;
`;
const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
