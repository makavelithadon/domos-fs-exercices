import { Spinner } from 'flowbite-react';

import { Footer } from '@components/Footer';
import { Form } from '@components/Words/components/Form';
import { List } from '@components/Words/components/List';

import { useGetWords } from '@hooks/useGetWords';

import './App.css';

const App = () => {
  const { data: words, isLoading: isFetching, isSuccess } = useGetWords();

  return (
    <>
      <section>
        <h1 className="text-5xl font-bold mb-7">Add some words to my list</h1>
        <Form />
        {isSuccess && <List words={words} />}
        {isFetching && (
          <div className="flex justify-center mt-6">
            <Spinner aria-label="Default status example" />
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export { App };
