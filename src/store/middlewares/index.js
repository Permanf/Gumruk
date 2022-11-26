import api from "../api";
import toast from "react-hot-toast";
export const fetchData =
  ({ url, token, action, lang }) =>
  async (dispatch) => {
    try {
      const response = await api.getApi({
        url,
        token,
        withCredentials: false,
        lang,
      });
      return action({ success: true, data: response.data });
    } catch (error) {
      console.log(error);
      toast.error("Üstinlikli Bolmady");
      return action({ success: false, message: error?.response?.data });
    }
  };

export const post =
  ({ url, token, action, data }) =>
  async (dispatch) => {
    // console.log(data, "--postpayload");
    try {
      const response = await api.postApi({
        url,
        params: data,
        withCredentials: false,
        token,
      });
      return action({ success: true, data: response.data });
    } catch (error) {
      return action({ success: false, message: error?.response });
    }
  };

export const put =
  ({ url, token, action, data }) =>
  async (dispatch) => {
    try {
      const response = await api.updateApi({
        url,
        params: data,
        withCredentials: false,
        token,
      });
      return action({ success: true, data: response.data });
    } catch (error) {
      return action({ success: false, message: error?.response?.data });
    }
  };

export const deleteData =
  ({ url, token, action }) =>
  async (dispatch) => {
    try {
      const response = await api.deleteApi({
        url,
        token,
        withCredentials: false,
      });
      dispatch(action(response.data));
    } catch (error) {
      console.log(error);
      toast.error("Üstinlikli Bolmady");
    }
  };

export const upload =
  ({ url, token, action, formData }) =>
  async (dispatch) => {
    try {
      const response = await api.uploadPhoto({
        url,
        formData,
        withCredentials: false,
        token,
      });
      return action({ success: true, data: response.data });
    } catch (error) {
      return action({ success: false, message: error?.response });
    }
  };
