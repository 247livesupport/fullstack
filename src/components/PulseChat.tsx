import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// 1. Define what a message looks like to stop the red lines
interface Message {
  text: string;
  user: string;
}

// 2. Give the socket a proper type instead of 'any'
let socket: Socket | null = null;

export default function PulseChat() {
  // 3. Tell the state it will hold an array of Messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket = io("https://022fc716-84bf-4ba4-9f90-0350115b9cb4-00-267rz18hpx4zp.worf.replit.dev", {
      transports: ["polling", "websocket"],
    });

    socket.on('message', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      if (socket) {
        socket.off('message');
        socket.disconnect();
      }
    };
  }, []);

  const send = () => {
    if (input.trim() === '' || !socket) return;
    socket.emit('message', { text: input, user: 'Me' });
    setInput('');
  };

  return (
    <div className="flex flex-col h-80 w-full">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-4 bg-black/40 rounded-2xl border border-white/5 custom-scrollbar">
        {messages.length === 0 && (
          <p className="text-[10px] text-slate-600 text-center mt-10 uppercase tracking-widest">No live messages yet</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`p-3 rounded-2xl text-[11px] border animate-in slide-in-from-bottom-1 ${
            m.user === 'AI' || m.user === 'System' ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-white/5 border-white/10'
          }`}>
            <span className="font-bold text-indigo-400 uppercase mr-2">{m.user}:</span> 
            <span className="text-slate-300">{m.text}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 focus-within:border-indigo-500/50">
        <input 
          className="bg-transparent flex-1 outline-none text-xs px-3 py-2 text-white min-w-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Say hello..."
        />
        <button 
          onClick={send} 
          className="bg-indigo-600 hover:bg-indigo-500 shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all active:scale-95"
        >
          Send
        </button>
      </div>
    </div>
  );
}