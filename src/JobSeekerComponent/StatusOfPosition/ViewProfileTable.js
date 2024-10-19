import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import { v4 as uuidv4 } from 'uuid';
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
import AppContext from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const Example = () => {
    const { fields: { email } } = useContext(AppContext)
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
                accessorKey: 'firstName',
                header: 'First Name',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.firstName,
                    helperText: validationErrors?.firstName,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            firstName: undefined,
                        }),
                },
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.lastName,
                    helperText: validationErrors?.lastName,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            lastName: undefined,
                        }),
                },
            },
            {
                accessorKey: 'email',
                header: 'Email',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.email,
                    helperText: validationErrors?.email,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            email: undefined,
                        }),
                },
            },
            {
                accessorKey: 'yearsOfExperience',
                header: 'Years Of Experience',
                muiEditTextFieldProps: {
                    type: 'number',
                    required: true,
                    error: !!validationErrors?.yearsOfExperience,
                    helperText: validationErrors?.yearsOfExperience,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            yearsOfExperience: undefined,
                        }),
                },
            },
            {
                accessorKey: 'techskills',
                header: 'Tech skills',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.techskills,
                    helperText: validationErrors?.techskills,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            techskills: undefined,
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
                accessorKey: 'workerType',
                header: 'Worker Type',
                enableEditing: false,
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
                enableEditing: false,
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
                accessorKey: 'positionName',
                header: 'Positions Name',
                enableEditing: false,
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
                accessorKey: 'screeningStatus',
                header: 'Screening Status',
                enableEditing: false,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.screeningStatus,
                    helperText: validationErrors?.screeningStatus,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            screeningStatus: undefined,
                        }),
                },
            },
            {
                accessorKey: 'round1',
                header: 'Round 1',
                enableEditing: false,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.round1,
                    helperText: validationErrors?.round1,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            round1: undefined,
                        }),
                },
            },
            {
                accessorKey: 'round2',
                header: 'Round 2',
                enableEditing: false,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.round2,
                    helperText: validationErrors?.round2,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            round2: undefined,
                        }),
                },
            },

            {
                accessorKey: 'comments',
                header: 'Comments',
                enableEditing: false,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.comments,
                    helperText: validationErrors?.comments,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            comments: undefined,
                        }),
                },
            },


            {
                accessorKey: 'resume',
                header: 'Resume',
                Cell: ({ row }) => (
                    <Box>
                        {row.original.resume ? (
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() => handleDownload(row.original.resume)}
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
                        error={!!validationErrors?.resume}
                        helperText={validationErrors?.resume}
                        onChange={(event) => {
                            const file = event.target.files[0];
                            if (!file) {
                                setValidationErrors((prev) => ({
                                    ...prev,
                                    resume: 'Resume is required',
                                }));
                            } else {
                                setSelectedFile(file); // Store the file in state
                                delete validationErrors.resume;
                                setValidationErrors({ ...validationErrors, resume: undefined, });
                            }
                        }}

                    />
                ),
            },
            {
                accessorKey: 'chatInitiated',
                header: 'Chat',
                enableEditing: false,
                Cell: ({ row }) => (
                    <Box>
                        {row.original.chatInitiated ? (
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() => handleChat(row.original.roomID)}
                            >
                                Chat
                            </Button>
                        ) : (
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() => handleInitiateChat(row.original.id,row.original.positionApplied)}
                            >
                                Initiate Chat
                            </Button>
                        )}
                    </Box>
                ),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                enableEditing: false,
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.status,
                    helperText: validationErrors?.status,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            status: undefined,
                        }),
                },
            },

        ],
        [validationErrors],
    );

    const { mutateAsync: createUser, isPending: isCreatingUser } =
        useCreateUser(selectedFile);
    const {
        data: fetchedUsers = [],
        isError: isLoadingUsersError,
        isFetching: isFetchingUsers,
        isLoading: isLoadingUsers,
    } = useGetUsers(email);
    const { mutateAsync: updateUser, isPending: isUpdatingUser } =
        useUpdateUser(selectedFile);
    const { mutateAsync: deleteUser, isPending: isDeletingUser } =
        useDeleteUser();

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
    const Navigate = useNavigate();
    const [roomID, setRoomId] = useState(null);
    const socket = useRef(null);
    const fields = useContext(AppContext);
    const currentUser = fields.fields.userid;
    const queryClient = useQueryClient();
    useEffect(() => {
        socket.current = io('http://localhost:5000');
        socket.current.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);
    const handleChat = useCallback((id) => {
        Navigate(`Chat/${id}`);
    }, [Navigate]);

    const initiateChat = useCallback(async (applicationId, positionApplied) => {
        const newRoomId = uuidv4(); // Generate a unique room ID
        setRoomId(newRoomId);

        const users = [
            applicationId, // Example ObjectId, replace with actual IDs
            currentUser,
            '609f5f1c9d8a1a001c8b4569',
            '609f5f1c9d8a1a001c8b4570'
        ];

        socket.current.emit('createRoom', { roomID: newRoomId, users, applicationId });

        return newRoomId;
    }, [currentUser]);

    const handleInitiateChat = useCallback(async (applicationId, positionApplied) => {
        try {
            const newRoomId = await initiateChat(applicationId, positionApplied);
            const data = { applicationId, roomID: newRoomId };

            await axios.post('http://localhost:5000/updateChatInitiated', data, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('Chat initiated and application updated');
            Navigate(`Chat/${newRoomId}`);
        } catch (error) {
            console.error('Error updating chatInitiated:', error);
        }
    }, [initiateChat, Navigate]);
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
            const { resume, ...rest } = row.original;
            return rest;
        });
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
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
        // enableEditing: true,
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
        // onCreatingRowCancel: () => setValidationErrors({}),
        // onEditingRowCancel: () => setValidationErrors({}),
        // onEditingRowSave: handleSaveUser,
        // renderRowActions: ({ row, table }) => (
        //     <Box sx={{ display: 'flex', gap: '1rem' }}>
        //         <Tooltip title='Edit'>
        //             <IconButton onClick={() => table.setEditingRow(row)}>
        //                 <EditIcon />
        //             </IconButton>
        //         </Tooltip>
        //         <Tooltip title='Delete'>
        //             <IconButton
        //                 color='error'
        //                 onClick={() => openDeleteConfirmModal(row)}
        //             >
        //                 <DeleteIcon />
        //             </IconButton>
        //         </Tooltip>
        //     </Box>
        // ),
        // renderEditRowDialogContent: ({
        //     table,
        //     row,
        //     internalEditComponents,
        // }) => (
        //     <>
        //         <DialogTitle variant='h5'>Edit Details</DialogTitle>
        //         <DialogContent>
        //             <Grid container spacing={2}>
        //                 {internalEditComponents
        //                     .filter(
        //                         (component) =>
        //                             component?.props?.cell?.column.id !== 'id' &&
        //                             component?.props?.cell?.column.id !== 'status' &&
        //                             component?.props?.cell?.column.id !== 'comments' &&
        //                             component?.props?.cell?.column.id !== 'round1' &&
        //                             component?.props?.cell?.column.id !== 'round2' &&
        //                             component?.props?.cell?.column.id !== 'workerType' &&
        //                             component?.props?.cell?.column.id !== 'workMode' &&
        //                             component?.props?.cell?.column.id !== 'positionName' &&
        //                             component?.props?.cell?.column.id !== 'screeningStatus'
        //                     )
        //                     .map((component, index) => (
        //                         <Grid mt={1} item xs={12} sm={6} key={index}>
        //                             {React.cloneElement(component, {
        //                                 variant: 'outlined',
        //                             })}
        //                         </Grid>
        //                     ))}
        //             </Grid>
        //         </DialogContent>
        //         <DialogActions>
        //             <MRT_EditActionButtons
        //                 variant='text'
        //                 table={table}
        //                 row={row}
        //             />
        //         </DialogActions>
        //     </>
        // ),
        // renderTopToolbarCustomActions: ({ table }) => (
        //     <Box
        //         sx={{
        //             display: 'flex',
        //             gap: '16px',
        //             padding: '8px',
        //             flexWrap: 'wrap',
        //         }}
        //     >
        //         <Button
        //             size='small'
        //             disabled={
        //                 !table.getIsSomeRowsSelected() &&
        //                 !table.getIsAllRowsSelected()
        //             }
        //             onClick={() =>
        //                 handleExportRows(table.getSelectedRowModel().rows)
        //             }
        //             startIcon={<FileDownloadIcon />}
        //         >
        //             Export Selected Rows
        //         </Button>
        //     </Box>
        // ),
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

    return <MaterialReactTable table={table} />;
};

