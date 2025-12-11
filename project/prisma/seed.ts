import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Verwijder eerst alles (optioneel, alleen lokaal)
  await prisma.submission.deleteMany();
  await prisma.teamPlayer.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();

  // Maak een docent/admin aan
  const teacher = await prisma.user.create({
    data: {
      email: "teacher@example.com",
      name: "Docent Test",
      role: "TEACHER",
    },
  });

  // Maak een testteam aan
  const team = await prisma.team.create({
    data: {
      name: "Test Team",
      code: "TEST123", // dit wordt de login code
      createdById: teacher.id,
    },
  });

  // Maak 1 captain + max 4 spelers
  const captain = await prisma.teamPlayer.create({
    data: {
      name: "Captain One",
      studentNumber: "S001",
      teamId: team.id,
    },
  });

  // Stel captain in op het team
  await prisma.team.update({
    where: { id: team.id },
    data: { captainId: captain.id },
  });

  // Voeg nog 4 spelers toe
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

  console.log("✅ Seed complete: Test team and players created");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
