import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotosListItem from "./PhotosListItem";

const PhotosList = ({ album }) => {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, addResult] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;

  if (isFetching) {
    content = (
      <Skeleton
        className="h-8 w-8"
        times={4}
      />
    );
  } else if (error) {
    content = <div>Error fetching images...</div>;
  } else {
    content = data.map((photo) => {
      return (
        <PhotosListItem
          key={photo.id}
          photo={photo}
        />
      );
    });
  }

  return (
    <div>
      <div className="m-2">
        <Button
          onClick={handleAddPhoto}
          loading={addResult.isLoading}
        >
          + Add Photo
        </Button>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">{content}</div>
    </div>
  );
};

export default PhotosList;
