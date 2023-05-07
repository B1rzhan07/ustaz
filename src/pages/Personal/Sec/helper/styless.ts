import styled from "styled-components";
export const Container = styled.div`
  margin-top: 50px;
`;

export const Label = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid #ccc;
  appearance: none;
  outline: none;
  margin-bottom: 20px;
  width: 300px;

  &:focus {
    border: 2px solid #5c6ac4;
  }
`;

export const SelectedCommission = styled.div`
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #ccc;
  width: 300px;
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #ccc;
  width: 300px;
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  background-color: #5c6ac4;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #3f4e86;
  }
`;

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  subject: string | null;
}

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 900,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  backgroundColor: "white",
  borderRadius: 10,
  p: 4,
};
export type Props = {
  open: boolean;
  handleClose: () => void;
  id: number | null;
  formState: string;
  moreInfo: any;
  setTeams: any;
};
export const stages = [
  {
    id: 1,
    name: "stage-1",
  },
  {
    id: 2,
    name: "stage-2",
  },
  {
    id: 3,
    name: "stage-3",
  },
];
