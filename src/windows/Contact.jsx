import { socials } from '#/constants';
import { WindowControls } from '#/components';
import WindowWrapper from '#/HOC/WindowWrapper';

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <img
          src="/images/profile.jpg"
          alt="Samson Agbo"
          className="w-20 rounded-full"
        />

        <h3 className="text-xl font-bold">Let's Connect!</h3>

        <p className="text-gray-600">
          Got an idea, a bug to squash, or just want to talk tech? I'm in.
        </p>

        <p className="text-sm text-gray-500">
          📧 your.email@example.com
        </p>

        <ul className="space-y-3">
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
                className="flex items-center gap-3 p-3 rounded-lg text-white hover:opacity-80 transition-opacity"
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;
