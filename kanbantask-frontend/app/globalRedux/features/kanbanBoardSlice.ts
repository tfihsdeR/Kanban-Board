import { IKanbanBoard } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const url = 'http://localhost:4000';

interface KanbanBoardState {
    board: IKanbanBoard,
    boards: IKanbanBoard[],
    message: string | null,
    error: string | null,
    loading: boolean
}

export const initialState: KanbanBoardState = {
    board: {
        _id: '',
        title: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: '',
        createdBy: ''
    },
    boards: [],
    message: null,
    error: null,
    loading: false
};

export const createCanbanBoard = createAsyncThunk(
    'kanbanBoard/create',
    async (state: { kanbanBoard: IKanbanBoard }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + '/api/kanbanBoard/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const readKanbanBoardById = createAsyncThunk(
    'kanbanBoard/readById',
    async (state: { id: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + `/api/kanbanBoard/read/${state.id}`)

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const readKanbanBoardByName = createAsyncThunk(
    'kanbanBoard/readByName',
    async (state: { name: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + '/api/kanbanBoard/read', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const readAllKanbanBoards = createAsyncThunk(
    'kanbanBoard/readAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(url + '/api/kanbanBoard/readall', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateKanbanBoard = createAsyncThunk(
    'kanbanBoard/update',
    async (state: { kanbanBoard: IKanbanBoard }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + '/api/kanbanBoard/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteKanbanBoard = createAsyncThunk(
    'kanbanBoard/delete',
    async (state: { id: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(url + '/api/kanbanBoard/delete/' + state.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error);
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

const kanbanBoardSlice = createSlice({
    name: 'kanbanBoard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create a KanbanBoard
        builder.addCase(createCanbanBoard.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(createCanbanBoard.fulfilled, (state, action) => {
                state.board = action.payload.kanbanBoard;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(createCanbanBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action!.payload! as string;
                // state.error = action.error as string;
            })

            // ReadKanban a Board By Id
            .addCase(readKanbanBoardById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(readKanbanBoardById.fulfilled, (state, action) => {
                state.board = action.payload.kanbanBoard;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(readKanbanBoardById.rejected, (state, action) => {
                state.loading = false;
                state.error = action!.payload! as string;
                // state.error = action.payload as string;
            })

            // Read a Kanban Board By Name
            .addCase(readKanbanBoardByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(readKanbanBoardByName.fulfilled, (state, action) => {
                state.board = action.payload.kanbanBoard;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(readKanbanBoardByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action!.payload! as string;
                // state.error = action.error.message as string;
            })

            // Read All Kanban Boards
            .addCase(readAllKanbanBoards.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(readAllKanbanBoards.fulfilled, (state, action) => {
                state.boards = action.payload.kanbanBoards;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(readAllKanbanBoards.rejected, (state, action) => {
                state.loading = false;
                state.error = action!.payload! as string;
                // state.error = action.error.message as string;
            })

            // Update a Kanban Board
            .addCase(updateKanbanBoard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateKanbanBoard.fulfilled, (state, action) => {
                state.board = action.payload.kanbanBoard;
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(updateKanbanBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action!.payload! as string;
                // state.error = action.error.message as string;
            })

            // Delete a Kanban Board
            .addCase(deleteKanbanBoard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteKanbanBoard.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(deleteKanbanBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action!.payload! as string;
                // state.error = action.error.message as string;
            })
    }
});

export default kanbanBoardSlice.reducer;