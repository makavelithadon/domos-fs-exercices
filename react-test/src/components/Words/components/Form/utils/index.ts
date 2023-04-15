import { isObject } from 'lodash';
import type { ApiError } from '@types';

const isApiError = (maybeError: unknown): maybeError is ApiError => {
  return Boolean(
    maybeError &&
      isObject(maybeError) &&
      'status' in maybeError &&
      typeof maybeError.status === 'number' &&
      (String(maybeError.status).startsWith('4') || String(maybeError.status).startsWith('5'))
  );
};

const formatInput = (str: string): string[] => {
  return str.split(' ').filter(Boolean);
};

export { isApiError, formatInput };
