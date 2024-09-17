import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { DataGrid } from "@mui/x-data-grid";
import { Puff } from "react-loader-spinner";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import { MdVisibility } from "react-icons/md";
import { useGetOperatorHook } from "@/hooks/useGetOperatorHook";
import { UseAssignedFormHook } from "@/hooks/useGetAssignedForms";

const AssignedForm = () => {
  const getAssignedFormHook = UseAssignedFormHook();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getAssignedFormHook.handleGetAssignedForms();
  }, []);

  const handleOpenViewModal = (user) => {
    setSelectedUser(user);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      field: "full_name",
      headerName: "Full Name",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "birth_date",
      headerName: "DOB",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "force",
      headerName: "Department",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "speciality",
      headerName: "Sub Domain",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "currently_employed",
      headerClassName: "bg-[#000032] text-white",
      headerName: "Employed",
      flex: 1,
      renderCell: (params) => (
        <Typography className="text-xs font-semibold text-blue-gray-600 mt-7">
          {params.value ? "Yes" : "No"}
        </Typography>
      ),
    },
    {
      field: "address",
      headerName: "Location",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerClassName: "bg-[#000032] text-white",
      renderCell: (params) => (
        <IconButton onClick={() => handleOpenViewModal(params.row)}>
          <MdVisibility className="w-4 h-4" style={{ color: "#fff" }} />
        </IconButton>
      ),
    },
  ];

  const rows = getAssignedFormHook?.getAssignedForm?.operators?.map((operator) => ({
    id: operator?.id,
    full_name: operator?.full_name || "N/A",
    birth_date: operator?.birth_date || "N/A",
    force: operator?.force || "N/A",
    speciality: operator?.speciality || "N/A",
    currently_employed: operator?.currently_employed !== null ? operator.currently_employed : "N/A",
    address: operator?.address || "N/A",
  }));

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card sx={{ backgroundColor: "#191a45" }}>
        <CardHeader
          variant="gradient"
          color="#000032"
          className="mb-8 p-6 bg-[#191a45]"
          sx={{ backgroundColor: "#191a45" }}
        >
          <Typography variant="h6" color="white">
            Assigned Forms
          </Typography>
        </CardHeader>
        {getAssignedFormHook?.loading ? (
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
          <CardBody className="px-0 pt-0 pb-2 p-0">
            <div
              style={{
                height: 500,
                width: "100%",
                backgroundColor: "#191a45",
                color: "white",
              }}
            >
              <DataGrid
                rows={rows?.reverse()}
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
                    color: "#fff",
                  },
                  "& .MuiTablePagination-root": {
                    color: "#fff",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    color: "#000",
                    backgroundColor: "#000032",
                  },
                  "& .MuiDataGrid-columnHeaderRow": {
                    background: "#000032 !important",
                  },
                }}
              />
            </div>
          </CardBody>
        )}
      </Card>

      {/* View Modal */}
      <Dialog open={openViewModal} onClose={handleCloseViewModal}>
        <DialogTitle>View Operator</DialogTitle>
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
            label="Department"
            value={selectedUser?.force || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Sub Domain"
            value={selectedUser?.speciality || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <TextField
            label="Location"
            value={selectedUser?.address || ""}
            fullWidth
            margin="dense"
            readOnly
          />
          <Typography variant="body2" color="textSecondary" style={{ marginTop: "4px" }}>
            Employed: {selectedUser?.currently_employed ? "Yes" : "No"}
          </Typography>
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

export default AssignedForm;
