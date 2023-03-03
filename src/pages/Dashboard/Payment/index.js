import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TicketType from '../../../components/Dashboard/Payment/TicketType';

export default function Payment() {
  return (
    <>
      <StyledTypography variant="h4">Ingressos e pagamento</StyledTypography>
      <TicketType/>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
