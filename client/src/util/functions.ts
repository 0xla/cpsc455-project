import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const uploadImage = async (formData: any) => {
  if (formData.get("file") !== "null") {
    let response: any = await axios
      .post("/api/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => console.log(err));

    return response.data.url;
  } else {
    console.log("please select an image to upload");
  }
};
