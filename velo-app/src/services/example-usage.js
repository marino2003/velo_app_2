/**
 * Example usage of CityBikes API service
 * This file shows how to use the API functions in your components
 */

import { 
  getAllNetworks,
  getNetworkById,
  getNetworksByCity,
  getNetworksByCountry,
  findNearbyBikes,
  findNearbyDocking,
  getNetworkStats
} from './cityBikesApi.js';

// Example: Get all networks (basic info)
async function exampleGetAllNetworks() {
  try {
    const data = await getAllNetworks(['id', 'name', 'location']);
    console.log('All networks:', data.networks);
    return data.networks;
  } catch (error) {
    console.error('Error fetching networks:', error);
  }
}

// Example: Get networks in the Netherlands
async function exampleGetDutchNetworks() {
  try {
    const networks = await getNetworksByCountry('NL');
    console.log('Dutch bike networks:', networks);
    return networks;
  } catch (error) {
    console.error('Error fetching Dutch networks:', error);
  }
}

// Example: Find networks in Amsterdam
async function exampleGetAmsterdamNetworks() {
  try {
    const networks = await getNetworksByCity('Amsterdam');
    console.log('Amsterdam networks:', networks);
    return networks;
  } catch (error) {
    console.error('Error fetching Amsterdam networks:', error);
  }
}

// Example: Get detailed network info (replace 'velib' with actual network ID)
async function exampleGetNetworkDetails(networkId = 'velib') {
  try {
    const data = await getNetworkById(networkId);
    console.log(`${networkId} network details:`, data.network);
    console.log(`Number of stations: ${data.network.stations?.length || 0}`);
    return data.network;
  } catch (error) {
    console.error(`Error fetching ${networkId} details:`, error);
  }
}

// Example: Find bikes near a location (Paris coordinates as example)
async function exampleFindNearbyBikes(networkId = 'velib') {
  try {
    const latitude = 48.856612;  // Paris latitude
    const longitude = 2.352233;  // Paris longitude
    const radius = 0.5; // 500 meters
    
    const nearbyStations = await findNearbyBikes(networkId, latitude, longitude, radius);
    console.log('Nearby stations with bikes:', nearbyStations);
    return nearbyStations;
  } catch (error) {
    console.error('Error finding nearby bikes:', error);
  }
}

// Example: Find docking stations near a location
async function exampleFindNearbyDocking(networkId = 'velib') {
  try {
    const latitude = 48.856612;  // Paris latitude
    const longitude = 2.352233;  // Paris longitude
    const radius = 0.5; // 500 meters
    
    const nearbyDocking = await findNearbyDocking(networkId, latitude, longitude, radius);
    console.log('Nearby docking stations:', nearbyDocking);
    return nearbyDocking;
  } catch (error) {
    console.error('Error finding nearby docking:', error);
  }
}

// Example: Get network statistics
async function exampleGetNetworkStats(networkId = 'velib') {
  try {
    const stats = await getNetworkStats(networkId);
    console.log(`${networkId} statistics:`, stats);
    return stats;
  } catch (error) {
    console.error('Error getting network stats:', error);
  }
}

// Example: Complete workflow for finding a bike
async function exampleCompleteWorkflow() {
  try {
    console.log('=== Complete Bike Finding Workflow ===');
    
    // 1. Find networks in a city
    console.log('1. Finding networks in Amsterdam...');
    const networks = await getNetworksByCity('Amsterdam');
    
    if (networks.length === 0) {
      console.log('No bike networks found in Amsterdam');
      return;
    }
    
    const networkId = networks[0].id;
    console.log(`Using network: ${networkId}`);
    
    // 2. Get network statistics
    console.log('2. Getting network statistics...');
    const stats = await getNetworkStats(networkId);
    console.log(`Total bikes available: ${stats.totalBikes}`);
    
    // 3. Find bikes near Amsterdam center
    console.log('3. Finding bikes near Amsterdam center...');
    const amsterdamLat = 52.370216;
    const amsterdamLon = 4.895168;
    
    const nearbyBikes = await findNearbyBikes(networkId, amsterdamLat, amsterdamLon, 1);
    console.log(`Found ${nearbyBikes.length} stations with available bikes`);
    
    return {
      network: networks[0],
      stats,
      nearbyBikes
    };
    
  } catch (error) {
    console.error('Error in complete workflow:', error);
  }
}

// Export all example functions
export {
  exampleGetAllNetworks,
  exampleGetDutchNetworks,
  exampleGetAmsterdamNetworks,
  exampleGetNetworkDetails,
  exampleFindNearbyBikes,
  exampleFindNearbyDocking,
  exampleGetNetworkStats,
  exampleCompleteWorkflow
};

/*
HOW TO USE IN YOUR COMPONENTS:

import { getAllNetworks, findNearbyBikes } from '../services/cityBikesApi.js';

// In a React component:
useEffect(() => {
  const loadBikeData = async () => {
    try {
      const networks = await getAllNetworks();
      setNetworks(networks.networks);
      
      const nearbyBikes = await findNearbyBikes('networkId', lat, lng);
      setNearbyBikes(nearbyBikes);
    } catch (error) {
      console.error('Error loading bike data:', error);
    }
  };
  
  loadBikeData();
}, []);

// For Next.js API routes (pages/api/ or app/api/):
export async function GET(request) {
  try {
    const networks = await getAllNetworks();
    return Response.json(networks);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch networks' }, { status: 500 });
  }
}
*/ 