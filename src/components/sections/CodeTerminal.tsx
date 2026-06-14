import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Component CodeTerminal giả lập giao diện code editor/terminal hỗ trợ chuyển đổi màu sắc theo theme (light/dark)
const CodeTerminal: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`w-full max-w-lg mx-auto lg:ml-auto lg:mr-0 border transition-all duration-500 relative ${
      isDark 
        ? 'bg-[#0a0a0a] border-[#333333]' 
        : 'bg-[#ffffff] border-[#e5e5e5]'
    }`}>
      {/* Decorative background grid (subtle) */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Terminal Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b transition-all duration-500 ${
        isDark 
          ? 'border-[#333333] bg-[#0f0f0f]' 
          : 'border-[#e5e5e5] bg-[#f5f5f5]'
      }`}>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className={`font-mono text-[10px] tracking-widest uppercase transition-colors duration-500 ${
          isDark ? 'text-[#666]' : 'text-[#999]'
        }`}>terminal.sh</div>
      </div>
      
      {/* Terminal Body with Code Highlighting Simulation */}
      <div className={`p-6 leading-loose overflow-x-auto whitespace-pre font-mono text-[11px] sm:text-xs transition-colors duration-500 ${
        isDark ? 'text-[#a9b7c6]' : 'text-[#080808]'
      }`}>
        <code className="block relative z-10">
          <span className={isDark ? 'text-[#cc7832]' : 'text-[#0033b3]'}>const</span>{' '}
          <span className={isDark ? 'text-[#ffc66d]' : 'text-[#0f766e]'}>Architecture</span> = ({'{ stack }'}) ={' > '} {'{\n'}
          {'  '}<span className={isDark ? 'text-[#cc7832]' : 'text-[#0033b3]'}>const</span> [status, setStatus] ={' '}
          <span className={isDark ? 'text-[#ffc66d]' : 'text-[#74118c]'}>useState</span>(
          <span className={isDark ? 'text-[#6a8759]' : 'text-[#067d17]'}>'STABLE'</span>
          );{'\n\n'}
          {'  '}<span className={isDark ? 'text-[#ffc66d]' : 'text-[#74118c]'}>useEffect</span>(() ={' > '} {'{\n'}
          {'    '}<span className={isDark ? 'text-[#ffc66d]' : 'text-[#74118c]'}>initializeSystem</span>(stack);{'\n'}
          {'    '}<span className={isDark ? 'text-[#9876aa]' : 'text-[#000000]'}>console</span>.
          <span className={isDark ? 'text-[#ffc66d]' : 'text-[#74118c]'}>log</span>(
          <span className={isDark ? 'text-[#6a8759]' : 'text-[#067d17]'}>'Ready'</span>
          );{'\n'}
          {'  '}{'}'}{', [stack]);\n\n'}
          {'  '}<span className={isDark ? 'text-[#cc7832]' : 'text-[#0033b3]'}>return</span> ({'\n'}
          {'    '}<span className={isDark ? 'text-[#e8bf6a]' : 'text-[#0033b3]'}>&lt;Layout&gt;</span>{'\n'}
          {'      '}<span className={isDark ? 'text-[#e8bf6a]' : 'text-[#0033b3]'}>&lt;Component</span>{' '}
          <span className={isDark ? 'text-[#bababa]' : 'text-[#813e00]'}>db</span>=
          {'{stack}'}{' '}
          <span className={isDark ? 'text-[#e8bf6a]' : 'text-[#0033b3]'}>/&gt;</span>{'\n'}
          {'      '}<span className={isDark ? 'text-[#e8bf6a]' : 'text-[#0033b3]'}>&lt;Monitor</span>{' '}
          <span className={isDark ? 'text-[#bababa]' : 'text-[#813e00]'}>val</span>=
          {'{status}'}{' '}
          <span className={isDark ? 'text-[#e8bf6a]' : 'text-[#0033b3]'}>/&gt;</span>{'\n'}
          {'    '}<span className={isDark ? 'text-[#e8bf6a]' : 'text-[#0033b3]'}>&lt;/Layout&gt;</span>{'\n'}
          {'  '});{'\n'}
          {'}'}
        </code>
      </div>

      {/* Terminal Footer (Status Bar) */}
      <div className={`px-4 py-2 border-t transition-all duration-500 ${
        isDark 
          ? 'border-[#333333] bg-[#0f0f0f] text-[#555]' 
          : 'border-[#e5e5e5] bg-[#f5f5f5] text-[#999]'
      } flex justify-between text-[10px] font-mono`}>
        <span>[+] DEV.ENV: ACTIVE</span>
        <span>LATENCY: 12MS</span>
      </div>
    </div>
  );
};

export default CodeTerminal;
