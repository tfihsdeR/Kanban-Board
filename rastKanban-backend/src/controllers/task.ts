import Task from "../models/task";

export const createTask = async (req: any, res: any) => {
    try {
        const { title, boardId, createdBy, description, badge, references } = req.body.task;

        const task = new Task({
            title,
            boardId,
            createdBy,
            description,
            badge,
            references
        });

        await task.save();

        res.status(201).json({
            message: "Task created",
            task
        });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}

export const readTaskById = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task found",
            task
        });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}

export const readTasksByBoardId = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const tasks = await Task.find({ boardId: id });

        if (tasks.length === 0) {
            return res.status(404).json({
                message: "Tasks not found"
            });
        }

        res.status(200).json({
            message: "Tasks found",
            tasks
        });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}

export const updateTask = async (req: any, res: any) => {
    try {
        const { _id, title, status, references, description, updatedBy, badge } = req.body.task;

        const task = await Task.findById(_id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        task.title = title;
        task.status = status;
        task.references = references;
        task.updatedBy = updatedBy;
        task.updatedAt = new Date();
        task.description = description;
        task.badge = badge;

        await task.save();

        res.status(200).json({
            message: "Task updated",
            task
        });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}

export const deleteTask = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted"
        });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}

export const readAllTasks = async (req: any, res: any) => {
    try {
        const tasks = await Task.find();

        if (tasks.length === 0) {
            return res.status(404).json({
                message: "Tasks not found"
            });
        }

        res.status(200).json({
            message: "Tasks found",
            tasks
        });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
}