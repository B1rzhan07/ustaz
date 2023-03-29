import { AxiosResponse } from "axios";
import axios from "axios";
import { API_URL } from "./AuthService";

class Defense {
  async getTeams(): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + "/secretary/teams", {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }
  async getCommissions(): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + "/secretary/commissions", {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }
  async createCommission(): Promise<AxiosResponse<any>> {
    return axios
      .post(
        API_URL + "/admin/commission/create",
        {
          firstName: "kabdik",
          lastName: "Chakirofweffdfwfwwefdwefdv",
          middleName: "Amanbfwffwfwefwfkfwefovich",
          email: " olzhffwfweffwffwfek ",
          username: "kabdik",
          password: "123456",
        },
        {
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("user") || "{}")
                .authenticationToken,
          },
        }
      )
      .then((response) => {
        return response;
      });
  }
  async createDefence(
    commissions: any,
    teamId: number
  ): Promise<AxiosResponse<any>> {
    return axios
      .post(
        API_URL + `/admin/team/${teamId}/defence/create`,
        {
          commissions: commissions,
          defenceDate: null,
          stageId: 1,
        },
        {
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("user") || "{}")
                .authenticationToken,
          },
        }
      )
      .then((response) => {
        return response;
      });
  }
  async getDefenceCommission(): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + `/commission`, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }

  async getDefenceCommissionById(id: number): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + `/commission/${id}`, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }
  async setGradeCommission(
    id1: number,
    id2: number,
    grade: number
  ): Promise<AxiosResponse<any>> {
    return axios
      .post(
        API_URL + `/commission/${id1}/set-grade/${id2}`,
        {
          grade: grade,
        },
        {
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("user") || "{}")
                .authenticationToken,
          },
        }
      )
      .then((response) => {
        return response;
      });
  }
}

export default new Defense();
