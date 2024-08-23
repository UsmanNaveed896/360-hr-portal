import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useServicePartnerHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [getServicePartner, setServicePartner] = useState();
  const [partnersCount, setPartnersCount] = useState();
  const [loginResponse, setLoginResponse] = useState();
  let token = localStorage.getItem("token");

  const handleGetServicePartner = () => {
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .get("https://task-sk2q.onrender.com/service-partners/get-services", {
        headers,
      })
      .then((res) => {
        console.log(res, "service");
        if (res?.status == 200) {
          setServicePartner(res?.data?.data);
          setPartnersCount(res?.data?.results);
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
  const handleEditServicePartnerForm = (data) => {
    setLoginResponse(false);
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .put(
        `https://task-sk2q.onrender.com/service-partners/update-service`,
        data,
        { headers }
      )
      .then((res) => {
        if (res?.status == 200) {
          toast.success("Form Updated Successfully!");
          setLoginResponse(true);
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
    setLoginResponse(false);
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .delete(
        `https://backend-api.my360tribe.org/api/v1/service-intake/${id}`,
        { headers }
      )
      .then((res) => {
        if (res?.status == 204) {
          toast.success("Form Deleted Successfully!");
          setLoginResponse(true);

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
    handleGetServicePartner,
    handleEditServicePartnerForm,
    getServicePartner,
    partnersCount,
    loading,
    loginResponse,
    handleDelete,
  };
};
