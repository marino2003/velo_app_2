/**
 * CityBikes API Service
 * Documentation: https://api.citybik.es/v2/
 */

const BASE_URL = 'https://api.citybik.es/v2';

// De stations die we zoeken
const TARGET_STATIONS = [
  'Antwerpen-Centraal',
  'Opera', 
  'Groenplaats'
];

/**
 * Fetch
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('CityBikes API Error:', error);
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Netwerkfout: Kan geen verbinding maken met de API. Controleer je internetverbinding.');
    }
    throw error;
  }
}

/**
 * Get all available bike sharing networks
 * @param {string[]} fields - Optional fields to filter (e.g., ['id', 'name', 'location'])
 * @returns {Promise<Object>} Networks data
 */
export async function getAllNetworks(fields = null) {
  const endpoint = fields ? `/networks?fields=${fields.join(',')}` : '/networks';
  return await apiRequest(endpoint);
}

/**
 * 
 * @param {string} networkId - 
 * @param {string[]} fields - 
 * @returns {Promise<Object>} 
 */
export async function getNetworkById(networkId, fields = null) {
  const endpoint = fields 
    ? `/networks/${networkId}?fields=${fields.join(',')}`
    : `/networks/${networkId}`;
  return await apiRequest(endpoint);
}

/**
 * Get only stations data for a network
 * @param {string} networkId - Network identifier
 * @returns {Promise<Array>} Array of stations
 */
export async function getNetworkStations(networkId) {
  const data = await apiRequest(`/networks/${networkId}?fields=stations`);
  return data.network.stations || [];
}

/**
 * Find networks by city name
 * @param {string} cityName - City to search for
 * @returns {Promise<Array>} Array of matching networks
 */
export async function getNetworksByCity(cityName) {
  const data = await getAllNetworks(['id', 'name', 'location']);
  return data.networks.filter(network => 
    network.location.city.toLowerCase().includes(cityName.toLowerCase())
  );
}

/**
 * Find networks by country code
 * @param {string} countryCode - Country code (e.g., 'BE', 'NL', 'FR')
 * @returns {Promise<Array>} Array of matching networks
 */
export async function getNetworksByCountry(countryCode) {
  const data = await getAllNetworks(['id', 'name', 'location']);
  return data.networks.filter(network => 
    network.location.country === countryCode.toUpperCase()
  );
}

/**
 * Find the specific target stations across all networks
 * @returns {Promise<Array>} Array of found stations with network info
 */
export async function getTargetStations() {
  console.log('Zoeken naar stations:', TARGET_STATIONS);
  
  try {
    // Stap 1: Haal alle netwerken op
    const networksData = await getAllNetworks(['id', 'name', 'location']);
    console.log(`${networksData.networks.length} netwerken gevonden`);
    
    const foundStations = [];
    
    // Stap 2: Doorzoek Belgische netwerken en Antwerpen netwerken
    for (const network of networksData.networks) {
      const networkName = network.name.toLowerCase();
      const cityName = network.location.city.toLowerCase();
      const countryCode = network.location.country;
      
      // Alleen Belgische of Antwerpen-gerelateerde netwerken bekijken
      if (countryCode === 'BE' || 
          cityName.includes('antwerp') || 
          cityName.includes('antwerpen') ||
          networkName.includes('antwerp') ||
          networkName.includes('antwerpen')) {
        
        console.log(`Bekijk netwerk: ${network.name} in ${network.location.city}`);
        
        try {
          const stations = await getNetworkStations(network.id);
          console.log(`${stations.length} stations gevonden in ${network.name}`);
          
          // Stap 3: Check elk station tegen onze lijst
          for (const station of stations) {
            const stationName = station.name;
            
            // Zoek naar matches (gedeeltelijk of volledig)
            const matchedTarget = TARGET_STATIONS.find(target => 
              stationName.toLowerCase().includes(target.toLowerCase()) ||
              target.toLowerCase().includes(stationName.toLowerCase())
            );
            
            if (matchedTarget) {
              console.log(`✓ Station gevonden: ${stationName} (past bij ${matchedTarget})`);
              foundStations.push({
                ...station,
                networkId: network.id,
                networkName: network.name,
                city: network.location.city,
                country: network.location.country,
                targetName: matchedTarget
              });
            }
          }
        } catch (error) {
          console.warn(`Kon stations niet ophalen voor ${network.name}:`, error);
        }
      }
    }
    
    console.log(`Totaal gevonden stations: ${foundStations.length}`);
    
    // Stap 4: Geef maximaal 3 stations terug
    const result = foundStations.slice(0, 3);
    
    if (result.length === 0) {
      console.warn('Geen van de gewenste stations gevonden in de API');
    }
    
    return result;
    
  } catch (error) {
    console.error('Fout bij zoeken naar stations:', error);
    throw new Error('Kon de gewenste stations niet vinden in de CityBikes API');
  }
} 