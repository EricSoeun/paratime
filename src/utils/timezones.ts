import { DateTime } from 'luxon';

export type TimezoneData = {
  city: string;
  timezone: string;
  countryCode: string; // Optionnel, pour afficher un drapeau par exemple
  coordinates?: {
    latitude: number;
    longitude: number;
  };
};

// Fonction pour obtenir tous les fuseaux horaires supportés par le navigateur
export const getAllTimezones = (): string[] => {
  try {
    // Méthode moderne pour obtenir tous les fuseaux horaires
    if (typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl && typeof (Intl as any).supportedValuesOf === 'function') {
      return (Intl as any).supportedValuesOf('timeZone');
    }
    
    // Fallback: liste complète des fuseaux horaires IANA courants
    return [
      'Africa/Abidjan', 'Africa/Accra', 'Africa/Addis_Ababa', 'Africa/Algiers', 'Africa/Asmara',
      'Africa/Asmera', 'Africa/Bamako', 'Africa/Bangui', 'Africa/Banjul', 'Africa/Bissau',
      'Africa/Blantyre', 'Africa/Brazzaville', 'Africa/Bujumbura', 'Africa/Cairo', 'Africa/Casablanca',
      'Africa/Ceuta', 'Africa/Conakry', 'Africa/Dakar', 'Africa/Dar_es_Salaam', 'Africa/Djibouti',
      'Africa/Douala', 'Africa/El_Aaiun', 'Africa/Freetown', 'Africa/Gaborone', 'Africa/Harare',
      'Africa/Johannesburg', 'Africa/Juba', 'Africa/Kampala', 'Africa/Khartoum', 'Africa/Kigali',
      'Africa/Kinshasa', 'Africa/Lagos', 'Africa/Libreville', 'Africa/Lome', 'Africa/Luanda',
      'Africa/Lubumbashi', 'Africa/Lusaka', 'Africa/Malabo', 'Africa/Maputo', 'Africa/Maseru',
      'Africa/Mbabane', 'Africa/Mogadishu', 'Africa/Monrovia', 'Africa/Nairobi', 'Africa/Ndjamena',
      'Africa/Niamey', 'Africa/Nouakchott', 'Africa/Ouagadougou', 'Africa/Porto-Novo', 'Africa/Sao_Tome',
      'Africa/Timbuktu', 'Africa/Tripoli', 'Africa/Tunis', 'Africa/Windhoek',
      'America/Adak', 'America/Anchorage', 'America/Anguilla', 'America/Antigua', 'America/Araguaina',
      'America/Argentina/Buenos_Aires', 'America/Argentina/Catamarca', 'America/Argentina/ComodRivadavia',
      'America/Argentina/Cordoba', 'America/Argentina/Jujuy', 'America/Argentina/La_Rioja',
      'America/Argentina/Mendoza', 'America/Argentina/Rio_Gallegos', 'America/Argentina/Salta',
      'America/Argentina/San_Juan', 'America/Argentina/San_Luis', 'America/Argentina/Tucuman',
      'America/Argentina/Ushuaia', 'America/Aruba', 'America/Asuncion', 'America/Atikokan',
      'America/Atka', 'America/Bahia', 'America/Bahia_Banderas', 'America/Barbados', 'America/Belem',
      'America/Belize', 'America/Blanc-Sablon', 'America/Boa_Vista', 'America/Bogota', 'America/Boise',
      'America/Cambridge_Bay', 'America/Campo_Grande', 'America/Cancun', 'America/Caracas', 'America/Cayenne',
      'America/Cayman', 'America/Chicago', 'America/Chihuahua', 'America/Ciudad_Juarez', 'America/Coral_Harbour',
      'America/Costa_Rica', 'America/Creston', 'America/Cuiaba', 'America/Curacao', 'America/Danmarkshavn',
      'America/Dawson', 'America/Dawson_Creek', 'America/Denver', 'America/Detroit', 'America/Dominica',
      'America/Edmonton', 'America/Eirunepe', 'America/El_Salvador', 'America/Ensenada', 'America/Fort_Nelson',
      'America/Fort_Wayne', 'America/Fortaleza', 'America/Glace_Bay', 'America/Godthab', 'America/Goose_Bay',
      'America/Grand_Turk', 'America/Grenada', 'America/Guadeloupe', 'America/Guatemala', 'America/Guayaquil',
      'America/Guyana', 'America/Halifax', 'America/Havana', 'America/Hermosillo', 'America/Indiana/Indianapolis',
      'America/Indiana/Knox', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Tell_City',
      'America/Indiana/Vevay', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Indianapolis',
      'America/Inuvik', 'America/Iqaluit', 'America/Jamaica', 'America/Juneau', 'America/Kentucky/Louisville',
      'America/Kentucky/Monticello', 'America/Knox_IN', 'America/Kralendijk', 'America/La_Paz', 'America/Lima',
      'America/Los_Angeles', 'America/Louisville', 'America/Lower_Princes', 'America/Maceio', 'America/Managua',
      'America/Manaus', 'America/Marigot', 'America/Martinique', 'America/Matamoros', 'America/Mazatlan',
      'America/Menominee', 'America/Merida', 'America/Metlakatla', 'America/Mexico_City', 'America/Miquelon',
      'America/Moncton', 'America/Monterrey', 'America/Montevideo', 'America/Montreal', 'America/Montserrat',
      'America/Nassau', 'America/New_York', 'America/Nipigon', 'America/Nome', 'America/Noronha',
      'America/North_Dakota/Beulah', 'America/North_Dakota/Center', 'America/North_Dakota/New_Salem',
      'America/Nuuk', 'America/Ojinaga', 'America/Panama', 'America/Pangnirtung', 'America/Paramaribo',
      'America/Phoenix', 'America/Port-au-Prince', 'America/Port_of_Spain', 'America/Porto_Acre',
      'America/Porto_Velho', 'America/Puerto_Rico', 'America/Punta_Arenas', 'America/Rainy_River',
      'America/Rankin_Inlet', 'America/Recife', 'America/Regina', 'America/Resolute', 'America/Rio_Branco',
      'America/Rosario', 'America/Santa_Isabel', 'America/Santarem', 'America/Santiago', 'America/Santo_Domingo',
      'America/Sao_Paulo', 'America/Scoresbysund', 'America/Shiprock', 'America/Sitka', 'America/St_Barthelemy',
      'America/St_Johns', 'America/St_Kitts', 'America/St_Lucia', 'America/St_Thomas', 'America/St_Vincent',
      'America/Swift_Current', 'America/Tegucigalpa', 'America/Thule', 'America/Thunder_Bay', 'America/Tijuana',
      'America/Toronto', 'America/Tortola', 'America/Vancouver', 'America/Virgin', 'America/Whitehorse',
      'America/Winnipeg', 'America/Yakutat', 'America/Yellowknife',
      'Antarctica/Casey', 'Antarctica/Davis', 'Antarctica/DumontDUrville', 'Antarctica/Macquarie',
      'Antarctica/Mawson', 'Antarctica/McMurdo', 'Antarctica/Palmer', 'Antarctica/Rothera',
      'Antarctica/South_Pole', 'Antarctica/Syowa', 'Antarctica/Troll', 'Antarctica/Vostok',
      'Arctic/Longyearbyen',
      'Asia/Aden', 'Asia/Almaty', 'Asia/Amman', 'Asia/Anadyr', 'Asia/Aqtau', 'Asia/Aqtobe',
      'Asia/Ashgabat', 'Asia/Ashkhabad', 'Asia/Atyrau', 'Asia/Baghdad', 'Asia/Bahrain',
      'Asia/Baku', 'Asia/Bangkok', 'Asia/Barnaul', 'Asia/Beirut', 'Asia/Bishkek', 'Asia/Brunei',
      'Asia/Calcutta', 'Asia/Chita', 'Asia/Choibalsan', 'Asia/Chongqing', 'Asia/Chungking',
      'Asia/Colombo', 'Asia/Dacca', 'Asia/Damascus', 'Asia/Dhaka', 'Asia/Dili', 'Asia/Dubai',
      'Asia/Dushanbe', 'Asia/Famagusta', 'Asia/Gaza', 'Asia/Harbin', 'Asia/Hebron', 'Asia/Ho_Chi_Minh',
      'Asia/Hong_Kong', 'Asia/Hovd', 'Asia/Irkutsk', 'Asia/Istanbul', 'Asia/Jakarta', 'Asia/Jayapura',
      'Asia/Jerusalem', 'Asia/Kabul', 'Asia/Kamchatka', 'Asia/Karachi', 'Asia/Kashgar', 'Asia/Kathmandu',
      'Asia/Katmandu', 'Asia/Khandyga', 'Asia/Kolkata', 'Asia/Krasnoyarsk', 'Asia/Kuala_Lumpur',
      'Asia/Kuching', 'Asia/Kuwait', 'Asia/Macao', 'Asia/Macau', 'Asia/Magadan', 'Asia/Makassar',
      'Asia/Manila', 'Asia/Muscat', 'Asia/Nicosia', 'Asia/Novokuznetsk', 'Asia/Novosibirsk',
      'Asia/Omsk', 'Asia/Oral', 'Asia/Phnom_Penh', 'Asia/Pontianak', 'Asia/Pyongyang', 'Asia/Qatar',
      'Asia/Qostanay', 'Asia/Qyzylorda', 'Asia/Rangoon', 'Asia/Riyadh', 'Asia/Saigon', 'Asia/Sakhalin',
      'Asia/Samarkand', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Srednekolymsk',
      'Asia/Taipei', 'Asia/Tashkent', 'Asia/Tbilisi', 'Asia/Tehran', 'Asia/Tel_Aviv', 'Asia/Thimbu',
      'Asia/Thimphu', 'Asia/Tokyo', 'Asia/Tomsk', 'Asia/Ujung_Pandang', 'Asia/Ulaanbaatar',
      'Asia/Ulan_Bator', 'Asia/Urumqi', 'Asia/Ust-Nera', 'Asia/Vientiane', 'Asia/Vladivostok',
      'Asia/Yakutsk', 'Asia/Yangon', 'Asia/Yekaterinburg', 'Asia/Yerevan',
      'Atlantic/Azores', 'Atlantic/Bermuda', 'Atlantic/Canary', 'Atlantic/Cape_Verde',
      'Atlantic/Faeroe', 'Atlantic/Faroe', 'Atlantic/Jan_Mayen', 'Atlantic/Madeira',
      'Atlantic/Reykjavik', 'Atlantic/South_Georgia', 'Atlantic/St_Helena', 'Atlantic/Stanley',
      'Australia/ACT', 'Australia/Adelaide', 'Australia/Brisbane', 'Australia/Broken_Hill',
      'Australia/Canberra', 'Australia/Currie', 'Australia/Darwin', 'Australia/Eucla',
      'Australia/Hobart', 'Australia/LHI', 'Australia/Lindeman', 'Australia/Lord_Howe',
      'Australia/Melbourne', 'Australia/North', 'Australia/NSW', 'Australia/Perth',
      'Australia/Queensland', 'Australia/South', 'Australia/Sydney', 'Australia/Tasmania',
      'Australia/Victoria', 'Australia/West', 'Australia/Yancowinna',
      'Brazil/Acre', 'Brazil/DeNoronha', 'Brazil/East', 'Brazil/West',
      'Canada/Atlantic', 'Canada/Central', 'Canada/Eastern', 'Canada/Mountain',
      'Canada/Newfoundland', 'Canada/Pacific', 'Canada/Saskatchewan', 'Canada/Yukon',
      'CET', 'Chile/Continental', 'Chile/EasterIsland', 'CST6CDT',
      'Cuba', 'EET', 'Egypt', 'Eire', 'EST', 'EST5EDT', 'Etc/GMT', 'Etc/GMT+0',
      'Etc/GMT+1', 'Etc/GMT+10', 'Etc/GMT+11', 'Etc/GMT+12', 'Etc/GMT+2', 'Etc/GMT+3',
      'Etc/GMT+4', 'Etc/GMT+5', 'Etc/GMT+6', 'Etc/GMT+7', 'Etc/GMT+8', 'Etc/GMT+9',
      'Etc/GMT-0', 'Etc/GMT-1', 'Etc/GMT-10', 'Etc/GMT-11', 'Etc/GMT-12', 'Etc/GMT-13',
      'Etc/GMT-14', 'Etc/GMT-2', 'Etc/GMT-3', 'Etc/GMT-4', 'Etc/GMT-5', 'Etc/GMT-6',
      'Etc/GMT-7', 'Etc/GMT-8', 'Etc/GMT-9', 'Etc/GMT0', 'Etc/Greenwich', 'Etc/UCT',
      'Etc/Universal', 'Etc/UTC', 'Etc/Zulu', 'Europe/Amsterdam', 'Europe/Andorra',
      'Europe/Astrakhan', 'Europe/Athens', 'Europe/Belfast', 'Europe/Belgrade', 'Europe/Berlin',
      'Europe/Bratislava', 'Europe/Brussels', 'Europe/Bucharest', 'Europe/Budapest',
      'Europe/Busingen', 'Europe/Chisinau', 'Europe/Copenhagen', 'Europe/Dublin',
      'Europe/Gibraltar', 'Europe/Guernsey', 'Europe/Helsinki', 'Europe/Isle_of_Man',
      'Europe/Istanbul', 'Europe/Jersey', 'Europe/Kaliningrad', 'Europe/Kiev', 'Europe/Kirov',
      'Europe/Kyiv', 'Europe/Lisbon', 'Europe/Ljubljana', 'Europe/London', 'Europe/Luxembourg',
      'Europe/Madrid', 'Europe/Malta', 'Europe/Mariehamn', 'Europe/Minsk', 'Europe/Monaco',
      'Europe/Moscow', 'Europe/Nicosia', 'Europe/Oslo', 'Europe/Paris', 'Europe/Podgorica',
      'Europe/Prague', 'Europe/Riga', 'Europe/Rome', 'Europe/Samara', 'Europe/San_Marino',
      'Europe/Sarajevo', 'Europe/Saratov', 'Europe/Simferopol', 'Europe/Skopje', 'Europe/Sofia',
      'Europe/Stockholm', 'Europe/Tallinn', 'Europe/Tirane', 'Europe/Tiraspol', 'Europe/Ulyanovsk',
      'Europe/Uzhgorod', 'Europe/Vaduz', 'Europe/Vatican', 'Europe/Vienna', 'Europe/Vilnius',
      'Europe/Volgograd', 'Europe/Warsaw', 'Europe/Zagreb', 'Europe/Zaporozhye', 'Europe/Zurich',
      'Factory', 'GB', 'GB-Eire', 'GMT', 'GMT+0', 'GMT-0', 'GMT0', 'Greenwich', 'Hongkong', 'HST',
      'Iceland', 'Indian/Antananarivo', 'Indian/Chagos', 'Indian/Christmas', 'Indian/Cocos',
      'Indian/Comoro', 'Indian/Kerguelen', 'Indian/Mahe', 'Indian/Maldives', 'Indian/Mauritius',
      'Indian/Mayotte', 'Indian/Reunion', 'Iran', 'Israel', 'Jamaica', 'Japan', 'Kwajalein',
      'Libya', 'MET', 'Mexico/BajaNorte', 'Mexico/BajaSur', 'Mexico/General', 'MST',
      'MST7MDT', 'Navajo', 'NZ', 'NZ-CHAT', 'Pacific/Apia', 'Pacific/Auckland', 'Pacific/Bougainville',
      'Pacific/Chatham', 'Pacific/Chuuk', 'Pacific/Easter', 'Pacific/Efate', 'Pacific/Enderbury',
      'Pacific/Fakaofo', 'Pacific/Fiji', 'Pacific/Funafuti', 'Pacific/Galapagos', 'Pacific/Gambier',
      'Pacific/Guadalcanal', 'Pacific/Guam', 'Pacific/Honolulu', 'Pacific/Johnston', 'Pacific/Kanton',
      'Pacific/Kiritimati', 'Pacific/Kosrae', 'Pacific/Kwajalein', 'Pacific/Majuro', 'Pacific/Marquesas',
      'Pacific/Midway', 'Pacific/Nauru', 'Pacific/Niue', 'Pacific/Norfolk', 'Pacific/Noumea',
      'Pacific/Pago_Pago', 'Pacific/Palau', 'Pacific/Pitcairn', 'Pacific/Pohnpei', 'Pacific/Ponape',
      'Pacific/Port_Moresby', 'Pacific/Rarotonga', 'Pacific/Saipan', 'Pacific/Samoa', 'Pacific/Tahiti',
      'Pacific/Tarawa', 'Pacific/Tongatapu', 'Pacific/Truk', 'Pacific/Wake', 'Pacific/Wallis',
      'Pacific/Yap', 'Poland', 'Portugal', 'PRC', 'PST8PDT', 'ROC', 'ROK', 'Singapore',
      'Turkey', 'UCT', 'Universal', 'US/Alaska', 'US/Aleutian', 'US/Arizona', 'US/Central',
      'US/East-Indiana', 'US/Eastern', 'US/Hawaii', 'US/Indiana-Starke', 'US/Michigan',
      'US/Mountain', 'US/Pacific', 'US/Samoa', 'UTC', 'W-SU', 'WET', 'Zulu'
    ];
  } catch (error) {
    console.error('Erreur lors de la récupération des fuseaux horaires:', error);
    return [];
  }
};

