import axios from "axios";
import { isExpired, decodeToken } from "react-jwt";
import {array} from "yup";

axios.defaults.baseURL = "http://localhost:5000";

type DecodedToken = {
  exp: number;
  iat: number;
  id: string;
};

export const fetchUserData = async () => {
  const token: string | null = window.localStorage.getItem("authToken");
  if (token) {
    const decoded: DecodedToken | null = decodeToken(token);
    if (decoded !== null) {
      try {
        const response: any = await axios.get(`/api/users/${decoded.id}/`);
        return response.data;

      } catch (err) {
        console.log(err);
      }
    }
  }
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
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
