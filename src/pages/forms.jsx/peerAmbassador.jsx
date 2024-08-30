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
  Chip,
} from "@mui/material";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { peerAmbassador } from "@/data/dummyData";
import { FaRegSave } from "react-icons/fa";
import { useGetOperatorHook } from "@/hooks/useGetOperatorHook";
import { CiEdit } from "react-icons/ci";
const PeerAmbassador = () => {
  const getOperatorksHook = useGetOperatorHook();
  const peersGet = useGetPeerAmbassadorHook();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rowData, setRowData] = useState();
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleOpenStatusModal = (row) => {
    setOpenStatusModal(true);
    setSelectedRow(row);
  };
  const handleCloseStatusModal = () => {
    setOpenStatusModal(false);
  };
  const handleUpdateStatus = () => {
    let payLoad = {
      id: selectedRow.id,
      status: "approved",
    };
    peersGet.handleUpdateStatus(payLoad, handleCloseStatusModal);
  };
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
  const handleAssigntoConcierge = (value, row) => {
    if (row == "operator") {
      let payLoad = {
        ...value,
        signed_from: "peer_ambassador",
        signed_to: "operator",
        form_id: value.id,
        user_id: value.id,
      };
      setRowData(payLoad);
    } else if (row == "concierge") {
      let payLoad = {
        ...value,
        signed_from: "peer_ambassador",
        signed_to: "concierge",
        form_id: value.id,
        user_id: value.id,
      };
      setRowData(payLoad);
    } else {
      let payLoad = {
        ...value,
        signed_from: "peer_ambassador",
        signed_to: "service_partners",
        form_id: value.id,
        user_id: value.id,
      };
      setRowData(payLoad);
    }
  };
  const handleSave = () => {
    getOperatorksHook.handleAssignOperatortoConcierge(rowData);
  };

  useEffect(() => {
    peersGet.handleGetPeerAmbassador();
  }, [getOperatorksHook.loginResponse]);
  const columns = [
    {
      field: "full_name",
      headerName: "Full Name",
      width: 200,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "birth_date",
      headerName: "DOB",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "service_branch",
      headerName: "Branch of Service",
      width: 200,

      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "contact_number",
      headerName: "Contact Method",
      width: 150,

      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "how_heard_about_us",
      headerName: "Source",
      width: 200,

      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "why_peer_ambassador",
      headerName: "Reason",
      width: 200,

      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "hours_per_month",
      headerName: "No of Hr/Operators",
      width: 150,

      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "transition_services",
      headerName: "Organization",
      width: 200,

      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "areas_of_support",
      headerName: "Support Areas",
      width: 200,

      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "uncomfortable_topics",
      headerName: "Topics",
      width: 200,

      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
      renderCell: (params) => (
        <div>
          <div className="flex gap-2 items-center mt-5">
            <Chip
              color={params?.value == "pending" ? "error" : "success"}
              className="text-white"
              label={params.value}
            />
            {params.value == "pending" ? (
              <CiEdit
                className="cursor-pointer"
                onClick={() => handleOpenStatusModal(params.row)}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ),
    },
    {
      field: "assignTo",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Assign to",
      width: 200,
      renderCell: (params) => (
        <div className="mt-3 text-white flex gap-3 items-center">
          <FormControl sx={{ width: "150px" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: params.row.status == "pending" ? "gray" : "white" }}
            >
              {params.row.status == "pending" ? "Pending" : "Assign To"}
            </InputLabel>
            <Select
              disabled={params.row.status == "pending"}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="standard"
              label="Age"
              onChange={(event) =>
                handleAssigntoConcierge(params.row, event.target.value)
              }
              sx={{
                color: "white", // Changes the selected text color
                "& .MuiSvgIcon-root": {
                  color: "white", // Changes the dropdown arrow color
                },
              }}
            >
              <MenuItem value={"operator"}>Operator</MenuItem>
              <MenuItem value={"concierge"}>Concierge</MenuItem>
              <MenuItem value={"servicePartner"}>Service Partner</MenuItem>
            </Select>
          </FormControl>
          {rowData ? (
            <FaRegSave
              className="w-4 h-4 mt-4 cursor-pointer"
              onClick={handleSave}
            />
          ) : (
            ""
          )}
        </div>
      ),
    },
    // {
    //   field: "actions",
    //   headerClassName: "bg-[#000032] text-white",
    //   headerName: "Actions",
    //   width: 200,

    //   renderCell: (params) => (
    //     <div style={{ display: "flex", gap: "6px" }} className="mt-6">
    //       <MdVisibility
    //         className="w-5 h-5 cursor-pointer"
    //         onClick={() => handleOpenViewModal(params.row)}
    //       />
    //       <MdEdit
    //         className="w-5 h-5 cursor-pointer"
    //         onClick={() => handleOpenEditModal(params.row)}
    //       />
    //       <MdDelete
    //         className="w-5 h-5 cursor-pointer"
    //         onClick={() => handleDelete(params.row._id)}
    //       />
    //     </div>
    //   ),
    // },
  ];

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
                // rows={rows}
                rows={peersGet?.getPeerAmbassador || []}
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
            value={selectedUser?.full_name || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, full_name: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="DOB"
            value={selectedUser?.birth_date || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, birth_date: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Branch of Service"
            select
            value={selectedUser?.service_branch || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                service_branch: e.target.value,
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
            value={selectedUser?.contact_number || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                contact_number: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Source"
            value={selectedUser?.how_heard_about_us || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                how_heard_about_us: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Reason"
            value={selectedUser?.why_peer_ambassador || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                why_peer_ambassador: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="No of Hr/Operators"
            value={selectedUser?.hours_per_month || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                hours_per_month: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Organization"
            value={selectedUser?.transition_services || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                transition_services: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Support Areas"
            value={selectedUser?.areas_of_support || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                areas_of_support: e.target.value,
              })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Topics"
            value={selectedUser?.uncomfortable_topics || ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                uncomfortable_topics: e.target.value,
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
            value={selectedUser?.full_name || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="DOB"
            value={selectedUser?.birth_date || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Branch of Service"
            value={selectedUser?.service_branch || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Contact Method"
            value={selectedUser?.contact_number || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Source"
            value={selectedUser?.how_heard_about_us || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Reason"
            value={selectedUser?.why_peer_ambassador || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="No of Hr/Operators"
            value={selectedUser?.hours_per_month || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Organization"
            value={selectedUser?.transition_services || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Support Areas"
            value={selectedUser?.areas_of_support || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Topics"
            value={selectedUser?.uncomfortable_topics || ""}
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
      {/* Update STAtus ModAL */}
      {openStatusModal && (
        <Dialog
          open={openStatusModal}
          onClose={handleCloseStatusModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Approve Peer Ambassador</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to approve this Peer Ambassador?
            </Typography>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="contained"
                color="success"
                onClick={handleUpdateStatus}
              >
                Approve
              </Button>
              <Button variant="outlined" onClick={handleCloseStatusModal}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PeerAmbassador;
