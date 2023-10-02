import supabase, { supabaseUrl } from './supabase';

// login to the database
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

// Logout the user
export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// signup new account

export async function signup({ fullname, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullname,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

// Get user details
export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

// update the user details
export async function updateCurrentUser({ password, fullname, avatar }) {
  let updateData;

  if (password) updateData = { password };
  if (fullname) updateData = { data: { fullname } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //Now upload the image/avatar of user
  const fileName = `image-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

     
  if (storageError) throw new Error(storageError.message);

  //get the url and then update the user
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) throw new Error(updateError.message);
  return updatedUser;
}
