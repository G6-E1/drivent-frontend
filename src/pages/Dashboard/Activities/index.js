// export default function Activities() {
//   return 'Atividades: Em breve!';
// }

import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import Activity from '../../../components/Dashboard/Activities/Activity';

export default function Activities() {
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Activity />
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 36px !important;
`;
