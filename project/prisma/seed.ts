import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // --- CLEAN DB (optional, for local dev)
  await prisma.submission.deleteMany();
  await prisma.teamAssignment.deleteMany();
  await prisma.teamPlayer.deleteMany();
  await prisma.team.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.user.deleteMany();

  // --- CREATE ADMIN
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      password: "admin123",
      role: "ADMIN",
    },
  });

  // --- CREATE TEACHER
  const teacher = await prisma.user.create({
    data: {
      email: "teacher@example.com",
      name: "Docent Test",
      password: "teacher123",
      role: "TEACHER",
    },
  });

  // --- CREATE TEAM
  const team = await prisma.team.create({
    data: {
      name: "Test Team",
      code: "TEST123", 
      createdById: teacher.id,
    },
  });

  // --- CREATE CAPTAIN
  const captain = await prisma.teamPlayer.create({
    data: {
      name: "Captain One",
      studentNumber: "S001",
      teamId: team.id,
    },
  });

  // Set captainId on team
  await prisma.team.update({
    where: { id: team.id },
    data: { captainId: captain.id },
  });

  // --- CREATE OTHER PLAYERS
  const playersData = [
    { name: "Speler Twee", studentNumber: "S002" },
    { name: "Speler Drie", studentNumber: "S003" },
    { name: "Speler Vier", studentNumber: "S004" },
    { name: "Speler Vijf", studentNumber: "S005" },
  ];

  for (const p of playersData) {
    await prisma.teamPlayer.create({
      data: { ...p, teamId: team.id },
    });
  }

  // --- CREATE ASSIGNMENTS
  const assignments = await prisma.assignment.createMany({
    data: [
      {
        title: "Maak een foto van het standbeeld",
        description: "Maak een foto van het standbeeld op het marktplein",
        location: "Marktplein",
        order: 1,
      },
      {
        title: "Interview een docent",
        description: "Vraag een docent naar hun favoriete vak",
        location: "School",
        order: 2,
      },
      {
        title: "Vind de stadsbibliotheek",
        description: "Ga naar de stadsbibliotheek en maak een foto van de ingang",
        location: "Bibliotheek",
        order: 3,
      },
    ],
  });

  // --- LINK ASSIGNMENTS TO TEAM
  const allAssignments = await prisma.assignment.findMany();
  for (const a of allAssignments) {
    await prisma.teamAssignment.create({
      data: {
        teamId: team.id,
        assignmentId: a.id,
      },
    });
  }

  console.log("✅ Seed complete: Admin, Teacher, Team, Players, Assignments & TeamAssignments created");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
