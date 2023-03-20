import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useGetActiviesDates } from '../../../hooks/api/useActivities';
import Day from './Day';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

export default function Days({ setdate }) {
  const { getDateActivities } = useGetActiviesDates();

  const [selectedDay, setSelectedDay] = useState();
  const datesMap = new Map();
  const datesArray = [];
  const [dates, setDates] = useState();

  useEffect(() => {
    let activities;
    async function fetchData() {
      try {
        activities = await getDateActivities();
        if (activities) {
          uniqueDates(activities);
        };
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function uniqueDates(activities) {
    activities.map(date => {
      const datePTBr = dayjs(date.startAt).format('ddd, DD/MM');
      datesMap.set(datePTBr, { ptBr: datePTBr, startAt: date.startAt });
    });
    datesMap.forEach((d) => datesArray.push(d));
    setDates(datesArray);
  }
  console.log('dates:', dates);
  return (
    <ContainerDays>
      {dates?.map((d, i) => <Day
        key={i}
        idButton={i}
        dates={dates}
        day={d}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setdate={setdate}
      />)
      }
    </ContainerDays>
  );
};

const ContainerDays = styled.div`
  width: 806px;
  display:flex;
`;

