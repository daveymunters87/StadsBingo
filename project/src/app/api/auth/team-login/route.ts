import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// const activeTeam = new Set<string>();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { code } = body;

        if (!code || code.trim() === "") {
            return new Response(JSON.stringify({ error: "Team code is required" }), { status: 400 });
        }

        const team = await prisma.team.findUnique({
            where: { code },
            include: { captain: true, players: true },
        });

        if (!team) {
            return new Response(JSON.stringify({ error: "Invalid team code" }), { status: 401 });
        }

        // COMMENTED OUT FOR NOW FOR TESTING PURPOSsssES
        // if (activeTeam.has(team.id)) {
        //     return new Response(JSON.stringify({ error: "This team is already logged in"}), { status: 403 });
        // }

        // activeTeam.add(team.id);

        return new Response(
            JSON.stringify({
                teamId: team.id,
                captainId: team.captain?.id || null,
                players: team.players.map(p => ({ id: p.id, name: p.name})),
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Server error"}), { status: 500 })
    }
}