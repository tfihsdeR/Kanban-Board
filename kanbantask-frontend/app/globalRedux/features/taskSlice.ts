import { ITask, Status } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const url = 'http://localhost:4000';

interface TaskState {
    task: ITask,
    tasks: ITask[],
    message: string | null,
    error: string | null,
    loading: boolean
}

export const initialState: TaskState = {
    task: {
        _id: '',
        title: '',
        status: Status.TODO,
        boardId: '',
        references: [],
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: '',
        createdBy: ''
    },
    tasks: [],
    message: null,
    error: null,
    loading: false
};

export const createTask = createAsyncThunk(
    'task/create',
    async (state: { task: ITask }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + '/api/task/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const readTaskById = createAsyncThunk(
    'task/readById',
    async (state: { id: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + `/api/task/read/${state.id}`)

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const readTasksByBoardId = createAsyncThunk(
    'task/readByBoardId',
    async (state: { boardId: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + `/api/task/readByBoardId/${state.boardId}`)

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateTask = createAsyncThunk(
    'task/update',
    async (state: { task: ITask }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + '/api/task/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteTask = createAsyncThunk(
    'task/delete',
    async (state: { id: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + `/api/task/delete/${state.id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        clearTask: (state) => {
            state.task = initialState.task;
            state.message = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Create Task
        builder.addCase(createTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.loading = false;
            state.task = action.payload.task;
            state.message = action.payload.message;
        });
        builder.addCase(createTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action!.payload! as string;
            // state.error = action!.error!.message!
        });

        // Read Task By Board Id
        builder.addCase(readTaskById.pending, (state) => {
            state.error = null;
            state.loading = true;
        });
        builder.addCase(readTaskById.fulfilled, (state, action) => {
            state.loading = false;
            state.task = action.payload.task;
            state.message = action.payload.message;
        });
        builder.addCase(readTaskById.rejected, (state, action) => {
            state.loading = false;
            state.error = action!.payload! as string;
            // state.error = action!.error!.message!
        });

        // Read Tasks By Board Id
        builder.addCase(readTasksByBoardId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(readTasksByBoardId.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload.tasks;
            state.message = action.payload.message;
        });
        builder.addCase(readTasksByBoardId.rejected, (state, action) => {
            state.loading = false;
            state.error = action!.payload! as string;
        });

        // Update Task
        builder.addCase(updateTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.loading = false;
            state.task = action.payload.task;
            state.message = action.payload.message;
        });
        builder.addCase(updateTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action!.payload! as string;
            // state.error = action!.error!.message!
        });

        // Delete Task
        builder.addCase(deleteTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        });
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action!.payload! as string;
            // state.error = action!.error!.message!
        });
    }
});

export default taskSlice.reducer;