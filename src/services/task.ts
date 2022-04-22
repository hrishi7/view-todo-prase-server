import Parse from '../config/config'
import Task from '../types';
import { useTaskStore } from '../stores/task'

const taskStore = useTaskStore();

export const insert = async (newTask: Task) => {
  try {
    const task = new Parse.Object('Task') as Parse.Object<Task>;
    const response = await task.save(newTask) as Parse.Object<Task>;
    if (response) {
      // call pinia action to update global store
      taskStore.addTask(response)
      return { success: true, message: 'Task Added. Relax!' }
    } else {
      return { success: false, message: 'Server Error! try again later' }
    }
  } catch (error: Parse.Error) {
    return { success: false, message: 'Server Error! try again later' + error.message }
  }
}

export const update = async (id: string, updatedInfo: Task) => {
  try {
    const q = new Parse.Query('Task') as Parse.Query;
    const response: Parse.Object<Task> = await q.get(id);
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
    if (updatedResponse) {
      //call pinia action to edit taskStore

      taskStore.editTask(id, updatedResponse)
      return { success: true, message: 'Task Updated' }
    } else {
      return { success: false, message: 'Server Error! try again later' }
    }
  } catch (error: Parse.Error) {
    return { success: false, message: 'Server Error! try again later' + error.message }
  }
}

export const remove = async (id = '') => {
  try {
    const q = new Parse.Query('Task') as Parse.Query;
    const response: Parse.Object<Task> = await q.get(id);
    const deletedResponse: Parse.Object<Task> = await response.destroy();
    if (deletedResponse) {
      taskStore.deleteTask(id);
      return { success: true, message: 'Tasked Removed..' }
    }
    else {
      return { success: false, message: 'Server Error! try again later' }
    }
  } catch (error: Parse.Error) {
    return { success: false, message: 'Server Error! try again later' + error.message }
  }


}

export const getTasks = async () => {
  try {
    const query = new Parse.Query('Task') as Parse.Query;
    const response: Parse.Object<Task>[] = await query.find();
    if (response) {
      taskStore.setTasks(response, taskStore.page + 1);
      return { success: true, message: `${response.length} data Fetched` }
    } else {
      return { success: false, message: 'Server Error! try again later' }
    }
  } catch (error: Parse.Error) {
    return { success: false, message: 'Server Error! try again later' + error.message }
  }
}

export const getTask = async (id: string) => {
  try {
    const q = new Parse.Query('Task') as Parse.Query;
    const response: Parse.Object<Task> = await q.get(id);
    if (response) {
      taskStore.setTask(response)
      return { success: true, message: 'data Found' }
    } else {
      return { success: false, message: 'Server Error! try again later' }
    }
  } catch (error: Parse.Error) {
    return { success: false, message: 'Server Error! try again later' + error.message }
  }
}
