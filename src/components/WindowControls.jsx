import { useRef } from 'react';
import gsap from 'gsap';
import useWindowStore from '#/store/window';

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, windows } = useWindowStore();
  const windowRef = useRef(null);

  const handleMinimize = () => {
    // Get the window element
    const windowElement = document.getElementById(target);
    if (!windowElement) return;

    // Get dock position (bottom center of screen)
    const dockElement = document.getElementById('dock');
    const dockRect = dockElement?.getBoundingClientRect();
    
    // Animate to dock
    gsap.to(windowElement, {
      scale: 0,
      x: dockRect ? dockRect.left + dockRect.width / 2 : window.innerWidth / 2,
      y: dockRect ? dockRect.top : window.innerHeight - 100,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        minimizeWindow(target);
        // Reset transform for when it opens again
        gsap.set(windowElement, { clearProps: 'all' });
      }
    });
  };

  const handleMaximize = () => {
    const isMaximized = windows[target]?.isMaximized;
    maximizeWindow(target, !isMaximized);
  };

  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} title="Close" />
      <div className="minimize" onClick={handleMinimize} title="Minimize" />
      <div className="maximize" onClick={handleMaximize} title="Maximize" />
    </div>
  );
};

export default WindowControls;
