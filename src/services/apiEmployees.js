import supabase, { supabaseUrl } from './supabase';

export async function getEmployees() {
  const { data: session } = await supabase.auth.getSession();
  const id = session?.session?.user?.id;
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('created_by', id);

  if (error) throw new Error(error.message);
  return data;
}

// create an employee
export async function createEditEmployee(newEmployee, id) {
  const imageName = `${Math.random()}-${newEmployee.avatarUrl.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;

  let query = supabase.from('employees');

  if (!id) query = query.insert([{ ...newEmployee, avatarUrl: imagePath }]);

  const { data, error } = await query.select().single();

  if (error) throw new Error(error.message);

  //   upload an image to bucket

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(imageName, newEmployee.avatarUrl);

  if (storageError) throw new Error(storageError.message);
  return data;
}

// Delete an employee
export async function deleteEmployee(id) {
  const { data, error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
  return { data };
}
