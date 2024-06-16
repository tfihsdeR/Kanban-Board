'use client'

import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit"
import {
    kanbanBoardSlice,
    taskSlice
} from "./features"

export const store = configureStore({
    reducer: {
        kanbanBoard: kanbanBoardSlice,
        taskState: taskSlice
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>