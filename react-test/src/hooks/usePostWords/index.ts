import { Word } from '@types';
import { useMutation, useQueryClient } from 'react-query';

interface UsePostWordsArgs {
  onSuccess: (data: Response) => void;
}

const usePostWords = ({ onSuccess }: UsePostWordsArgs) => {
  return useMutation(
    (words: string[]) =>
      fetch('/words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ words }),
      }),
    {
      onSuccess: async (response) => {
        if (!response.ok) {
          const data = await response.json();

          // Throws received data as error
          throw data;
        }

        onSuccess(await response.json());

        // queryClient.invalidateQueries('words');
        // formRef.current?.reset();
      },
      onError: (error) => {
        console.error('[POST] /words', error);
      },
    }
  );
};

export { usePostWords };
