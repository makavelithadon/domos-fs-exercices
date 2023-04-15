import { rest } from 'msw';
import { isValidWord } from '@helpers/words';

import { Word } from '@types';
import { words as mockWords } from './data';

const GLOBAL_DELAY_IN_MS = 1000;

const OK_RESPONSE_STATUS_CODE = 200;
const CREATED_RESPONSE_STATUS_CODE = 201;
const BAD_REQUEST_RESPONSE_STATUS_CODE = 400;

export type BadRequestError = {
  status: 400;
  error: 'BadRequest';
  message: string;
};

const badRequestError: Omit<BadRequestError, 'message'> = {
  status: 400,
  error: 'BadRequest',
};

const createBadRequestError = (message: BadRequestError['message']): BadRequestError => ({
  ...badRequestError,
  message,
});

const handlers = [
  rest.get('/words', (_, res, ctx) => {
    return res(
      ctx.delay(GLOBAL_DELAY_IN_MS),
      ctx.status(OK_RESPONSE_STATUS_CODE),
      ctx.json<Word[]>([...mockWords.values()])
    );
  }),
  rest.post<Word[], Word[] | BadRequestError>('/words', async (req, res, ctx) => {
    const args = await req.json();
    const words = args.words as Word[];

    for (const word of words) {
      const isValid = isValidWord(word);

      // Should we ignore the case here?
      // if ever, it can be done with:
      // const hasAlreadyWord = [...data].map(n => n.toLowerCase()).includes(word.toLowerCase())
      const hasAlreadyWord = mockWords.has(word);

      if (!isValid || hasAlreadyWord) {
        const badRequestErrorMessage = !isValid
          ? `Provided word "${word}" is not valid.`
          : `Duplicated word: "${word}".`;

        return res(
          ctx.delay(GLOBAL_DELAY_IN_MS),
          ctx.status(BAD_REQUEST_RESPONSE_STATUS_CODE),
          ctx.json(createBadRequestError(badRequestErrorMessage))
        );
      }
    }

    for (const word of words) {
      mockWords.add(word);
    }

    return res(
      ctx.delay(GLOBAL_DELAY_IN_MS),
      ctx.status(CREATED_RESPONSE_STATUS_CODE),
      ctx.json<Word[]>(words)
    );
  }),
];

export { handlers };
