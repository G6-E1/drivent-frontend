import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

export default function PaymentForm() {
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

  return (
    <CardPaymentForm>
      <Cards
        cvc={cardInfo.cvc}
        expiry={cardInfo.expiry}
        focused={cardInfo.focus}
        name={cardInfo.cardName}
        number={cardInfo.number}
      />

      <StyledForm>
        <InputMask
          mask="9999 9999 9999 9999"
          maskChar=""
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          value={cardInfo.number}
        >
          {() => <NumberAndNameInput type="tel" maxLength="19" name="number" placeholder="Card Number" />}
        </InputMask>
        <span>E.g.: 49..., 51..., 36..., 37...</span>

        <NumberAndNameInput
          type="text"
          name="cardName"
          placeholder="Name"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          value={cardInfo.cardName}
        />

        <ExpiryAndCVCDiv>
          <InputMask
            mask="99/9999"
            maskChar=""
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            value={cardInfo.expiry}
          >
            {() => <ExpiryInput type="tel" maxLength="7" name="expiry" placeholder="Valid Thru" />}
          </InputMask>

          <CVCInput
            type="tel"
            maxLength="4"
            name="cvc"
            placeholder="CVC"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            value={cardInfo.cvc}
          />
        </ExpiryAndCVCDiv>
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

  span {
    margin-top: -13px;
    margin-bottom: 15px;

    font-size: 16px;
    color: #999999;
  }
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
