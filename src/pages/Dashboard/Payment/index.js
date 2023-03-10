import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PaymentForm from '../../../components/Form/PaymentForm';
import Typography from '@material-ui/core/Typography';
import TicketType from '../../../components/Dashboard/Payment/TicketType';

import { getTicket, getTicketsTypes } from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';
import useAsync from '../../../hooks/useAsync';
import { toast } from 'react-toastify';
import { getPersonalInformations } from '../../../services/enrollmentApi';

export default function Payment() {
  const [isPaid, setIsPaid] = useState(false);
  const [isReserved, setIsReserved] = useState(null);
  const token = useToken();

  const [shouldRenderEnrollmentText, setShouldRenderEnrollmentText] = useState(false);
  const { data: enrollment, loading, error } = useAsync(() => getPersonalInformations(token), true);

  const [ticketsTypes, setTicketsTypes] = useState(null);

  useEffect(() => {
    if (error || !enrollment) {
      setShouldRenderEnrollmentText(true);
    } else {
      setShouldRenderEnrollmentText(false);
    }
  }, [enrollment, error]);

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

  if (loading) {
    return 'Loading...';
  }

  return (
    <>
      {shouldRenderEnrollmentText ? (
        <>
          <StyledTypography variant="h4">Ingressos e pagamento</StyledTypography>
          <EnrollmentErrorDiv>
            <ErrorTitle>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</ErrorTitle>
          </EnrollmentErrorDiv>
        </>
      ) : (
        <>
          <TicketAndPaymentContainer>
            <StyledTypography variant="h4">Ingressos e pagamento</StyledTypography>
            {!isReserved && (
              <>
                <TicketType setIsReserved={setIsReserved} ticketsTypes={ticketsTypes} />
              </>
            )}

            {isReserved && (
              <>
                <PaymentForm setIsReserved={setIsReserved} isPaid={isPaid} setIsPaid={setIsPaid} />
              </>
            )}
          </TicketAndPaymentContainer>
        </>
      )}
    </>
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

const EnrollmentErrorDiv = styled.div`
  display: flex;
  margin-top: 25%;
  align-items: center;
  justify-content: center;
`;

const ErrorTitle = styled.h2`
  font-weight: 400;
  font-size: 20px;
  line-height: 23.44px;
  color: #8e8e8e;
  text-overflow: ellipsis;
  overflow: visible;
  white-space: normal;
  text-align: center;
  width: 50%;
`;
