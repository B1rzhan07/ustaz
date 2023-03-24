import axios, { AxiosResponse } from "axios";
import { API_URL } from "./AuthService";

class Announcements {
  async sendAnnouncements(
    title: string,
    content: string,
    text: string
  ): Promise<AxiosResponse<any>> {
    return axios.post(
      API_URL + "/secretary/announcements/create",
      {
        title,
        content,
        text,
        id: null,
        filename: null,
        creator: null,
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
  async sendDocuments(): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + "/secretary/documents/create", {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }
}
export default new Announcements();