function useCreateUser(selectedFile) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            const formData = new FormData();
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

function useGetUsers(email) {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/get-single-applications?email=${encodeURIComponent(email)}`, {
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

function useUpdateUser(selectedFile, email) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            const formData = new FormData();
            formData.append('firstName', user.firstName);
            formData.append('lastName', user.lastName);
            formData.append('yearsOfExperience', user.yearsOfExperience);
            formData.append('techskills', user.techskills);
            formData.append('location', user.location);
            formData.append('email', email);
            if (selectedFile) {
                formData.append('resume', selectedFile);
            }

            const response = await axios.put(
                `http://localhost:5000/update-application/${user.id}`,
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
        onError: (err, newUserInfo, context) => {
            console.error('Mutation error:', err);
            if (context && context.previousUsers) {
                queryClient.setQueryData(['users'], context.previousUsers);
            }
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
                `http://localhost:5000/delete-application/${userId}`,
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

const ViewProfileTable = () => (
    <QueryClientProvider client={queryClient}>
        <Example />
    </QueryClientProvider>
);

export default ViewProfileTable;

const validateRequired = (value) => !!value.length;
const validateUser = (user) => {
    return {
        firstName: !validateRequired(user.firstName)
            ? 'First Name is Required'
            : '',
        lastName: !validateRequired(user.lastName)
            ? 'Last Name is Required'
            : '',
        email: !validateRequired(user.email)
            ? 'Email is Required'
            : '',
        yearsOfExperience: !validateRequired(user.yearsOfExperience)
            ? 'Year of Experience is Required'
            : '',
        techskills: !validateRequired(user.techskills)
            ? 'Technical Skills are Required'
            : '',
        location: !validateRequired(user.location)
            ? 'Location is Required'
            : '',
    };
};
