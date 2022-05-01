export type IError = Record<string, any>;

import { ObjectId } from 'mongodb';
import { Request } from 'express';

export type Ref<T> = T | ObjectId;

export type PageLimit = {
  page: number;
  limit: number;
};
export type PaginateResults = {
  next?: PageLimit;
  previous?: PageLimit;
};

export type TError = {
  name: string;
  message?: string;
  kind?: string;
};

export type TContext = { req: Request };
