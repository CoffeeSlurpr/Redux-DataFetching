import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import Button from "../components/Button";
import Skeleton from "./Skeleton";
import useThunk from "../hooks/useThunk";
import UsersListItem from "./UsersListItem";

function UsersList() {
  //* Loading handling via internal state
  /* const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] = useState(null); */

  //* Custom hook to avoid declaring tons of state
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
  const [doAddUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, []);

  //! in useThunk
  /* useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .catch((error) => {
        setLoadingUsersError(error);
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  }, []); */

  const handleAddUser = () => {
    doAddUser();

    //! in useThunk
    /* setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap()
      .catch((error) => {
        setCreatingUserError(error);
      })
      .finally(() => {
        setIsCreatingUser(false);
      }); */
  };

  let content;

  if (isLoadingUsers) {
    content = (
      <Skeleton
        times={6}
        className="h-10 w-full"
      />
    );
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return (
        <UsersListItem
          user={user}
          key={user.id}
        />
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button
          onClick={handleAddUser}
          loading={isCreatingUser}
        >
          + Add User
        </Button>
        {creatingUserError && "error creating user..."}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
