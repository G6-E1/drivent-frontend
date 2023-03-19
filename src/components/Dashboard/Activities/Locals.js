import styled from 'styled-components';
import Local from './Local';

const locals = [
  { id: 1, maxCapacity: 200, name: 'auditório 1' },
  { id: 2, maxCapacity: 180, name: 'auditório 2' },
  { id: 3, maxCapacity: 80, name: 'auditório 3' },
];

export default function Locals() {
  return (
    <LocalsContainer>
      {locals.map((local, i) => <Local
        key={i}
        localId={local.id}
        maxCapacity={local.maxCapacity}
        name={local.name}
      ></Local>) }
    </LocalsContainer>
  );
}

const LocalsContainer = styled.div`
  display: flex;
  margin-top: 60px;
`;
