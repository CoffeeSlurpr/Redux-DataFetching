import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { useDeleteAlbumMutation } from "../store";
import PhotosList from "./PhotosList";

const AlbumListItem = ({ album }) => {
  const [deleteAlbum, deleteResult] = useDeleteAlbumMutation();

  const handleDeleteClick = () => {
    deleteAlbum(album);
  };

  const header = (
    <>
      <Button
        className="mr-3"
        loading={deleteResult.isLoading}
        onClick={handleDeleteClick}
      >
        <GoTrashcan />
      </Button>
      <div>{album.title}</div>
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
};

export default AlbumListItem;
