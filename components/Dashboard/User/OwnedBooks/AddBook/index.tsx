import { Grid, Modal, Text } from "@geist-ui/react";
import { useState } from "react";
import BookFocus from "./BookFocus";
import BookCard from "./BookCard";
import Search from "./Search";
import type { Book } from "types";

type FindBookProps = {
  bookList: Book[];
  setBookList: (bookList: Book[]) => void;
  modalBindings: any;
  setVisible: any;
};

export default function AddBook({
  setVisible,
  bookList,
  setBookList,
  modalBindings,
}: FindBookProps) {
  const [index, setIndex] = useState<number>(0);
  const [bookFocus, setBookFocus] = useState(false);

  const focusBook = (index: number) => {
    setIndex(index);
    setBookFocus(true);
  };

  return (
    <Modal {...modalBindings} width="90%">
      <Search setBookList={setBookList} />
      {!bookFocus ? (
        <Grid.Container gap={2} style={{ marginTop: "2em" }}>
          {bookList.length < 1 ? (
            <Text style={{ padding: "0 1em" }} size={20}>
              📚 no books (yet!)
            </Text>
          ) : (
            <>
              {bookList.map(({ title, authors, imageLinks }, index) => (
                <Grid key={index} xs={12} sm={8} md={6} lg={6}>
                  <BookCard
                    focusBook={focusBook}
                    title={title}
                    authors={authors}
                    imageLinks={imageLinks}
                    index={index}
                  />
                </Grid>
              ))}
            </>
          )}
        </Grid.Container>
      ) : (
        <BookFocus
          setVisible={setVisible}
          setBookFocus={setBookFocus}
          book={bookList[index]}
        />
      )}
    </Modal>
  );
}
