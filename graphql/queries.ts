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
      userId
    }
  }
`;

export const GET_BOOKS_FROM_USER = gql`
  query ($userId: String) {
    booksFrom(userId: $userId) {
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

export const GET_ALL_USERS = gql`
  {
    all {
      id
      name
      image
      email
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

export const GET_USER = gql`
  query Query($email: String) {
    me(email: $email) {
      id
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserMutation($id: String!, $user: UserInput) {
    updateUser(id: $id, user: $user) {
      id
      name
      image
      role
      email
    }
  }
`;

export const GET_USER_WITH = gql`
  query Query($user: UserInput) {
    usersWith(user: $user) {
      id
      email
      name
      image
    }
  }
`;
