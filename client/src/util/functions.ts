import axios from "axios";
import { isExpired, decodeToken } from "react-jwt";

axios.defaults.baseURL = "http://localhost:5000";

type DecodedToken = {
  exp: number;
  iat: number;
  id: string;
};

export const uploadImage = async (formData: any) => {
  const token: string | null = window.localStorage.getItem("authToken");

  if (formData.get("file") !== "null" && token) {
    const decoded: DecodedToken | null = decodeToken(token);

    if (decoded !== null) {
      try {
        let response: any = await axios.post(
          `/api/${decoded.id}/images`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data.url;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
