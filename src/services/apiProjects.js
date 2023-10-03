import supabase from './supabase';

// create and update the new or existing Project
export async function createEditProject(newProject, id) {
  let query = supabase.from('projects');
  // create a new Project
  if (!id) query = query.insert([{ ...newProject }]);
  // update the existing project
  if (id) query = query.update([{ ...newProject }]).eq('id', id);
  const { data, error } = await query.select().single();

  if (error) throw new Error(error.message);
  return data;
}

// Get all projects related to the logged in user
export async function getProjects() {
  const { data: session } = await supabase.auth.getSession();
  const id = session?.session?.user?.id;

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('created_by', id);

  if (error) throw new Error(error.message);
  return data;
}

// Delete the project

export async function deleteProject(id) {
  const { data, error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return data;
}
