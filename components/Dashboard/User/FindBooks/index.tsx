import { useQuery } from "@apollo/client";
import {
  User,
  Text,
  Row,
  Button,
  useInput,
  Input,
  Grid,
  Card,
} from "@geist-ui/react";
import { FiSearch } from "react-icons/fi";
import { GET_ALL_USERS, GET_BOOKS } from "graphql/queries";
import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import { Image } from "@geist-ui/react";

export interface FindBooksProps {}

export default function FindBooks(props: FindBooksProps) {
  const { data: userData } = useQuery(GET_ALL_USERS);
  const { data: booksData } = useQuery(GET_BOOKS);
  const [session, loading] = useSession();
  const { state, bindings: inputBindings } = useInput("");
  const [searchedBook, setSearchedBook] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    console.log({ userData });
  }, [userData]);

  useEffect(() => {
    console.log({ booksData });
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

	const getUserFromId = (userId: string) => {
		return  userData?.all?.find(
			({ id }: any) => id === userId
		)
	}
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

      <Grid.Container gap={2} style={{ marginTop: "1em" }}>
        {booksData?.books?.map(
					 ({ title, authors, userId: bookUserId, imageLink }: any, index: any) => (
            <>
              {`${title}${authors}`
                .toLowerCase()
                .includes(searchedBook.toLowerCase()) && 
								searchedBook.length > 0 &&
									(
                <Grid key={index} xs={12} sm={8} md={6} lg={6}>
                  <Card shadow>
                    <Image
											sizes='md'
                      alt="Book image"
                      src={imageLink}
											height={200}
											width={200}
											style={{ objectFit: "contain", margin: "1em 0 2em 0" }}
										/>
										<Text b h4 style={{ marginBottom: '0px'}}>
											{title}
										</Text>
										<Text style={{ marginTop: '0px'}}>{authors}</Text>
										<User
											src={getUserFromId(bookUserId).image}
											name={getUserFromId(bookUserId).name}
										>
										</User>
									</Card>
                </Grid>
              )}
            </>
          )
        )}
      </Grid.Container>
    </div>
  );
}
