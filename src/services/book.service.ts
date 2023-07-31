import { FilterValues, NewBook } from "../modal";
import { HTTPS_METHODS, restClient } from "../utils/restClient";

export default class BookService {
  static filterBooks = async (filterValues: FilterValues) => {
    return await restClient(HTTPS_METHODS.GET, `books`, {}, undefined, {
      title: filterValues?.title,
      author: filterValues?.author,
      genre: filterValues?.genre,
      page: filterValues?.page,
      limit: filterValues?.limit,
    })
      .then((res) => {
        return res.data?.data?.books;
      })
      .catch((err) => {
        console.error(err);
        throw new Error("Failed to fetch books");
      });
  };

  static addBook = async (book: NewBook, userId: string) => {
    return await restClient(HTTPS_METHODS.POST, `users/${userId}/books`, book, undefined)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        throw new Error("Failed to add book");
      });
  };

  static getBook = async (bookId: string) => {
    return await restClient(HTTPS_METHODS.GET, `books/${bookId}`, {}, undefined)
      .then((res) => {
        return res?.data?.data;
      })
      .catch((err) => {
        console.error(err);
        throw new Error("Failed to get book");
      });
  };


  static updateBook = async (bookId: string, book: NewBook, userId: string) => {
    return await restClient(HTTPS_METHODS.PATCH, `users/${userId}/books/${bookId}`, book, undefined)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        throw new Error("Failed to update book");
      });
  }

  static deleteBook = async (bookId: string, userId: string) => {
    return await restClient(HTTPS_METHODS.DELETE, `users/${userId}/books/${bookId}`, {}, undefined)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        throw new Error("Failed to delete book");
      });
  }
}

