import { useMutation, useQuery } from "@apollo/client";
import { Table, Button, useToasts } from "@geist-ui/react";
import { DELETE_BOOK, EDIT_BOOK, GET_BOOKS } from "graphql/queries";
import { useEffect, useState } from "react";
import type { BookInput } from "type";
import EditBookModal from "./EditBookModal";
import RemoveConfirmationModal from "./RemoveConfirmationModal";

type SavedBooksProps = { forceUpdate: () => number };

export default function SavedBooks({ forceUpdate }: SavedBooksProps) {
  const { loading, error, data, refetch } = useQuery(GET_BOOKS, {
    onError: (e) => console.log(JSON.stringify(e, null, 2)),
  });
  const [editModal, setEditModal] = useState(false);
  const [table, setTable] = useState([]);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [bookDetails, setBookDetails] = useState<BookInput>();
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    onCompleted: () =>
      setToast({
        type: "default",
        text: `${bookDetails?.title} - ${bookDetails?.authors} is removed`,
      }),
    onError: (e) => console.log(JSON.stringify(e, null, 2)),
    errorPolicy: "all",
  });
  const [editBook] = useMutation(EDIT_BOOK);
  const [, setToast] = useToasts();

  const removeBook = () => {
    deleteBook({
      variables: { deleteBookId: bookDetails?.id },
    });
    setOpenConfirmationModal(false);
  };

  const removeButton = (_: any, rowData: any) => {
    const confirmRemoving = () => {
      setBookDetails(rowData.rowValue);
      setOpenConfirmationModal(true);
    };
    return (
      <Button onClick={() => confirmRemoving()} type="error" auto size="mini">
        Remove
      </Button>
    );
  };

  const updateButton = (_: any, rowData: any) => {
    const loadEditModal = () => {
      setBookDetails(rowData.rowValue);
      setEditModal(true);
      console.log(rowData.rowValue);
    };
    return (
      <Button type="secondary" onClick={() => loadEditModal()} auto size="mini">
        Update
      </Button>
    );
  };

  useEffect(() => {
    refetch();
  }, [forceUpdate]);

  useEffect(() => {
    console.log({ data });
    if (data == undefined) {
    } else {
      const { books } = data;
      const tableToSet = books.map((book: BookInput) => {
        return {
          ...book,
          updateButton,
          removeButton,
        };
      });
      setTable(tableToSet);
    }
  }, [data]);

  if (error) {
    console.error(error);
    return null; // TODO: Pop error modal
  }

  if (loading) {
    console.log(`Loading: ${loading}`);
    return null; // TODO: Make a loading component
  }

  return (
    <>
      <Table data={table}>
        <Table.Column prop="title" label="title" />
        <Table.Column prop="authors" label="author(s)" />
        <Table.Column prop="publishedDate" label="published date" />
        <Table.Column prop="publisher" label="publisher" />
        <Table.Column prop="pageCount" label="page count" />
        <Table.Column prop="amount" label="Book Stock" />
        <Table.Column prop="updateButton" label="Update" />
        <Table.Column prop="removeButton" label="remove" />
      </Table>
      <EditBookModal
        bookDetails={bookDetails}
        setEditModal={setEditModal}
        editModal={editModal}
        editBook={editBook}
      />
      <RemoveConfirmationModal
        openConfirmationModal={openConfirmationModal}
        setOpenConfirmationModal={setOpenConfirmationModal}
        removeBook={removeBook}
        bookDetails={bookDetails}
      />
    </>
  );
}
