import { photosLinks, gallery } from '#/constants';
import { WindowControls } from '#/components';
import WindowWrapper from '#/HOC/WindowWrapper';
import useWindowStore from '#/store/window';

const Photos = () => {
  const { openWindow } = useWindowStore();

  const handlePhotoClick = (photo) => {
    const fileType = photo.imageUrl?.includes('.png') ? 'pngFile' : 'jpgFile';
    openWindow(fileType, { imageUrl: photo.imageUrl, name: photo.name });
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2>Photos</h2>
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <h3>Albums</h3>
          <ul>
            {photosLinks.map(({ id, name, icon }) => (
              <li key={id}>
                <img src={icon} className="w-4" alt={name} />
                <p className="text-sm font-medium">{name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="content">
          {gallery.map((photo) => (
            <div
              key={photo.id}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handlePhotoClick(photo)}
            >
              <img
                src={photo.imageUrl}
                alt={photo.name}
                className="w-full h-32 object-cover rounded"
              />
              <p className="text-sm text-center mt-2">{photo.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, 'photos');

export default PhotosWindow;
