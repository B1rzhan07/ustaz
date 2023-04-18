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
  async getCommissions(id: number | null): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + `/secretary/commissions?subjectId=${id}`, {
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
    teamId: number | null,
    stageId: number
  ): Promise<AxiosResponse<any>> {
    return axios
      .post(
        API_URL + `/secretary/team/${teamId}/defence/create`,
        {
          commissions: commissions,
          defenceDate: null,
          stageId: stageId,
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

  async getMoreInfoSecretary(
    teamId: number | null
  ): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + `/secretary/team/${teamId}`, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }

  async updateTeamConfirmation(
    teamId: number | null
  ): Promise<AxiosResponse<any>> {
    return axios({
      method: "put",
      url: API_URL + `/secretary/team/${teamId}?confirmed=true`,
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }
  async deleteTeam(teamId: number | null): Promise<AxiosResponse<any>> {
    return axios.delete(API_URL + `/secretary/team/${teamId}`, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }
  async setFinalGrade(
    defenceId: number | null,
    userId: number | null,
    grade: number
  ): Promise<AxiosResponse<any>> {
    return axios.post(
      API_URL + `/secretary/${defenceId}/grades/set-grade/${userId}`,
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
    );
  }
  async getSecrataryGrade(id: number | null): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + `/secretary/${id}/grade`, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }

  async getSecretaryDefence(): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + `/secretary/defence`, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }
}

export default new Defense();
