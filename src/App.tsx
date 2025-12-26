import { useState, useEffect } from 'react';
import { Terminal } from './components/Terminal';
import { BootSequence } from './components/BootSequence';

function App() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    // Prevent context menu
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="w-full h-screen bg-black text-green-500 font-mono overflow-hidden relative">
      <div className="scanline"></div>

      {!booted ? (
        <BootSequence onComplete={() => setBooted(true)} />
      ) : (
        <div className="crt-flicker h-full w-full p-4">
          <Terminal />
        </div>
      )}
    </div>
  );
}

export default App;
