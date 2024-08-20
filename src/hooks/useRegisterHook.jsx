import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useRegisterHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginResponse, setLoginResponse] = useState();
  const [userResponse,setUserResponse]=useState()

  const handleLogin = (data) => {
    setLoading(true);
    const payLoad = {
      email: data?.email,
      password: data?.password,
    };

    axios
      .post("https://backend.my360tribe.org/api/v1/users/login", payLoad)
      .then((res) => {
        if (res?.status == 200) {
          console.log(res, "response");

          toast.success("Logged In Successfully");
          const token = res?.data?.token;
          const userid = res?.data?.data?.user?._id;
          const name = res?.data?.data?.user?.fullName;
          const photo = res?.data?.data?.user?.photo;
          const role = res?.data?.data?.user?.role?.name;
          const email = res?.data?.data?.user?.email;
          const phone = res?.data?.data?.user?.phone;
          const status = res?.data?.data?.user?.status;

          localStorage.setItem("role", role);
          localStorage.setItem("photo", photo);
          localStorage.setItem("name", name);
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", userid);
          localStorage.setItem("email", email);
          localStorage.setItem("phone", phone);
          localStorage.setItem("status", status);


          const response=res?.data?.data
          setUserResponse(response)
          setLoading(false);
          navigate("/dashboard/home");
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err?.response?.data?.message);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleSignup = (data) => {
    setLoading(true);
    axios
      .post("https://backend.my360tribe.org/api/v1/users/signup", data)
      .then((res) => {
        console.log(res, "response");
        if (res?.status == 201) {
          toast.success("SignedUp Successfully");

          setLoading(false);
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        toast.error(err?.response?.data?.message);
      });
  };
  return {
    handleLogin,
    handleSignup,
    loading,
    loginResponse,
    userResponse
  };
};
