export interface IBook {
  title: string;
  author: string;
  publicationYear: number;
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

export type NewBook = Omit<IBook, "createdBy">;

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}