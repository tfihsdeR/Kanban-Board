export interface IKanbanBoard {
    _id?: string;
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
    updatedBy?: string;
    createdBy?: string;
}

export interface ITask {
    _id?: string;
    title: string;
    boardId?: string;
    createdBy?: string;
    status?: Status;
    references?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    updatedBy?: string;
    description?: string;
}

export enum Status {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DESIGNED = "DESIGNED",
    BACKLOG = "BACKLOG"
}

export interface IColumnProps {
    title: string;
    tasks: ITask[];
    droppableId: string;
}