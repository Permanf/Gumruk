import {
  logout,
  userLoading,
  userLoadFailed,
  userLoaded,
  loginSuccess,
  createStaff,
  updateStaff,
  setStaffList,
  updateStaffStatus,
  deleteStaff,
} from "../actions/auth";
import api from "../api";
import toast from "react-hot-toast";
import { GetCookie, SetCookie } from "../../utils/cookie";
import cookie from "js-cookie";

export const Logout = () => async (dispatch) => {
  try {
    await api.getApi({
      url: `auth/logout/${Date.now() + 100}`,
      token: "",
      withCredentials: true,
    });
    dispatch(logout());
  } catch (error) {
    dispatch(logout());
    toast.error("Unknown error");
  }
};

export const LoadUser = () => async (dispatch) => {
  dispatch(userLoading());
  // let token = GetCookie();
  let token = cookie.get("refresh_token");
  // console.log(token,"   send")
  const response = await api.getApi({
    url: "user/load-user",
    token,
    withCredentials: true,
  });
  // dispatch(userLoaded(response.data));
  // console.log(response);
  if (response.status == 200) {
    const payload = { token: response.data.token, data: response.data.data };
    dispatch(loginSuccess(payload));
    // console.log("i have done it")
  }
};

export const AdminRegister =
  ({ data, setError, history }) =>
  async (dispatch) => {
    try {
      const response = await api.postApi({
        url: "auth/staff/login",
        params: data,
        withCredentials: true,
        token: "",
      });
      SetCookie("refresh_token", response.data.refresh_token);
      dispatch(loginSuccess(response.data));
      history.push("/admin/");
    } catch (error) {
      if (error?.response) {
        if (error.response.data?.error?.length) {
          error.response.data.error.forEach(
            ({ name, type, message }, index) => {
              setError(name, { type, message });
              if (index === 0) {
                toast.error(message);
              }
            }
          );
        } else if (error.response.data?.length) {
          error.response.data.forEach(({ name, type, message }, index) => {
            console.log(index, name);

            setError(name, { type, message });
            if (index === 0) {
              toast.error(message);
            }
          });
        } else {
          console.log(error.response);
        }
      }
    }
  };

export const GetStaffList =
  ({ token, setLoading }) =>
  async (dispatch) => {
    try {
      const response = await api.getApi({
        url: "auth/stafflist",
        withCredentials: false,
        token,
      });
      dispatch(setStaffList(response.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Ýalňyşlyk çykdy");
    }
  };

export const CreateStaff =
  ({ token, data, setClose, setLoading, setError }) =>
  async (dispatch) => {
    try {
      const response = await api.postApi({
        url: "auth/staff",
        params: data,
        withCredentials: false,
        token,
      });
      dispatch(createStaff(response.data));
      setLoading(false);
      setClose();
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data) {
          if (error.response.data.error) {
            error.response.data.error.forEach(({ name, type, message }) => {
              toast.error(message);
              setError(name, { type, message });
            });
          } else {
            if (error.response.data.length) {
              error.response.data.forEach(({ name, type, message }) => {
                toast.error(message);
                setError(name, { type, message });
              });
            } else {
              toast.error("Ýalňyşlyk çykdy");
            }
          }
        }
      }
    }
  };

export const UpdateStaff =
  ({ token, data, id, setClose, setLoading, setError }) =>
  async (dispatch) => {
    try {
      const response = await api.updateApi({
        url: `auth/staff/${id}`,
        params: data,
        withCredentials: false,
        token,
      });
      dispatch(updateStaff(response.data));
      setClose();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data) {
          if (error.response.data.error) {
            error.response.data.error.forEach(({ name, type, message }) => {
              toast.error(message);
              setError(name, { type, message });
            });
          } else {
            if (error.response.data.length) {
              error.response.data.forEach(({ name, type, message }) => {
                toast.error(message);
                setError(name, { type, message });
              });
            } else {
              toast.error("Ýalňyşlyk çykdy");
            }
          }
        }
      }
    }
  };

export const UpdateStaffStatus =
  ({ token, status, id, setLoading }) =>
  async (dispatch) => {
    try {
      await api.updateApi({
        url: `auth/staff/${id}/status`,
        params: { staff_status: status },
        withCredentials: false,
        token,
      });
      dispatch(updateStaffStatus({ id, status }));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Ýalňyşlyk çykdy");
    }
  };

export const DeleteStaff =
  ({ token, id, setLoading }) =>
  async (dispatch) => {
    try {
      await api.deleteApi({
        url: `auth/staff/${id}`,
        withCredentials: false,
        token,
      });
      dispatch(deleteStaff({ id }));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Ýalňyşlyk çykdy");
    }
  };
