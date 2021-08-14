export type Book = {
  id: string;
  title: string;
  description: string;
  authors: string[];
  categories: string[];
  publisher: string;
  publishedDate: string;
  pageCount: string;
  imageLinks: {
    smallThumbnail: string;
  };
};

export type BookInput = {
  id: string;
  title: string;
  description: string;
  publisher: string;
  publishedDate: string;
  pageCount: string;
  authors: string;
  imageLinks: string;
  amount: string;
};

export type User = {
  id: string;
  name: string;
  role: string;
  image: string;
  email: string;
};
