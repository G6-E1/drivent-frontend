import styled from 'styled-components';
import { useState } from 'react';
import { reserveTicket } from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';

import reserveOnlineTicket from '/home/hugo/drivent-frontend/src/components/Dashboard/reserveOnlineTicket';

export default function Payment() {
  const [display, setDisplay] = useState('flex');
  function chooseModality() {
    if (display === 'none') {
      setDisplay('flex');
    } else {
      setDisplay('none');
    }
  }

  return <>{reserveOnlineTicket(100, display)}</>;
}
