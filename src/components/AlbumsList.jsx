import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";

import Skeleton from "./Skeleton";
import Button from "./Button";

import AlbumListItem from "./AlbumsListItem";

const AlbumsList = ({ user }) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, addResult] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;

  if (isFetching) {
    content = (
      <Skeleton
        times={3}
        className="h-10 w-full"
      />
    );
  } else if (error) {
    content = <div>Error loading albums...</div>;
  } else {
    content = data.map((album) => {
      return (
        <AlbumListItem
          album={album}
          key={album.id}
        />
      );
    });
  }

  return (
    <div>
      <div className="m-2">
        <Button
          onClick={handleAddAlbum}
          loading={addResult.isLoading}
        >
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
