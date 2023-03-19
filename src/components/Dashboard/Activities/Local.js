import styled from 'styled-components';
import Activity from './Activity';

const date1S = Date.parse('2023-03-22 12:00:00.000');
const date1F = Date.parse('2023-03-22 13:00:00.000');

const date2S = Date.parse('2023-03-22 13:00:00.000');
const date2F = Date.parse('2023-03-22 14:00:00.000');

const date3S = Date.parse('2023-03-22 12:00:00.000');
const date3F = Date.parse('2023-03-22 15:00:00.000');

const activitiesOrigin = [
  { id: 1, name: 'React - uma nova forma de desenvolver pra web', vacancies: 200, startAt: date1S, finishAt: date1F, localId: 1 },
  { id: 2, name: 'Prisma - O ORM do futuro', vacancies: 200, startAt: date2S, finishAt: date2F, localId: 1 },
  { id: 3, name: 'ChatGPT - A revolução das máquinas começou', vacancies: 120, startAt: date3S, finishAt: date3F, localId: 2 },
];

export default function Local({ localId, maxCapacity, name }) {
  const activities = activitiesOrigin.filter(activity => activity.localId === localId);

  return (
    <LocalContainer>
      <Title>  
        <LocalName>
          {name}
        </LocalName>
      </Title>
      <ActivitiesContainer>
        {activities.map((activity, i) => <Activity
          key={ i }
          localId={ activity.id }
          vacancies={ activity.vacancies }
          name={ activity.name }
          start={ activity.startAt }
          finish={ activity.finishAt }
          duration={ (activity.finishAt - activity.startAt) }
        ></Activity>) }
      </ActivitiesContainer>
    </LocalContainer>
  );
}

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const LocalContainer = styled.div`
  border-colapse: colapse;
`;
const LocalName = styled.p`
  font-family: 'Roboto', sans-serif;
  color: #7B7B7B;
  font-size: 1.1rem;
`;
const ActivitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  width: 288px;
  height: 392px;
  border: 1px solid #D7D7D7;
  & > div {
    border-right: none;
    &:last-child {
        border: 1px solid #D7D7D7;
    }
  }
`;

