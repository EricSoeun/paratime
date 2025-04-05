import React, { useState, useEffect, useRef } from 'react';
import { timezones, TimezoneData } from '../utils/timezones';
import { fromZonedTime } from 'date-fns-tz';
import { TimeZoneMap } from './TimeZoneMap';
import { TimezoneSelector } from './TimezoneSelector';

// Type pour les props du composant au lieu d'interface
type TimeFormProps = {
  onTimeChange: (dateTime: Date, timezone: string) => void;
};

// Composant fonctionnel avec la syntaxe de fonction explicite
export function TimeForm(props: TimeFormProps) {
  // Etat pour le fuseau horaire sélectionné (initialisé avec le premier de la liste)
  const [selectedTimezone, setSelectedTimezone] = useState<string>(timezones[0].timezone);
  // Etat pour la date sélectionnée (initialisé à aujourd'hui)
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  // Etat pour l'heure sélectionnée (initialisé à l'heure actuelle)
  const [selectedTime, setSelectedTime] = useState<string>(
    new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
  );
  // État pour le mode de sélection du fuseau horaire (liste prédéfinie ou tous les fuseaux horaires)
  const [showAllTimezones, setShowAllTimezones] = useState<boolean>(false);

  // Référence pour stocker la dernière valeur notifiée pour éviter les doublons
  const lastNotifiedRef = useRef<{ date: string, time: string, timezone: string }>({
    date: selectedDate,
    time: selectedTime,
    timezone: selectedTimezone
  });

  // Effet pour recalculer et notifier le parent lors d'un changement
  useEffect(() => {
    // Vérifier que date et heure sont valides avant de combiner
    if (selectedDate && selectedTime) {
      // Vérifier si les valeurs ont réellement changé pour éviter les boucles
      const currentValues = { date: selectedDate, time: selectedTime, timezone: selectedTimezone };
      const prevValues = lastNotifiedRef.current;
      
      // Ne déclencher que si au moins une valeur a changé
      if (
        prevValues.date !== currentValues.date ||
        prevValues.time !== currentValues.time ||
        prevValues.timezone !== currentValues.timezone
      ) {
        // Combiner date et heure en une chaîne ISO-like locale (sans Z ou offset)
        const localDateTimeString = `${selectedDate}T${selectedTime}:00`; // Ajouter les secondes pour la robustesse du parsing

        try {
          // Utiliser fromZonedTime pour obtenir l'objet Date UTC équivalent
          const utcDate = fromZonedTime(localDateTimeString, selectedTimezone);
          // Appeler la fonction de rappel du parent
          props.onTimeChange(utcDate, selectedTimezone);
          
          // Mettre à jour la référence
          lastNotifiedRef.current = currentValues;
        } catch (error) {
          console.error("Erreur lors de la conversion de la date/heure:", error);
          // Gérer l'erreur, peut-être afficher un message à l'utilisateur
        }
      }
    }
  }, [selectedTimezone, selectedDate, selectedTime, props.onTimeChange]); // Dépendances de l'effet

  // Gestionnaire de changement pour le fuseau horaire
  const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(event.target.value);
    console.log("Fuseau horaire sélectionné via select:", event.target.value);
    // L'effet s'occupera d'appeler onTimeChange
  };

  // Gestionnaire pour la sélection de timezone avec le nouveau sélecteur
  const handleTimezoneSelect = (timezone: string) => {
    setSelectedTimezone(timezone);
    console.log("Fuseau horaire sélectionné via le sélecteur complet:", timezone);
    // L'effet s'occupera d'appeler onTimeChange
  };

  // Gestionnaire de changement pour la date
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    // L'effet s'occupera d'appeler onTimeChange
  };

  // Gestionnaire de changement pour l'heure
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
    // L'effet s'occupera d'appeler onTimeChange
  };

  // Gestionnaire pour la sélection de fuseau horaire depuis la carte
  const handleMapTimezoneSelect = (timezone: string): void => {
    console.log("Fuseau horaire sélectionné via carte:", timezone);
    setSelectedTimezone(timezone);
    // L'effet s'occupera d'appeler onTimeChange
  };

  // Basculer entre les modes de sélection de fuseau horaire
  const toggleTimezoneSelector = () => {
    setShowAllTimezones(!showAllTimezones);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Heures d'origine</h2>
      <form className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-1 gap-4 items-end">
        {/* Toggle pour choisir le mode de sélection */}
        <div className="flex items-center mb-2">
          <button
            type="button"
            onClick={toggleTimezoneSelector}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
          >
            {showAllTimezones ? "Utiliser la liste simplifiée" : "Voir tous les fuseaux horaires (IANA)"}
          </button>
        </div>
        
        {/* Sélecteur de fuseau horaire */}
        <div className="grid grid-cols-1 gap-4">
          {showAllTimezones ? (
            <TimezoneSelector 
              selectedTimezone={selectedTimezone}
              onSelect={handleTimezoneSelect}
            />
          ) : (
            <div>
              <label htmlFor="timezone-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ville / Fuseau Horaire
              </label>
              <select
                id="timezone-select"
                value={selectedTimezone}
                onChange={handleTimezoneChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {timezones.map((tz: TimezoneData) => (
                  <option key={tz.timezone} value={tz.timezone}>
                    {tz.city} ({tz.timezone.replace(/_/g, ' ')})
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {/* Sélecteur de Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date-input"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            {/* Sélecteur d'Heure */}
            <div>
              <label htmlFor="time-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Heure
              </label>
              <input
                type="time"
                id="time-input"
                value={selectedTime}
                onChange={handleTimeChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
        
        {/* Carte des fuseaux horaires - seulement afficher si on n'est pas en mode "tous les fuseaux horaires" */}
        {!showAllTimezones && (
          <div className="mt-4">
            <TimeZoneMap 
              selectedTimezone={selectedTimezone}
              onTimezoneSelect={handleMapTimezoneSelect}
            />
          </div>
        )}
      </form>
    </div>
  );
}

