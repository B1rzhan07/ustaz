import axios, { AxiosResponse } from "axios";
import { API_URL } from "./AuthService";

class Secretary {
  async updateDefence(
    defenceId: number,
    comission: any,
    stageId: number
  ): Promise<AxiosResponse<any>> {
    return axios({
      method: "put",
      url: API_URL + `/secretary/defence/${defenceId}`,
      data: {
        comissions: comission,
        stageId: stageId,
        defenceDate: null,
      },
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }

  async deleteDefence(defenceId: number): Promise<AxiosResponse<any>> {
    return axios.delete(API_URL + `/secretary/defence/${defenceId}`, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }

  async getDefenceGradeByDefenceId(defenceId: number): Promise<AxiosResponse<any>> {
    return axios.get(API_URL+`/secretary/${defenceId}/grade`, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });

  }
  async getFinalists(): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + `/secretary/getFinalists`, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }
      
  
}

export default new Secretary();
