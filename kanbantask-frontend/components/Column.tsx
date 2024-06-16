import { Droppable, Draggable } from "@hello-pangea/dnd"
import { LuDot } from "react-icons/lu"
import { useState } from "react"
import { ITask, IColumnProps } from "@/types/types"
import Modal from "./ui/Modal"
import { useDispatch } from "react-redux"
import { deleteTask, readTasksByBoardId, updateTask } from "@/app/globalRedux/features/taskSlice"
import { AppDispatch } from "@/app/globalRedux/store"
import Loader from "./Loader"

const Column: React.FC<IColumnProps> = ({
    title,
    tasks,
    droppableId
}) => {
    const dispatch = useDispatch<AppDispatch>()

    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [editableTask, setEditableTask] = useState<ITask | null>(null)

    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const openDeleteModal = (task: ITask) => {
        setIsDelete(true);
        setEditableTask(task);
    };

    const closeDeleteModal = () => {
        setIsDelete(false);
        setEditableTask(null);
    };

    const openEditModal = (task: ITask) => {
        setIsEdit(true);
        setEditableTask(task);
    };

    const closeEditModal = () => {
        setIsEdit(false);
        setEditableTask(null);
    };

    const handleEditTask = async (formData: FormData) => {
        const updatedTask: ITask = {
            ...editableTask,
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            badge: formData.get("badge") as string
        }

        await dispatch(updateTask({ task: updatedTask }))
        await dispatch(readTasksByBoardId({ boardId: editableTask!.boardId! }))
    }

    const handleDeleteTask = async (formData: FormData) => {
        await dispatch(deleteTask({ id: editableTask!._id! }))
        await dispatch(readTasksByBoardId({ boardId: editableTask!.boardId! }))
    }

    return (
        <div className="flex-1">
            <div className="flex gap-1 dark:text-white ">
                <h2 className="text-sm font-semibold mb-4 uppercase">
                    {title}
                </h2>
                <LuDot />
            </div>

            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="dark:bg-gray-800 bg-gray-200 rounded-lg p-4"
                    >
                        {tasks.map((task, index) => (
                            <Draggable
                                key={task._id}
                                draggableId={task._id!}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        className="bg-gray-700 rounded p-2 mb-2 text-white flex justify-between items-center"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onMouseEnter={() =>
                                            setHoverIndex(index)
                                        }
                                        onMouseLeave={() => setHoverIndex(null)}
                                    >
                                        <div className="flex flex-col">
                                            <h3 className="text-xl">{task.title}</h3>
                                            <span className="text-base">{task.description}</span>
                                            {task.badge && <span className="text-sm rounded-md border border-spacing-1 border-white px-2 py-1 mt-2">{task.badge}</span>}
                                        </div>
                                        {hoverIndex === index && (
                                            <div className="flex gap-5 flex-wrap">
                                                <span
                                                    className="text-xs text-gray-400 mt-1 cursor-pointer"
                                                    onClick={() =>
                                                        openEditModal(task)
                                                    }
                                                >
                                                    Edit
                                                </span>
                                                <span
                                                    className="text-xs text-gray-400 mt-1 cursor-pointer"
                                                    onClick={() =>
                                                        openDeleteModal(task)
                                                    }
                                                >
                                                    Delete
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Draggable>

                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {isEdit && (
                <Modal
                    closeModal={closeEditModal}
                    isEdit={isEdit}
                    value={editableTask!._id!}
                    action={handleEditTask}
                    modalTitle="Edit Task"
                    title={editableTask!.title}
                    description={editableTask!.description}
                    badge={editableTask!.badge}
                />
            )}
            {isDelete && (
                <Modal
                    closeModal={closeDeleteModal}
                    modalTitle="Are you sure you want to delete this task?"
                    value={editableTask!._id!}
                    action={handleDeleteTask}
                    isDelete={isDelete}
                />
            )}
        </div>
    )
}

export default Column
