import styled from 'styled-components';
import vacancyAvailable from '../../../assets/images/vacancyAvailable.svg';

export default function Room({ room }) {
  const vacancys = [];
  for (let i = 0; i < room.capacity; i++) {
    vacancys.push(<img key = {i} src={vacancyAvailable} />);
  };

  return (
    <BoxRoom>
      {room.name}
      <div>
        {vacancys}
      </div>
    </BoxRoom>
  );
}

const BoxRoom = styled.div`
  width: 190px;
  height: 45px;

  border: 1px solid #CECECE;
  border-radius: 10px;
  padding: 5px;

  display: flex;
  justify-content:space-between;
  align-items:center;

`;
