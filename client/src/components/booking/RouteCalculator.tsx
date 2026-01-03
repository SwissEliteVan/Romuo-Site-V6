import { useState } from 'react';
import { MapPin, Navigation, Clock, DollarSign, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { trackRouteCalculated, trackReservationClick } from '../../utils/analytics';

interface RouteEstimate {
  distance: number; // en km
  duration: number; // en minutes
  price: number; // en CHF
}

export default function RouteCalculator() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [estimate, setEstimate] = useState<RouteEstimate | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const TOMTOM_API_KEY = import.meta.env.VITE_TOMTOM_API_KEY || '';
  const hasApiKey = TOMTOM_API_KEY && TOMTOM_API_KEY !== '' && TOMTOM_API_KEY !== 'YOUR_API_KEY_HERE';

  // Calcul basique de tarif (à ajuster selon vos vrais tarifs)
  const calculatePrice = (distanceKm: number, durationMin: number): number => {
    // Tarification exemple :
    // - Base : 50 CHF
    // - + 2.5 CHF/km
    // - + 1 CHF/min
    const basePrice = 50;
    const pricePerKm = 2.5;
    const pricePerMin = 1;

    return basePrice + (distanceKm * pricePerKm) + (durationMin * pricePerMin);
  };

  // Géocoder une adresse avec TomTom Search API
  const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(address)}.json?key=${TOMTOM_API_KEY}&countrySet=CH&limit=1`
      );

      if (!response.ok) {
        throw new Error('Geocoding failed');
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const position = data.results[0].position;
        return { lat: position.lat, lng: position.lon };
      }

      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  // Calculer l'itinéraire avec TomTom Routing API
  const calculateRouteWithTomTom = async () => {
    setIsCalculating(true);
    setError('');
    setEstimate(null);

    try {
      // Géocoder les deux adresses
      const [depCoords, arrCoords] = await Promise.all([
        geocodeAddress(departure),
        geocodeAddress(arrival),
      ]);

      if (!depCoords || !arrCoords) {
        throw new Error('Impossible de localiser une ou plusieurs adresses');
      }

      // Calculer l'itinéraire
      const routeResponse = await fetch(
        `https://api.tomtom.com/routing/1/calculateRoute/${depCoords.lat},${depCoords.lng}:${arrCoords.lat},${arrCoords.lng}/json?key=${TOMTOM_API_KEY}`
      );

      if (!routeResponse.ok) {
        throw new Error('Routing failed');
      }

      const routeData = await routeResponse.json();

      if (routeData.routes && routeData.routes.length > 0) {
        const route = routeData.routes[0];
        const summary = route.summary;

        const distanceKm = summary.lengthInMeters / 1000;
        const durationMin = Math.round(summary.travelTimeInSeconds / 60);
        const price = Math.round(calculatePrice(distanceKm, durationMin));

        setEstimate({
          distance: Math.round(distanceKm),
          duration: durationMin,
          price,
        });

        trackRouteCalculated(distanceKm);
      } else {
        throw new Error('No route found');
      }
    } catch (err) {
      console.error('Route calculation error:', err);
      setError('Impossible de calculer l\'itinéraire. Veuillez vérifier les adresses ou contactez-nous directement.');
    } finally {
      setIsCalculating(false);
    }
  };

  const calculateRouteSimple = async () => {
    setIsCalculating(true);
    setError('');
    setEstimate(null);

    try {
      // Simulation basique (sans API Google Maps)
      // Distance estimée en fonction de la longueur des noms de villes (approximation très basique!)
      const depLower = departure.toLowerCase();
      const arrLower = arrival.toLowerCase();

      // Détection de quelques villes suisses courantes
      const cities: { [key: string]: { lat: number; lng: number } } = {
        'genève': { lat: 46.2044, lng: 6.1432 },
        'geneva': { lat: 46.2044, lng: 6.1432 },
        'lausanne': { lat: 46.5197, lng: 6.6323 },
        'montreux': { lat: 46.4312, lng: 6.9107 },
        'vevey': { lat: 46.4601, lng: 6.8431 },
        'nyon': { lat: 46.3833, lng: 6.2397 },
        'zurich': { lat: 47.3769, lng: 8.5417 },
        'berne': { lat: 46.9480, lng: 7.4474 },
        'bâle': { lat: 47.5596, lng: 7.5886 },
        'basel': { lat: 47.5596, lng: 7.5886 },
      };

      const depCity = Object.keys(cities).find((city) => depLower.includes(city));
      const arrCity = Object.keys(cities).find((city) => arrLower.includes(city));

      let distance = 0;
      if (depCity && arrCity) {
        // Calcul distance haversine approximatif
        const dep = cities[depCity];
        const arr = cities[arrCity];

        if (dep && arr) {
          const R = 6371; // Rayon de la Terre en km
          const dLat = (arr.lat - dep.lat) * Math.PI / 180;
          const dLon = (arr.lng - dep.lng) * Math.PI / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(dep.lat * Math.PI / 180) * Math.cos(arr.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          distance = R * c;
        } else {
          // Estimation très basique si coordonnées non trouvées
          distance = 30 + Math.random() * 50;
        }
      } else {
        // Estimation très basique si villes non reconnues
        distance = 30 + Math.random() * 50;
      }

      // Durée estimée : ~60 km/h en moyenne
      const duration = Math.round((distance / 60) * 60);
      const price = Math.round(calculatePrice(distance, duration));

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulation délai

      setEstimate({
        distance: Math.round(distance),
        duration,
        price,
      });

      trackRouteCalculated(distance);
    } catch (err) {
      setError('Impossible de calculer l\'itinéraire. Veuillez vérifier les adresses.');
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!departure || !arrival) {
      setError('Veuillez renseigner le départ et l\'arrivée');
      return;
    }

    if (hasApiKey) {
      calculateRouteWithTomTom();
    } else {
      calculateRouteSimple();
    }
  };

  return (
    <Card variant="glass" className="p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Navigation className="h-5 w-5 sm:h-6 sm:w-6 text-[#d4af37]" aria-hidden="true" />
        <h3 className="text-xl sm:text-2xl font-bold">Calculer un devis</h3>
      </div>

      {!hasApiKey && (
        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-yellow-500/10 border-l-4 border-yellow-500 text-yellow-200 text-xs sm:text-sm">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong>Mode démonstration :</strong> La clé API TomTom n'est pas configurée.
              Le calcul utilise une estimation basique. Pour un devis précis, contactez-nous directement.
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Point de départ"
          placeholder="Ex: Genève"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          required
        />

        <Input
          label="Destination"
          placeholder="Ex: Lausanne"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          required
        />

        <Button type="submit" fullWidth disabled={isCalculating} className="group">
          {isCalculating ? 'Calcul en cours...' : 'Calculer le devis'}
          {!isCalculating && <DollarSign className="ml-2 h-5 w-5" aria-hidden="true" />}
        </Button>
      </form>

      {error && (
        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-red-500/10 border-l-4 border-red-500 text-red-200 text-xs sm:text-sm">
          {error}
        </div>
      )}

      {estimate && (
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          <div className="h-px bg-[#2d3748]" />

          <div>
            <h4 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Estimation du trajet</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#1a1a1a] rounded-sm border border-[#2d3748]">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-[#d4af37] flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs sm:text-sm text-[#999999]">Distance</p>
                  <p className="text-lg sm:text-xl font-bold">{estimate.distance} km</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#1a1a1a] rounded-sm border border-[#2d3748]">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-[#d4af37] flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs sm:text-sm text-[#999999]">Durée estimée</p>
                  <p className="text-lg sm:text-xl font-bold">{estimate.duration} min</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-[#d4af37]/10 rounded-sm border border-[#d4af37]">
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-[#d4af37] flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs sm:text-sm text-[#d4af37]">Prix estimé</p>
                  <p className="text-lg sm:text-xl font-bold text-[#d4af37]">{estimate.price} CHF</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-[#1a1a1a] border border-[#2d3748] rounded-sm">
            <p className="text-xs sm:text-sm text-[#cccccc] mb-3">
              <strong className="text-[#ffffff]">Tarif indicatif</strong> calculé sur la base
              de la distance et de la durée estimée. Le tarif final peut varier selon le trafic,
              l'heure de la journée et vos besoins spécifiques.
            </p>
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                trackReservationClick('route_calculator');
                window.location.href = '/contact';
              }}
            >
              Réserver ce trajet
            </Button>
          </div>
        </div>
      )}

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-xs sm:text-sm text-[#666666]">
          Pour un devis personnalisé précis :{' '}
          <a href="tel:+41760842089" className="text-[#d4af37] hover:underline">
            076 084 20 89
          </a>
        </p>
      </div>
    </Card>
  );
}

/**
 * INSTRUCTIONS POUR ACTIVER GOOGLE MAPS :
 *
 * 1. Créer une clé API Google Maps :
 *    - Aller sur https://console.cloud.google.com/
 *    - Créer un projet
 *    - Activer "Maps JavaScript API" et "Distance Matrix API"
 *    - Créer une clé API avec restrictions appropriées
 *
 * 2. Ajouter la clé dans .env :
 *    VITE_MAPS_KEY=VOTRE_CLE_API_GOOGLE
 *
 * 3. Alternative Mapbox (moins cher) :
 *    - Aller sur https://www.mapbox.com/
 *    - Créer un compte gratuit
 *    - Obtenir un access token
 *    - Adapter ce composant pour utiliser Mapbox Directions API
 *
 * 4. La logique de calcul réelle devrait appeler l'API dans calculateRouteSimple()
 */
