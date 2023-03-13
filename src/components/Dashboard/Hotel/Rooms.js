import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { getHotelById } from '../../../services/hotelAPI';
import Room from './Room';

export default function Rooms({ hotelId }) {
  const token = useToken();
  const [roomSelect, setRoomSelect] = useState();

  const [hotel, setHotel] = useState(undefined);
  useEffect(() => {
    getHotelById(hotelId, token)
      .then((res) => {
        setHotel(res);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Subtitle>Ótima pedida! Agora escolha seu quarto:</Subtitle>
      <BoxRooms>
        {hotel &&
          hotel.Rooms.map((r) => <Room key={r.id} room={r} setRoomSelect={setRoomSelect} roomSelect={roomSelect} />)}
      </BoxRooms>
    </>
  );
}

const BoxRooms = styled.div`
  max-width: 845px;
  column-gap: 17px;
  row-gap: 8px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
