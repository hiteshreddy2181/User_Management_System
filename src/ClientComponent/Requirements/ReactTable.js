import React, { useMemo, useState } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    Chip,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
    Tooltip,
} from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axios from 'axios';
import BulkUpload from '../../BulkUpload/BulkUpload';
import { saveAs } from 'file-saver';

const Example = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
    });

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                enableEditing: false,
                size: 80,
                muiTableHeadCellProps: {
                    sx: {
                        display: 'none', // Hide column header
                    },
                },
                muiTableBodyCellProps: {
                    sx: {
                        display: 'none', // Hide column cell
                    },
                },
            },

            {
                accessorKey: 'positionName',
                header: 'Position Name',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.positionName,
                    helperText: validationErrors?.positionName,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            positionName: undefined,
                        }),
                },
            },
            {
                accessorKey: 'companyName',
                header: 'Company Name',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.companyName,
                    helperText: validationErrors?.companyName,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            companyName: undefined,
                        }),
                },
            },
            {
                accessorKey: 'technicalSkills',
                header: 'Technical Skills',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.technicalSkills,
                    helperText: validationErrors?.technicalSkills,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            technicalSkills: undefined,
                        }),
                },
            },
            {
                accessorKey: 'yearOfExperience',
                header: 'Year of Experience',
                muiEditTextFieldProps: {
                    type:'number',
                    required: true,
                    error: !!validationErrors?.yearOfExperience,
                    helperText: validationErrors?.yearOfExperience,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            yearOfExperience: undefined,
                        }),
                },
            },
            {
                accessorKey: 'numberOfPositions',
                header: 'Number of Positions',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'number',
                    error: !!validationErrors?.numberOfPositions,
                    helperText: validationErrors?.numberOfPositions,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            numberOfPositions: undefined,
                        }),
                },
            },
            {
                accessorKey: 'location',
                header: 'Location',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.location,
                    helperText: validationErrors?.location,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            location: undefined,
                        }),
                },
            },
            {
                accessorKey: 'JD',
                header: 'Job Description',
                Cell: ({ row }) => (
                    <Box>
                        {row.original.JD ? (
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() => handleDownload(row.original.JD)}
                            >
                                Download
                            </Button>
                        ) : (
                            'No file uploaded'
                        )}
                    </Box>
                ),
                Edit: ({ row, onSave }) => (
                    <TextField
                        type='file'
                        error={!!validationErrors?.JD}
                        helperText={validationErrors?.JD}
                        onChange={(event) => {
                            const file = event.target.files[0];
                            if (!file) {
                                setValidationErrors((prev) => ({
                                    ...prev,
                                    JD: 'JD is required',
                                }));
                            } else {
                                setSelectedFile(file); // Store the file in state
                                delete validationErrors.JD;
                                setValidationErrors({ ...validationErrors, JD: undefined, });
                            }
                        }}

                    />
                ),
            },
            {
                accessorKey: 'workerType',
                header: 'Worker Type',
                editVariant: 'select',
                editSelectOptions: ['Fulltime', 'Contract'],
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.workerType,
                    helperText: validationErrors?.workerType,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            workerType: undefined,
                        }),
                },
            },
            {
                accessorKey: 'workMode',
                header: 'Work Mode',
                editVariant: 'select',
                editSelectOptions: ['Hybrd', 'Work from home', 'Regular'],
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.workMode,
                    helperText: validationErrors?.workMode,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            workMode: undefined,
                        }),
                },
            },
            {
                accessorKey: 'budget',
                header: 'Budget',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.budget,
                    helperText: validationErrors?.budget,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            budget: undefined,
                        }),
                },
            },
            {
                accessorKey: 'status',
                header: 'Status',
                editVariant: 'select',
                editSelectOptions: ['Active', 'Inactive'],
                Cell: ({ row }) => (
                    <Chip
                        label={
                            row.original.status == 'Active'
                                ? 'Active'
                                : 'Inactive'
                        }
                        color={
                            row.original.status == 'Active'
                                ? 'success'
                                : 'default'
                        }
                    />
                ),
                // EditCell: ({ row, onCellChange }) => (
                //     <Chip
                //         label={row.original.status ? 'Active' : 'Inactive'}
                //         color={row.original.status ? 'success' : 'default'}
                //         onClick={() => onCellChange({ status: !row.original.status })}
                //     />
                // ),
            },
        ],
        [validationErrors],
    );
    const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
    const { mutateAsync: createUser, isPending: isCreatingUser } =
        useCreateUser(selectedFile);
    const {
        data: fetchedUsers = [],
        isError: isLoadingUsersError,
        isFetching: isFetchingUsers,
        isLoading: isLoadingUsers,
    } = useGetUsers();
    const { mutateAsync: updateUser, isPending: isUpdatingUser } =
        useUpdateUser(selectedFile);
    const { mutateAsync: deleteUser, isPending: isDeletingUser } =
        useDeleteUser();

    const handleBulkOpen = () => {
        setBulkUploadOpen(true);
    };

    const handleBulkClose = () => {
        setBulkUploadOpen(false);
    };

    const handleDownload = (pdfData) => {
        const dataArray = new Uint8Array(pdfData.data);
        const blob = new Blob([dataArray], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Job Description');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCreateUser = async ({ values, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createUser(values);
        table.setCreatingRow(null);
    };

    const handleSaveUser = async ({ values, table }) => {
        const newValidationErrors = validateUser(values);
        console.log('-------------value----------------', values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateUser(values);
        table.setEditingRow(null);
    };

    const openDeleteConfirmModal = (row) => {
        if (
            window.confirm(
                `Are you sure you want to delete this user? ${row.original.id}`,
            )
        ) {
            deleteUser(row.original.id);
        }
    };

    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => {
            const { JD, ...rest } = row.original;
            return rest;
        });
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(fetchedUsers);
        download(csvConfig)(csv);
    };

    const handleCSVDownload = () => {
        const csvContent = `positionName,companyName,technicalSkills,yearOfExperience,numberOfPositions,location,budget,status,workerType,workMode\n`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'template.csv');
    };

    const table = useMaterialReactTable({
        columns,
        data: fetchedUsers,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        showColumnFilters: false,
        showColumnFilters: false,
        enableColumnFilters: false,
        enableColumnFilterModes: false,
        enableColumnActions: false,
        showGlobalFilter: false,
        // enableDensityToggle: false,
        enableEditing: true,
        enableGlobalFilterModes: false,
        enableGlobalFilterRankedResults: false,
        enableRowSelection: false,
        enableRowSelection: true,
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: isLoadingUsersError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '500px',
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        renderCreateRowDialogContent: ({
            table,
            row,
            internalEditComponents,
        }) => (
            <>
                <DialogTitle variant='h5'>Post new requirements</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {internalEditComponents
                            .filter(
                                (component) =>
                                    component?.props?.cell?.column.id !== 'id',
                            )
                            .map((component, index) => (
                                <Grid mt={1} item xs={12} sm={6} key={index}>
                                    {React.cloneElement(component, {
                                        variant: 'outlined',
                                    })}
                                </Grid>
                            ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons
                        variant='text'
                        table={table}
                        row={row}
                    />
                </DialogActions>
            </>
        ),
        renderEditRowDialogContent: ({
            table,
            row,
            internalEditComponents,
        }) => (
            <>
                <DialogTitle variant='h5'>Post new requirements</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {internalEditComponents
                            .filter(
                                (component) =>
                                    component?.props?.cell?.column.id !== 'id',
                            )
                            .map((component, index) => (
                                <Grid mt={1} item xs={12} sm={6} key={index}>
                                    {React.cloneElement(component, {
                                        variant: 'outlined',
                                    })}
                                </Grid>
                            ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons
                        variant='text'
                        table={table}
                        row={row}
                    />
                </DialogActions>
            </>
        ),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title='Edit'>
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Delete'>
                    <IconButton
                        color='error'
                        onClick={() => openDeleteConfirmModal(row)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Tooltip title="Click to download CSV" arrow>
                    <IconButton color="primary" onClick={handleCSVDownload}>
                        <FileDownloadIcon />
                    </IconButton>
                </Tooltip>
                <Button
                    size='small'
                    variant='contained'
                    onClick={() => {
                        table.setCreatingRow(true);
                    }}
                >
                    New Requirements
                </Button>
                <Button
                    size='small'
                    variant='contained'
                    onClick={() => handleBulkOpen()}
                >
                    Bulk upload
                </Button>

                <Button
                    size='small'
                    disabled={
                        !table.getIsSomeRowsSelected() &&
                        !table.getIsAllRowsSelected()
                    }
                    onClick={() =>
                        handleExportRows(table.getSelectedRowModel().rows)
                    }
                    startIcon={<FileDownloadIcon />}
                >
                    Export Selected Rows
                </Button>
            </Box>
        ),
        initialState: {
            columnPinning: {
                right: ['mrt-row-actions'],
            },
        },
        state: {
            isLoading: isLoadingUsers,
            isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },
    });

    return (
        <>
            <MaterialReactTable table={table} />
            <BulkUpload
                bulkUploadOpen={bulkUploadOpen}
                setBulkUploadOpen={setBulkUploadOpen}
                handleBulkClose={handleBulkClose}
                handleBulkOpen={handleBulkOpen}
            />
        </>
    );
};

function useCreateUser(selectedFile) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            const formData = new FormData();
            formData.append('positionName', user.positionName);
            formData.append('numberOfPositions', user.numberOfPositions);
            formData.append('companyName', user.companyName);
            formData.append('technicalSkills', user.technicalSkills);
            formData.append('yearOfExperience', user.yearOfExperience);
            formData.append('location', user.location);
            formData.append('workerType', user.workerType);
            formData.append('workMode', user.workMode);
            formData.append('budget', user.budget);
            formData.append('status', user.status);
            if (selectedFile) {
                formData.append('JD', selectedFile);
            } else {
                throw new Error('Job Description PDF is required');
            }

            const response = await axios.post(
                'http://localhost:5000/post-job',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (response.status !== 201) {
                throw new Error('Failed to create user');
            }
            return response.data;
        },
        onSuccess: (newUser) => {
            queryClient.setQueryData(['users'], (oldUsers) => [
                ...oldUsers,
                newUser,
            ]);
        },
        onError: (err, newUserInfo, context) => {
            queryClient.setQueryData(['users'], context.previousUsers);
        },
        onSettled: (data) => {
            queryClient.invalidateQueries(['users']);
        },
    });
}

function useGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch('http://localhost:5000/get-jobs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        },
        refetchOnWindowFocus: false,
    });
}

