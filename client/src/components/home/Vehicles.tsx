import { Users, Briefcase, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';

interface Vehicle {
  name: string;
  category: string;
  image: string;
  passengers: number;
  luggage: number;
  features: string[];
  description: string;
  gradient: string;
}

export default function Vehicles() {
  const [activeIndex, setActiveIndex] = useState(0);

  const vehicles: Vehicle[] = [
    {
      name: 'Mercedes Classe S',
      category: 'Berline Premium',
      image: '🚗',
      passengers: 3,
      luggage: 2,
      features: ['Sièges cuir', 'Climatisation', 'WiFi', 'Eau minérale'],
      description: 'Élégance et confort pour vos déplacements professionnels',
      gradient: 'from-gold-500/20 to-transparent',
    },
    {
      name: 'Mercedes Classe V',
      category: 'Van Premium',
      image: '🚐',
      passengers: 7,
      luggage: 6,
      features: ['Espace modulable', 'Sièges premium', 'WiFi', 'Rafraîchissements'],
      description: 'Parfait pour les groupes et les familles',
      gradient: 'from-blue-500/20 to-transparent',
    },
    {
      name: 'Tesla Model S',
      category: 'Électrique Premium',
      image: '⚡',
      passengers: 4,
      luggage: 3,
      features: ['100% électrique', 'Autopilot', 'Écran tactile', 'Sonorisation premium'],
      description: 'L\'avenir du transport premium et écologique',
      gradient: 'from-green-500/20 to-transparent',
    },
  ];

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-blue-500/10 animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Notre Flotte <span className="text-gold-500">Premium</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Des véhicules haut de gamme entretenus avec le plus grand soin pour votre confort
          </p>
        </div>

        {/* Vehicle Carousel */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <VehicleCard
                key={index}
                vehicle={vehicle}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            {vehicles[activeIndex] && (
              <VehicleCard
                vehicle={vehicles[activeIndex]}
                isActive={true}
              />
            )}

            {/* Dots */}
            <div className="flex justify-center mt-6 gap-2">
              {vehicles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-gold-500'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Voir véhicule ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/tarifs"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold-500/50"
          >
            <Sparkles className="w-5 h-5" />
            Découvrir nos tarifs
          </a>
        </div>
      </div>
    </section>
  );
}

function VehicleCard({
  vehicle,
  isActive,
  onClick
}: {
  vehicle: Vehicle;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-500 ${
        isActive ? 'scale-105' : 'scale-100 opacity-70 hover:opacity-100'
      }`}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${vehicle.gradient} backdrop-blur-sm border ${
        isActive ? 'border-gold-500' : 'border-white/10'
      } transition-all duration-300`}>
        {/* Vehicle Icon/Image */}
        <div className="relative h-48 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
          <div className="text-8xl filter drop-shadow-2xl">{vehicle.image}</div>
          {isActive && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-gold-500 text-black text-xs font-bold rounded-full">
              POPULAIRE
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <div className="text-sm text-gold-500 font-semibold mb-1">{vehicle.category}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{vehicle.name}</h3>
            <p className="text-sm text-gray-400">{vehicle.description}</p>
          </div>

          {/* Capacity */}
          <div className="flex gap-4 mb-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-gray-300">
              <Users className="w-4 h-4" />
              <span className="text-sm">{vehicle.passengers} passagers</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">{vehicle.luggage} bagages</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            {vehicle.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                <Check className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
