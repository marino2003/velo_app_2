/**
 * CityBikes API Service
 * Documentation: http://api.citybik.es/v2/
 */

const BASE_URL = 'http://api.citybik.es/v2';

/**
 * Generic API fetch function with error handling
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
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
 * Get specific network details including stations and vehicles
 * @param {string} networkId - Network identifier (e.g., 'velib', 'divvy')
 * @param {string[]} fields - Optional fields to filter
 * @returns {Promise<Object>} Network details with stations
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
 * Get only vehicles data for a network (if available)
 * @param {string} networkId - Network identifier
 * @returns {Promise<Array>} Array of vehicles
 */
export async function getNetworkVehicles(networkId) {
  const data = await apiRequest(`/networks/${networkId}?fields=vehicles`);
  return data.network.vehicles || [];
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
 * @param {string} countryCode - Country code (e.g., 'US', 'FR', 'NL')
 * @returns {Promise<Array>} Array of matching networks
 */
export async function getNetworksByCountry(countryCode) {
  const data = await getAllNetworks(['id', 'name', 'location']);
  return data.networks.filter(network => 
    network.location.country === countryCode.toUpperCase()
  );
}

/**
 * Find available bikes near a location
 * @param {string} networkId - Network identifier
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @param {number} radiusKm - Search radius in kilometers (default: 1)
 * @returns {Promise<Array>} Array of nearby stations with available bikes
 */
export async function findNearbyBikes(networkId, latitude, longitude, radiusKm = 1) {
  const stations = await getNetworkStations(networkId);
  
  return stations.filter(station => {
    if (station.free_bikes <= 0) return false;
    
    const distance = calculateDistance(
      latitude, longitude,
      station.latitude, station.longitude
    );
    
    return distance <= radiusKm;
  }).sort((a, b) => {
    // Sort by distance (closest first)
    const distA = calculateDistance(latitude, longitude, a.latitude, a.longitude);
    const distB = calculateDistance(latitude, longitude, b.latitude, b.longitude);
    return distA - distB;
  });
}

/**
 * Find empty docking stations near a location
 * @param {string} networkId - Network identifier
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @param {number} radiusKm - Search radius in kilometers (default: 1)
 * @returns {Promise<Array>} Array of nearby stations with empty slots
 */
export async function findNearbyDocking(networkId, latitude, longitude, radiusKm = 1) {
  const stations = await getNetworkStations(networkId);
  
  return stations.filter(station => {
    if (station.empty_slots <= 0) return false;
    
    const distance = calculateDistance(
      latitude, longitude,
      station.latitude, station.longitude
    );
    
    return distance <= radiusKm;
  }).sort((a, b) => {
    // Sort by distance (closest first)
    const distA = calculateDistance(latitude, longitude, a.latitude, a.longitude);
    const distB = calculateDistance(latitude, longitude, b.latitude, b.longitude);
    return distA - distB;
  });
}

/**
 * Get network statistics
 * @param {string} networkId - Network identifier
 * @returns {Promise<Object>} Network statistics
 */
export async function getNetworkStats(networkId) {
  const data = await getNetworkById(networkId, ['stations', 'vehicles']);
  const stations = data.network.stations || [];
  const vehicles = data.network.vehicles || [];
  
  const totalStations = stations.length;
  const totalBikes = stations.reduce((sum, station) => sum + (station.free_bikes || 0), 0);
  const totalSlots = stations.reduce((sum, station) => sum + (station.empty_slots || 0), 0);
  const activeStations = stations.filter(station => station.free_bikes > 0 || station.empty_slots > 0).length;
  
  return {
    networkId,
    totalStations,
    activeStations,
    totalBikes,
    totalSlots,
    totalVehicles: vehicles.length,
    occupancyRate: totalSlots > 0 ? ((totalBikes / (totalBikes + totalSlots)) * 100).toFixed(2) : 0,
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude 1
 * @param {number} lon1 - Longitude 1
 * @param {number} lat2 - Latitude 2
 * @param {number} lon2 - Longitude 2
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convert degrees to radians
 * @param {number} degrees - Degrees to convert
 * @returns {number} Radians
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Export utility functions as well
export { calculateDistance, toRadians }; 