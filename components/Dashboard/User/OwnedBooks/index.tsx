import { Button, useModal } from "@geist-ui/react";
import { useState } from "react";
import type { Book } from "types";
import AddBook from "./AddBook";
import SavedBooks from "./SavedBooks";

export default function OwnedBooks() {
  const [bookList, setBookList] = useState<Book[]>([]);
  const { setVisible, bindings: modalBindings } = useModal();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          auto
          type="secondary"
          size="small"
          onClick={() => setVisible(true)}
          style={{ margin: ".5em 0 1em 0" }}
        >
          Add Book
        </Button>
      </div>
      <SavedBooks />
      <AddBook
        setVisible={setVisible}
        modalBindings={modalBindings}
        bookList={bookList}
        setBookList={setBookList}
      />
    </>
  );
}
