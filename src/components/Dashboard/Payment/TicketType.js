import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllTicketsTypes } from '../../../services/getTypes';
import ReserveOnlineTicket from './ReserveTicket';
// import prices from './Prices';

export default function TicketType({ setIsReserved, ticketsTypes }) {
  const [isFinish, setIsFinish] = useState(false);

  const [remoteTicket, setRemoteTicket] = useState({});
  const [presencialTicket, setPresencialTicket] = useState({});
  const [presencialWithHotelTicket, setPresencialWithHotelTicket] = useState({});

  const [modality, setModality] = useState(null);
  const modalityTypes = [
    { name: 'Presencial', price: presencialTicket?.price },
    { name: 'Online', price: remoteTicket?.price },
  ];
  const hotel = [
    { name: 'Sem Hotel', price: 0 },
    { name: 'Com Hotel', price: presencialWithHotelTicket?.price - presencialTicket?.price },
  ];
  const [modalityHotel, setModalityHotel] = useState(null);

  function defineModality(modality) {
    if (modality === 'Online') {
      return remoteTicket;
    }

    if (modality === 'Presencial') {
      if (modalityHotel === 'Sem Hotel') return presencialTicket;
      return presencialWithHotelTicket;
    }
  }

  useEffect(() => {
    if (ticketsTypes !== null) {
      const { remoteTicket, presencialTicket, presencialWithHotelTicket } = getAllTicketsTypes(ticketsTypes);
      setRemoteTicket(remoteTicket);
      setPresencialTicket(presencialTicket);
      setPresencialWithHotelTicket(presencialWithHotelTicket);
    }
  }, [ticketsTypes]);

  return (
    <>
      <Subtitle>Primeiro, escolha sua modadelidade de ingresso</Subtitle>
      <ButtonBoard>
        {modalityTypes.map((type) => (
          <ButtonToggle
            key={type.name}
            active={modality === type.name}
            onClick={() => {
              setModality(type.name);
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
            {hotel.map((type) => (
              <ButtonToggle
                key={type.name}
                active={modalityHotel === type.name}
                onClick={() => {
                  setModalityHotel(type.name);
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

      {(modality === 'Online' || isFinish) && (
        <ReserveOnlineTicket setIsReserved={setIsReserved} ticketType={defineModality(modality)} />
      )}
    </>
  );
}
const Subtitle = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: #8e8e8e;

  /* margin-top: 50px; */
  margin-bottom: 17px;
`;
const ButtonToggle = styled.button`
  box-sizing: border-box;

  width: 145px;
  height: 145px;
  border: solid 1px #cecece;
  border-radius: 20px;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-style: normal;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;

  h1 {
    font-size: 16px;
    line-height: 19px;
    color: #454545;
  }

  p {
    font-size: 14px;
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
  box-sizing: border-box;
  margin-bottom: 25px;
`;
