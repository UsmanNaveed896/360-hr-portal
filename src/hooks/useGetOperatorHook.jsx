import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useGetOperatorHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [getOperators,setGetOperators]=useState();
  const [operatorCount,setOperatorCount]=useState();
  const [loginResponse, setLoginResponse] = useState();
  let token = localStorage.getItem("token");

  const handleGetOperator = () => {
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .get("https://backend-api.my360tribe.org/api/v1/operator-intake", {
        headers,
      })
      .then((res) => {
        console.log(res, "operator");
        if (res?.status == 200) {
          setGetOperators(res?.data?.data?.operatorIntakes)
          setOperatorCount(res?.data?.results)
          setLoading(false);
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      
      });
  };
  const handleEditOperatorForm = (data) => {
    setLoginResponse(false)
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .patch(`https://backend-api.my360tribe.org/api/v1/operator-intake/${data._id}`,data,{headers})
      .then((res) => {
  
        if (res?.status == 200) {
        
        toast.success("Form Updated Successfully!")
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
      .delete(`https://backend-api.my360tribe.org/api/v1/operator-intake/${id}`,{headers})
      .then((res) => {

        if (res?.status == 204) {
        
        toast.success("Form Deleted Successfully!")
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
    handleGetOperator,
    operatorCount,
    handleEditOperatorForm,
    loading,
    loginResponse,
    getOperators,
    handleDelete
  };
};
