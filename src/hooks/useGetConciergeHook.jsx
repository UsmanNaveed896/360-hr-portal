import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useGetConciergeHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [getConcierge,setGetConcierge]=useState();
  const [conciergeCount,setConciergeCount]=useState()
  const [loginResponse, setLoginResponse] = useState();
  let token = localStorage.getItem("token");

  const handleGetConcierge = () => {
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .get("https://task-sk2q.onrender.com/concierge/get-concierges", {
        headers,
      })
      .then((res) => {
        console.log(res, "concierge");
        if (res?.status == 200) {
            setGetConcierge(res?.data?.data)
            setConciergeCount(res?.data?.results)
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
  const handleEditConciergeForm = (data) => {
    setLoginResponse(false)
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .put(`https://task-sk2q.onrender.com/concierge/update-concierge`,data,{headers})
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
      .delete(`https://backend-api.my360tribe.org/api/v1/concierge/${id}`,{headers})
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
    handleGetConcierge,
    handleEditConciergeForm,
    conciergeCount,
    getConcierge,
    loading,
    loginResponse,
    handleDelete
  };
};
