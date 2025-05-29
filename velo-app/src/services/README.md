# CityBikes API Integration 🚴‍♂️

Deze service laag biedt een complete integratie met de [CityBikes API](http://api.citybik.es/v2/) voor het ophalen van real-time fietsdeeldata wereldwijd.

## 📁 Bestanden

- **`cityBikesApi.js`** - Hoofdservice met alle API functies
- **`example-usage.js`** - Voorbeelden van hoe de API te gebruiken
- **`test-api.js`** - Test script om de API te verifiëren
- **`README.md`** - Deze documentatie

## 🌐 CityBikes API Overzicht

De CityBikes API biedt toegang tot:
- **500+ fietsdeelnetwerken** wereldwijd
- **Real-time data** van stations en fietsen
- **Gratis gebruik** (met bronvermelding)
- **JSON format** data

### API Endpoints
- `GET /v2/networks` - Alle netwerken
- `GET /v2/networks/{id}` - Specifiek netwerk met stations
- Field filtering met `?fields=id,name,location`

## 🔧 Beschikbare Functies

### Basis Functies
```javascript
import { getAllNetworks, getNetworkById } from '../services/cityBikesApi.js';

// Alle netwerken ophalen
const networks = await getAllNetworks(['id', 'name', 'location']);

// Specifiek netwerk met stations
const network = await getNetworkById('velib');
```

### Zoekfuncties
```javascript
import { getNetworksByCity, getNetworksByCountry } from '../services/cityBikesApi.js';

// Netwerken per stad
const amsterdamNetworks = await getNetworksByCity('Amsterdam');

// Netwerken per land
const dutchNetworks = await getNetworksByCountry('NL');
```

### Locatie-gebaseerde Functies
```javascript
import { findNearbyBikes, findNearbyDocking } from '../services/cityBikesApi.js';

// Beschikbare fietsen in de buurt
const nearbyBikes = await findNearbyBikes('networkId', lat, lng, radiusKm);

// Beschikbare docking stations
const nearbyDocking = await findNearbyDocking('networkId', lat, lng, radiusKm);
```

### Statistieken
```javascript
import { getNetworkStats } from '../services/cityBikesApi.js';

const stats = await getNetworkStats('networkId');
// Returns: totalStations, totalBikes, occupancyRate, etc.
```

## 📱 Gebruik in React Componenten

### Basic Example
```javascript
import { useEffect, useState } from 'react';
import { getAllNetworks, findNearbyBikes } from '../services/cityBikesApi.js';

function BikeMap() {
  const [networks, setNetworks] = useState([]);
  const [nearbyStations, setNearbyStations] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Laad alle netwerken
        const data = await getAllNetworks(['id', 'name', 'location']);
        setNetworks(data.networks);
        
        // Zoek fietsen in de buurt (Amsterdam voorbeeld)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const nearby = await findNearbyBikes('networkId', latitude, longitude, 1);
            setNearbyStations(nearby);
          });
        }
      } catch (error) {
        console.error('Error loading bike data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>Bike Networks ({networks.length})</h2>
      <h3>Nearby Stations ({nearbyStations.length})</h3>
      {/* Render your UI */}
    </div>
  );
}
```

### Met Loading States
```javascript
function BikeData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const networks = await getAllNetworks();
        setData(networks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading bike data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return <div>{/* Render data */}</div>;
}
```

## 🛣️ Next.js API Routes

### App Router (app/api/)
```javascript
// app/api/networks/route.js
import { getAllNetworks } from '../../../services/cityBikesApi.js';

export async function GET() {
  try {
    const networks = await getAllNetworks(['id', 'name', 'location']);
    return Response.json(networks);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch networks' }, 
      { status: 500 }
    );
  }
}
```

```javascript
// app/api/networks/[id]/route.js
import { getNetworkById } from '../../../../services/cityBikesApi.js';

export async function GET(request, { params }) {
  try {
    const network = await getNetworkById(params.id);
    return Response.json(network);
  } catch (error) {
    return Response.json(
      { error: 'Network not found' }, 
      { status: 404 }
    );
  }
}
```

## 🧪 Testen

Run de test om te controleren of de API werkt:

```javascript
import { testCityBikesAPI } from '../services/test-api.js';

// In browser console of component
testCityBikesAPI().then(result => {
  console.log('Test result:', result);
});
```

## 🌍 Populaire Netwerken

Enkele bekende network IDs om mee te testen:

| Stad | Network ID | Land |
|------|------------|------|
| Parijs | `velib` | FR |
| Londen | `santander-cycles` | GB |
| New York | `citi-bike-nyc` | US |
| Barcelona | `bicing` | ES |
| Amsterdam | Check via `getNetworksByCity('Amsterdam')` | NL |

## ⚠️ Belangrijk

1. **Rate Limiting**: De API heeft geen officiële rate limits, maar gebruik responsief
2. **CORS**: API ondersteunt CORS voor browser gebruik
3. **Bronvermelding**: Vermeld CityBikes als bron in je app
4. **Caching**: Overweeg caching voor betere performance
5. **Error Handling**: Altijd try/catch gebruiken voor API calls

## 🔄 Real-time Updates

Station data wordt regelmatig bijgewerkt (elke paar minuten). Voor real-time apps:

```javascript
// Periodiek bijwerken
useEffect(() => {
  const interval = setInterval(async () => {
    const updated = await getNetworkStations(networkId);
    setStations(updated);
  }, 60000); // Elke minuut

  return () => clearInterval(interval);
}, [networkId]);
```

## 🚀 Volgende Stappen

Met deze API service kun je:
- 🗺️ Kaarten bouwen met fietsstation locaties
- 📊 Dashboard maken met real-time statistieken  
- 🔍 Zoekfunctionaliteit voor fietsen in de buurt
- 📱 Route planning integreren
- 📈 Trends en analytics tonen

De API is volledig geïntegreerd en klaar voor gebruik in je RideBuddy app! 🎉 