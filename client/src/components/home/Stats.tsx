import { Car, Shield, Clock, Star, TrendingUp, Award } from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  suffix?: string;
}

function Stat({ icon, value, label, suffix }: StatProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-gold-500/50 transition-all duration-300 hover:scale-105">
      <div className="text-gold-500 mb-3">{icon}</div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {value}
        {suffix && <span className="text-2xl text-gold-500">{suffix}</span>}
      </div>
      <div className="text-sm text-gray-400 text-center">{label}</div>
    </div>
  );
}

export default function Stats() {
  const stats = [
    {
      icon: <Car className="w-8 h-8" />,
      value: '500',
      suffix: '+',
      label: 'Courses effectuées',
    },
    {
      icon: <Star className="w-8 h-8" />,
      value: '4.9',
      suffix: '/5',
      label: 'Note moyenne clients',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: '24',
      suffix: '/7',
      label: 'Disponibilité',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      value: '100',
      suffix: '%',
      label: 'Sécurité garantie',
    },
  ];

  const badges = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Chauffeurs certifiés',
      description: 'Formation professionnelle continue',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Leader suisse',
      description: 'Service premium depuis 2020',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Assurance complète',
      description: 'Protection maximale passagers',
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, index) => (
            <Stat key={index} {...stat} />
          ))}
        </div>

        {/* Trust Badges */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
            Pourquoi choisir <span className="text-gold-500">ROMUO VTC</span> ?
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-gold-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-gold-500/10 rounded-full text-gold-500 mb-4">
                  {badge.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{badge.title}</h4>
                <p className="text-sm text-gray-400">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
