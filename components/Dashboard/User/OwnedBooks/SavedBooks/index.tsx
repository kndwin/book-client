import { useMutation, useQuery } from "@apollo/client";
import { FiSearch } from "react-icons/fi";
import { Table, Button, useToasts } from "@geist-ui/react";
import { DELETE_BOOK, EDIT_BOOK, GET_BOOKS_FROM_USER } from "graphql/queries";
import { useEffect, useState } from "react";
import type { BookInput } from "types";
import EditBookModal from "./EditBookModal";
import RemoveConfirmationModal from "./RemoveConfirmationModal";
import { useSession } from "next-auth/client";

export default function SavedBooks() {
  const [session, loading] = useSession();
  const {
    loading: queryLoading,
    error,
    data,
    refetch,
  } = useQuery(GET_BOOKS_FROM_USER, {
    variables: { userId: session?.user?.id },
    onError: (e) => console.log(JSON.stringify(e, null, 2)),
  });
  const [editModal, setEditModal] = useState(false);
  const [table, setTable] = useState([]);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [bookDetails, setBookDetails] = useState<BookInput>();
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS_FROM_USER }],
    onCompleted: () =>
      setToast({
        type: "error",
        text: `${bookDetails?.title} - ${bookDetails?.authors} is removed`,
      }),
    onError: (e) => console.log(JSON.stringify(e, null, 2)),
    errorPolicy: "all",
  });
  const [editBook] = useMutation(EDIT_BOOK, {
    refetchQueries: [{ query: GET_BOOKS_FROM_USER }],
    onCompleted: () =>
      setToast({
        type: "secondary",
        text: `${bookDetails?.title} - ${bookDetails?.authors} is edited`,
      }),
    onError: (e) => console.log(JSON.stringify(e, null, 2)),
    errorPolicy: "all",
  });
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
    };
    return (
      <Button type="secondary" onClick={() => loadEditModal()} auto size="mini">
        Update
      </Button>
    );
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data == undefined) {
    } else {
      console.log(data);
      const { booksFrom } = data;

      const tableToSet = booksFrom?.map((book: BookInput) => {
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
    return null; // TODO: Pop error modal
  }

  if (loading) {
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
