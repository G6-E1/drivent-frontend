import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PaymentConfirmedElement from '../../../components/Dashboard/Payment';
import PaymentForm from '../../../components/Form/PaymentForm';
import Typography from '@material-ui/core/Typography';
import TicketType from '../../../components/Dashboard/Payment/TicketType';

import ReserveOnlineTicket from '../../../components/Dashboard/ReserveOnlineTicket';
import { getTicketsTypes } from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';
import { getAllTicketsTypes } from '../../../services/getTypes';

export default function Payment() {
  const [isPaid, setIsPaid] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const token = useToken();

  const [remoteTicket, setRemoteTicket] = useState({});
  const [presencialTicket, setPresencialTicket] = useState({});
  const [presencialWithHotelTicket, setPresencialWithHotelTicket] = useState({});

  const [ticketsTypes, setTicketsTypes] = useState(null);
  useEffect(() => {
    getTicketsTypes(token)
      .then((res) => setTicketsTypes([...res]))
      .catch((e) => {
        toast('Não foi possível obter os tickets types');
      });
  }, []);

  useEffect(() => {
    if (ticketsTypes !== null) {
      const { remoteTicket, presencialTicket, presencialWithHotelTicket } = getAllTicketsTypes(ticketsTypes);
      setRemoteTicket(remoteTicket);
      setPresencialTicket(presencialTicket);
      setPresencialWithHotelTicket(presencialWithHotelTicket);
    }
  }, [ticketsTypes]);

  return (
    <TicketAndPaymentContainer>
      <StyledTypography variant="h4">Ingressos e pagamento</StyledTypography>
      {!isReserved && (
        <>
          <TicketType />
          <ReserveOnlineTicket ticketType={remoteTicket} setIsReserved={setIsReserved} />
        </>
      )}

      {isReserved && (
        <>
          <Subtitle>Pagamento</Subtitle>
          {isPaid ? <PaymentConfirmedElement /> : <PaymentForm setIsPaid={setIsPaid} />}
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

const Subtitle = styled.h2`
  margin-bottom: 17px;

  font-weight: 400;
  font-size: 20px;
  line-height: 23.44px;
  color: #8e8e8e;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
