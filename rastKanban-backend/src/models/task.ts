import { Schema, model, Document } from "mongoose";
import { Status } from "../types/types";

interface ITask extends Document {
    title: string;
    status?: Status;
    boardId: Schema.Types.ObjectId;
    references?: Schema.Types.ObjectId[];
    createdAt: Date;
    createdBy: string;
    updatedAt?: Date;
    updatedBy?: string;
    description?: string;
}

const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: [true, "Please enter your name."],
        trim: true,
        maxlength: [100, "Your name can not exceed 100 characters."]
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.TODO,
        required: true
    },
    boardId: {
        type: Schema.Types.ObjectId,
        ref: "KanbanBoard",
        required: true
    },
    references: [{
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: false
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: false, // TODO: Change to true and delete the default value
        default: "Add User"
    },
    updatedAt: {
        type: Date,
        required: false
    },
    updatedBy: {
        type: String,
        required: false, // TODO: Change to true and delete the default value
        default: "Add User"
    },
    description: {
        type: String,
        required: false
    }
});

const Task = model<ITask>("Task", taskSchema);
export default Task;