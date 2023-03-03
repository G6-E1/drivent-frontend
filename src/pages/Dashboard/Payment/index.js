import { useState } from 'react';
import styled from 'styled-components';
import PaymentConfirmedElement from '../../../components/Dashboard/Payment';
import PaymentForm from '../../../components/Form/PaymentForm';

export default function Payment() {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <PaymentCardInfo>
      <Subtitle>Pagamento</Subtitle>
      {isPaid ? <PaymentConfirmedElement /> : <PaymentForm setIsPaid={setIsPaid} />}
    </PaymentCardInfo>
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
