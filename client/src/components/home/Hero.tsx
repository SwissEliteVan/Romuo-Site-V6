import { ArrowRight, Play, Phone, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/95 to-black z-10"></div>

        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 backdrop-blur-sm border border-gold-500/30 rounded-full text-gold-500 text-sm font-semibold mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></span>
            Service de transport premium en Suisse
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Transport VTC
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 animate-shimmer">
              Haut de Gamme
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Voyagez avec élégance et sérénité. Service de chauffeur privé disponible 24/7 pour vos déplacements professionnels et personnels.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-delay-2">
            <a
              href="/contact"
              className="group px-8 py-4 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold-500/50 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Calendar className="w-5 h-5" />
              Réserver maintenant
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="tel:+41760842089"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Phone className="w-5 h-5" />
              076 084 20 89
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-delay-3">
            {[
              {
                icon: '⚡',
                title: 'Réservation instantanée',
                description: 'En ligne ou par téléphone 24/7',
              },
              {
                icon: '🛡️',
                title: 'Sécurité maximale',
                description: 'Chauffeurs certifiés et assurance complète',
              },
              {
                icon: '💎',
                title: 'Véhicules premium',
                description: 'Mercedes, Tesla et véhicules haut de gamme',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-gold-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
          <div className="w-1.5 h-3 bg-gold-500 rounded-full mx-auto animate-scroll"></div>
        </div>
      </div>
    </section>
  );
}
