import { HTTPS_METHODS, restClient } from "../utils/restClient";

export default class BookService {

  static getAllBooks = async (title?: string, author?: string, genre?: string) => {
    return await restClient(HTTPS_METHODS.GET, `books`, {}, undefined, { title, author, genre })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error("Failed to fetch books");
      });
  };
}