// Fonction pour obtenir les informations de fuseau horaire
export const getTimezoneInfo = (timezone: string): { name: string, offsetMinutes: number } => {
  try {
    const now = DateTime.now().setZone(timezone);
    const offsetMinutes = now.offset;
    const name = now.offsetNameLong || timezone;
    return { name, offsetMinutes };
  } catch (error) {
    console.error(`Erreur lors de la récupération des informations pour ${timezone}:`, error);
    return { name: timezone, offsetMinutes: 0 };
  }
};

// Liste des fuseaux horaires avec données supplémentaires
export const timezones: TimezoneData[] = [
  { city: 'Londres', timezone: 'Europe/London', countryCode: 'GB', coordinates: { latitude: 51.5074, longitude: -0.1278 } },
  { city: 'Paris', timezone: 'Europe/Paris', countryCode: 'FR', coordinates: { latitude: 48.8566, longitude: 2.3522 } },
  { city: 'Berlin', timezone: 'Europe/Berlin', countryCode: 'DE', coordinates: { latitude: 52.5200, longitude: 13.4050 } },
  { city: 'New York', timezone: 'America/New_York', countryCode: 'US', coordinates: { latitude: 40.7128, longitude: -74.0060 } },
  { city: 'Los Angeles', timezone: 'America/Los_Angeles', countryCode: 'US', coordinates: { latitude: 34.0522, longitude: -118.2437 } },
  { city: 'Tokyo', timezone: 'Asia/Tokyo', countryCode: 'JP', coordinates: { latitude: 35.6762, longitude: 139.6503 } },
  { city: 'Sydney', timezone: 'Australia/Sydney', countryCode: 'AU', coordinates: { latitude: -33.8688, longitude: 151.2093 } },
  { city: 'Moscou', timezone: 'Europe/Moscow', countryCode: 'RU', coordinates: { latitude: 55.7558, longitude: 37.6173 } },
  { city: 'Dubai', timezone: 'Asia/Dubai', countryCode: 'AE', coordinates: { latitude: 25.2048, longitude: 55.2708 } },
  { city: 'Singapour', timezone: 'Asia/Singapore', countryCode: 'SG', coordinates: { latitude: 1.3521, longitude: 103.8198 } },
  { city: 'São Paulo', timezone: 'America/Sao_Paulo', countryCode: 'BR', coordinates: { latitude: -23.5505, longitude: -46.6333 } },
  // Vous pouvez continuer à ajouter d'autres villes importantes ici
];

// Fonction utilitaire pour obtenir le nom d'affichage
export const getDisplayTimezone = (tz: string): string => {
  return tz.replace(/_/g, ' ');
};

// Fonction pour créer un objet TimezoneData à partir d'un identifiant de fuseau horaire
export const createTimezoneData = (timezone: string): TimezoneData => {
  // Extraire le nom de la ville à partir de l'identifiant du fuseau horaire
  const parts = timezone.split('/');
  const city = parts.length > 1 ? parts[parts.length - 1].replace(/_/g, ' ') : timezone;
  
  return {
    city,
    timezone,
    countryCode: '',  // Nécessiterait une base de données pour associer automatiquement
    // coordinates nécessiterait également une base de données de coordonnées
  };
};

// Fonction pour obtenir tous les fuseaux horaires avec des données enrichies
export const getAllTimezonesData = (): TimezoneData[] => {
  return getAllTimezones().map(createTimezoneData);
};
