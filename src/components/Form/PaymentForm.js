import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import Button from './Button';
import { toast } from 'react-toastify';
import Payment from 'payment';
import usePayTicket from '../../hooks/api/usePayTicket';
import SummaryTicket from '../Dashboard/Payment/SummaryTicket';

export default function PaymentForm({ setIsPaid }) {
  const [cardData, setCardData] = useState({
    issuer: '',
    number: '',
    name: '',
    expirationDate: '',
    cvv: '',
  });
  const [focusedInput, setFocusedInput] = useState('');
  const { payTicketLoading, payTicket } = usePayTicket();

  function handleInputFocus(e) {
    const { name } = e.target;

    if (name === 'cvv') {
      setFocusedInput('cvc');
      return;
    }

    setFocusedInput(name);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    if (name === 'name' && !value.match(/^[a-zA-Z\s]*$/) && value !== '') {
      return;
    }

    if (name === 'number') {
      let cardIssuer = Payment.fns.cardType(value);
      if (cardIssuer === null) cardIssuer = 'Unknown';

      setCardData({ ...cardData, number: value, issuer: cardIssuer });
      return;
    }

    setCardData({ ...cardData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !Payment.fns.validateCardExpiry(cardData.expirationDate) ||
      !Payment.fns.validateCardNumber(cardData.number) ||
      !Payment.fns.validateCardCVC(cardData.cvv) ||
      !cardData.name.match(/^[a-zA-Z\s]*$/) ||
      cardData.name.trim().length === 0
    ) {
      toast('Dados invalidos!');
      return;
    }

    try {
      const body = {
        ticketId: 1,
        cardData,
      };
      await payTicket(body);

      toast('Pagamento realizado com sucesso!');

      setIsPaid(true);
    } catch (err) {
      toast('Não foi possível realizar o pagamento!');
    }
  }

  return (
    <>
      <Subtitle>Ingresso escolhido</Subtitle>
      <SummaryTicket/>
      <Subtitle>Pagamento</Subtitle>
      <CardPaymentForm>
        <Cards
          cvc={cardData.cvv}
          expiry={cardData.expirationDate}
          focused={focusedInput}
          name={cardData.name}
          number={cardData.number}
        />

        <StyledForm onSubmit={handleSubmit}>
          <InputMask
            mask="9999 9999 9999 9999"
            maskChar=""
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            value={cardData.number}
          >
            {() => <NumberAndNameInput type="tel" maxLength="19" name="number" placeholder="Card Number" required />}
          </InputMask>
          <ExampleText>E.g.: 49..., 51..., 36..., 37...</ExampleText>

          <NumberAndNameInput
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            value={cardData.name}
            required
          />

          <ExpiryAndCVCDiv>
            <InputMask
              mask="99/9999"
              maskChar=""
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              value={cardData.expirationDate}
            >
              {() => <ExpiryInput type="tel" maxLength="7" name="expirationDate" placeholder="Valid Thru" required />}
            </InputMask>

            <CVCInput
              type="tel"
              maxLength="4"
              name="cvv"
              placeholder="CVC"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              value={cardData.cvv}
              required
            />
          </ExpiryAndCVCDiv>

          <SubmitContainer>
            <Button type="submit" disabled={payTicketLoading}>
              Finalizar Pagamento
            </Button>
          </SubmitContainer>
        </StyledForm>
      </CardPaymentForm>
    </>
  );
}

const CardPaymentForm = styled.div`
  width: 670px;

  display: flex;
`;

const StyledForm = styled.form`
  margin-left: 28px;

  display: flex;
  flex-direction: column;
`;

const ExampleText = styled.span`
  margin-top: -13px;
  margin-bottom: 15px;

  font-size: 16px;
  color: #999999;
`;

const Input = styled.input`
  height: 45px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 15px;

  font-weight: 400;
  font-size: 20px;
`;

const NumberAndNameInput = styled(Input)`
  width: 350px;
`;

const ExpiryAndCVCDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ExpiryInput = styled(Input)`
  width: 212px;
`;

const CVCInput = styled(Input)`
  width: 117px;
`;

const SubmitContainer = styled.div`
  margin-left: -318px;
  margin-top: 40px;
  width: 100%;

  > button {
    margin-top: 0px;
  }
`;
const Subtitle = styled.h2`
  margin-bottom: 17px;

  font-weight: 400;
  font-size: 20px;
  line-height: 23.44px;
  color: #8e8e8e;
`;
