import { WindowControls } from '#/components';
import WindowWrapper from '#/HOC/WindowWrapper';
import useWindowStore from '#/store/window';

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtFile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtFile" />
        <h2>{name}</h2>
      </div>

      <div>
        {image && <img src={image} alt={name} className="w-full max-h-64 object-cover" />}
        
        <div className="p-6 space-y-4">
          {subtitle && <h3 className="text-xl font-bold text-gray-700">{subtitle}</h3>}
          
          {description && description.map((paragraph, i) => (
            <p key={i} className="text-gray-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, 'txtFile');

export default TextWindow;
