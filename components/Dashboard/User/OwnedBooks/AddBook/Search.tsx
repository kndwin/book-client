import { Row, Button, Input, useInput } from "@geist-ui/react";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import type { Book } from "types";

type SearchProps = {
  setBookList: (books: Book[]) => void;
};

export default function Search({ setBookList }: SearchProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { state, bindings: inputBindings } = useInput("");

  const onSearchChange = async () => {
    const url = new URL("https://www.googleapis.com/books/v1/volumes");
    // https://developers.google.com/books/docs/v1/reference/volumes/list
    url.searchParams.set("q", state);
    url.searchParams.set("maxResults", "24");
    url.searchParams.set("orderBy", "relevance");
    url.searchParams.set("projection", "full");
    url.searchParams.set("printType", "books");
    if (state == undefined || state == "") {
      setBookList([]);
    } else {
      setIsLoading(true);
      const res = await fetch(url.toString());
      const { items: books } = await res.json();
      setBookList(books.map(({ volumeInfo }: any) => volumeInfo));
      setIsLoading(false);
    }
  };

  const onSearchEnterKey = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      onSearchChange();
    }
  };

  return (
    <Row justify="space-between" style={{ width: "100%" }}>
      <Input
        icon={<FiSearch />}
        width="100%"
        placeholder="Search anything! Book title, author... you name it!"
        clearable
        size="large"
        onKeyPress={(e) => onSearchEnterKey(e)}
        {...inputBindings}
      />
      <Button
        type="secondary-light"
        auto
        loading={isLoading}
        style={{ marginLeft: "2em" }}
        onClick={() => onSearchChange()}
      >
        Search
      </Button>
    </Row>
  );
}
