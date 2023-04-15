import { ListGroup } from 'flowbite-react';

import type { Word } from '@types';

import './index.css';

interface ListProps {
  words: Word[];
}

const List = ({ words }: ListProps) => {
  return (
    <div className="words">
      <ListGroup className="words__list">
        {words.map((word) => (
          <ListGroup.Item key={word} className="word">
            {word}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export { List };
