import { TimezoneData } from '../utils/timezones';
import { formatInTimeZone } from 'date-fns-tz'; // Pour formater la date dans le fuseau cible
import { isSameDay, isBefore, addDays, subDays } from 'date-fns'; // Pour comparer les jours

type TimeItemProps = {
  sourceUtcDate: Date;      // La date/heure source en UTC
  targetTimezone: TimezoneData; // Les informations du fuseau horaire cible
  sourceTimezone: string; // Le fuseau horaire source (pour référence de comparaison)
}

export function TimeItem(props: TimeItemProps) {
  // S'assurer que la date source est valide
  if (!props.sourceUtcDate || isNaN(props.sourceUtcDate.getTime())) {
    return <div className="text-red-500">Date source invalide</div>;
  }

  let formattedTime = '';
  let dateDisplay = '';
  let isDifferentDay = false;

  try {
    // Formater l'heure dans le fuseau horaire cible
    // Exemple de format: 14:30 (HH:mm)
    formattedTime = formatInTimeZone(props.sourceUtcDate, props.targetTimezone.timezone, 'HH:mm');

    // Comparer les jours pour savoir si c'est un jour différent
    const targetDateInTargetTz = formatInTimeZone(props.sourceUtcDate, props.targetTimezone.timezone, 'yyyy-MM-dd');
    const sourceDateInSourceTz = formatInTimeZone(props.sourceUtcDate, props.sourceTimezone, 'yyyy-MM-dd');

    const targetDateObj = new Date(targetDateInTargetTz);
    const sourceDateObj = new Date(sourceDateInSourceTz);

    isDifferentDay = !isSameDay(targetDateObj, sourceDateObj);
    
    if (isDifferentDay) {
      // Formater la date au format "JJ MMM" (ex: 15 Jan)
      dateDisplay = formatInTimeZone(props.sourceUtcDate, props.targetTimezone.timezone, 'd MMM');
    }

  } catch (error) {
    console.error(`Erreur de formatage pour ${props.targetTimezone.city}:`, error);
    formattedTime = 'Erreur';
  }

  return (
    <li className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center mb-3">
      <div>
        <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{props.targetTimezone.city}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{props.targetTimezone.timezone.replace(/_/g, ' ')}</p>
      </div>
      <div className="text-right">
        <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{formattedTime}</p>
        {isDifferentDay && dateDisplay && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{dateDisplay}</p>
        )}
      </div>
    </li>
  );
}
