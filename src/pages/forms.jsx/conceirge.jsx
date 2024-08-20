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

const Concierge = () => {
  const concierge = useGetConciergeHook();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const columns = [
    {
      field: "fullName",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Full Name",
      width: 150.5,
      renderCell: (params) => (
        <div>
          {console.log(params, "params")}
          <Tooltip title={params.value} arrow>
            <Typography className="mt-3 text-sm" noWrap>
              {params.value}
            </Typography>
          </Tooltip>
          <Tooltip title={params.row.DOB} arrow>
            <Typography className="mt-3 text-sm" noWrap>
              <span className="font-bold">Dob:</span>{" "}
              {params.row.DOB.slice(0, 10)}
            </Typography>
          </Tooltip>
        </div>
      ),
    },

    {
      field: "branchOfService",
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
      field: "contactMethod",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Contact Method",
      width: 150,
    },
    {
      field: "howHeardAboutUs",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Source",
      width: 150,
    },
    {
      field: "whyConcierge",
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
      field: "hoursPerMonth",
      headerClassName: "bg-[#000032] text-white",
      headerName: "No of Hr/Operators",
      width: 150,
      renderCell: (params) => (
        <Typography className="text-center mt-6">
          {params.value} / {params.row.numberOfOperators}
        </Typography>
      ),
    },
    {
      field: "transitionServices",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Organization",
      width: 150,
    },
    {
      field: "recommendedTransitionServices",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Support Areas",
      width: 150,
    },
    {
      field: "uncomfortableTopics",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Topics",
      width: 150,
    },
    {
      field: "assignTo",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Assign to",
      width: 200,
      renderCell: (params) => (
        <div className="mt-3">
          <FormControl sx={{ width: "150px" }}>
            <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>Assign To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="standard"
              label="Age"
              sx={{
                color: 'white', // Changes the selected text color
                '& .MuiSvgIcon-root': {
                  color: 'white', // Changes the dropdown arrow color
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    // Background color of the dropdown
                    '& .MuiMenuItem-root': {
                      color: 'black', // Text color of the dropdown options
                    },
                  },
                },
              }}
            >
              <MenuItem value={10}>Operators</MenuItem>
              <MenuItem value={20}>Peer Ambassador</MenuItem>
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
      type: "actions",
      renderCell: (params) => (
        <div className="flex gap-2 mt-4">
          <MdVisibility
            className="cursor-pointer w-5 h-5"
            onClick={() => handleOpenViewModal(params.row)}
          />
          <MdEdit
            className="cursor-pointer w-5 h-5"
            onClick={() => handleOpenEditModal(params.row)}
          />
          <MdDelete
            className="cursor-pointer w-5 h-5"
            onClick={() => handleDelete(params.row._id)}
          />
        </div>
      ),
    },
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
                rows={concierge.getConcierge || []}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                getRowId={(row) => row._id}
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
        <DialogTitle>Edit {selectedUser?.fullName}</DialogTitle>
        <DialogContent dividers>
          <div className="mb-4">
            <Input
              type="text"
              label="Full Name"
              value={selectedUser?.fullName || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, fullName: e.target.value })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="DOB"
              value={selectedUser?.DOB?.slice(0, 10) || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, DOB: e.target.value })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Branch of Service"
              value={selectedUser?.branchOfService || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  branchOfService: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Contact Method"
              value={selectedUser?.contactMethod || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  contactMethod: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Source"
              value={selectedUser?.howHeardAboutUs || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  howHeardAboutUs: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Reason"
              value={selectedUser?.whyConcierge || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  whyConcierge: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4 flex gap-2">
            <Input
              type="text"
              label="No of Hours/Operators"
              value={selectedUser?.hoursPerMonth || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  hoursPerMonth: e.target.value,
                })
              }
              fullWidth
            />
            <Input
              type="text"
              label="Number of Operators"
              value={selectedUser?.numberOfOperators || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  numberOfOperators: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Organization"
              value={selectedUser?.transitionServices || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  transitionServices: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Support Areas"
              value={selectedUser?.recommendedTransitionServices || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  recommendedTransitionServices: e.target.value,
                })
              }
              fullWidth
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Topics"
              value={selectedUser?.uncomfortableTopics || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  uncomfortableTopics: e.target.value,
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
        <DialogTitle>{selectedUser?.fullName}</DialogTitle>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <DialogContent dividers style={{ flex: 1, overflowY: "auto" }}>
            <Typography variant="body1">
              <b>DOB:</b> {selectedUser?.DOB?.slice(0, 10)}
            </Typography>
            <Typography variant="body1">
              <strong>Branch of Service:</strong>{" "}
              {selectedUser?.branchOfService}
            </Typography>
            <Typography variant="body1">
              <strong>Contact Method:</strong> {selectedUser?.contactMethod}
            </Typography>
            <Typography variant="body1">
              <strong>Source:</strong> {selectedUser?.howHeardAboutUs}
            </Typography>
            <Typography variant="body1">
              <strong>Reason:</strong> {selectedUser?.whyConcierge}
            </Typography>
            <Typography variant="body1">
              <strong>No of Hours/Operators:</strong>{" "}
              {selectedUser?.hoursPerMonth} / {selectedUser?.numberOfOperators}
            </Typography>
            <Typography variant="body1">
              <strong>Organization:</strong> {selectedUser?.transitionServices}
            </Typography>
            <Typography variant="body1">
              <strong>Support Areas:</strong>{" "}
              {selectedUser?.recommendedTransitionServices}
            </Typography>
            <Typography variant="body1">
              <strong>Topics:</strong> {selectedUser?.uncomfortableTopics}
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
    </div>
  );
};

export default Concierge;
