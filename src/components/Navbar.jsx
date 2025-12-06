import dayjs from 'dayjs';
import { navLinks, navIcons } from '#/constants';
import useWindowStore from '#/store/window';

const Navbar = () => {
  const { openWindow } = useWindowStore();

  const handleNavClick = (type) => {
    openWindow(type);
  };

  return (
    <nav>
      <div className="flex items-center gap-4">
        <img src="/images/logo.svg" alt="logo" className="w-5 h-5" />
        <p className="font-bold">Samson's Portfolio</p>
      </div>

      <ul>
        {navLinks.map(({ id, name, type }) => (
          <li key={id} onClick={() => handleNavClick(type)}>
            <p className="text-sm font-medium truncate">{name}</p>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <ul className="flex items-center gap-3">
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className="icon-hover" />
            </li>
          ))}
        </ul>

        <time className="text-sm">
          {dayjs().format('ddd MMM D h:mm A')}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;
