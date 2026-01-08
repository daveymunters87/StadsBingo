export interface Exercise {
  id: string;
  title: string;
  description: string;
  location: string;
  order: number;
  exampleImage?: string | null;
  status: "LOCKED" | "AVAILABLE" | "PENDING" | "FEEDBACK" | "APPROVED";
  submission: {
    id: string;
    answerText: string | null;
    answerImage: string | null;
    status: string;
    feedback: string | null;
    createdAt: string;
  } | null;
}

export interface ExerciseDetail extends Exercise {
  // ExerciseDetail is the same as Exercise for now
  // kept separate in case we need different fields later
}

export interface Team {
  id: string;
  name: string;
  code: string;
  captain?: {
    name: string;
  };
  players: Array<{
    id: string;
    name: string;
  }>;
}

export interface Mentor {
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface ExercisesListContentProps {
  exercises: Exercise[];
}

export interface ExerciseDetailContentProps {
  exerciseId: string;
}

export interface DashboardContentProps {
  team: Team;
}

export interface ContactContentProps {
  mentors?: Mentor[];
}