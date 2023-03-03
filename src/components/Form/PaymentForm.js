import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import Button from './Button';
import { toast } from 'react-toastify';
import Payment from 'payment';

export default function PaymentForm({ setIsPaid }) {
  const [cardInfo, setCardInfo] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    cardName: '',
    number: '',
  });

  function handleInputFocus(e) {
    const { name } = e.target;
    setCardInfo({ ...cardInfo, focus: name });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setCardInfo({ ...cardInfo, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !Payment.fns.validateCardExpiry(cardInfo.expiry) ||
      !Payment.fns.validateCardNumber(cardInfo.number) ||
      !Payment.fns.validateCardCVC(cardInfo.cvc)
    ) {
      toast('Houve um erro ao finalizar seu pagamento');
      return;
    }

    const cardIssuer = Payment.fns.cardType(cardInfo.number);

    console.log(cardIssuer);
    console.log('Submited');
    setIsPaid(true);
  }

  return (
    <CardPaymentForm>
      <Cards
        cvc={cardInfo.cvc}
        expiry={cardInfo.expiry}
        focused={cardInfo.focus}
        name={cardInfo.cardName}
        number={cardInfo.number}
      />

      <StyledForm onSubmit={handleSubmit}>
        <InputMask
          mask="9999 9999 9999 9999"
          maskChar=""
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          value={cardInfo.number}
        >
          {() => <NumberAndNameInput type="tel" maxLength="19" name="number" placeholder="Card Number" required />}
        </InputMask>
        <ExampleText>E.g.: 49..., 51..., 36..., 37...</ExampleText>

        <NumberAndNameInput
          type="text"
          name="cardName"
          placeholder="Name"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          value={cardInfo.cardName}
          required
        />

        <ExpiryAndCVCDiv>
          <InputMask
            mask="99/9999"
            maskChar=""
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            value={cardInfo.expiry}
          >
            {() => <ExpiryInput type="tel" maxLength="7" name="expiry" placeholder="Valid Thru" required />}
          </InputMask>

          <CVCInput
            type="tel"
            maxLength="4"
            name="cvc"
            placeholder="CVC"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            value={cardInfo.cvc}
            required
          />
        </ExpiryAndCVCDiv>

        <SubmitContainer>
          <Button type="submit">Finalizar Pagamento</Button>
        </SubmitContainer>
      </StyledForm>
    </CardPaymentForm>
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
