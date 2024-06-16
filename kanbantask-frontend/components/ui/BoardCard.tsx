'use client'

import React, { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { IKanbanBoard } from '@/types/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/globalRedux/store';
import { deleteKanbanBoard, readAllKanbanBoards, updateKanbanBoard } from '@/app/globalRedux/features/kanbanBoardSlice';
import toast from 'react-hot-toast';
import Input from './Input';
import Button from './Button';

const BoardCard = ({
    board,
    navigate
}: {
    board: IKanbanBoard,
    navigate: string
}) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [boardTitle, setBoardTitle] = useState<string>(board!.title!);

    const handleDelete = async () => {
        const deleteBoard = async () => {
            await dispatch(deleteKanbanBoard({ id: board._id! }));
            await dispatch(readAllKanbanBoards());
        }

        toast.promise(
            deleteBoard(),
            {
                loading: 'Deleting board...',
                success: 'Board deleted successfully.',
                error: 'Failed to delete board.'
            }
        )
    }

    const handleUpdateBoard = (e: any) => {
        e.preventDefault();

        setIsEditing(false);

        const updatedBoard: IKanbanBoard = {
            ...board,
            updatedBy: 'user', // TODO: Implement user
            title: e.target.title.value,
        }

        const updateBoard = async () => {
            await dispatch(updateKanbanBoard({ kanbanBoard: updatedBoard }));
            await dispatch(readAllKanbanBoards())
        }

        toast.promise(
            updateBoard(),
            {
                loading: 'Updating board...',
                success: 'Board updated successfully.',
                error: 'Failed to update board.'
            }
        )
    }

    const handleIsEditing = async () => {
        setIsEditing(!isEditing);
    }

    const handleEditButton = async () => {
        await handleIsEditing();

        if (isEditing) {
            setBoardTitle(board.title);
        }
    }

    return (
        <div className="flex flex-col justify-center p-4 rounded-md shadow-md w-96 max-md:w-80 mx-2 h-48 bg-purple-400 text-black text-2xl font-bold">
            <form
                className="flex flex-col gap-5 justify-center items-center w-full"
                onSubmit={handleUpdateBoard}
            >
                <Input
                    name='title'
                    type="text"
                    placeholder="Title"
                    value={boardTitle}
                    smallGap={true}
                    fontSize='xl'
                    removeUnderline={!isEditing}
                    textCenter={true}
                    onChange={e => setBoardTitle(e.target.value)}
                    disabled={!isEditing}
                />

                <Button
                    text="Update"
                    type="submit"
                    disabled={!isEditing}
                    buttonSize="xs"
                    hidden={!isEditing}
                    textAlignment="center"
                />
            </form>


            {!isEditing && (
                <>
                    <span className="text-sm">Created By: {board.createdBy}</span>
                    <span className="text-xs">{board?.createdAt?.toString().substring(0, 10)}</span>
                    <div>
                        <button
                            className="rounded-lg border-2 border-black px-1 font-normal text-sm active:scale-90 transition-all duration-200 cursor-pointer hover:bg-purple-600"
                            onClick={() => router.push(navigate)}
                        >
                            Tasks &#8594;
                        </button>
                    </div>
                </>

            )}
            <div className="flex justify-center gap-3 mt-2 items-center">
                <MdDeleteForever onClick={handleDelete} className="text-red-700 cursor-pointer transition-all duration-300 hover:scale-150 active:scale-110" />
                <CiEdit onClick={handleEditButton} className="transition-all duration-300 hover:scale-150 cursor-pointer active:scale-110" />
            </div>
        </div>
    )
}

export default BoardCard