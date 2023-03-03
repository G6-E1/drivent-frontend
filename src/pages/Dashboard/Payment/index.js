import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PaymentConfirmedElement from '../../../components/Dashboard/Payment';
import PaymentForm from '../../../components/Form/PaymentForm';
import Typography from '@material-ui/core/Typography';
import TicketType from '../../../components/Dashboard/Payment/TicketType';
import useToken from '../../../hooks/useToken';
import useAsync from '../../../hooks/useAsync';
import { getPersonalInformations } from '../../../services/enrollmentApi';

export default function Payment() {
  const [isPaid, setIsPaid] = useState(false);

  const token = useToken();
  const [shouldRenderEnrollmentText, setShouldRenderEnrollmentText] = useState(false);
  const { data: enrollment, loading, error } = useAsync(() => getPersonalInformations(token), true);

  useEffect(() => {
    console.log('enrollment in: ', enrollment);
    if (error || !enrollment) {
      setShouldRenderEnrollmentText(true);
    } else {
      setShouldRenderEnrollmentText(false);
    }
  }, [enrollment, error]);
  
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
          <PaymentCardInfo>
            <StyledTypography variant="h4">Ingressos e pagamento</StyledTypography>
            <TicketType />
            <Subtitle>Pagamento</Subtitle>
            {isPaid ? <PaymentConfirmedElement /> : <PaymentForm setIsPaid={setIsPaid} />}
          </PaymentCardInfo>
        </>
      )}
    </>
  );
}

const PaymentCardInfo = styled.div`
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
  margin-bottom: 20px!important;
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
