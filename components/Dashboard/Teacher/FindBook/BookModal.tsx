import { useMutation } from "@apollo/client";
import { useToasts, Spacer, Tag, Modal, Text } from "@geist-ui/react";
import { ADD_BOOK } from "graphql/queries";
import { useRouter } from "next/dist/client/router";
import type { Book } from "types";

type BookModalProps = {
  setVisible: (visible: boolean) => void;
  modalBindings: any;
  book: Book;
};

export default function BookModal({
  setVisible,
  modalBindings,
  book,
}: BookModalProps) {
  const router = useRouter();
  const [, setToast] = useToasts();
  const [addBook] = useMutation(ADD_BOOK, {
    onCompleted: () =>
      setToast({ text: "Success! Book added", type: "secondary" }),
    onError: (e) => console.log(JSON.stringify(e, null, 2)),
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

  const onSaveBook = () => {
    addBook({
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
        },
      },
    });
    setVisible(false);
    router.push("/dashboard"); // TODO: add a success toast
  };

  return (
    <Modal {...modalBindings} width="calc(100vw-2em)">
      <Modal.Title>{title}</Modal.Title>
      <Modal.Subtitle>{authors?.join(", ").replace(/,$/, "")}</Modal.Subtitle>
      <Modal.Content>
        <Text b>Description</Text>
        <Text>{description}</Text>
        <Text b>Published Date: </Text>
        {publishedDate}
        <Spacer y={0.5} />
        <Text b>Publisher: </Text>
        {publisher}
        <Spacer y={0.5} />
        {!!categories && (
          <>
            <Text b>Categories: </Text>
            {categories.map((category: string) => (
              <Tag key={category}>{category}</Tag>
            ))}
          </>
        )}
        <Spacer y={0.5} />
        <Text b>Page Count: </Text>
        {pageCount}
      </Modal.Content>
      <Modal.Action passive onClick={() => setVisible(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={() => onSaveBook()}>Save Book</Modal.Action>
    </Modal>
  );
}
