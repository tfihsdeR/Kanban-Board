'use client'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/globalRedux/store'
import { createTask, readTasksByBoardId, updateTask } from '@/app/globalRedux/features/taskSlice'
import toast from 'react-hot-toast'
import { IKanbanBoard, ITask, Status } from '@/types/types'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import Loader from './Loader'
import Column from './Column'
import { FaPlus } from 'react-icons/fa'
import Modal from './ui/Modal'

const Board: React.FC<{ board: IKanbanBoard }> = ({ board }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { tasks, loading, error } = useSelector((state: RootState) => state.taskState);
    const [isCreate, setIsCreate] = useState(false);

    const [_tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        const readTasks = async () => {
            if (board._id) {
                await dispatch(readTasksByBoardId({ boardId: board!._id! }))
            }
        }

        readTasks()
    }, [dispatch, board]);

    useEffect(() => {
        if (tasks.length > 0 && tasks[0].boardId === board._id) {
            setTasks(tasks);
        } else {
            setTasks([]);
        }
    }, [tasks]);

    useEffect(() => {
        let isMounted = true; // This flag denotes if the component is mounted

        setTimeout(() => {
            if (isMounted && error) {
                toast.error(error);
            }
        }, 200);

        // Cleanup function to set isMounted to false when component unmounts
        return () => {
            isMounted = false;
        };
    }, [error]);


    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const draggedTask = _tasks.find(task => task._id === draggableId);

        let updatedStatus: Status

        switch (destination.droppableId) {
            case Status.TODO:
                updatedStatus = Status.TODO
                break
            case Status.IN_PROGRESS:
                updatedStatus = Status.IN_PROGRESS
                break
            case Status.DESIGNED:
                updatedStatus = Status.DESIGNED
                break
            case Status.BACKLOG:
                updatedStatus = Status.BACKLOG
                break
            default:
                updatedStatus = draggedTask!.status!
        }

        const updatedTasks = _tasks.map(task => {
            if (task._id === draggableId) {
                return {
                    ...task,
                    status: updatedStatus
                }
            }
            return task
        })

        setTasks(updatedTasks)

        const newTask = {
            ...draggedTask!,
            status: updatedStatus
        }

        await dispatch(updateTask({ task: newTask }))
    }

    if (loading) {
        <Loader />
    }

    const OpenModal = () => {
        setIsCreate(true);
    };

    const CloseModal = () => {
        setIsCreate(false);
    };

    const CreateTask = async (formData: FormData) => {
        const updatedTask: ITask = {
            title: formData.get('title') as string,
            boardId: board._id!,
            description: formData.get('description') as string,
            badge: formData.get('badge') as string,
        }

        await dispatch(createTask({ task: updatedTask }))
        await dispatch(readTasksByBoardId({ boardId: board._id! }))
    }

    return (
        <div className="py-10 relative h-full min-h-screen mt-[-75px]">
            <h1 className="font-bold text-center mt-10 mb-10 text-3xl">
                {board!.title}
            </h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid md:grid-cols-4 max-md:items-center w-[90%] max-w-[1500px] mx-auto md:gap-5 gap-10">
                    <button
                        className="bg-gray-700 rounded-full hover:bg-gray-600 text-white font-bold p-4 fixed right-10 bottom-10"
                        onClick={OpenModal}
                    >
                        <FaPlus />
                    </button>

                    {/* modal for creation of a new task */}
                    {isCreate && (
                        <Modal
                            closeModal={CloseModal}
                            modalTitle="Create New Task"
                            isCreate={isCreate}
                            action={CreateTask}
                            value={board._id!}
                        />
                    )}
                    <Column
                        title={Status.BACKLOG}
                        tasks={_tasks ? _tasks!.filter(task => task.status === Status.BACKLOG) : []}
                        droppableId={Status.BACKLOG}
                    />
                    <Column
                        title={Status.TODO}
                        tasks={_tasks ? _tasks!.filter(task => task.status === Status.TODO) : []}
                        droppableId={Status.TODO}
                    />
                    <Column
                        title={Status.IN_PROGRESS}
                        tasks={_tasks ? _tasks!.filter(task => task.status === Status.IN_PROGRESS) : []}
                        droppableId={Status.IN_PROGRESS}
                    />
                    <Column
                        title={Status.DESIGNED}
                        tasks={_tasks ? _tasks!.filter(task => task.status === Status.DESIGNED) : []}
                        droppableId={Status.DESIGNED}
                    />
                </div>
            </DragDropContext>
        </div>
    )
}

export default Board
