import React from 'react';
import { Footer as FlowBiteFooter } from 'flowbite-react';
import './index.css';

const Footer = () => {
  return (
    <FlowBiteFooter container={true}>
      <div className="w-full text-center">
        <div className="w-full justify-center sm:flex sm:items-center">
          <FlowBiteFooter.Brand
            href="https://domosfs.com/"
            src="https://domosfs.com/wp-content/uploads/2016/12/blanc.png"
            alt="Domos FS Logo"
            target="_blank"
          />
        </div>
        <FlowBiteFooter.Divider />
        <FlowBiteFooter.Copyright
          href="https://domosfs.com/"
          by="Domos FS"
          year={new Date().getFullYear()}
        />
      </div>
    </FlowBiteFooter>
  );
};

export { Footer };
