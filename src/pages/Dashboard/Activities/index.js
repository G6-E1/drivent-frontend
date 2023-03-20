import Days from '../../../components/Dashboard/Activities/Days';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import Locals from '../../../components/Dashboard/Activities/Locals';
import { useState, useEffect } from 'react';
import { useGetTicket } from '../../../hooks/api/useTicket';
import ErrorPage from '../../../components/Dashboard/Error/Error';

export default function Activities() {
  const [date, setdate] = useState();
  const { getTicket } = useGetTicket();

  const [ticket, setTicket]  = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [ticketType, setTicketType] = useState({});
  const [shouldRenderActivitiesError, setShouldRenderActivitiesError] = useState({ display: false, title: 'Escolha de hotel e quarto', message: '' });

  useEffect(() => {
    async function fetchData() {
      try {
        const ticketData = await getTicket();
        setTicket(ticketData);
        if(ticketData.status === 'RESERVED') {
          setShouldRenderActivitiesError({ 
            display: true, 
            title: 'Escolha de Atividades', 
            message: 'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem' });
        }
        setTicketType(ticketData.TicketType);
        if (ticketType.isRemote) {
          setShouldRenderActivitiesError({ 
            display: true, 
            title: 'Escolha de Atividades', 
            message: 'Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.' });
        }
        setIsLoading(false);
      } catch (error) {
        setShouldRenderActivitiesError({ 
          display: true, 
          title: 'Escolha de Atividades', 
          message: 'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem' });
      }
    }

    fetchData();
  }, [isLoading]);

  if (shouldRenderActivitiesError.display || ticket?.status === 'RESERVED') {
    const message = shouldRenderActivitiesError.message;
    const title = shouldRenderActivitiesError.title;
    return ErrorPage({ message, title });
  }

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Days setdate={setdate} />
      {/* {date &&  <StyledTypography variant='h4'>Dia selecionado {date}</StyledTypography>} */}
      {date && <><Locals date={date} /></>}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 36px !important;
`;
