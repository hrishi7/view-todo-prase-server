import { defineStore } from 'pinia';
import Parse from '../config/config';
import loglevel from 'loglevel';

type Tasks = TaskState['tasks'];

export const useTaskStore = defineStore('tasks', {
  state: (): TaskState => ({
    tasks: [] as Parse.Object<TaskAttributes>[],
    page: 0,
    limit: 10
  }),
  getters: {
    /**
     * Return all tasks in their attributes form
     */
    tasksAttributes: state => state.tasks.map(e => ({ ...e.attributes })),

    /**
     * get Task by Id
     */
    task: state => (id: string) => state.tasks.find(e => e.id === id),
    /**
     * get specific task attributes
     */
    taskAttributes: (state) => (id: string) => {
      return state.tasks.find(e => e.id === id)?.attributes as TaskAttributes
    },
    getFinishedList: (state: TaskState): Tasks => state.tasks.filter(x => x.get('completed')),
    getPendingList: (state: TaskState): Tasks => state.tasks.filter(x => !x.get('completed')),
    getAllList: (state: TaskState): Tasks => [...state.tasks.filter(x => !x.get('completed')), ...state.tasks.filter(x => x.get('completed'))]
  },
  actions: {
    async addTask(attributes: Task): Promise<void> {
      const task = new Parse.Object('Task', attributes) as Parse.Object<TaskAttributes>;
      try {
        await task.save();

        //fetch task again to get the updated attributes
        await task.fetch();
        this.tasks.push(task);

      } catch (error) {
        loglevel.error(error);
        if (error instanceof Parse.Error || error instanceof Error) {
          throw error.message
        }
        if (typeof error === 'string') {
          throw error;
        }
        if (typeof error === 'object') {
          throw JSON.stringify(error);
        }
      }
    },

    async editTask(taskid: string, attributes: TaskAttributes) {
      const index = this.tasks.findIndex(e => e.id === taskid);
      //cloning and replacing task at index is required for reactivity
      const task = index > -1 ? this.tasks[index].clone() : null;
      if (!task) throw new Error('Task not found');
      task.id = taskid;
      task.set(attributes);

      try {
        await task.save();
        //fetch again to get updated attributes
        await task.fetch();
      } catch (error) {
        loglevel.error(error);
        if (error instanceof Parse.Error || error instanceof Error) {
          throw error.message
        }
        if (typeof error === 'string') {
          throw error;
        }
        if (typeof error === 'object') {
          throw JSON.stringify(error);
        }
      } finally {
        this.tasks[index] = task
      }
    },

    async deleteTask(taskid: string) {
      const task = this.tasks.find((task) => task.id === taskid);
      if (!task) {
        throw new Error('Task not found');
      }
      try {
        await task.destroy();
      } catch (error) {
        loglevel.error(error);
        throw new Error('Error deleting Task')
      } finally {
        this.tasks = this.tasks.filter((task) => task.id !== taskid)
      }
    },

    async getTasks() {
      const query = new Parse.Query<Parse.Object<TaskAttributes>>('Task');
      try {
        const response = await query.find();
        this.tasks = response
        this.page = this.page + 1
      } catch (error: unknown) {
        loglevel.error(error);
        /**
         * possible errors
         * Network / backend / any other
         */
        throw new Error('Error fetching Tasks')
      }
    },

    resetStore() {
      this.tasks = [];
      this.page = 0;
      this.limit = 10;
    }
  },
});
