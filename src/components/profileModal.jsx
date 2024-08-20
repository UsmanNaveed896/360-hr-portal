// UserModal.js
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useRegisterHook } from "@/hooks/useRegisterHook";

const UserModal = ({ user, open, handleOpen, setOpen }) => {
  const data = useRegisterHook();

  const profilePic = localStorage.getItem("photo");
  const name = localStorage.getItem("name");
  const firstLetter = name ? name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase() : "";

  const [imageError, setImageError] = useState(false);

  return (
    <>
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>User Information</DialogHeader>
        <DialogBody divider>
          <div className="flex justify-center">
            {!imageError && profilePic ? (
              <img
                src={profilePic}
                alt="User"
                className="rounded-full w-24 h-24 mb-4"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="rounded-full w-24 h-24 mb-4 bg-gray-300 flex items-center justify-center">
                <span className="text-3xl font-bold">{firstLetter}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <div>
              <p className="font-bold">Full Name:</p>
              <p className="font-bold">Email:</p>
              <p className="font-bold">Phone:</p>
              <p className="font-bold">Status:</p>
              <p className="font-bold">Role:</p>
            </div>
            <div>
              <p className="uppercase">{name}</p>
              <p>{localStorage.getItem("email")}</p>
              <p>{localStorage.getItem("phone")}</p>
              <p className="uppercase">{localStorage.getItem("status")}</p>
              <p className="uppercase">{localStorage.getItem("role")}</p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="outlined"
            className="shadow-none"
            onClick={() => setOpen(!open)}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UserModal;
