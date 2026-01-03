import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Testimonial {
  name: string;
  role: string;
  company?: string;
  rating: number;
  text: string;
  initials: string;
  color: string;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: 'Sophie Dumont',
      role: 'Directrice Marketing',
      company: 'Nestlé Switzerland',
      rating: 5,
      text: 'Service impeccable ! Le chauffeur était ponctuel, professionnel et la Mercedes était dans un état impeccable. Je recommande vivement pour vos déplacements professionnels.',
      initials: 'SD',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Marc Dubois',
      role: 'Entrepreneur',
      rating: 5,
      text: 'J\'utilise ROMUO VTC depuis 6 mois pour tous mes trajets aéroport. Toujours à l\'heure, véhicules premium et chauffeurs courtois. Un vrai plaisir !',
      initials: 'MD',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Laura Chen',
      role: 'Consultante',
      company: 'McKinsey & Company',
      rating: 5,
      text: 'La meilleure expérience VTC en Suisse. Application facile, tarifs transparents et service 5 étoiles. Je ne peux plus m\'en passer.',
      initials: 'LC',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Pierre Martin',
      role: 'Chef d\'entreprise',
      rating: 5,
      text: 'Pour mes clients internationaux, ROMUO VTC offre l\'image de professionnalisme que je recherche. Discrétion et élégance garanties.',
      initials: 'PM',
      color: 'from-orange-500 to-red-500',
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ils nous font <span className="text-gold-500">confiance</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop: Show all */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                isActive={index === activeIndex}
              />
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden">
            {testimonials[activeIndex] && (
              <TestimonialCard
                testimonial={testimonials[activeIndex]}
                isActive={true}
              />
            )}

            {/* Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-gold-500'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Voir témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Overall Rating */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-gold-500 text-gold-500" />
              ))}
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">4.9/5</div>
              <div className="text-xs text-gray-400">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  isActive
}: {
  testimonial: Testimonial;
  isActive: boolean;
}) {
  return (
    <div
      className={`relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border transition-all duration-500 ${
        isActive
          ? 'border-gold-500 scale-100 shadow-xl shadow-gold-500/20'
          : 'border-white/10 scale-95 opacity-70'
      }`}
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10">
        <Quote className="w-16 h-16 text-gold-500" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-300 text-lg leading-relaxed mb-6 relative z-10">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white font-bold text-lg">{testimonial.initials}</span>
        </div>
        <div>
          <div className="font-bold text-white">{testimonial.name}</div>
          <div className="text-sm text-gray-400">
            {testimonial.role}
            {testimonial.company && (
              <>
                {' '}
                • <span className="text-gold-500">{testimonial.company}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
