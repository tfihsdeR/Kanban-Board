'use client'

import SyncLoader from "react-spinners/SyncLoader";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"
import Input from "./ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/globalRedux/store";
import { createCanbanBoard } from "@/app/globalRedux/features/kanbanBoardSlice";
import { createTask } from "@/app/globalRedux/features/taskSlice";
import { IKanbanBoard, ITask } from "@/types/types";
import Button from "./ui/Button";

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
}

const OnboardingForm = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { board, error, message, loading } = useSelector((state: RootState) => state.kanbanBoard);

    const [step, setStep] = useState(1);

    const stepOneSubmit = async (e: any) => {
        e.preventDefault();

        await handleCreateBoard(e);

        if (error) {
            toast.error(error);

            setTimeout(() => {
                router.push("/boards")
            }, 2000);
            return;
        }

        setStep(2);
    }

    const stepTwoSubmit = async (e: any) => {
        e.preventDefault();

        await handleCreateTask(e);

        setTimeout(() => {
            router.replace("/boards")
            toast.success("Onboarding completed successfully.");
        }, 3000);
    }

    const goBack = () => {
        setStep(1);
    };

    const handleCreateBoard = async (e: any) => {
        const board: IKanbanBoard = {
            title: e.target.boardTitle.value,
            createdBy: 'add user'
        }

        dispatch(createCanbanBoard({ kanbanBoard: board }));
    };

    const handleCreateTask = async (e: any) => {
        const task: ITask = {
            title: e.target.task.value,
            boardId: board?._id as string,
            createdBy: 'add user'
        }

        dispatch(createTask({ task: task }))
    };

    useEffect(() => {
        if (error) {
            toast.error(message);
        }
    }, [error]);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full items-center justify-center pt-[82px] w-[90%] mx-auto max-w-[1450px] text-white"
        >
            {step === 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full text-center"
                >
                    <h1 className="mb-10 text-4xl font-bold uppercase">
                        Let's give your board a name!
                    </h1>

                    <form
                        className="flex flex-col items-center gap-10"
                        onSubmit={stepOneSubmit}
                    >
                        <Input
                            name="boardTitle"
                            type="text"
                            placeholder="Board name"
                            disabled={loading}
                        />
                        <Button
                            text="Continue"
                            type="submit"
                            buttonSize="lg"
                        />
                        {loading ? (
                            <div className="flex gap-3 items-center text-white">
                                <SyncLoader color="#fff" />
                                <span>Getting Your Board Ready</span>
                            </div>
                        ) : null}
                    </form>
                </motion.div>
            )}

            {step === 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full text-center"
                >
                    <h1 className="mb-10 text-4xl font-bold uppercase">
                        Let's Add a task!
                    </h1>
                    <form
                        onSubmit={stepTwoSubmit}
                        className="flex flex-col gap-10 items-center"
                    >
                        <Input
                            type="text"
                            name="task"
                            placeholder="Task..."
                            disabled={loading}
                        />

                        <div className="flex justify-between w-4/5 mb-10">
                            <Button
                                text="&#8592; Go Back"
                                onClick={goBack}
                                giveOpacity={loading}
                                buttonSize="lg"
                            />
                            <Button
                                text="Continue"
                                type="submit"
                                giveOpacity={loading}
                                buttonSize="lg"
                            />
                        </div>
                        {loading ? (
                            <div className="flex gap-3 items-center text-white">
                                <SyncLoader color="#fff" />
                                <span>Getting Your Board Ready</span>
                            </div>
                        ) : null}
                    </form>
                </motion.div>
            )}
        </motion.div>
    )
}

export default OnboardingForm
