import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const UseAssignedFormHook = () => {
  const [getAssignedForm, setGetAssignedForm] = useState();
  const [loading,setLoading]=useState(false)
  let token = localStorage.getItem("token");


  const handleGetAssignedForms=()=>{
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .get("https://task-sk2q.onrender.com/siged-form/get-all-forms", {
        headers,
      })
      .then((res) => {
        console.log(res, "concierge");
        if (res?.status == 200) {
            setGetAssignedForm(res?.data?.data)
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
  }

  return {
    handleGetAssignedForms,
    getAssignedForm,
    loading,
  }
};
