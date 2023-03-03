import { useState } from 'react';
import styled from 'styled-components';
// import prices from './Prices';

export default function TicketType() {
  const modalityTypes = [{ name: 'Presencial', price: 250 }, { name: 'Online', price: 100 }];
  const [modality, setModality] = useState(null);

  const hotel = [{ name: 'Sem Hotel', price: 0 }, { name: 'Com Hotel', price: 350 }];
  const [modalityHotel, setModalityHotel] = useState(null);

  const [isFinish, setIsFinish] = useState(false);
  const [price, setPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  return (
    <>
      <Subtitle>Primeiro, escolha sua modadelidade de ingresso</Subtitle>
      <ButtonBoard>
        {modalityTypes.map(type => (
          <ButtonToggle
            key={type.name}
            active={modality === type.name}
            onClick={() => {
              setModality(type.name);
              setPrice(type.price);
            }}
          >
            <h1>{type.name}</h1>
            <p>R$ {type.price}</p>
          </ButtonToggle>
        ))}
      </ButtonBoard>

      {modality === 'Presencial' && (
        <>
          <Subtitle>Ótimo! Agora escolha sua modalidade de hospedagem</Subtitle>
          <ButtonBoard>
            {hotel.map(type => (
              <ButtonToggle
                key={type.name}
                active={modalityHotel === type.name}
                onClick={() => {
                  setModalityHotel(type.name);
                  setFinalPrice (price + type.price);
                  setIsFinish(true);
                }}
              >
                <h1>{type.name}</h1>
                <p>+ R$ {type.price}</p>
              </ButtonToggle>
            ))}
          </ButtonBoard>
        </>
      )}

      {((modality === 'Online') || isFinish) &&(
        <Subtitle>Fechado! O total ficou em <strong>R$ {finalPrice}</strong>. Agora é só confirmar:</Subtitle>
      )}
    </>
  );
}
const Subtitle = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  color: #8E8E8E;

  /* margin-top: 50px; */
  margin-bottom: 17px;
`;
const ButtonToggle = styled.button`
  box-sizing:border-box;

  width: 145px;
  height: 145px;
  border: solid 1px #CECECE;
  border-radius: 20px;
  background-color:white;

  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  font-weight:400;
  font-style: normal;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;


  h1{
    font-size: 16px;
    line-height: 19px;
    color: #454545;
  }

  p{
    font-size:14px;
    line-height: 16px;
    color: #898989;
  }
  ${({ active }) =>
    active &&
    `
    background-color:#FFEED2;

  `}
`;
const ButtonBoard = styled.div`
  display: flex;
  gap: 24px;
  box-sizing:border-box;

`;
