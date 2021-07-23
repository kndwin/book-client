import { Row, Button, Input, useInput } from "@geist-ui/react";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import type { Book } from "type";

type SearchProps = {
  setBookList: (books: Book[]) => void;
};

export default function Search({ setBookList }: SearchProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { state, bindings: inputBindings } = useInput("");

  const onSearchChange = async () => {
    setSearchTerm(state);
    const url = new URL("https://www.googleapis.com/books/v1/volumes");
    // https://developers.google.com/books/docs/v1/reference/volumes/list
    url.searchParams.set("q", searchTerm);
    url.searchParams.set("maxResults", "20");
    url.searchParams.set("orderBy", "relevance");
    url.searchParams.set("projection", "full");
    url.searchParams.set("printType", "books");
    if (searchTerm == undefined || searchTerm == "") {
      setBookList([]);
    } else {
      setIsLoading(true);
      const res = await fetch(url.toString());
      const { items: books } = await res.json();
      setBookList(books.map(({ volumeInfo }: any) => volumeInfo));
      setIsLoading(false);
      // console.log({ books });
    }
  };

  return (
    <Row justify="space-between" style={{ width: "100%" }}>
      <Input
        icon={<FiSearch />}
        width="100%"
        placeholder="Search for a book!"
        clearable
        size="medium"
        {...inputBindings}
      />
      <Button
        type="secondary"
        auto
        loading={isLoading}
        size="small"
        style={{ marginLeft: "2em" }}
        onClick={() => onSearchChange()}
      >
        Search
      </Button>
    </Row>
  );
}
