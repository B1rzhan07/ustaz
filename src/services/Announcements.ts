import axios, { AxiosResponse } from "axios";
import { API_URL } from "./AuthService";

class Announcements {
  async sendAnnouncements(
    title: string,
    text: string
  ): Promise<AxiosResponse<any>> {
    return axios
      .post(
        API_URL + "/secretary/announcement/create",
        {
          title,
          text,
          content: null,
          id: null,
          filename: null,
          creator: 2,
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
  async sendDocuments(): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + "/secretary/documents/create", {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }

  async sendPresentationAnnouncement(
    formdata: FormData,
    announcementId: number
  ): Promise<AxiosResponse<any>> {
    return axios
      .post(
        API_URL +
          `/secretary/announcement/${announcementId}/uploadAnnouncementFile`,
        formdata,
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
  async deleteAnnouncement(
    announcementId: number
  ): Promise<AxiosResponse<any>> {
    return axios.delete(API_URL + `/secretary/announcement/${announcementId}`, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("user") || "{}").authenticationToken,
      },
    });
  }

  async getAnnouncements(): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + "/profile/announcements");
  }
}
export default new Announcements();
