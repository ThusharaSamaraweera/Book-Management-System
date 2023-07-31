export interface IBook {
  _id: string;
  title: string;
  author: string;
  publicationYear: string;
  genre: string;
  createdBy: string;
}

export interface FilterValues {
  title?: string;
  author?: string;
  genre?: string;
  page: number;
  limit: number;
}

export type NewBook = Omit<IBook, "createdBy" | "_id">;

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginPayload {
  user: IUser;
  token: string;
}