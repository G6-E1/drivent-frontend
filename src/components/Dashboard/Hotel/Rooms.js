import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { postBooking } from '../../../services/bookingApi';
import { getHotelById } from '../../../services/hotelApi';
import Button from '../../Form/Button';

import Room from './Room';

export default function Rooms({ hotelId, changeRoom, setShowSummaryRoom }) {
  const token = useToken();
  const [roomSelect, setRoomSelect] = useState();
  const [hotel, setHotel] = useState(undefined);
  useEffect(() => {
    getHotelById(hotelId, token)
      .then((res) => {
        setHotel(res);
      })
      .catch((error) => { 
        // eslint-disable-next-line
        console.log(error) });
  }, [hotelId]);

  async function handleButton(changeRoom) {
    if (!roomSelect) {
      return toast('Por favor selecione quarto');
    };

    await postBooking(roomSelect, token);
    setShowSummaryRoom(true);
  };

  return (
    <>
      <Subtitle>Ótima pedida! Agora escolha seu quarto:</Subtitle>
      <BoxRooms>
        {hotel &&
          hotel.Rooms.map((r) => <Room key={r.id} room={r} setRoomSelect={setRoomSelect} roomSelect={roomSelect} />)}
      </BoxRooms>
      <ButtonContainer>
        <Button onClick={() => handleButton(changeRoom)}>
          RESERVAR QUARTO
        </Button>
      </ButtonContainer>
    </>
  );
}
const ButtonContainer = styled.div`
  margin-top: 17px;

  > button {
    margin-top: 0px;
  }
`;
const BoxRooms = styled.div`
  max-width: 845px;
  column-gap: 17px;
  row-gap: 8px;

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
