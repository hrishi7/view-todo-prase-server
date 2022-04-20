import Parse from '../config/config'
import Task from '../types';
import { useTaskStore } from '../stores/task'

const taskStore = useTaskStore();

export const insert = async (newTask: Task) => {
  try {
    const task = new Parse.Object('Task') as Parse.Object<Task>;
    const response = await task.save(newTask);
    if (response) {
      // call pinia action to update global store
      taskStore.addTask(response)
      return 'Task Added. Relax!'
    } else {
      return 'Server Error! try again later'
    }
  } catch (error) {
    return 'Server Error! try again later'
  }
}

export const update = async (id = '', updatedInfo: Task) => {
  try {
    const q = new Parse.Query('Task');
    const response = await q.get(id);
    if (updatedInfo.title) {
      response.set('title', updatedInfo.title);
    }
    if (updatedInfo.description) {
      response.set('description', updatedInfo.description);
    }
    if (updatedInfo.completed != undefined) {
      response.set('completed', updatedInfo.completed);
    }
    const updatedResponse = await response.save() as Parse.Object<Task>;
    if (response) {
      //call pinia action to edit taskStore

      taskStore.editTask(id, updatedResponse)
      return 'Updated';
    } else {
      return 'Server Error! try again later'
    }
  } catch (error) {
    return 'Server Error! try again later'
  }
}

export const deleteTask = async (id = '') => {
  try {
    const q = new Parse.Query('Task');
    const response = await q.get(id);
    const deletedResponse = await response.destroy();
    if (deletedResponse) {
      taskStore.deleteTask(id);
      return 'Tasked Removed..';
    }
    else {
      return 'Server Error! try again later'
    }
  } catch (error) {
    return 'Server Error! try again later'
  }


}

export const getTasks = async () => {
  try {
    const query = new Parse.Query('Task');
    const response: Parse.Object<Task>[] = await query.find();
    if (response) {
      taskStore.setTasks(response, taskStore.page + 1);
    }
  } catch (error) {
    return { data: [], message: 'Server Error! try again later' }
  }
}

export const getTask = async (id = '') => {
  try {
    const query = new Parse.Query('Task');
    const response = await query.get(id) as Parse.Object<Task>;
    if (response) {
      taskStore.setTask(response)
    } else {
      return 'No Data Found';
    }
  } catch (error) {
    return 'Server Error! try again later'
  }
}
