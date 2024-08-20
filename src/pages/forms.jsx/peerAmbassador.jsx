import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { DataGrid } from "@mui/x-data-grid";
import { Puff } from "react-loader-spinner";
import { useGetPeerAmbassadorHook } from "@/hooks/useGetPeerAmbassadorHook";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";

const PeerAmbassador = () => {
  const peersGet = useGetPeerAmbassadorHook();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    peersGet.handleGetPeerAmbassador();
    if (peersGet.loginResponse) {
      handleCloseEditModal();
    }
  }, [peersGet.loginResponse]);

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleOpenViewModal = (user) => {
    setSelectedUser(user);
    setOpenViewModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setOpenEditModal(false);
  };

  const handleCloseViewModal = () => {
    setSelectedUser(null);
    setOpenViewModal(false);
  };

  const handleSaveChanges = () => {
    peersGet.handleEditPeerAmbassadorForm(selectedUser);
    handleCloseEditModal();
  };

  const handleDelete = (id) => {
    peersGet.handleDelete(id);
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "dob",
      headerName: "DOB",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "branchOfService",
      headerName: "Branch of Service",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "contactMethod",
      headerName: "Contact Method",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "howHeardAboutUs",
      headerName: "Source",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "whyPeerAmbassador",
      headerName: "Reason",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "hoursPerMonth",
      headerName: "No of Hr/Operators",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "transitionServices",
      headerName: "Organization",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "recommendedTransitionServices",
      headerName: "Support Areas",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "uncomfortableTopics",
      headerName: "Topics",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "assignTo",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Assign to",
      width: 200,
      renderCell: (params) => (
        <div className="mt-3">
          <FormControl sx={{ width: "150px" }}>
            <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
              Assign To
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="standard"
              label="Age"
              sx={{
                color: "white", // Changes the selected text color
                "& .MuiSvgIcon-root": {
                  color: "white", // Changes the dropdown arrow color
                },
              }}
            >
              <MenuItem value={10}>Concierge</MenuItem>
              <MenuItem value={20}>Operators</MenuItem>
              <MenuItem value={30}>Service Partner</MenuItem>
            </Select>
          </FormControl>
        </div>
      ),
    },
    {
      field: "actions",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "6px" }} className="mt-6">
          <MdVisibility
            className="w-5 h-5 cursor-pointer"
            onClick={() => handleOpenViewModal(params.row)}
          />
          <MdEdit
            className="w-5 h-5 cursor-pointer"
            onClick={() => handleOpenEditModal(params.row)}
          />
          <MdDelete
            className="w-5 h-5 cursor-pointer"
            onClick={() => handleDelete(params.row._id)}
          />
        </div>
      ),
    },
  ];

  const rows =
    peersGet?.getPeerAmbassador?.map((item, index) => ({
      id: index,
      dob: item?.dob?.slice(0, 10),
      ...item,
    })) || [];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="#000032"
          className="mb-8 p-6 bg-[#191a45]"
        >
          <Typography variant="h6" color="white">
            Peer Ambassador
          </Typography>
        </CardHeader>
        {peersGet?.loading ? (
          <div className="flex justify-center">
            <Puff
              visible={true}
              height="80"
              width="80"
              color="#607d8b"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <CardBody className="px-0 pt-0 pb-2">
            <div
              style={{
                height: 500,
                width: "100%",
                backgroundColor: "#191a45",
                color: "white",
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowHeight={80}
                sx={{
                  "& .MuiDataGrid-root": {
                    backgroundColor: "#191a45",
                    color: "white",
                  },
                  "& .MuiDataGrid-cell": {
                    backgroundColor: "#191a45",
                    color: "white",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    color: "#fff", // Change footer background color to white
                  },
                  "& .MuiTablePagination-root": {
                    color: "#fff", // Change text color in footer if needed
                  },

                  "& .MuiDataGrid-columnHeaders": {
                    color: "#000",
                    backgroundColor: "#000032",
                  },
                  "& .MuiDataGrid-columnHeaderRow": {
                    background: "#000032 !important", // Remove any background
                  },
                }}
              />
            </div>
          </CardBody>
        )}
      </Card>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Peer Ambassador</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            value={selectedUser?.fullName || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, fullName: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="DOB"
            value={selectedUser?.dob?.slice(0, 10) || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, dob: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Branch of Service"
            select
            value={selectedUser?.branchOfService || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                branchOfService: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          >
            <MenuItem value="AirForce">Air Force AFSOC</MenuItem>
            <MenuItem value="Army">Army USASOC</MenuItem>
            <MenuItem value="Navy">Navy NSW NSO</MenuItem>
            <MenuItem value="Marines">Marines MARSOC</MenuItem>
          </TextField>
          <TextField
            label="Contact Method"
            value={selectedUser?.contactMethod || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                contactMethod: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Source"
            value={selectedUser?.howHeardAboutUs || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                howHeardAboutUs: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Reason"
            value={selectedUser?.whyPeerAmbassador || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                whyPeerAmbassador: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="No of Hr/Operators"
            value={selectedUser?.hoursPerMonth || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                hoursPerMonth: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Organization"
            value={selectedUser?.transitionServices || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                transitionServices: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Support Areas"
            value={selectedUser?.recommendedTransitionServices || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                recommendedTransitionServices: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Topics"
            value={selectedUser?.uncomfortableTopics || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                uncomfortableTopics: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEditModal}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            {peersGet.loading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Modal */}
      <Dialog open={openViewModal} onClose={handleCloseViewModal}>
        <DialogTitle>View Peer Ambassador</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            value={selectedUser?.fullName || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="DOB"
            value={selectedUser?.dob?.slice(0, 10) || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Branch of Service"
            value={selectedUser?.branchOfService || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Contact Method"
            value={selectedUser?.contactMethod || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Source"
            value={selectedUser?.howHeardAboutUs || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Reason"
            value={selectedUser?.whyPeerAmbassador || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="No of Hr/Operators"
            value={selectedUser?.hoursPerMonth || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Organization"
            value={selectedUser?.transitionServices || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Support Areas"
            value={selectedUser?.recommendedTransitionServices || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Topics"
            value={selectedUser?.uncomfortableTopics || ""}
            fullWidth
            margin="dense"
            readOnly
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseViewModal}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PeerAmbassador;