function useUpdateUser(selectedFile) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            const formData = new FormData();
            formData.append('positionName', user.positionName);
            formData.append('numberOfPositions', user.numberOfPositions);
            formData.append('companyName', user.companyName);
            formData.append('technicalSkills', user.technicalSkills);
            formData.append('yearOfExperience', user.yearOfExperience);
            formData.append('location', user.location);
            formData.append('budget', user.budget);
            formData.append('workerType', user.workerType);
            formData.append('workMode', user.workMode);
            formData.append('status', user.status);
            if (selectedFile) {
                console.log(selectedFile);
                formData.append('JD', selectedFile);
            }

            const response = await axios.put(
                `http://localhost:5000/update-job/${user.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (response.status !== 200) {
                throw new Error('Failed to update user');
            }
            return response.data;
        },
        onMutate: async (newUserInfo) => {
            await queryClient.cancelQueries(['users']);

            const previousUsers = queryClient.getQueryData(['users']);

            if (!previousUsers) {
                console.error('No previous users found in cache.');
                return { previousUsers: [] };
            }

            queryClient.setQueryData(['users'], (prevUsers) => {
                console.log('prevUsers', prevUsers);
                return prevUsers.map(
                    (prevUser) =>
                        prevUser.id === newUserInfo.id ? newUserInfo : prevUser, // Use id here
                );
            });

            return { previousUsers };
        },
        onSettled: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
}

function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId) => {
            const response = await fetch(
                `http://localhost:5000/delete-job/${userId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            return response.json();
        },
        onMutate: async (userId) => {
            await queryClient.cancelQueries(['users']);
            const previousUsers = queryClient.getQueryData(['users']) || [];
            queryClient.setQueryData(
                ['users'],
                previousUsers.filter((user) => user._id !== userId),
            );
            return { previousUsers };
        },
        onError: (err, userId, context) => {
            queryClient.setQueryData(['users'], context.previousUsers);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
    <QueryClientProvider client={queryClient}>
        <Example />
    </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;
const validateUser = (user) => {
    return {
        positionName: !validateRequired(user.positionName)
            ? 'Position Name is Required'
            : '',
        companyName: !validateRequired(user.companyName)
            ? 'Company Name is Required'
            : '',
        technicalSkills: !validateRequired(user.technicalSkills)
            ? 'Technical Skills are Required'
            : '',
        yearOfExperience: !validateRequired(user.yearOfExperience)
            ? 'Year of Experience is Required'
            : '',
        numberOfPositions: !validateRequired(user.numberOfPositions)
            ? 'Number of Positions is Required'
            : '',
        location: !validateRequired(user.location)
            ? 'Location is Required'
            : '',
        workerType: !validateRequired(user.workerType)
            ? 'Worker Type is Required'
            : '',
        workMode: !validateRequired(user.workMode)
            ? 'Work Mode is Required'
            : '',
        // JD: !validateRequired(user.JD)
        //     ? 'Job Description is Required'
        //     : '',
        budget: !validateRequired(user.budget) ? 'Budget is Required' : '',
    };
};
