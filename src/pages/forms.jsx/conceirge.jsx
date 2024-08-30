import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Puff } from "react-loader-spinner";
import { useGetConciergeHook } from "@/hooks/useGetConciergeHook";
import { serviceData } from "@/data/dummyData";
import { FaRegSave } from "react-icons/fa";
import { useGetOperatorHook } from "@/hooks/useGetOperatorHook";
import { CiEdit } from "react-icons/ci";

const Concierge = () => {
  const getOperatorksHook = useGetOperatorHook();
  const concierge = useGetConciergeHook();
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
    concierge.handleUpdateStatus(payLoad, handleCloseStatusModal);
  };
  useEffect(() => {
    concierge.handleGetConcierge();
    if (concierge.loginResponse) {
      handleCloseEditModal();
    }
  }, [concierge.loginResponse]);

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
    concierge.handleEditConciergeForm(selectedUser);
  };

  const handleDelete = (id) => {
    concierge.handleDelete(id);
  };
  const handleAssigntoConcierge = (value, row) => {
    if (row == "operator") {
      let payLoad = {
        ...value,
        signed_from: "concierge",
        signed_to: "operator",
        form_id: value.id,
        user_id: value.id,
      };
      setRowData(payLoad);
    } else if (row == "peerAmbassador") {
      let payLoad = {
        ...value,
        signed_from: "concierge",
        signed_to: "peer_ambassador",
        form_id: value.id,
        user_id: value.id,
      };
      setRowData(payLoad);
    } else {
      let payLoad = {
        ...value,
        signed_from: "concierge",
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
    concierge.handleGetConcierge();
  }, [getOperatorksHook.loginResponse]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "full_name",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Full Name",
      width: 150.5,
      renderCell: (params) => (
        <div>
          <Tooltip title={params.value} arrow>
            <Typography className="mt-3 text-sm" noWrap>
              {params.value}
            </Typography>
          </Tooltip>
          <Tooltip title={params.row.birth_date} arrow>
            <Typography className="mt-3 text-sm" noWrap>
              <span className="font-bold">Dob:</span> {params.row.birth_date}
            </Typography>
          </Tooltip>
        </div>
      ),
    },

    {
      field: "service_branch",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Branch of Service",
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography className="mt-6" noWrap>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "contact_number",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Contact Method",
      width: 150,
    },
    {
      field: "how_heard_about_us",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Source",
      width: 150,
    },
    {
      field: "why_concierge",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Reason",
      width: 150.5,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography className="mt-6" noWrap>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "number_of_operators",
      headerClassName: "bg-[#000032] text-white",
      headerName: "No of Hr/Operators",
      width: 150,
      renderCell: (params) => (
        <Typography className="text-center mt-6">{params.value}</Typography>
      ),
    },
    {
      field: "transition_services",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Organization",
      width: 150,
    },
    {
      field: "areas_of_support",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Support Areas",
      width: 150,
    },
    {
      field: "uncomfortable_topics",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Topics",
      width: 150,
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
            <InputLabel id="demo-simple-select-label" sx={{ color: params.row.status == "pending" ? "gray" : "white" }}>
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
              MenuProps={{
                PaperProps: {
                  sx: {
                    // Background color of the dropdown
                    "& .MuiMenuItem-root": {
                      color: "black", // Text color of the dropdown options
                    },
                  },
                },
              }}
            >
              <MenuItem value={"operator"}>Operator</MenuItem>
              <MenuItem value={"peerAmbassador"}>Peer Ambassador</MenuItem>
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
    //   type: "actions",
    //   renderCell: (params) => (
    //     <div className="flex gap-2 mt-1">
    //       <MdVisibility
    //         className="cursor-pointer w-5 h-5"
    //         onClick={() => handleOpenViewModal(params.row)}
    //       />
    //       <MdEdit
    //         className="cursor-pointer w-5 h-5"
    //         onClick={() => handleOpenEditModal(params.row)}
    //       />
    //       <MdDelete
    //         className="cursor-pointer w-5 h-5"
    //         onClick={() => handleDelete(params.row._id)}
    //       />
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card sx={{ backgroundColor: "#191a45" }}>
        <CardHeader
          variant="gradient"
          color="#000032"
          className="mb-8 p-6 bg-[#191a45]"
        >
          <Typography variant="h6" color="white">
            Concierge
          </Typography>
        </CardHeader>
        {concierge?.loading ? (
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
                // rows={serviceData}
                rows={concierge?.getConcierge || []}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                getRowId={(row) => row.id}
                disableSelectionOnClick
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

      <Dialog
        open={openEditModal}
        onClose={handleCloseEditModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit {selectedUser?.full_name}</DialogTitle>
        <DialogContent dividers>
          <div className="mb-4">
            <Input
              type="text"
              label="Full Name"
              value={selectedUser?.full_name || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, full_name: e.target.value })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="DOB"
              value={selectedUser?.birth_date || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, birth_date: e.target.value })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Branch of Service"
              value={selectedUser?.service_branch || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  service_branch: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Contact Method"
              value={selectedUser?.contact_number || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  contact_number: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Source"
              value={selectedUser?.how_heard_about_us || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  how_heard_about_us: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Reason"
              value={selectedUser?.why_concierge || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  why_concierge: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4 flex gap-2">
            <Input
              type="text"
              label="No of Hours/Operators"
              value={selectedUser?.hours_per_month || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  hours_per_month: e.target.value,
                })
              }
              fullWidth
            />
            <Input
              type="text"
              label="Number of Operators"
              value={selectedUser?.number_of_operators || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  number_of_operators: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Organization"
              value={selectedUser?.transition_services || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  transition_services: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Support Areas"
              value={selectedUser?.areas_of_support || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  areas_of_support: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Topics"
              value={selectedUser?.uncomfortable_topics || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  uncomfortable_topics: e.target.value,
                })
              }
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="gray"
            onClick={handleCloseEditModal}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openViewModal}
        onClose={handleCloseViewModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedUser?.full_name}</DialogTitle>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <DialogContent dividers style={{ flex: 1, overflowY: "auto" }}>
            <Typography variant="body1">
              <b>DOB:</b> {selectedUser?.birth_date}
            </Typography>
            <Typography variant="body1">
              <strong>Branch of Service:</strong> {selectedUser?.service_branch}
            </Typography>
            <Typography variant="body1">
              <strong>Contact Method:</strong> {selectedUser?.contact_number}
            </Typography>
            <Typography variant="body1">
              <strong>Source:</strong> {selectedUser?.how_heard_about_us}
            </Typography>
            <Typography variant="body1">
              <strong>Reason:</strong> {selectedUser?.why_concierge}
            </Typography>
            <Typography variant="body1">
              <strong>No of Hours/Operators:</strong>{" "}
              {selectedUser?.hoursPerMonth} /{" "}
              {selectedUser?.number_of_operators}
            </Typography>
            <Typography variant="body1">
              <strong>Organization:</strong> {selectedUser?.transition_services}
            </Typography>
            <Typography variant="body1">
              <strong>Support Areas:</strong> {selectedUser?.areas_of_support}
            </Typography>
            <Typography variant="body1">
              <strong>Topics:</strong> {selectedUser?.uncomfortable_topics}
            </Typography>
          </DialogContent>
          <DialogActions
            style={{ justifyContent: "flex-end", padding: "16px" }}
          >
            <Button color="gray" onClick={handleCloseViewModal}>
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>

 
       {/* Update STAtus ModAL */}
       {openStatusModal && (
        <Dialog
          open={openStatusModal}
          onClose={handleCloseStatusModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Approve Concierge</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to approve this Concierge?
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

export default Concierge;
