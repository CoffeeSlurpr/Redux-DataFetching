import { useDeletePhotoMutation } from "../store";
import { GoTrashcan } from "react-icons/go";

const PhotosListItem = ({ photo }) => {
  const [deletePhoto] = useDeletePhotoMutation();

  const handleDeletePhoto = () => {
    deletePhoto(photo);
  };

  return (
    <div
      onClick={handleDeletePhoto}
      className="relative cursor-pointer"
    >
      <img
        src={photo.url}
        alt="album image"
      />
      <div className="absolute inset-0 flex items-center justify-center hover: bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrashcan className="text-3xl" />
      </div>
    </div>
  );
};

export default PhotosListItem;
