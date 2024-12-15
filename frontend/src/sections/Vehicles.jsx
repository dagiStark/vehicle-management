import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {  usStates } from "../constants";
import DeleteIcon from "@mui/icons-material/Delete";

import useVehiclesApi from "../hooks/useVehicleApi";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  //keep track of rows that have been edited
  const [editedUsers, setEditedUsers] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "vehicleName",
        header: "Vehicle Name",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? "Required"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row._valuesCache });
            console.log("Rows: ", row);
            console.log("Edited: ", editedUsers);
          },
        }),
      },
      {
        accessorKey: "status",
        header: "Status",
        editVariant: "select",
        editSelectOptions: usStates,
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) =>
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, status: event.target.value },
            }),          
        }),
      },
      {
        accessorKey: "updatedAt",
        header: "Last Update",
        editVariant: "date",
        muiEditTextFieldProps: ({ row }) => ({
          type: "date",
          error: !!validationErrors?.lastUpdate,
          helperText: validationErrors?.lastUpdate,
          onChange: (event) =>
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, lastUpdate: event.target.value },
            }),
        }),
      },
    ],
    [editedUsers, validationErrors]
  );

  //call CREATE hook
  const { mutateAsync: createVehicle, isPending: isCreatingUser } =
    useCreateVehicle();

  // call READ hook
  const {
    data: fetchedVehicles = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetVehicles();

  //call UPDATE hook
  const { mutateAsync: updateVehicle, isPending: isUpdatingUsers } =
    useUpdateVehicle();
  //call DELETE hook
  const { mutateAsync: deleteVehicle, isPending: isDeletingUser } =
    useDeleteVehicle();

  // CREATE action
  const handleCreateVehicle = async ({ values, table }) => {
    // Assuming you have a validation function
    const newValidationErrors = validateVehicle(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});

    // Pass `values` to the API via the `createVehicle` hook
    await createVehicle({
      vehicleName: values.vehicleName,
      status: values.status,
    });

    table.setCreatingRow(null); // Exit creating mode
  };

  //UPDATE action
  const handleSaveVehicle = async () => {
    if (Object.values(validationErrors).some((error) => !!error)) return;

    // Extract the first (or relevant) edited user
    const editedUserArray = Object.values(editedUsers);
    if (editedUserArray.length === 0) {
      console.error("No edited users found");
      return;
    }

    const editedUser = editedUserArray[0]; // Access the first edited user
    console.log("Edited User:", editedUser);

    // Construct the updated vehicle data
    const updatedVehicle = {
      id: editedUser._id, // Use `id` instead of `_id` for the backend
      vehicleName: editedUser.vehicleName,
      status: editedUser.status,
    };

    console.log("updated vehicle", updatedVehicle);
    // console.log("updateVehicleStatus Function: ", updateVehicle);

    try {
      await updateVehicle(updatedVehicle); // Call the mutation with the updated vehicle
      setEditedUsers({}); // Clear the editedUsers state
    } catch (error) {
      console.error("Failed to update vehicle:", error);
    }
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteVehicle(row.original._id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedVehicles,
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "cell", // ('modal', 'row', 'table', and 'custom' are also available)
    enableCellActions: true,
    enableClickToCopy: "context-menu",
    enableColumnPinning: true,
    enableEditing: true,
    enableRowActions: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateVehicle,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveVehicle}
          disabled={
            Object.keys(editedUsers).length === 0 ||
            Object.values(validationErrors).some((error) => !!error)
          }
        >
          {isUpdatingUsers ? <CircularProgress size={25} /> : "Save"}
        </Button>
        {Object.values(validationErrors).some((error) => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
        sx={{
          backgroundColor: "#022213",
          "&:hover": {
            backgroundColor: "#044325", // Optional hover color
          },
        }}
      >
        Add New Car
      </Button>
    ),
    initialState: {
      columnPinning: {
        right: ["mrt-row-actions"],
      },
    },
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUsers || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

// CREATE hook: Add a new vehicle
function useCreateVehicle() {
  const queryClient = useQueryClient();
  const { addVehicle } = useVehiclesApi();

  return useMutation({
    mutationFn: async ({ vehicleName, status }) => {
      await addVehicle(vehicleName, status); // Call add vehicle API
    },
    // Optimistic UI update
    onMutate: (newVehicle) => {
      queryClient.setQueryData(["vehicles"], (prevVehicles) => [
        ...(prevVehicles || []),
        {
          ...newVehicle,
          updatedAt: new Date().toISOString(),
        },
      ]);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["vehicles"] }),
  });
}

// READ hook: Fetch all vehicles
const useGetVehicles = () => {
  const { fetchVehicles } = useVehiclesApi();
  console.log("fetching......");

  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const response = await fetchVehicles();
      console.log(response);
      return response.data; // Return the fetched data
    },
    refetchOnWindowFocus: false,
  });
};

// UPDATE hook: Update vehicle status
function useUpdateVehicle() {
  const queryClient = useQueryClient();
  const { updateVehicleStatus } = useVehiclesApi();

  return useMutation({
    mutationFn: async ({ id, vehicleName, status }) => {
      // Update a single vehicle's status
      const updatedVehicle = await updateVehicleStatus(id, vehicleName, status);
      return updatedVehicle; // Return the updated vehicle
    },
    // Optimistic UI update
    onMutate: ({ id, status }) => {
      queryClient.setQueryData(["vehicles"], (prevVehicles) =>
        prevVehicles?.map((vehicle) =>
          vehicle._id === id
            ? { ...vehicle, status, updatedAt: new Date().toISOString() }
            : vehicle
        )
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["vehicles"]);
    },
  });
}

// DELETE hook: Delete a vehicle
function useDeleteVehicle() {
  const queryClient = useQueryClient();
  const { deleteVehicle } = useVehiclesApi();

  return useMutation({
    mutationFn: async (id) => {
      await deleteVehicle(id); // Call delete vehicle API
    },
    // Optimistic UI update
    onMutate: (id) => {
      queryClient.setQueryData(["vehicles"], (prevVehicles) =>
        prevVehicles?.filter((vehicle) => vehicle._id !== id)
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["vehicles"] }),
  });
}

const queryClient = new QueryClient();

const Vehicles = () => (
  //Put this with your other react-query providers near root of your app
  <div className="w-full h-full mt-8">
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  </div>
);

export default Vehicles;

const validateRequired = (value) => !!value.length;

const validateVehicle = (values) => {
  const errors = {};
  if (!values.vehicleName) {
    errors.vehicleName = "Vehicle name is required";
  }
  if (!values.status) {
    errors.status = "Status is required";
  }
  return errors;
};
