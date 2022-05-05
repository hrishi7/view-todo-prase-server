type Task = {
    title: string,
    description: string | null,
    completed: boolean
}

type TaskState = {
    tasks: Array<Parse.Object<Task>>;
    page: number;
    limit: number;
}