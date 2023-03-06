import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getTicket } from '../../../services/ticketApi';
import styled from 'styled-components';

export default function SummaryTicket({ setTicketId }) {
  const token = useToken();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    getTicket(token).then((res) => {
      if (res.TicketType.isRemote) {
        setTicket({ name: 'Online', value: res.TicketType.price });
      } else if (!res.TicketType.isRemote && !res.TicketType.includesHotel) {
        setTicket({ name: 'Presencial + Sem Hotel', value: res.TicketType.price });
      } else if (!res.TicketType.isRemote && res.TicketType.includesHotel) {
        setTicket({ name: 'Presencial + Com Hotel', value: res.TicketType.price });
      }

      setTicketId(res.id);
    });
  }, []);

  return (
    <Screen>
      {ticket && (
        <>
          <p>{ticket.name}</p>
          <p>R$ {ticket.value}</p>
        </>
      )}
    </Screen>
  );
}

const Screen = styled.div`
  background-color: rgba(255, 238, 210, 1);
  height: 108px;
  width: 290px;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  p:nth-child(2) {
    color: gray;
  }
`;
