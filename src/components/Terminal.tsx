import React, { useState, useEffect, useRef } from 'react';
import { Lock } from 'lucide-react';

interface CommandOutput {
  type: 'text' | 'error' | 'success' | 'info';
  content: string;
}

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    { type: 'info', content: 'Welcome to HackerOS v2.0. Type "help" for available commands.' }
  ]);
  const [isHacking, setIsHacking] = useState(false);
  const [hackProgress, setHackProgress] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isHacking, hackProgress]);

  // Focus input when clicking anywhere
  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'text', content: `root@sys:~$ ${cmd}` } as CommandOutput];

    switch (command) {
      case 'help':
        newHistory.push({
          type: 'info',
          content: 'Available commands:\n- help: Show this message\n- clear: Clear terminal\n- scan: Scan network for vulnerabilities\n- hack <target>: Initiate hack sequence\n- decrypt: Decrypt captured files\n- status: System status report'
        });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'scan':
        newHistory.push({ type: 'info', content: 'Scanning network ranges 192.168.0.0/24...' });
        setTimeout(() => {
            setHistory(h => [...h, { type: 'success', content: 'Scan Complete. 3 Vulnerable targets found:\n1. 192.168.0.105 (Corp_Server)\n2. 192.168.0.112 (Cam_Feed_04)\n3. 192.168.0.150 (Data_Storage)' }]);
        }, 2000);
        break;
      case 'status':
        newHistory.push({ type: 'info', content: 'SYSTEM INTEGRITY: 98%\nPROXY CHAINS: ACTIVE (3 NODES)\nTRACE LEVEL: 0.04% (SAFE)\nCPU LOAD: 12%' });
        break;
      case 'decrypt':
        newHistory.push({ type: 'error', content: 'Error: No encrypted files in buffer. Capture data first.' });
        break;
      default:
        if (command.startsWith('hack')) {
            const target = command.split(' ')[1];
            if (!target) {
                newHistory.push({ type: 'error', content: 'Usage: hack <target_ip_or_name>' });
            } else {
                newHistory.push({ type: 'info', content: `Initiating attack on ${target}...` });
                startHackSimulation();
            }
        } else {
            newHistory.push({ type: 'error', content: `Command not found: ${command}` });
        }
    }

    setHistory(newHistory);
    setInput('');
  };

  const startHackSimulation = () => {
    setIsHacking(true);
    setHackProgress(0);
    const interval = setInterval(() => {
      setHackProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsHacking(false);
          setHistory(h => [...h, { type: 'success', content: 'ACCESS GRANTED. Root privileges obtained. Downloading payload...' }]);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="h-full flex flex-col font-mono text-sm md:text-base">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-20">
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${
            line.type === 'error' ? 'text-red-500' :
            line.type === 'success' ? 'text-green-300 font-bold' :
            line.type === 'info' ? 'text-blue-300' : 'text-green-500'
          }`}>
            {line.content}
          </div>
        ))}

        {isHacking && (
          <div className="my-4 border border-green-500 p-4 bg-green-900/20 rounded">
            <div className="flex items-center gap-2 mb-2 text-green-400">
              <Lock className="w-4 h-4 animate-pulse" />
              <span>BRUTE FORCE ATTACK IN PROGRESS...</span>
            </div>
            <div className="w-full bg-gray-900 h-4 rounded overflow-hidden border border-gray-700">
              <div
                className="h-full bg-green-500 transition-all duration-200"
                style={{ width: `${hackProgress}%` }}
              />
            </div>
            <div className="mt-2 text-xs font-mono text-green-300">
              {generateRandomHexDump()}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="p-4 bg-black border-t border-green-900 flex items-center gap-2">
        <span className="text-green-500 font-bold">root@sys:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-green-100 focus:ring-0"
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
        <div className="w-3 h-5 bg-green-500 animate-pulse" />
      </div>
    </div>
  );
};

function generateRandomHexDump() {
  const chars = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += '0x';
    for (let j = 0; j < 4; j++) {
      result += chars[Math.floor(Math.random() * 16)];
    }
    result += ' ';
  }
  return result;
}
