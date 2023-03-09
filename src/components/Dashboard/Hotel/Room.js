import styled from 'styled-components';
import { HiUser, HiOutlineUser } from 'react-icons/hi';

export default function Room({ room, roomSelect, setRoomSelect }) {
  const vacancys = [];
  let buttonDisabled = false;
  for (let i = 0; i < room.capacity; i++) {
    if (room.occupation === room.capacity) {
      for (let j = 0; j < room.capacity; j++) {
        vacancys.push(<HiUser key={j} color={'#8C8C8C'} />);
        buttonDisabled = true;
      }
      break;
    }
    if (room.occupation > 0) {
      vacancys.push(<HiUser key={i} color={'#000000'} />);
      room.occupation--;
    } else {
      vacancys.push(<HiOutlineUser key={i} />);
    };
  };

  return (
    <BoxRoom
      key={room.id}
      onClick={() => setRoomSelect(room.id)}
      disabled={buttonDisabled}
      select={
        buttonDisabled ?
          '#CECECE'
          :
          room.id === roomSelect ? '#FFEED2' : 'white'
      }
    >
      {room.name}
      <BoxVacancys>
        {vacancys}
      </BoxVacancys>
    </BoxRoom>
  );
}

const BoxRoom = styled.button`
  width: 190px;
  height: 45px;

  border: 1px solid #CECECE;
  border-radius: 10px;
  padding-inline: 17px;

  background: ${props => props.select};

  display: flex;
  justify-content:space-between;
  align-items:center;
`;

const BoxVacancys = styled.div`
  display: flex;
  flex-direction:row-reverse;
`;

// Rosa #FF4791
//Bege #FFEED2
