import { addDays, daysInWeek, eachDayOfInterval, endOfWeek, getWeek, startOfWeek } from 'date-fns';
import React, { useMemo, useState } from 'react';
import KanbanBoard from './KanbanBoard';
import KanbanBoardProvider from './KanbanBoardProvider';
import { TCard, TColumn } from './types';
import { useKanbanBoardProps } from './useKanbanBoard';

const days = [
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
];
const dateStr = (d: Date) => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

type CalColumn = TColumn & {
  date: Date;
  week: number;
  month: number;
  year: number;
};

type BaseCard = Omit<TCard, 'column'> & { date: Date; };
type CalCard = BaseCard & { column: string; };

type WeeklyCalendarBoardProps<T extends BaseCard = BaseCard> = {
  cards: readonly T[];
  onAddCard?: useKanbanBoardProps['onAddCard'];
  onRemoveCard?: useKanbanBoardProps['onRemoveCard'];
  updateCards?: useKanbanBoardProps['updateCards'];
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

function WeeklyCalendarBoard<T extends BaseCard = BaseCard>({
  cards,
  onAddCard,
  onRemoveCard,
  updateCards,
  weekStartsOn = 0,
}: WeeklyCalendarBoardProps<T>) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const data: CalCard[] = useMemo(() => {
    return cards.map(c => ({ ...c, column: dateStr(c.date) }))
  }, [cards]);

  const columns: CalColumn[] = useMemo(() => {
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    return eachDayOfInterval({ start, end }).map((d, i) => ({
      date: d,
      week: getWeek(d, { weekStartsOn }),
      month: d.getMonth()+1,
      year: d.getFullYear(),
      column: dateStr(d),
      title: days[i],
    } as CalColumn));
  }, [currentDate, weekStartsOn]);

  return (
    <KanbanBoard
      cards={data}
      columns={columns}
      onAddCard={onAddCard}
      onRemoveCard={onRemoveCard}
      updateCards={updateCards}
    />
  )
}

export default WeeklyCalendarBoard;
