import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { postBooking } from '../../../services/bookingApi';
import { getHotelById } from '../../../services/hotelApi';
import Button from '../../Form/Button';

import Room from './Room';

export default function Rooms({ changeRoom, setChangeRoom, setShowSummaryRoom }) {
  const token = useToken();
  const [roomSelect, setRoomSelect] = useState();
  console.log(roomSelect);
  const [hotel, setHotel] = useState(undefined);
  useEffect(() => {
    getHotelById(1, token)
      .then((res) => {
        setHotel(res);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleButton() {
    if (!roomSelect) {
      return alert('Por favor selecione quarto');
    };

    postBooking(roomSelect, token);
    alert(`Mudando para o quarto ${roomSelect}`);
    setShowSummaryRoom(true);
    // if (changeRoom) {

    // };
  };

  return (
    <>
      <Subtitle>Ótima pedida! Agora escolha seu quarto:</Subtitle>
      <BoxRooms>
        {hotel &&
          hotel.Rooms.map((r) => <Room key={r.id} room={r} setRoomSelect={setRoomSelect} roomSelect={roomSelect} />)}
      </BoxRooms>
      <Button onClick={() => handleButton(changeRoom)}>
        RESERVAR QUARTO
      </Button>

    </>
  );
}

const BoxRooms = styled.div`
  max-width: 845px;
  column-gap: 17px;
  row-gap: 8px;

  margin-bottom: 46px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Subtitle = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: #8e8e8e;

  margin-top: 52px;
  margin-bottom: 33px;
`;
