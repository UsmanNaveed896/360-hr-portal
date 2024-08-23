import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useGetUsersHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users,setUsers]=useState();
  const [usersCount,setUsersCount]=useState()
  const [loginResponse, setLoginResponse] = useState(false);
  let token = localStorage.getItem("token");
  const handleGetUsers = () => {
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .get("https://backend-api.my360tribe.org/api/v1/users",{headers})
      .then((res) => {

        if (res?.status == 200) {
          setUsers(res?.data?.data?.data)
          setUsersCount(res?.data.results)
          setLoading(false);
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        // toast.error(err?.response?.data?.message);
      });
  };

  const handleCreateUsers = (data) => {
    setLoading(true);
    setLoginResponse(false)

    axios
      .post("https://backend-api.my360tribe.org/api/v1/users/signup", data)
      .then((res) => {
        console.log(res, "response");
        if (res?.status == 201) {
          toast.success("User Created Successfully");
          setLoginResponse(true)
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
  const handleEditUsers = (data) => {
    setLoginResponse(false)
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .patch(`https://backend-api.my360tribe.org/api/v1/users/${data.id}`,data,{headers})
      .then((res) => {
  
        if (res?.status == 200) {
        
        toast.success("Users Updated Successfully!")
        setLoginResponse(true)
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

  const handleDelete = (id) => {
    setLoginResponse(false)
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .delete(`https://backend-api.my360tribe.org/api/v1/users/${id}`,{headers})
      .then((res) => {

        if (res?.status == 204) {
        
        toast.success("User Deleted Successfully!")
        setLoginResponse(true)
    
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
    handleGetUsers,
    handleEditUsers,
    handleDelete,
    handleCreateUsers,
    usersCount,
    users,
    loading,
    loginResponse,
  };
};
