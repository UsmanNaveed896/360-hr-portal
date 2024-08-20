import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useGetPeerAmbassadorHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [getPeerAmbassador,setGetPeerAmbassador]=useState();
  const [peerCount,setPeerCount]=useState();
  const [loginResponse, setLoginResponse] = useState();
  let token = localStorage.getItem("token");

  const handleGetPeerAmbassador = () => {
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .get("https://backend-api.my360tribe.org/api/v1/peer-ambassador", {
        headers,
      })
      .then((res) => {
        console.log(res, "operator");
        if (res?.status == 200) {
            setGetPeerAmbassador(res?.data?.data?.peerAmbassadors)
            setPeerCount(res?.data?.results)
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
  const handleEditPeerAmbassadorForm = (data) => {
    setLoginResponse(false)
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .patch(`https://backend-api.my360tribe.org/api/v1/peer-ambassador/${data._id}`,data,{headers})
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
      .delete(`https://backend-api.my360tribe.org/api/v1/peer-ambassador/${id}`,{headers})
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
    handleGetPeerAmbassador,
    handleEditPeerAmbassadorForm,
    getPeerAmbassador,
    loading,
    peerCount,
    loginResponse,
    handleDelete
  };
};
