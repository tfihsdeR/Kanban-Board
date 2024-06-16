import express from "express";
import {
    createKanbanBoard,
    deleteKanbanBoard,
    readAllKanbanBoards,
    readKanbanBoardById,
    readKanbanBoardByTitle,
    updateKanbanBoard
} from "../controllers/kanbanBoard";

const router = express.Router();

router.post("/kanbanBoard/create", createKanbanBoard);
router.get("/kanbanBoard/read", readKanbanBoardByTitle);
router.get("/kanbanBoard/read/:id", readKanbanBoardById);
router.get("/kanbanBoard/readAll", readAllKanbanBoards);
router.put("/kanbanBoard/update", updateKanbanBoard);
router.delete("/kanbanBoard/delete/:id", deleteKanbanBoard);

export default router;