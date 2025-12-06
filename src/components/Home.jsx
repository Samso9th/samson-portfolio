import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import { locations } from '#/constants';
import useWindowStore from '#/store/window';
import useLocationStore from '#/store/location';

const Home = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  const projects = locations.work?.children || [];

  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow('finder');
  };

  useGSAP(() => {
    Draggable.create('.folder');
  }, []);

  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={`group folder ${project.position}`}
            onClick={() => handleOpenProjectFinder(project)}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
