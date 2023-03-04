import styled from 'styled-components';
import { reserveTicket, getTicketsTypes } from '../../services/ticketApi';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import useAsync from '../../hooks/useAsync';

export default function ReserveOnlineTicket({ price, display }) {
  const token = useToken();
  const [ticketsTypes, setTicketsTypes] = useState(null);

  useEffect(() => {
    getTicketsTypes(token)
      .then((res) => setTicketsTypes([...res]))
      .catch((e) => {
        toast('Não foi possível obter os tickets types');
      });
  }, []);

  function createTicket() {
    const body = {
      ticketTypeId: ticketsTypes[0].id,
    };

    alert('Clicado');

    reserveTicket(body, token)
      .then((res) => {
        // Fazer aparecer o card de ingresso escolhido
        // Fazer aparecer o card de preenchimento de dados bancários
        alert('Ticket reservado com sucesso!');
      })
      .catch((e) => {
        toast('Não foi possível reservar o ingresso');
      });
  }

  return (
    <Screen display={display}>
      <Feedback>
        Fechado! O total ficou em <span>R$ {price}</span>. Agora é só confirmar:
      </Feedback>
      <Button onClick={createTicket}>reservar ingresso</Button>
    </Screen>
  );
}

const Screen = styled.div`
  display: ${(props) => props.display};
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  font-family: Roboto;
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
    background-color: rgba(208, 208, 208, 1);
  }
`;
