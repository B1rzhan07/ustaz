import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export const useGrade = (
  initialGrade: string,
  criteriaId: number,
  setGrades: (grades: any) => void
) => {
  const [grade, setGrade] = useState(initialGrade);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedGrade = event.target.value as string;
    setGrade(selectedGrade);

    setGrades((grades: any) => {
      const newGrades = grades.filter(
        (item: any) => item.criteria !== criteriaId
      );
      newGrades.push({
        criteria: criteriaId,
        grade: Number(selectedGrade),
      });
      return newGrades;
    });
  };

  return { grade, handleChange };
};
