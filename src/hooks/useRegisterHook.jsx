import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useRegisterHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginResponse, setLoginResponse] = useState();
  const [userResponse, setUserResponse] = useState();

  const handleLogin = (data) => {
    setLoading(true);
    const payLoad = {
      email: data?.email,
      password: data?.password,
    };

    axios
      .post("https://task-sk2q.onrender.com/registration/login", payLoad)
      .then((res) => {
        console.log(res, "response");
        if (res?.status == 200) {
          if(res?.data?.response?.data?.role !== "OPERATIONS" && res?.data?.response?.data?.role !== "HR"){
            toast.error("You are not authorized !")
            setLoading(false);
          } else {
          const token = res?.data?.response?.data?.token;
          const userid = res?.data?.response?.data?.id;
          const name = res?.data?.response?.data?.name;
          const role = res?.data?.response?.data?.role;
          const email = res?.data?.response?.data?.email;
          localStorage.setItem("role", role);
          localStorage.setItem("name", name);
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", userid);
          localStorage.setItem("email", email);

          const response = res?.data?.data;
          setUserResponse(response);
          setLoading(false);
          toast.success("Logged In Successfully");
          navigate("/dashboard/home");
          }
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.data);
      });
  };

  const handleSignup = (data) => {
    setLoading(true);
    axios
      .post("https://backend-api.my360tribe.org/api/v1/users/signup", data)
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
  // TESTING

  // const handleLogin = (data) => {
  //   setLoading(true);
  //   const payLoad = {
  //     email: data?.email,
  //     password: data?.password,
  //   };

  //   // Hardcoded login check
  //   if (payLoad.email == "superadmin@gmail.com" && payLoad.password == "pass1234") {
  //     toast.success("Logged In Successfully");

  //     // Simulate API response data
  //     const token = "dummyToken123";
  //     const userid = "dummyUserId";
  //     const name = "Super Admin";
  //     const photo = "dummyPhotoUrl";
  //     const role = "Super Admin";
  //     const email = payLoad.email;
  //     const phone = "123-456-7890";
  //     const status = "Active";

  //     localStorage.setItem("role", role);
  //     localStorage.setItem("photo", photo);
  //     localStorage.setItem("name", name);
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("user_id", userid);
  //     localStorage.setItem("email", email);
  //     localStorage.setItem("phone", phone);
  //     localStorage.setItem("status", status);

  //     const response = {
  //       token,
  //       user: { _id: userid, fullName: name, photo, role: { name: role }, email, phone, status },
  //     };
  //     setUserResponse(response);
  //     setLoading(false);
  //     navigate("/dashboard/home");
  //   } else {
  //     toast.error("Invalid email or password");
  //     setLoading(false);
  //   }
  // };

  return {
    handleLogin,
    handleSignup,
    loading,
    loginResponse,
    userResponse,
  };
};
