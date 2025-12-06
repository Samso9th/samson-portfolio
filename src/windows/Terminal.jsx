import { Check, Flag } from 'lucide-react';
import { techStack } from '#/constants';
import { WindowControls } from '#/components';
import WindowWrapper from '#/HOC/WindowWrapper';

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Tech Stack</h2>
      </div>

      <div className="tech-stack">
        <p>
          <span className="font-bold">@yourname%</span> show-tech-stack
        </p>
        <br />

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <Check className="check" size={20} />
              <p className="w-32">{category}</p>
              <ul className="flex gap-2 flex-wrap">
                {items.map((item, i) => (
                  <li key={item}>
                    {item}
                    {i < items.length - 1 ? ',' : ''}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check size={20} />5 of 5 stacks loaded successfully, 100%
          </p>
          <p className="text-black">
            <Flag size={15} fill="black" />
            render time: 6ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal');

export default TerminalWindow;
