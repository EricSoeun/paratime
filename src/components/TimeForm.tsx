import React, { useState, useEffect } from 'react';
import { timezones, TimezoneData } from '../utils/timezones';
import { fromZonedTime } from 'date-fns-tz';

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

  // Effet pour recalculer et notifier le parent lors d'un changement
  useEffect(() => {
    // Vérifier que date et heure sont valides avant de combiner
    if (selectedDate && selectedTime) {
      // Combiner date et heure en une chaîne ISO-like locale (sans Z ou offset)
      const localDateTimeString = `${selectedDate}T${selectedTime}:00`; // Ajouter les secondes pour la robustesse du parsing

      try {
        // Utiliser fromZonedTime pour obtenir l'objet Date UTC équivalent
        const utcDate = fromZonedTime(localDateTimeString, selectedTimezone);
        // Appeler la fonction de rappel du parent
        props.onTimeChange(utcDate, selectedTimezone);
      } catch (error) {
        console.error("Erreur lors de la conversion de la date/heure:", error);
        // Gérer l'erreur, peut-être afficher un message à l'utilisateur
      }
    }
  }, [selectedTimezone, selectedDate, selectedTime, props.onTimeChange]); // Dépendances de l'effet

  // Gestionnaire de changement pour le fuseau horaire
  const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(event.target.value);
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

  // Le TODO pour l'useEffect est maintenant résolu

  return (
    <div>
		  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Heures d'origine</h2>
		<form className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-1 gap-4 items-end">
		  {/* Sélecteur de fuseau horaire */}
		  <div className="grid grid-cols-1 gap-4">
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
		</form>
	</div>
  );
}

