import { defineStore } from 'pinia';
import Task from 'src/types';
import Parse from '../config/config';


interface State {
  tasks: Array<Parse.Object<Task>>;
  task: Parse.Object<Task>;
  page: number;
  limit: number;
}
type Tasks = State['tasks'];

export const useTaskStore = defineStore('task', {
  state: (): State => ({
    tasks: [],
    task: null,
    page: 0,
    limit: 10
  }),
  getters: {
    getFinishedList: (state: State): Tasks => state.tasks.filter(x => x.get('completed')),
    getPendingList: (state: State): Tasks => state.tasks.filter(x => !x.get('completed')),
    getAllList: (state: State): Tasks => [...state.tasks.filter(x => !x.get('completed')), ...state.tasks.filter(x => x.get('completed'))]
  },
  actions: {
    addTask(newTask: Parse.Object<Task>) {
      this.tasks.push(newTask);
    },
    editTask(id: string, newTaskInfo: Parse.Object<Task>) {
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
      this.page = 0;
      this.limit = 10;
    }
  },
});
