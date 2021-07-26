import { Grid, useModal } from "@geist-ui/react";
import { useState } from "react";
import BookModal from "./BookModal";
import BookCard from "./BookCard";
import Search from "./Search";
import type { Book } from "types";

type FindBookProps = {
  bookList: Book[];
  setBookList: (bookList: Book[]) => void;
};

export default function FindBook({ bookList, setBookList }: FindBookProps) {
  const [index, setIndex] = useState<number>(0);
  const { setVisible, bindings: modalBindings } = useModal();

  const openModal = (index: number) => {
    setIndex(index);
    setVisible(true);
  };

  return (
    <>
      <Search setBookList={setBookList} />
      <Grid.Container gap={2} style={{ marginTop: "2em" }}>
        {bookList.map(({ title, authors, imageLinks }, index) => (
          <Grid key={index} xs={24} sm={12} md={8} lg={6}>
            <BookCard
              title={title}
              authors={authors}
              imageLinks={imageLinks}
              index={index}
              openModal={openModal}
            />
          </Grid>
        ))}
      </Grid.Container>
      <BookModal
        setVisible={setVisible}
        book={bookList[index]}
        modalBindings={modalBindings}
      />
    </>
  );
}
