export enum Status {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DESIGNED = "DESIGNED",
    BACKLOG = "BACKLOG"
}

export interface CustomError extends Error {
    statusCode?: number;
    code?: number;
    keyValue?: Record<string, any>;
    path?: string;
    errors?: Record<string, any>;
}