import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, GET_USER_BY_ID } from './queries';
import { CREATE_USER, DELETE_USER } from './mutations';

export const useUsers = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  return { data, loading, error };
};

export const useUserById = (id: string) => {
  const { data, loading, error } = useQuery(GET_USER_BY_ID, { variables: { id } });
  return { data, loading, error };
};

export const useCreateUser = () => {
  const [createUser] = useMutation(CREATE_USER);
  return createUser;
};

export const useDeleteUser = () => {
  const [deleteUser] = useMutation(DELETE_USER);
  return deleteUser;
};
