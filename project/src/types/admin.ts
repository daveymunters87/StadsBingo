export interface Assignment {
  id: string;
  title: string;
  description: string;
  location: string;
  order: number;
  exampleImage?: string | null;
  createdAt: string;
  _count: {
    submissions: number;
    teams: number;
  };
}

export interface AssignmentFormData {
  title: string;
  description: string;
  location: string;
  order: string;
  exampleImage: string;
  selectedTeams: string[];
}

export interface Team {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  captain?: {
    name: string;
  };
  players: Array<{
    id: string;
    name: string;
  }>;
  createdBy: {
    name: string;
    email: string;
  };
  _count: {
    players: number;
    submissions: number;
  };
}

export interface TeamFormData {
  name: string;
  playerNames: string[];
}

export interface Submission {
  id: string;
  answerImage: string | null;
  status: "PENDING" | "APPROVED" | "FEEDBACK";
  feedback: string | null;
  createdAt: string;
  updatedAt: string;
  team: {
    name: string;
    code: string;
  };
  assignment: {
    title: string;
    order: number;
  };
  player: {
    name: string;
  } | null;
}

// Component Props Interfaces
export interface AssignmentFormModalProps {
  showForm: boolean;
  editingAssignment: Assignment | null;
  formData: AssignmentFormData;
  setFormData: (data: AssignmentFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  teams: Team[];
  onTeamToggle: (teamId: string) => void;
}

export interface AssignmentListColumnProps {
  assignments: Assignment[];
  loading: boolean;
  onEdit: (assignment: Assignment) => void;
  onDelete: (assignmentId: string) => void;
}

export interface AssignmentsFormColumnProps {
  showForm: boolean;
  editingAssignment: Assignment | null;
  formData: {
    title: string;
    description: string;
    location: string;
    order: string;
    selectedTeams: string[];
  };
  setFormData: (data: {
    title: string;
    description: string;
    location: string;
    order: string;
    selectedTeams: string[];
  }) => void;
  onSubmit: (e: React.FormEvent) => void;
  teams: Team[];
  onTeamToggle: (teamId: string) => void;
}

export interface TeamFormModalProps {
  showForm: boolean;
  editingTeam: Team | null;
  formData: TeamFormData;
  setFormData: (data: TeamFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export interface TeamsFormColumnProps {
  showForm: boolean;
  editingTeam: Team | null;
  formData: TeamFormData;
  setFormData: (data: TeamFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface TeamListColumnProps {
  teams: Team[];
  loading: boolean;
  onEdit: (team: Team) => void;
  onDelete: (teamId: string) => void;
}

export interface SubmissionsListProps {
  submissions: Submission[];
  loading: boolean;
  onApprove: (submissionId: string) => void;
  onReject: (submission: Submission) => void;
}

export interface FeedbackModalProps {
  selectedSubmission: Submission | null;
  feedback: string;
  setFeedback: (feedback: string) => void;
  onSubmitFeedback: (submissionId: string, feedback: string) => void;
  onClose: () => void;
}

export interface ReviewSidebarProps {
  teams: Team[];
  loadingTeams: boolean;
  currentTeamId?: string;
}

export interface ReviewContentProps {
  assignment: {
    id: string;
    title: string;
    description: string;
    location: string | null;
    status: string;
  } | null;
  currentTeam: {
    id: string;
    name: string;
  } | undefined;
  loadingAssignment: boolean;
  onApprove: () => void;
  onReject: () => void;
  feedback: string;
  setFeedback: (feedback: string) => void;
}

export interface RecentSubmissionsProps {
  submissions: Array<{
    id: string;
    assignment: { title: string };
    team: { name: string };
    createdAt: string;
  }>;
  loading: boolean;
}