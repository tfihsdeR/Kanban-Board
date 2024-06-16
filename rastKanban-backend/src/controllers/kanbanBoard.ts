import KanbanBoard from "../models/kanbanBoard";
import Task from "../models/task";

export const createKanbanBoard = async (req: any, res: any) => {
    try {
        const { title, description, createdBy } = req.body.kanbanBoard;

        const kanbanBoard = new KanbanBoard({
            title,
            description,
            createdBy
        });

        await kanbanBoard.save();

        res.status(201).json({
            message: "KanbanBoard created",
            kanbanBoard
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

export const readKanbanBoardByTitle = async (req: any, res: any) => {
    try {
        const { title } = req.body;

        const kanbanBoard = await KanbanBoard.findOne({ title })

        if (!kanbanBoard) {
            return res.status(404).json({
                message: "KanbanBoard not found"
            });
        }

        res.status(200).json({
            message: "KanbanBoard found",
            kanbanBoard
        });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}

export const readKanbanBoardById = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const kanbanBoard = await KanbanBoard.findById(id);

        if (!kanbanBoard) {
            return res.status(404).json({
                message: "KanbanBoard not found"
            });
        }

        res.status(200).json({
            message: "KanbanBoard found",
            kanbanBoard
        });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}

export const readAllKanbanBoards = async (req: any, res: any) => {
    try {
        const kanbanBoards = await KanbanBoard.find();

        if (!kanbanBoards) {
            return res.status(404).json({
                message: "KanbanBoards not found"
            });
        }

        res.status(200).json({
            message: "KanbanBoards found",
            kanbanBoards
        });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}

export const updateKanbanBoard = async (req: any, res: any) => {
    try {
        const { _id, title, description, updatedBy } = req.body.kanbanBoard;

        if (!updatedBy) {
            return res.status(400).json({
                message: "updatedBy is required"
            });
        }

        const kanbanBoard = await KanbanBoard.findById(_id);

        if (!kanbanBoard) {
            return res.status(404).json({
                message: "KanbanBoard not found"
            });
        }

        kanbanBoard.title = title;
        kanbanBoard.description = description;
        kanbanBoard.updatedBy = updatedBy;
        kanbanBoard.updatedAt = new Date();

        await kanbanBoard.save();

        res.status(200).json({
            message: "KanbanBoard updated",
            kanbanBoard
        });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}

export const deleteKanbanBoard = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const kanbanBoard = await KanbanBoard.findByIdAndDelete(id);

        if (!kanbanBoard) {
            return res.status(404).json({
                message: "KanbanBoard not found"
            });
        }

        const tasks = await Task.find({ kanbanBoardId: id });

        if (tasks.length > 0) {
            await Task.deleteMany({ kanbanBoardId: id });
        }

        res.status(200).json({
            message: "KanbanBoard deleted"
        });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}