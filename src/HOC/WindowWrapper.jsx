import { useRef, useLayoutEffect, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import useWindowStore from '#/store/window';

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex, isMaximized } = windows[windowKey] || {};
    const ref = useRef(null);
    const draggableRef = useRef(null);
    const resizersRef = useRef([]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      
      el.style.display = isOpen ? 'block' : 'none';
    }, [isOpen]);

    // Handle maximize/restore
    useEffect(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      if (isMaximized) {
        // Disable dragging and resizing when maximized
        if (draggableRef.current) {
          draggableRef.current[0].disable();
        }

        // Hide resize handles
        const resizers = el.querySelectorAll('.resizer');
        resizers.forEach(resizer => resizer.style.display = 'none');

        gsap.to(el, {
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          x: 0,
          y: 0,
          borderRadius: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        // Re-enable dragging when restored
        if (draggableRef.current) {
          draggableRef.current[0].enable();
        }

        // Show resize handles
        const resizers = el.querySelectorAll('.resizer');
        resizers.forEach(resizer => resizer.style.display = 'block');

        gsap.to(el, {
          width: 'auto',
          height: 'auto',
          borderRadius: '8px',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }, [isMaximized, isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = 'block';

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      // Make window draggable
      const instance = Draggable.create(el, {
        trigger: el.querySelector('#window-header'),
        bounds: window,
        onPress: () => focusWindow(windowKey),
      });

      draggableRef.current = instance;

      // Add resize functionality
      const resizers = el.querySelectorAll('.resizer');
      resizersRef.current = [];

      resizers.forEach((resizer) => {
        const direction = resizer.dataset.direction;
        let startX, startY, startWidth, startHeight, startLeft, startTop;

        const onMouseDown = (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          focusWindow(windowKey);

          startX = e.clientX;
          startY = e.clientY;
          
          const rect = el.getBoundingClientRect();
          startWidth = rect.width;
          startHeight = rect.height;
          startLeft = rect.left;
          startTop = rect.top;

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
          
          el.style.userSelect = 'none';
          document.body.style.cursor = window.getComputedStyle(resizer).cursor;
        };

        const onMouseMove = (e) => {
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;

          if (direction.includes('e')) {
            el.style.width = Math.max(400, startWidth + dx) + 'px';
          }
          if (direction.includes('s')) {
            el.style.height = Math.max(300, startHeight + dy) + 'px';
          }
          if (direction.includes('w')) {
            const newWidth = Math.max(400, startWidth - dx);
            if (newWidth >= 400) {
              el.style.width = newWidth + 'px';
              el.style.left = (startLeft + dx) + 'px';
            }
          }
          if (direction.includes('n')) {
            const newHeight = Math.max(300, startHeight - dy);
            if (newHeight >= 300) {
              el.style.height = newHeight + 'px';
              el.style.top = (startTop + dy) + 'px';
            }
          }
        };

        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
          el.style.userSelect = '';
          document.body.style.cursor = '';
        };

        resizer.addEventListener('mousedown', onMouseDown);
        resizersRef.current.push(() => resizer.removeEventListener('mousedown', onMouseDown));
      });

      return () => {
        instance[0].kill();
        resizersRef.current.forEach(cleanup => cleanup());
      };
    }, []);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }}>
        <Component {...props} />
        
        {/* Resize handles */}
        <div className="resizer resizer-n" data-direction="n"></div>
        <div className="resizer resizer-e" data-direction="e"></div>
        <div className="resizer resizer-s" data-direction="s"></div>
        <div className="resizer resizer-w" data-direction="w"></div>
        <div className="resizer resizer-ne" data-direction="ne"></div>
        <div className="resizer resizer-nw" data-direction="nw"></div>
        <div className="resizer resizer-se" data-direction="se"></div>
        <div className="resizer resizer-sw" data-direction="sw"></div>
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;

  return Wrapped;
};

export default WindowWrapper;
