import { useCallback, useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { Button, TextInput } from 'flowbite-react';

import { ErrorMessage } from '@components/ErrorMessage';
import { usePostWords } from '@hooks/usePostWords';
import { formatInput, isApiError } from './utils';

import './index.css';

const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isPosting,
    error: postError,
  } = usePostWords({
    onSuccess() {
      queryClient.invalidateQueries('words');
      inputRef.current!.value = '';
    },
  });

  const handleAddWords = useCallback(() => {
    mutate(formatInput(inputRef.current!.value));
  }, [inputRef]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (inputRef.current?.value.trim() === '') {
        return;
      }

      inputRef.current?.blur();
      handleAddWords();
    },
    [inputRef]
  );

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        name="words"
        required
        color={postError ? 'failure' : 'gray'}
        className="words-container"
        ref={inputRef}
      />
      <Button type="submit" disabled={isPosting}>
        Add&#160;words
      </Button>
      {isApiError(postError) && (
        <ErrorMessage message={postError.message} className="flex-basis--full" />
      )}
    </form>
  );
};

export { Form };
