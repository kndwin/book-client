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

export const EDIT_BOOK = gql`
  mutation EditBookMutation($editBookId: String!, $editBookInput: BookInput) {
    editBook(id: $editBookId, input: $editBookInput) {
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

export const AUTHORIZE_USER = gql`
  query Query($authorizeToken: String) {
    authorize(token: $authorizeToken) {
      id
      name
      email
      image
      role
    }
  }
`;

export const UPDATE_USERROLE = gql`
  mutation UpdateUserRole($email: String) {
    id
  }
`;
