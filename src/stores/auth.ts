import { defineStore } from 'pinia';
import Task from 'src/types';
import Parse from '../config/config';
type NewTaskInfo = Omit<Parse.Object<Task>, 'title' & 'description' & 'completed'>

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [] as Array<Parse.Object<Task>>,
        task: null as Parse.Object<Task> | null,
        page: 0,
        limit: 10
    }),
    getters: {
    },
    actions: {
        addTask(newTask: Parse.Object<Task>) {
            this.tasks.push(newTask);
        },
        editTask(id: string, newTaskInfo: NewTaskInfo) {
            const index = this.tasks.findIndex((item) => item.id == id)
            if (index != -1) {
                this.tasks[index] = newTaskInfo
            }
        },
        deleteTask(id: string) {
            const index = this.tasks.findIndex((item) => item.id == id)
            if (index != -1) {
                this.tasks.splice(index, 1)
            }
        },
        setTasks(tasks: Array<Parse.Object<Task>>, page: number) {
            this.tasks = tasks
            this.page = page
        },
        setTask(task: Parse.Object<Task>) {
            this.task = task
        },
        resetStore() {
            this.tasks = [];
            this.task = null;
            this.page = 0,
                this.limit = 10;
        }
    },
});
