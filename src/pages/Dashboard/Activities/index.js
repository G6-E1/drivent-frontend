import Days from '../../../components/Dashboard/Activities/Days';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import Locals from '../../../components/Dashboard/Activities/Locals';

export default function Activities() {
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <Days />
      <Locals />
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 36px !important;
`;
