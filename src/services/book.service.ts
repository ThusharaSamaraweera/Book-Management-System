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

  static addBook = async (book: NewBook) => {
    return await restClient(HTTPS_METHODS.POST, `books`, book, undefined)
      .then((res) => {
        console.log("🚀 ~ file: book.service.ts:25 ~ BookService ~ .then ~ res:", res)
        return res.data
      })
      .catch((err) => {
        console.error(err);
        throw new Error("Failed to add book");
      });
  }
}
