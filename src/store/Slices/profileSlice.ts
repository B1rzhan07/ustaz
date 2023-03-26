// export interface Profile {
//   firstName: string;
//   lastName: string;
//   middleName: string;
//   birthDate: [number, number, number];
//   category: {
//     id: number;
//     nameKaz: string;
//     nameRus: string;
//   };
//   group: {
//     id: number;
//     nameKaz: string;
//     nameRus: string;
//   };
//   subject: {
//     id: number;
//     nameKaz: string;
//     nameRus: string;
//   };
//   pedagogicalExperience: number;
//   pedagogicalExperienceCurrent: number;
//   isKazakhProficient: boolean;
//   englishProficiency: boolean;
//   profilePhoto: string | null;
//   email: string | null;
//   username: string;
// }

// export interface ProfileState {
//   person: Profile[] | null;
// }

// export const ProfileSlice = createSlice({
//   name: "profile",
//   initialState: {
//     person: null,
//   } as ProfileState,
//   reducers: {
//     setProfile: (state: any, action: PayloadAction<Profile[]>) => {
//       state.person = action.payload;
//     },
//   },
// });
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
