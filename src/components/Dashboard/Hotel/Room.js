import styled from 'styled-components';

export default function Room({ room }) {
  return (
    <BoxRoom>
      {room.name}
    </BoxRoom>
  );
}

const BoxRoom = styled.div`
  width: 190px;
  height: 45px;

  border: 1px solid #CECECE;
  border-radius: 10px;
`;
