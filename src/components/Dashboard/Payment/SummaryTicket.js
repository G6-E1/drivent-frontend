import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getTicket } from '../../../services/ticketApi';

export default function SummaryTicket() {
  const token = useToken();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    getTicket(token).
      then((res) => {
        if (res.TicketType.isRemote) {
          setTicket({ name: 'Online', value: res.TicketType.price });
        }
        else if (!res.TicketType.isRemote && res.TicketType.includeHotel) {
          setTicket({ name: 'Presencial + Sem Hotel', value: res.TicketType.price });
        }
        else if (!res.TicketType.isRemote && !res.TicketType.includeHotel) {
          setTicket({ name: 'Presencial + Com Hotel', value: res.TicketType.price });
        };
        console.log(res);
      });
  }, []);

  console.log(ticket);
  return (
    <>
      {ticket &&
        <>
          <p>{ticket.name}</p> 
          <p>{ticket.value}</p>
        </>}

    </>
  );
};
