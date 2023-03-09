import styled from 'styled-components';
import Room from './Room';

const rooms = [
  { id: 1,  name: '101', capacity: 3, hotelId: 1 }, { id: 2,  name: '102', capacity: 3, hotelId: 1 },
  { id: 3,  name: '103', capacity: 3, hotelId: 1 }, { id: 4,  name: '104', capacity: 3, hotelId: 1 },
  { id: 5,  name: '105', capacity: 3, hotelId: 1 }, { id: 6,  name: '106', capacity: 3, hotelId: 1 },
  { id: 7,  name: '107', capacity: 3, hotelId: 1 }, { id: 8,  name: '108', capacity: 3, hotelId: 1 },
  { id: 9,  name: '109', capacity: 3, hotelId: 1 }, { id: 10, name: '110', capacity: 3, hotelId: 1 },
  { id: 11, name: '111', capacity: 3, hotelId: 1 }, { id: 12, name: '112', capacity: 3, hotelId: 1 },
  { id: 13, name: '113', capacity: 3, hotelId: 1 }, { id: 14, name: '114', capacity: 3, hotelId: 1 },
  { id: 15, name: '115', capacity: 3, hotelId: 1 }, { id: 16, name: '116', capacity: 3, hotelId: 1 },
];

export default function Rooms() {
  return (
    <BoxRooms>
      {rooms.map(r => <Room room={r}/>)}
    </BoxRooms>
  );
};

const BoxRooms = styled.div`
  max-width: 845px;
  /* padding: 17px; */
  column-gap:17px;
  row-gap:8px;
  
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
