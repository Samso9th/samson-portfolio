import { Search } from 'lucide-react';
import clsx from 'clsx';
import { locations } from '#/constants';
import { WindowControls } from '#/components';
import WindowWrapper from '#/HOC/WindowWrapper';
import useWindowStore from '#/store/window';
import useLocationStore from '#/store/location';

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map(({ id, icon, name }) => (
          <li
            key={id}
            className={clsx({
              active: id === activeLocation.id,
              'not-active': id !== activeLocation.id,
            })}
            onClick={() => setActiveLocation(locations[id] || item)}
          >
            <img src={icon} className="w-4" alt={name} />
            <p className="text-sm font-medium truncate">{name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const openItem = (item) => {
    if (item.fileType === 'pdf') {
      return openWindow('resume');
    }

    if (item.kind === 'folder') {
      return setActiveLocation(item);
    }

    if (['fig', 'url'].includes(item.fileType) && item.href) {
      return window.open(item.href, '_blank');
    }

    openWindow(`${item.fileType}File`, item.data || { imageUrl: item.imageUrl, name: item.name });
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList('Favorites', Object.values(locations))}
          {renderList('Work', locations.work.children)}
        </div>

        <ul className="content">
          {activeLocation?.children?.map((item) => (
            <li key={item.id} className={item.position} onClick={() => openItem(item)}>
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, 'finder');

export default FinderWindow;
