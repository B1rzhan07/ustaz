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
}

export default new Defense();
