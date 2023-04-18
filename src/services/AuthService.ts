import axios, { AxiosError } from "axios";
import { AxiosResponse } from "axios";
import { Dayjs } from "dayjs";
import { AuthResponse } from "../models/response/AuthResponse";

export const API_URL = "https://almatyustazy.akylgroup.com.kz";

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
      })
      .catch((error) => {
        console.log("error", error);
        return error;
      });
  }
  async sendPhoto(formData: FormData): Promise<AxiosResponse<any>> {
    return axios.post(API_URL + "/profile/uploadAndSetProfilePhoto", formData, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }
  async getGrade(): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + "/student/teams/getGrades", {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }

  async resetPassword(email: string): Promise<AxiosResponse<any>> {
    return axios.post(API_URL + "/auth/resetPasswordToken/create", {
      email,
    });
  }
  async resetWithToken(
    password: string,
    token: string
  ): Promise<AxiosResponse<any>> {
    return axios({
      method: "put",
      url: API_URL + "/auth/resetPassword",
      data: {
        password,
        token,
      },
    })
      .then((response: any) => {
        return response;
      })
      .catch((error: AxiosError) => {
        return error;
      });
  }

  async logout(): Promise<void> {
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    localStorage.removeItem("userType");
    localStorage.removeItem("userType");
  }

  async getSubjects(): Promise<any> {
    return axios.get(API_URL + "/profile/subjects", {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }
}

export default new AuthService();
