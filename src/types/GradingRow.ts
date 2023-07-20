export interface Criteria {
  criteria: {
    id: number;
    description: string;
  };
  setGrades: (grades: any) => void;
  stage: string;
}
