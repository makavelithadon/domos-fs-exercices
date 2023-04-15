import { Word } from '@types';
import { useQuery } from 'react-query';

const useGetWords = () => {
  return useQuery<Word[]>('words', () => fetch('/words').then((res) => res.json()));
};

export { useGetWords };
