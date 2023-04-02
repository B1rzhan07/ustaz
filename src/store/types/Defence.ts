interface Commission {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  subject: {
    id: number;
    nameKaz: string;
    nameRus: string;
  };
}

interface Grade {
  commission: Commission;
  grade: number;
}

interface Stage {
  id: number;
  name: string;
}

interface Defence {
  id: number;
  defenceDate: string;
  stage: Stage;
  grades: Grade[];
}

interface TeamCreator {
  first_name: string;
  last_name: string;
  middle_name: string;
  subject: {
    id: number;
    nameKaz: string;
    nameRus: string;
  };
}

interface Team {
  id: number;
  name: string;
  creator: TeamCreator;
  confirmed: boolean;
  presentationURL: string;
  lessonRecordingURL: string;
  applicationFormURL: string;
}

interface TeamMember {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  birthDate: string;
  profilePhoto: string;
}

interface TeamResponse {
  team: Team;
  member: TeamMember;
}

export interface DefenceResponse {
  defence: Defence;
  team: TeamResponse;
}
