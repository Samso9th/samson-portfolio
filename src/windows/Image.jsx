import { WindowControls } from '#/components';
import WindowWrapper from '#/HOC/WindowWrapper';
import useWindowStore from '#/store/window';

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.pngFile?.data || windows.jpgFile?.data;

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target={data.imageUrl?.includes('.png') ? 'pngFile' : 'jpgFile'} />
        <h2>{name}</h2>
      </div>

      <div className="p-6 bg-gray-100">
        <img src={imageUrl} alt={name} className="w-full h-auto object-contain" />
      </div>
    </>
  );
};

const PngWindow = WindowWrapper(Image, 'pngFile');
const JpgWindow = WindowWrapper(Image, 'jpgFile');

export { PngWindow, JpgWindow };
