import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { getAllTimezones, getTimezoneInfo } from '../utils/timezones';

type TimezoneSelectorProps = {
  onSelect: (timezone: string) => void;
  selectedTimezone?: string;
};

type TimezoneOption = {
  id: string;
  displayName: string;
  offset: number;
  offsetDisplay: string;
};

export function TimezoneSelector(props: TimezoneSelectorProps) {
  const [timezones, setTimezones] = useState<TimezoneOption[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    
    try {
      const allZones = getAllTimezones();
      
      // Transformer les identifiants en options avec infos supplémentaires
      const options = allZones.map((zone) => {
        try {
          const now = DateTime.now().setZone(zone);
          const offset = now.offset;
          const offsetHours = Math.floor(Math.abs(offset) / 60);
          const offsetMinutes = Math.abs(offset) % 60;
          
          const offsetDisplay = `${offset >= 0 ? '+' : '-'}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
          
          // Créer un nom d'affichage convivial
          let displayName = zone.split('/').pop()?.replace(/_/g, ' ') || zone;
          
          // Pour les zones sans slash, essayer de présenter de manière plus conviviale
          if (!zone.includes('/')) {
            displayName = zone;
          }
          
          return {
            id: zone,
            displayName,
            offset,
            offsetDisplay
          };
        } catch (e) {
          // Fallback si la zone n'est pas reconnue par Luxon
          return {
            id: zone,
            displayName: zone,
            offset: 0,
            offsetDisplay: '+00:00'
          };
        }
      });
      
      // Trier par offset puis par nom
      options.sort((a, b) => {
        if (a.offset !== b.offset) {
          return a.offset - b.offset;
        }
        return a.displayName.localeCompare(b.displayName);
      });
      
      setTimezones(options);
    } catch (error) {
      console.error('Erreur lors du chargement des fuseaux horaires:', error);
      setTimezones([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filtrer les fuseaux horaires en fonction de la recherche
  const filteredTimezones = timezones.filter(
    tz => tz.id.toLowerCase().includes(filter.toLowerCase()) || 
          tz.displayName.toLowerCase().includes(filter.toLowerCase()) ||
          tz.offsetDisplay.includes(filter)
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value;
    props.onSelect(value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter(event.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="timezone-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Filtrer les fuseaux horaires
      </label>
      <input
        type="text"
        id="timezone-filter"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Rechercher par ville, région ou offset..."
        className="w-full p-2 mb-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
      
      <label htmlFor="timezone-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Fuseau horaire ({filteredTimezones.length} disponibles)
      </label>
      
      {isLoading ? (
        <div className="text-center py-4">
          <p className="text-gray-500 dark:text-gray-400">Chargement des fuseaux horaires...</p>
        </div>
      ) : (
        <select
          id="timezone-select"
          value={props.selectedTimezone || ''}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          size={10}
        >
          {filteredTimezones.length === 0 ? (
            <option disabled>Aucun fuseau horaire correspondant trouvé</option>
          ) : (
            filteredTimezones.map((tz) => (
              <option key={tz.id} value={tz.id}>
                {tz.displayName} (UTC{tz.offsetDisplay}) - {tz.id}
              </option>
            ))
          )}
        </select>
      )}
    </div>
  );
} 