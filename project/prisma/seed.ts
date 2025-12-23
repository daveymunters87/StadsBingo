import { PrismaClient, Role } from "@prisma/client";
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
      role: "ADMIN" as Role,
    },
  });

  // --- CREATE USER (for team management)
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "Regular User",
      password: "user123",
      role: "USER" as Role,
    },
  });

  // --- CREATE TEAM
  const team = await prisma.team.create({
    data: {
      name: "Test Team",
      code: "TEST123",
      createdById: user.id,
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
        description:
          "Voor jullie eerste opdracht verzamelen jullie op de Grote Markt. Maak een foto van minstens drie teamleden die voor het stadhuis poseren als levende standbeelden.",
        location: " Grote markt, Stadshuis",
        exampleImage: "/example-image/image1.png",
        order: 1,
      },
      {
        title: "Lekker vissie?",
        description:
          "Zoek een mooie plek op de Vismarkt en beeld met je team een ‘bevroren moment’ uit van iets dat met vissen of de markt te maken heeft. Maak een foto van jullie scene alsof het eens schilderij is",
        location: "Vismarkt",
        exampleImage: "/example-image/image2.png",
        order: 2,
      },
      {
        title: "Rondje Akerk",
        description:
          "Loop een rondje om de Akerk en zoek: Een leuk of grappig detail Een symbool of leuke patronen in de stenen Iets moderns aan de kerk",
        location: "Akerk",
        exampleImage: "/example-image/image3.png",
        order: 3,
      },
      {
        title: "Poseren voor de uni",
        description:
          "Maak een foto van minstens drie teamleden die op het Broerplein poseren als studenten uit verschillende tijden (bijvoorbeeld: een student uit 1614, een uit de jaren ’70 en een van nu).",
        location: "Rijksuniversiteit Groningen",
        exampleImage: "/example-image/image4.png",
        order: 4,
      },
      {
        title: "The big finish",
        description:
          "Voor jullie laatste opdracht, maak een leuke groepsfoto op het dakterras van het Forum en meld je af bij een docent.",
        location: "Forum",
        exampleImage: "/example-image/image5.png",
        order: 5,
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

  console.log(
    "✅ Seed complete: Admin, User, Team, Players, Assignments & TeamAssignments created",
  );
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
