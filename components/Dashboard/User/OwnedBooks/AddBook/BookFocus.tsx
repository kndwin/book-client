import { useMutation } from "@apollo/client";
import {
  Button,
  Row,
  Col,
  useToasts,
  Spacer,
  Tag,
  Text,
  Breadcrumbs,
} from "@geist-ui/react";
import { ADD_BOOK, GET_BOOKS_FROM_USER } from "graphql/queries";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import type { Book } from "types";

type BookFocusProps = {
  book: Book;
  setBookFocus: any;
  setVisible: any;
};

export default function BookFocus({
  book,
  setBookFocus,
  setVisible,
}: BookFocusProps) {
  const [session] = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [, setToast] = useToasts();
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: GET_BOOKS_FROM_USER, variables: { userId: session?.user?.id } },
    ],
    onCompleted: () =>
      setToast({ text: "Success! Book added", type: "secondary" }),
    onError: (e) => {
      setToast({
        //@ts-ignore
        text: `An error occured: ${e?.networkError?.statusCode}: ${e?.networkError?.name} `,
        type: "error",
      });
      console.log(JSON.stringify(e, null, 2));
    },
    errorPolicy: "all",
  });

  if (book == undefined) {
    return null;
  }
  const {
    title,
    authors,
    description,
    categories,
    publisher,
    publishedDate,
    pageCount,
    imageLinks,
  } = book;

  const onSaveBook = async () => {
    setIsLoading(true);
    await addBook({
      variables: {
        addBookInput: {
          title: title,
          authors: authors.join(", ").replace(/, $/, ""),
          description: description,
          publisher: publisher,
          publishedDate: publishedDate,
          pageCount: pageCount,
          imageLink: imageLinks.smallThumbnail,
          amount: 1, // TODO: This would override existing values
          userId: session?.user?.id,
        },
      },
    });
    setIsLoading(false);
    setVisible(false);
    router.push("/dashboard");
  };

  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        padding: "2em .5em 1em .5em",
      }}
    >
      <Breadcrumbs>
        <Breadcrumbs.Item href="#" onClick={() => setBookFocus(false)}>
          Search Book
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          {title} - {authors?.join(", ").replace(/,$/, "")}
        </Breadcrumbs.Item>
      </Breadcrumbs>
      <Text h1 size={30}>
        {title} - {authors?.join(", ").replace(/,$/, "")}
      </Text>
      <Text b>Description</Text>
      <Text>{description}</Text>
      <Row>
        <Col span={12}>
          <Text b>Published Date: </Text>
          {publishedDate}
        </Col>
        <Col span={12}>
          <Text b>Publisher: </Text>
          {publisher}
        </Col>
      </Row>
      <Spacer y={0.5} />
      <Row>
        <Col span={12}>
          <Text b>Page Count: </Text>
          {pageCount}
        </Col>
        <Col span={12}>
          {!!categories && (
            <>
              <Text b>Categories: </Text>
              {categories.map((category: string) => (
                <Tag key={category}>{category}</Tag>
              ))}
            </>
          )}
        </Col>
      </Row>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          margin: "1em 0 0 0",
        }}
      >
        <Button auto onClick={() => setBookFocus(false)}>
          Back
        </Button>
        <Button
          type="secondary-light"
          auto
          loading={isLoading}
          onClick={() => onSaveBook()}
        >
          Save Book
        </Button>
      </div>
    </Row>
  );
}
