import { TimeItem } from './TimeItem';
import { timezones, TimezoneData } from '../utils/timezones';

type TimeListProps = {
  sourceUtcDate: Date;
  sourceTimezone: string;
};

export function TimeList(props: TimeListProps) {
  // Filtrer pour ne pas afficher le fuseau horaire source dans la liste des cibles
  const targetTimezones = timezones.filter(tz => tz.timezone !== props.sourceTimezone);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Heures Converties</h2>
      {targetTimezones.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Aucun autre fuseau horaire à afficher.</p>
      ) : (
        <ul>
          {targetTimezones.map((tz: TimezoneData) => (
            <TimeItem
              key={tz.timezone}
              sourceUtcDate={props.sourceUtcDate}
              targetTimezone={tz}
              sourceTimezone={props.sourceTimezone}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
