type Task = {
    title: string,
    description: string | null,
    completed: boolean
}

type TaskState = {
    tasks: Array<Parse.Object<TaskAttributes>>;
    page: number;
    limit: number;
}

type TaskAttributes = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

type UserAttributes = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date,
    updatedAt: Date,
    sessionToken: string;
}


