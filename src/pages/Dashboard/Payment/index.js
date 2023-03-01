import styled from 'styled-components';
import PaymentForm from '../../../components/Form/PaymentForm';

export default function Payment() {
  return (
    <PaymentCardInfo>
      <Subtitle>Pagamento</Subtitle>
      <PaymentForm />
    </PaymentCardInfo>
  );
}

const PaymentCardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Subtitle = styled.h2`
  margin-bottom: 17px;

  font-weight: 400;
  font-size: 20px;
  line-height: 23.44px;
  color: #8e8e8e;
`;
