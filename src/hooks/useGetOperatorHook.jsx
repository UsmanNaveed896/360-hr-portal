import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useGetOperatorHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [getOperators, setGetOperators] = useState();
  const [operatorCount, setOperatorCount] = useState();
  const [loginResponse, setLoginResponse] = useState();
  let token = localStorage.getItem("token");

  const handleGetOperator = () => {
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .get("https://task-sk2q.onrender.com/operators/get-operators", {
        headers,
      })
      .then((res) => {
        console.log(res, "operator");
        if (res?.status == 200) {
          setGetOperators(res?.data?.data);
          setOperatorCount(res?.data?.results);
          setLoading(false);
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        toast.error(err.response.data.message);

      });
  };
  const handleEditOperatorForm = (data) => {
    setLoginResponse(false);
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .put(`https://task-sk2q.onrender.com/operators/update-operator`, data, {
        headers,
      })
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
        `https://task-sk2q.onrender.com/operators/delete-operator/${id}`,
        { headers }
      )
      .then((res) => {
        console.log(res, "delete");
        if (res?.status == 200) {
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
        toast.error(err?.response?.data?.error);
      });
  };
  const handleAssignOperatortoConcierge = (data, handleCloseAssignModal) => {
    setLoginResponse(false);
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .post(`https://task-sk2q.onrender.com/sign/form`, data, { headers })
      .then((res) => {
        console.log(res, "res");
        if (res?.status == 201) {
          setLoginResponse(true);
          toast.success(res?.data?.data);
          setLoading(false);
          handleCloseAssignModal();
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        toast.error(err?.response?.data?.error);
      });
  };
  const handleUpdateStatus = (data ,handleCloseEditModal) => {
    setLoginResponse(false);
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .patch(`https://task-sk2q.onrender.com/operators/update-status`, data, {
        headers,
      })
      .then((res) => {
        if (res?.status == 200) {
          toast.success("Operator Updated Successfully!");
          setLoginResponse(true);
          setLoading(false);
          handleCloseEditModal()
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
    handleDelete,
    handleAssignOperatortoConcierge,
    handleUpdateStatus
  };
};
