import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

export default function PaymentConfirmedElement() {
  return (
    <ConfirmationContainer>
      <IconContext.Provider value={{ color: '#36B853', size: 40 }}>
        <FaCheckCircle />
      </IconContext.Provider>

      <TextContainer>
        <b>Pagamento confirmado!</b>
        <br />
        <p>Prossiga para escolha de hospedagem e atividades</p>
      </TextContainer>
    </ConfirmationContainer>
  );
}

const ConfirmationContainer = styled.div`
  display: flex;
`;

const TextContainer = styled.div`
  margin-left: 14px;

  font-size: 16px;
  font-weight: 400;
  line-height: 18.75px;
  color: #454545;

  b {
    font-weight: 700;
  }
`;
