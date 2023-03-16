import styled from 'styled-components';
import Button from '../../Form/Button';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

export default function Day({ idButton, day, selectedDay, setSelectedDay }) {
  let isDisable = idButton === selectedDay;
  
  return (
    <ButtonContainer>
      <Button
        onClick={() => {
          setSelectedDay(idButton);
          isDisable = true;
        }}
        disabled={isDisable}
      >
        {dayjs(day).format('ddd, DD/MM HH:mm')}
      </Button>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  margin-right: 17px;
  button {
    width: 131px;
    height: 37px;
    text-transform: capitalize;
  }  
  button:disabled{
    background: #FFD37D;
  }
  
`;

