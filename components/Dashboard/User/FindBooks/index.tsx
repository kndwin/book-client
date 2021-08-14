import { useQuery } from "@apollo/client";
import { Avatar, Row, Button, useInput, Input } from "@geist-ui/react";
import { FiSearch } from "react-icons/fi";
import { GET_ALL_USERS, GET_BOOKS } from "graphql/queries";
import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";

export interface FindBooksProps {}

export default function FindBooks(props: FindBooksProps) {
  const {
    loading: getUserLoading,
    error,
    data,
  } = useQuery(GET_ALL_USERS, {
    onError: (e) => console.log(JSON.stringify(e, null, 2)),
  });
  const { data: booksData } = useQuery(GET_BOOKS);
  const [session, loading] = useSession();
  const { state, bindings: inputBindings } = useInput("");
  const [searchedBook, setSearchedBook] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    console.log({ loading, error, data });
    console.log(data?.all);
  }, [data, loading, error]);

  useEffect(() => {
    console.log(booksData);
  }, [booksData]);

  const onSearchChange = async () => {
    setSearchLoading(true);
    setSearchedBook(state);
    setSearchLoading(false);
  };

  const onSearchEnterKey = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      onSearchChange();
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <Row justify="space-between" style={{ width: "100%" }}>
        <Input
          icon={<FiSearch />}
          width="100%"
          placeholder="Search for a book"
          clearable
          size="large"
          onKeyPress={(e) => onSearchEnterKey(e)}
          onChange={(e) => setSearchedBook(e.target.value)}
        />
        <Button
          type="secondary-light"
          auto
          loading={searchLoading}
          style={{ marginLeft: "2em" }}
          onClick={() => setSearchedBook(searchedBook)}
        >
          Search
        </Button>
      </Row>
      {data?.all
        ?.filter(({ id }: any) => id != session?.user?.id)
        .map(({ name, image, id }: any) => (
          <Row
            key={image}
            style={{
              display: "flex",
              width: "100%",
              border: "1px solid black",
              margin: ".8em 0",
              borderRadius: "10px",
              alignItems: "center",
              padding: "0 1em",
            }}
          >
            <Avatar
              style={{ border: "2px solid black" }}
              size="medium"
              src={image}
              alt="image"
            />
            <p style={{ margin: "0 0 0 2em", fontWeight: "bold" }}>{name}</p>
            <div
              style={{
                width: "100%",
                display: "inline-block",
                padding: ".5em",
              }}
            >
              {booksData?.books
                ?.filter(
                  ({ userId, title, authors }: any) =>
                    userId === id &&
                    `${title} ${authors}`
                      .toLowerCase()
                      .includes(searchedBook.toLowerCase())
                )
                .map(({ title, authors, id }: any) => (
                  <div
                    key={id}
                    style={{
                      width: "fit-content",
                      border: "1px solid black",
                      borderRadius: "10px",
                      float: "left",
                      margin: ".25em",
                      padding: ".5em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {title} - {authors}
                  </div>
                ))}
            </div>
          </Row>
        ))}
    </div>
  );
}
