import React, { useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import SummaryTicket from '../Dashboard/Payment/SummaryTicket';
import PaymentConfirmedElement from '../Dashboard/Payment/PaymentConfirmedElement.js';
import CardInputForm from './CardInputForm';

export default function PaymentForm({ setIsReserved, isPaid, setIsPaid }) {
  const [ticketId, setTicketId] = useState();

  function back() {
    setIsReserved(null);
  }

  return (
    <Wrapper>
      <Container>
        <Subtitle>Ingresso escolhido</Subtitle>
        <SummaryTicket setTicketId={setTicketId} setIsPaid={setIsPaid} />
        <Subtitle>Pagamento</Subtitle>
        {isPaid ? <PaymentConfirmedElement /> : <CardInputForm setIsPaid={setIsPaid} ticketId={ticketId} />}
      </Container>
      <ion-icon onClick={back} name="return-down-back-outline"></ion-icon>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  ion-icon {
    font-size: 50px;
    align-self: flex-end;
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Subtitle = styled.h2`
  margin-top: 30px;
  margin-bottom: 17px;

  font-weight: 400;
  font-size: 20px;
  line-height: 23.44px;
  color: #8e8e8e;
`;
