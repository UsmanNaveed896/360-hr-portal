import React, { useState, useEffect } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
} from "@mui/material";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Textarea,
  Button,
} from "@material-tailwind/react";
import { DataGrid } from "@mui/x-data-grid";
import { Puff } from "react-loader-spinner";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";

import { useServicePartnerHook } from "@/hooks/useServicePartners";
import { FaRegSave } from "react-icons/fa";
import { useGetOperatorHook } from "@/hooks/useGetOperatorHook";
import { CiEdit } from "react-icons/ci";

const ServicePartners = () => {
  const getOperatorksHook = useGetOperatorHook();

  const getService = useServicePartnerHook();
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
    getService.handleUpdateStatus(payLoad, handleCloseStatusModal);
  };
  useEffect(() => {
    getService.handleGetServicePartner();
    if (getService.loginResponse) {
      handleCloseEditModal();
    }
  }, [getService.loginResponse]);

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
    getService.handleEditServicePartnerForm(selectedUser);
    handleCloseEditModal();
  };

  const handleDelete = (id) => {
    getService.handleDelete(id);
  };
  const handleAssigntoConcierge = (value, row) => {
    if (row == "concierge") {
      let payLoad = {
        ...value,
        signed_from: "service_partners",
        signed_to: "concierge",
        form_id: value.id,
        user_id: value.id,
      };
      setRowData(payLoad);
    } else if (row == "peerAmbassador") {
      let payLoad = {
        ...value,
        signed_from: "service_partners",
        signed_to: "peer_ambassador",
        form_id: value.id,
        user_id: value.id,
      };
      setRowData(payLoad);
    } else {
      let payLoad = {
        ...value,
        signed_from: "service_partners",
        signed_to: "operators",
        form_id: value.id,
        user_id: value.id,
      };
      setRowData(payLoad);
    }
  };

  const handleSave = () => {
    getOperatorksHook.handleAssignOperatortoConcierge(rowData);
  };
  const columns = [
    {
      field: "organization_name",
      headerName: "Organization Name",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "phone_number",
      headerName: "Phone",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "web_url",
      headerName: "Website",
      headerClassName: "bg-[#000032] text-white",
      width: 150,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
    {
      field: "point_of_contact_name",
      headerName: "Point of Contact",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "point_of_contact_email",
      headerName: "Point of Contact Email",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "how_heard_about_us",
      headerName: "How Heard About Us",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "veteran_specific_services",
      headerName: "Veteran Specific Services",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "service_provided",
      headerName: "Services Provided",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
      renderCell: (params) => (
        <div>
          <div className="flex gap-2 items-center mt-3">
            <Chip
              color={params?.value == "pending" ? "error" : "success"}
              className="text-white"
              label={params.value ? params.value : "No Status"}
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
      headerName: "Assign to",
      headerClassName: "bg-[#000032] text-white",
      width: 200,
      renderCell: (params) => (
        <div className=" text-white flex gap-3 items-center">
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
                color: "white", 
                "& .MuiSvgIcon-root": {
                  color: "white", 
                },
              }}
            >
              <MenuItem value={"concierge"}>Concierge</MenuItem>
              <MenuItem value={"peerAmbassador"}>Peer Ambassador</MenuItem>
              <MenuItem value={"operator"}>Operator</MenuItem>
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
   
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "bg-[#000032] text-white",
      width: 150,
      renderCell: (params) => (
        <div className="mt-4" style={{ display: "flex", gap: "6px" }}>
          <MdVisibility
            className="w-5 h-5"
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenViewModal(params.row)}
          />
          {/* <MdEdit
            className="w-5 h-5"
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenEditModal(params.row)}
          />
          <MdDelete
            className="w-5 h-5"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(params.row._id)}
          /> */}
        </div>
      ),
    },
  ];

  const rows =
    getService?.getServicePartner?.map((service, index) => ({
      id: index,
      ...service,
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
            Service Partners
          </Typography>
        </CardHeader>
        {getService?.loading ? (
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

      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit {selectedUser?.organization_name}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                label="Organization Name"
                value={selectedUser.organization_name}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    organization_name: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Phone"
                value={selectedUser.phone_number}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    phone_number: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Address"
                value={selectedUser.address}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, address: e.target.value })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Website"
                value={selectedUser.web_url}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    web_url: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Point of Contact"
                value={selectedUser.point_of_contact_name}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    point_of_contact_name: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Point of Contact Email"
                value={selectedUser.point_of_contact_email}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    point_of_contact_email: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="How Heard About Us"
                value={selectedUser.how_heard_about_us}
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
                label="Veteran Specific Services"
                value={selectedUser.veteran_specific_services}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    veteran_specific_services: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Services Provided"
                value={selectedUser.service_provided}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    service_provided: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
              <Textarea
                label="Description"
                value={selectedUser.description}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    description: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCloseEditModal}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} disabled={getService.loading}>
            {getService.loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openViewModal} onClose={handleCloseViewModal}>
        {console.log(selectedUser, "user")}
        <DialogTitle>Viewing {selectedUser?.organization_name}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                label="Organization Name"
                value={selectedUser.organization_name}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="Phone"
                value={selectedUser.phone_number}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="Address"
                value={selectedUser.address}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="Website"
                value={selectedUser.web_url}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="Point of Contact"
                value={selectedUser.point_of_contact_name}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="Point of Contact Email"
                value={selectedUser.point_of_contact_email}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="How Heard About Us"
                value={selectedUser.how_heard_about_us}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="Veteran Specific Services"
                value={selectedUser.veteran_specific_services}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="Services Provided"
                value={selectedUser.service_provided}
                fullWidth
                margin="dense"
                readOnly
              />
              <Textarea
                className="pt-3"
                label="Description"
                value={selectedUser.description}
                fullWidth
                margin="dense"
                readOnly
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewModal} color="primary">
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
          <DialogTitle>Approve Service Partner</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to approve this Service Partner?
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

export default ServicePartners;
