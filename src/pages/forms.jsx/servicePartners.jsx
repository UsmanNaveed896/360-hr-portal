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

const ServicePartners = () => {
  const getService = useServicePartnerHook();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
    console.log(selectedUser, "users");
    getService.handleEditServicePartnerForm(selectedUser);
  };

  const handleDelete = (id) => {
    getService.handleDelete(id);
  };

  const columns = [
    {
      field: "organizationName",
      headerName: "Organization Name",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "phone",
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
      field: "websiteUrl",
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
      field: "pointOfContactName",
      headerName: "Point of Contact",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "pointOfContactEmail",
      headerName: "Point of Contact Email",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "howHeardAboutUs",
      headerName: "How Heard About Us",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "veteranSpecificServices",
      headerName: "Veteran Specific Services",
      width: 150,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "servicesProvided",
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
      field: "assignTo",
      headerName: "Assign to",
      headerClassName: "bg-[#000032] text-white",
      width: 200,
      renderCell: (params) => (
        <div className="">
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
              <MenuItem value={20}>Peer Ambassador</MenuItem>
              <MenuItem value={30}>Operator</MenuItem>
            </Select>
          </FormControl>
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
          <MdEdit
            className="w-5 h-5"
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenEditModal(params.row)}
          />
          <MdDelete
            className="w-5 h-5"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(params.row._id)}
          />
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
        <DialogTitle>Edit {selectedUser?.organizationName}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                label="Organization Name"
                value={selectedUser.organizationName}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    organizationName: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Phone"
                value={selectedUser.phone}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, phone: e.target.value })
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
                value={selectedUser.websiteUrl}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    websiteUrl: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Point of Contact"
                value={selectedUser.pointOfContactName}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    pointOfContactName: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Point of Contact Email"
                value={selectedUser.pointOfContactEmail}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    pointOfContactEmail: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="How Heard About Us"
                value={selectedUser.howHeardAboutUs}
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
                label="Veteran Specific Services"
                value={selectedUser.veteranSpecificServices}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    veteranSpecificServices: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Services Provided"
                value={selectedUser.servicesProvided}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    servicesProvided: e.target.value,
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
        <DialogTitle>Viewing {selectedUser?.organizationName}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                label="Organization Name"
                value={selectedUser.organizationName}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="Phone"
                value={selectedUser.phone}
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
                value={selectedUser.websiteUrl}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="Point of Contact"
                value={selectedUser.pointOfContactName}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="Point of Contact Email"
                value={selectedUser.pointOfContactEmail}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="How Heard About Us"
                value={selectedUser.howHeardAboutUs}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="Veteran Specific Services"
                value={selectedUser.veteranSpecificServices}
                fullWidth
                margin="dense"
                readOnly
              />
              <TextField
                label="Services Provided"
                value={selectedUser.servicesProvided}
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
    </div>
  );
};

export default ServicePartners;
