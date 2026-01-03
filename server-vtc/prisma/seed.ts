import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash du mot de passe par défaut : "password123"
  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Créer un admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@romuo-vtc.ch' },
    update: {},
    create: {
      email: 'admin@romuo-vtc.ch',
      passwordHash,
      role: 'admin',
      firstName: 'Admin',
      lastName: 'ROMUO',
      phone: '+41761234567',
      locale: 'fr',
    },
  });
  console.log('✅ Admin créé:', admin.email);

  // 2. Créer 2 chauffeurs
  const driver1 = await prisma.user.upsert({
    where: { email: 'driver1@romuo-vtc.ch' },
    update: {},
    create: {
      email: 'driver1@romuo-vtc.ch',
      passwordHash,
      role: 'driver',
      firstName: 'Jean',
      lastName: 'Dupont',
      phone: '+41761234568',
      locale: 'fr',
    },
  });

  await prisma.driverProfile.upsert({
    where: { userId: driver1.id },
    update: {},
    create: {
      userId: driver1.id,
      licenseNumber: 'CH123456',
      isOnline: false,
      isApproved: true,
      lastLocationLat: 46.2044, // Genève
      lastLocationLng: 6.1432,
      rating: 4.8,
      totalTrips: 125,
    },
  });

  const vehicle1 = await prisma.vehicle.upsert({
    where: { driverId: driver1.id },
    update: {},
    create: {
      driverId: driver1.id,
      make: 'Mercedes',
      model: 'E-Class',
      year: 2022,
      color: 'Noir',
      licensePlate: 'GE-123456',
      capacity: 4,
      vehicleType: 'premium',
    },
  });

  console.log('✅ Chauffeur 1 créé:', driver1.email, '- Véhicule:', vehicle1.licensePlate);

  const driver2 = await prisma.user.upsert({
    where: { email: 'driver2@romuo-vtc.ch' },
    update: {},
    create: {
      email: 'driver2@romuo-vtc.ch',
      passwordHash,
      role: 'driver',
      firstName: 'Marie',
      lastName: 'Martin',
      phone: '+41761234569',
      locale: 'en',
    },
  });

  await prisma.driverProfile.upsert({
    where: { userId: driver2.id },
    update: {},
    create: {
      userId: driver2.id,
      licenseNumber: 'CH654321',
      isOnline: false,
      isApproved: true,
      lastLocationLat: 46.5197, // Lausanne
      lastLocationLng: 6.6323,
      rating: 4.9,
      totalTrips: 89,
    },
  });

  const vehicle2 = await prisma.vehicle.upsert({
    where: { driverId: driver2.id },
    update: {},
    create: {
      driverId: driver2.id,
      make: 'BMW',
      model: 'Série 5',
      year: 2023,
      color: 'Gris',
      licensePlate: 'VD-654321',
      capacity: 4,
      vehicleType: 'premium',
    },
  });

  console.log('✅ Chauffeur 2 créé:', driver2.email, '- Véhicule:', vehicle2.licensePlate);

  // 3. Créer 2 passagers
  const rider1 = await prisma.user.upsert({
    where: { email: 'rider1@example.com' },
    update: {},
    create: {
      email: 'rider1@example.com',
      passwordHash,
      role: 'rider',
      firstName: 'Pierre',
      lastName: 'Dubois',
      phone: '+41761234570',
      locale: 'fr',
    },
  });
  console.log('✅ Passager 1 créé:', rider1.email);

  const rider2 = await prisma.user.upsert({
    where: { email: 'rider2@example.com' },
    update: {},
    create: {
      email: 'rider2@example.com',
      passwordHash,
      role: 'rider',
      firstName: 'Sophie',
      lastName: 'Leroy',
      phone: '+41761234571',
      locale: 'en',
    },
  });
  console.log('✅ Passager 2 créé:', rider2.email);

  // 4. Créer une course complétée (historique)
  const completedRide = await prisma.ride.create({
    data: {
      riderId: rider1.id,
      driverId: driver1.id,
      status: 'completed',
      pickupAddress: 'Genève Aéroport, Route de l\'Aéroport, Genève',
      pickupLat: 46.2389,
      pickupLng: 6.1089,
      dropoffAddress: 'Rue du Rhône 100, Genève',
      dropoffLat: 46.2044,
      dropoffLng: 6.1432,
      estimatedDistanceKm: 5.2,
      estimatedDurationMin: 12,
      estimatedPrice: 22.50,
      finalPrice: 22.50,
      requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2h
      acceptedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000),
      startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 10 * 60 * 1000),
      completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 25 * 60 * 1000),
    },
  });

  await prisma.payment.create({
    data: {
      rideId: completedRide.id,
      amount: 22.50,
      currency: 'CHF',
      status: 'completed',
      paymentMethod: 'simulated',
      transactionId: 'sim_' + Date.now(),
    },
  });

  console.log('✅ Course complétée créée (historique)');

  console.log('\n🎉 Seeding terminé !');
  console.log('\n📝 Comptes de test :');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Admin:      admin@romuo-vtc.ch / password123');
  console.log('Chauffeur 1: driver1@romuo-vtc.ch / password123');
  console.log('Chauffeur 2: driver2@romuo-vtc.ch / password123');
  console.log('Passager 1:  rider1@example.com / password123');
  console.log('Passager 2:  rider2@example.com / password123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
