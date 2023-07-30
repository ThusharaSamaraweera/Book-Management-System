export interface IBook {
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