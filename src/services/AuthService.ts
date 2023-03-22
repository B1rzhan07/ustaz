import axios from "axios";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export const API_URL = "https://api.almatyustazy-2023.kz";

export type userType = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  profilePhoto: string;
  isKazakhProficient: boolean;
  englishProficiency: boolean;
  pedagogicalExperience: number;
  pedagogicalExperienceCurrent: number;
  group: {
    id: number;
    nameKaz: string;
    nameRus: string;
  };
  subject: {
    id: number;
    nameKaz: string;
    nameRus: string;
  };
  category: {
    id: number;
    nameKaz: string;
    nameRus: string;
  };
};

class AuthService {
  async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return axios
      .post(API_URL + "/auth/login", {
        username,
        password,
        Origin: "http://localhost:3000",
      })
      .then((response) => {
        if (response.data.authenticationToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  async register(
    username: string,
    password: string,
    email: string,
    middleName: string,
    lastName: string,
    firstName: string
  ): Promise<AxiosResponse<any>> {
    return axios.post(API_URL + "/auth/signup", {
      username,
      password,
      email,
      middleName,
      firstName,
      lastName,
    });
  }

  async getCurrentUser(): Promise<AxiosResponse<userType>> {
    return axios
      .get(API_URL + "/profile", {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") || "{}")
              .authenticationToken,
        },
      })
      .then((response) => {
        return response.data;
      });
  }
  async sendPhoto(formData: FormData): Promise<AxiosResponse<any>> {
    return axios.post(
      "https://almatyustazy.akylgroup.com.kz/profile/uploadAndSetProfilePhoto",
      formData,
      {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(localStorage.getItem("user") || "{}")
              .authenticationToken,
        },
      }
    );
  }
}

export default new AuthService();
