import styled from 'styled-components';
import Local from './Local';
import * as localsApi from '../../../services/localsApi';
import { useState, useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import useAsync from '../../../hooks/useAsync';
import { toast } from 'react-toastify';

export default function Locals({ date }) {
  const token = useToken();
  const [locals, setLocals] = useState([]);

  const {
    act: getLocals,
  } = useAsync(() => localsApi.getLocals(token), false);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const fetchedLocals = await getLocals();
        setLocals(fetchedLocals);
      } catch (error) {
        toast('Ocorreu um erro ao obter os locais, tente novamente');
      }
    };
    fetchData();
  }, []);

  return (
    <LocalsContainer>
      {locals.map((local, i) => <Local
        key={i}
        date={date}
        localId={local.id}
        maxCapacity={local.maxCapacity}
        name={local.name}
      ></Local>) }
    </LocalsContainer>
  );
}

const LocalsContainer = styled.div`
  display: flex;
  margin-top: 55px;
`;
