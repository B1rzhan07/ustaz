import axios, { AxiosResponse } from "axios";
import { API_URL } from "./AuthService";

class Commission {
  async getCriteries(number: number): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + `/commission/criteries/${number}`, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }
  async setGradeCommission(id: number, criteria: []) {
    return axios.post(API_URL + `/commission/${id}/set-grade/`, criteria, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }
}
export default new Commission();
