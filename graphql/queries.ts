import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  {
    books {
      id
      title
      authors
      description
      publisher
      publishedDate
      imageLink
      pageCount
      amount
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBookMutation($addBookInput: BookInput) {
    addBook(input: $addBookInput) {
      id
    }
  }
`;

// TODO
export const EDIT_BOOK = gql`
  mutation EditBookMutation($editBookInput: BookInput) {
    editBook(input: $editBookInput) {
      id
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBookMutation($deleteBookId: String!) {
    deleteBook(id: $deleteBookId) {
      id
      title
      authors
    }
  }
`;
