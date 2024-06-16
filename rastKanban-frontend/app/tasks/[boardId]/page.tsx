'use client'
import React, { useEffect } from 'react'
import { useDispatch, UseDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/globalRedux/store'
import { readKanbanBoardById } from '@/app/globalRedux/features/kanbanBoardSlice'
import toast from 'react-hot-toast'
import Loader from '@/components/Loader'
import Board from '@/components/Board'
import { usePathname } from 'next/navigation'

const Tasks = ({ params }: { params: { boardId: string } }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { board, error, loading } = useSelector((state: RootState) => state.kanbanBoard);

    const pathname = usePathname()

    useEffect(() => {
        const readBoard = async () => {
            await dispatch(readKanbanBoardById({ id: params.boardId }))
        }
        readBoard()
    }, [dispatch, pathname, params.boardId]);

    if (loading) { <Loader /> }

    return (
        <Board board={board} />
    )
}

export default Tasks
