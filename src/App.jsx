import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Navbar, Dock, Welcome, Home } from '#/components';
import { Terminal, Safari, Contact, Resume, Finder, Text, PngWindow, JpgWindow, Photos } from '#/windows';

gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Home />
      <Dock />
      
      {/* Windows */}
      <Finder />
      <Safari />
      <Photos />
      <Contact />
      <Terminal />
      <Resume />
      <Text />
      <PngWindow />
      <JpgWindow />
    </main>
  );
}

export default App;
