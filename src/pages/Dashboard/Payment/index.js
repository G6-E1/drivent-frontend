import styled from 'styled-components';
import { useState } from 'react';

export default function Payment() {
  const [display, setDisplay] = useState('none');
  function chooseModality() {
    if (display === 'none') {
      setDisplay('flex');
    } else {
      setDisplay('none');
    }
  }

  return (
    <>
      <button onClick={chooseModality}>clicka ai</button>
      {onlineFeedback(100, display)}
    </>
  );
}

function onlineFeedback(price, display) {
  const Screen = styled.div`
    display: ${(props) => props.display};
    flex-direction: column;
    gap: 20px;
    padding: 10px;
  `;

  const Feedback = styled.div`
    font-size: 22px;
    color: gray;

    span {
      font-weight: bold;
    }
  `;

  const Button = styled.button`
    height: 40px;
    width: 220px;
    color: black;
    font-weight: bold;
    font-family: sans-serif;
    text-transform: uppercase;
    background-color: rgba(215, 215, 215, 1);
    border-radius: 8px;
    box-shadow: 0px 0px 3px gray;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      box-shadow: 0px 0px 3px black;
    }
  `;

  function reserveTicket() {
    // Lógica pra reservar do ticket
  }

  return (
    <Screen display={display}>
      <Feedback>
        Fechado! O total ficou em <span>R$ {price}</span>. Agora é só confirmar:
      </Feedback>
      <Button onClick={reserveTicket}>reservar ingresso</Button>
    </Screen>
  );
}
