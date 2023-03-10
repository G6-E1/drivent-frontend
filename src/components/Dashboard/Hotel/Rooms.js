import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { getHotelById } from '../../../services/hotelApi';
import Room from './Room';

export default function Rooms() {
  const token = useToken();
  const [roomSelect, setRoomSelect] = useState();

  const [hotel, setHotel] = useState(undefined);
  useEffect(() => {
    getHotelById(1, token)
      .then(res => { setHotel(res); })
      .catch(error => console.log(error));
  }, []);

  return (
    <BoxRooms>
      {hotel && (hotel.Rooms.map(r => <Room key={r.id} room={r} setRoomSelect={setRoomSelect} roomSelect={roomSelect} />))}
    </BoxRooms>
  );
};

const BoxRooms = styled.div`
  max-width: 845px;
  column-gap:17px;
  row-gap:8px;
  
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
