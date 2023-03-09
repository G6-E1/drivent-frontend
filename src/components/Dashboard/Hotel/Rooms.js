import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { getHotelById } from '../../../services/hotelApi';
import Room from './Room';

const rooms = [
  { id: 1, name: '101', capacity: 3, hotelId: 1 }, { id: 2, name: '102', capacity: 2, hotelId: 1 },
  { id: 3, name: '103', capacity: 1, hotelId: 1 }, { id: 4, name: '104', capacity: 3, hotelId: 1 },
  { id: 5, name: '105', capacity: 2, hotelId: 1 }, { id: 6, name: '106', capacity: 1, hotelId: 1 },
  { id: 7, name: '107', capacity: 3, hotelId: 1 }, { id: 8, name: '108', capacity: 2, hotelId: 1 },
  { id: 9, name: '109', capacity: 1, hotelId: 1 }, { id: 10, name: '110', capacity: 1, hotelId: 1 },
  { id: 11, name: '111', capacity: 2, hotelId: 1 }, { id: 12, name: '112', capacity: 2, hotelId: 1 },
  { id: 13, name: '113', capacity: 1, hotelId: 1 }, { id: 14, name: '114', capacity: 3, hotelId: 1 },
  { id: 15, name: '115', capacity: 2, hotelId: 1 }, { id: 16, name: '116', capacity: 1, hotelId: 1 },
];

const bookings = [
  { id: 1, userId: 1, roomId: 1 }, { id: 2, userId: 2, roomId: 1 }, { id: 3, userId: 3, roomId: 1 },
  { id: 4, userId: 4, roomId: 2 }, { id: 4, userId: 7, roomId: 4 },
  { id: 5, userId: 5, roomId: 4 },
];

const hashTableBookigns = [];
bookings.forEach(b => {
  if (!hashTableBookigns[b.roomId]) {
    hashTableBookigns[b.roomId] = 1;
  } else {
    hashTableBookigns[b.roomId]++;
  }
});

export default function Rooms() {
  const token = useToken();
  const [roomSelect, setRoomSelect] = useState();
  rooms.map((room, i) => {
    if (hashTableBookigns[room.id]) {
      return rooms[i].occupation = hashTableBookigns[room.id];
    } else {
      return rooms[i].occupation = 0;
    };
  });
  const [rooms2, setRoom2] = useState();
  useEffect(() => {
    getHotelById(1, token)
      .then(res => { setRoom2(res); })
      .catch(error => console.log(error));
  }, []);

  console.log(rooms2);
  return (
    <BoxRooms>
      {rooms.map(r => <Room key={r.id} room={r} setRoomSelect={setRoomSelect} roomSelect={roomSelect} />)}
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
