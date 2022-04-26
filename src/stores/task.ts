import { defineStore } from 'pinia';
import type Task from 'src/types';
import Parse from '../config/config';


interface State {
  tasks: Array<Parse.Object<Task>>;
  task: Parse.Object<Task> | null;
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
    async addTask(newTask: Task) {
      try {
        const task = new Parse.Object('Task') as Parse.Object<Task>;
        const response = await task.save(newTask) as Parse.Object<Task>;
        if (response) {
          this.tasks.push(response);
          return { success: true, message: 'Task Added. Relax!' }
        } else {
          return { success: false, message: 'Server Error! try again later' }
        }
      } catch (err) {
        const error = err as Parse.Error;
        return { success: false, message: 'Server Error! try again later' + error.message }
      }
    },
    async editTask(id: string, updatedInfo: Task | null) {
      try {
        const q = new Parse.Query('Task') as Parse.Query;
        const response = await q.get(id) as Parse.Object<Task>;
        if (updatedInfo && updatedInfo.title) {
          response.set('title', updatedInfo.title);
        }
        if (updatedInfo && updatedInfo.description) {
          response.set('description', updatedInfo.description);
        }
        if (updatedInfo && updatedInfo.completed != undefined) {
          response.set('completed', updatedInfo.completed);
        }
        const updatedResponse = await response.save() as Parse.Object<Task>;
        if (updatedResponse) {
          const index = this.tasks.findIndex((item) => item.id == id)
          if (index != -1) {
            this.tasks[index] = updatedResponse
          }
          return { success: true, message: 'Task Updated' }
        } else {
          return { success: false, message: 'Server Error! try again later' }
        }
      } catch (err) {
        const error = err as Parse.Error;
        return { success: false, message: 'Server Error! try again later' + error.message }
      }


    },
    async deleteTask(id: string) {
      try {
        const q = new Parse.Query('Task') as Parse.Query;
        const response = await q.get(id) as Parse.Object<Task>;
        const deletedResponse: Parse.Object<Task> = await response.destroy();
        if (deletedResponse) {
          const index = this.tasks.findIndex((item) => item.id == id)
          if (index != -1) {
            this.tasks.splice(index, 1)
          }
          return { success: true, message: 'Tasked Removed..' }
        }
        else {
          return { success: false, message: 'Server Error! try again later' }
        }
      } catch (err) {
        const error = err as Parse.Error;
        return { success: false, message: 'Server Error! try again later' + error.message }
      }


    },
    async getTasks() {
      try {
        const query = new Parse.Query('Task') as Parse.Query;
        const response = await query.find() as Array<Parse.Object<Task>>;
        if (response) {
          this.tasks = response
          this.page = this.page + 1
          return { success: true, message: `${response.length} data Fetched` }
        } else {
          return { success: false, message: 'Server Error! try again later' }
        }
      } catch (err) {
        const error = err as Parse.Error;
        return { success: false, message: 'Server Error! try again later' + error.message }
      }


    },
    async getTask(id: string) {
      try {
        const q = new Parse.Query('Task') as Parse.Query;
        const response = await q.get(id) as Parse.Object<Task>;
        if (response) {
          this.task = response;
          return { success: true, message: 'data Found' }
        } else {
          return { success: false, message: 'Server Error! try again later' }
        }
      } catch (err) {
        const error = err as Parse.Error;
        return { success: false, message: 'Server Error! try again later' + error.message }
      }

    },
    resetStore() {
      this.tasks = [];
      this.task = null;
      this.page = 0;
      this.limit = 10;
    }
  },
});
