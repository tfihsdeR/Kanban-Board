import { Schema, model, Document } from "mongoose";

interface IKanbanBoard extends Document {
    title: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    updatedBy?: string;
    createdBy: string;
}

const kanbanBoardSchema = new Schema<IKanbanBoard>({
    title: {
        type: String,
        required: [true, "Please enter the title."],
        trim: true,
        maxlength: [100, "The title can not exceed 100 characters."]
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: false
    },
    updatedBy: {
        type: String,
        required: false
    },
    createdBy: {
        type: String,
        required: true
    }
});

const KanbanBoard = model<IKanbanBoard>("KanbanBoard", kanbanBoardSchema);
export default KanbanBoard;