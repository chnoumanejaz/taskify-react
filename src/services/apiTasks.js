import supabase, { supabaseUrl } from './supabase';

// Get tasks for the specific project
export async function getTasksByProject(projectId) {
  const { data: session } = await supabase.auth.getSession();

  const id = session?.session?.user?.id;

  const { data, error } = await supabase
    .from('tasks')
    .select('*, employees(name, avatarUrl)')
    .eq('forProject', projectId)
    .eq('created_by', id);

  if (error) throw new Error(error.message);
  return data;
}

// create and update the new or existing Task
export async function createEditTasks(newTask, id) {
  const hasFilePath = newTask.fileUrl?.startsWith?.(supabaseUrl);

  const fileUrl = `${Math.random()}-${newTask.fileUrl?.name}`.replaceAll(
    '/',
    ''
  );
  const filePath = hasFilePath
    ? newTask.avatarUrl
    : `${supabaseUrl}/storage/v1/object/public/files/${fileUrl}`;

  let query = supabase.from('tasks');
  // create a new task
  if (!id) query = query.insert([{ ...newTask, fileUrl: filePath }]);
  // update the existing task
  if (id)
    query = query.update([{ ...newTask, fileUrl: filePath }]).eq('id', id);

  const { data, error } = await query.select().single();
  if (error) throw new Error(error.message);

  //   upload file to bucket
  if (hasFilePath) return data;

  const { error: storageError } = await supabase.storage
    .from('files')
    .upload(fileUrl, newTask.fileUrl);

  if (storageError) {
    await supabase.from('tasks').delete().eq('id', data.id);
    throw new Error(storageError.message);
  }

  return data;
}

// Delete a task
export async function deleteTask(id) {
  const { data, error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return data;
}

// Get tasks by id
export async function getTasksById(taskId) {
  const { data: session } = await supabase.auth.getSession();
  const userId = session?.session?.user?.id;

  const { data, error } = await supabase
    .from('tasks')
    .select('*, employees(*), projects(*)')
    .eq('id', taskId)
    .eq('created_by', userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Update only the status of task
export async function updateSingleColumn(id, doneStatus) {
  const newValue = doneStatus !== true ? 'due' : 'complete';

  const { data, error } = await supabase
    .from('tasks')
    .update({ status: newValue })
    .eq('id', id);

  if (error) throw new Error(error.message);
  return data;
}
