/**
 * Simple test to verify CityBikes API is working
 * Run this with: node src/services/test-api.js (if using Node.js)
 * Or import and call in browser console
 */

import { getAllNetworks, getNetworksByCountry } from './cityBikesApi.js';

async function testCityBikesAPI() {
  console.log('🚴‍♂️ Testing CityBikes API...\n');

  try {
    // Test 1: Get basic network info
    console.log('📡 Test 1: Fetching all networks (limited fields)...');
    const networksData = await getAllNetworks(['id', 'name', 'location']);
    const networks = networksData.networks;
    
    console.log(`✅ Success! Found ${networks.length} bike sharing networks worldwide`);
    console.log('First 3 networks:');
    networks.slice(0, 3).forEach((network, index) => {
      console.log(`  ${index + 1}. ${network.name} in ${network.location.city}, ${network.location.country}`);
    });
    console.log('');

    // Test 2: Get networks in Netherlands
    console.log('🇳🇱 Test 2: Finding networks in Netherlands...');
    const dutchNetworks = await getNetworksByCountry('NL');
    
    if (dutchNetworks.length > 0) {
      console.log(`✅ Found ${dutchNetworks.length} Dutch bike networks:`);
      dutchNetworks.forEach((network, index) => {
        console.log(`  ${index + 1}. ${network.name} in ${network.location.city}`);
      });
    } else {
      console.log('⚠️  No bike networks found in Netherlands');
    }
    console.log('');

    // Test 3: Show some interesting stats
    console.log('📊 Quick Stats:');
    const countries = [...new Set(networks.map(n => n.location.country))];
    const cities = [...new Set(networks.map(n => n.location.city))];
    console.log(`  • Countries with bike sharing: ${countries.length}`);
    console.log(`  • Cities with bike sharing: ${cities.length}`);
    console.log(`  • Total networks: ${networks.length}`);
    console.log('');

    console.log('🎉 All tests passed! CityBikes API is working correctly.');
    
    return {
      success: true,
      totalNetworks: networks.length,
      dutchNetworks: dutchNetworks.length,
      countries: countries.length,
      cities: cities.length
    };

  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Export for use in other files
export { testCityBikesAPI };

// If running directly in Node.js environment
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  testCityBikesAPI();
} 