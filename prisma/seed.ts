import { Prisma, PrismaClient, User } from '@prisma/client';
import {  users } from "./seedData/users";


const prisma = new PrismaClient();

async function clearSeedData() { 
  await prisma.membership.deleteMany({}) 
  await prisma.user.deleteMany({});
}

async function seed() {
  await clearSeedData();
  try {
      // Create users and connect subscriptions
      await Promise.all(users.map(async user => {
          let createdUser = await prisma.user.create({
              data: {
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  role: user.role,
                  bankroll: 1000,
                  unitSize: 100
              }
          });

          await prisma.membership.create({
            data: {
                expiresAt: '9999-12-31T23:59:59Z',
                user: { connect: { id: createdUser.id }}
            }
          })
      }));

  } catch (error) {
      console.error('Error seeding data:', error);
  } finally {
      await prisma.$disconnect();
  }
}
  
  seed()

