import {
  Col,
  Row,
  Modal,
  Input,
  Text,
  Spacer,
  Textarea,
} from "@geist-ui/react";
import { useState } from "react";
import type { BookInput } from "types";

type EditBookModalProps = {
  bookDetails: BookInput | undefined;
  setEditModal: (isEditModal: boolean) => void;
  editModal: boolean;
  editBook: ({ variables }: any) => void;
};

export default function EditBookModal({
  bookDetails,
  setEditModal,
  editModal,
  editBook,
}: EditBookModalProps) {
  const [bookDetailsForm, setBookDetailsForm] = useState<BookInput | undefined>(
    bookDetails
  );
  const onEditSubmit = () => {
    const {
      id,
      title,
      authors,
      description,
      publishedDate,
      publisher,
      pageCount,
      amount,
    } = { ...bookDetailsForm };
    editBook({
      variables: {
        editBookId: id,
        editBookInput: {
          title,
          authors,
          description,
          publishedDate,
          publisher,
          pageCount: Number(pageCount),
          amount: Number(amount),
        },
      },
    });
    setEditModal(false);
  };
  const onInputChange = (e: React.ChangeEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    if (bookDetails !== undefined) {
      setBookDetailsForm({
        ...bookDetails,
        ...bookDetailsForm,
        [`${name}`]: value,
      });
    }
  };
  return (
    <Modal open={editModal} onClose={() => setEditModal(false)}>
      <Modal.Title>Edit Book</Modal.Title>
      <Modal.Content style={{ textAlign: "left" }}>
        <Input
          width="100%"
          name="title"
          onChange={(e) => onInputChange(e)}
          initialValue={bookDetails?.title}
        >
          <Text h4 b>
            Ttile
          </Text>
        </Input>
        <Spacer y={0.5} />
        <Input
          width="100%"
          name="authors"
          onChange={(e) => onInputChange(e)}
          initialValue={bookDetails?.authors}
        >
          <Text h4 b>
            Author
          </Text>
        </Input>
        <Spacer y={0.5} />
        <Text h4 b>
          Description
        </Text>
        <Textarea
          width="100%"
          name="description"
          minHeight="10em"
          onChange={(e) => onInputChange(e)}
          initialValue={bookDetails?.description}
        />
        <Spacer y={0.5} />
        <Row>
          <Col span={11}>
            <Input
              width="100%"
              name="publishedDate"
              onChange={(e) => onInputChange(e)}
              initialValue={bookDetails?.publishedDate}
            >
              <Text h4 b>
                Published Date
              </Text>
            </Input>
          </Col>
          <Col span={2}>
            <Spacer x={1} />
          </Col>
          <Col span={11}>
            <Input
              width="100%"
              name="publisher"
              onChange={(e) => onInputChange(e)}
              initialValue={bookDetails?.publisher}
            >
              <Text h4 b>
                Publisher
              </Text>
            </Input>
          </Col>
        </Row>
        <Spacer y={0.5} />
        <Row>
          <Col span={11}>
            <Input
              width="100%"
              name="pageCount"
              onChange={(e) => onInputChange(e)}
              initialValue={bookDetails?.pageCount}
            >
              <Text h4 b>
                Page Count
              </Text>
            </Input>
          </Col>
          <Col span={2}>
            <Spacer x={1} />
          </Col>
          <Col span={11}>
            <Input
              width="100%"
              initialValue={bookDetails?.amount}
              onChange={(e) => onInputChange(e)}
              name="amount"
            >
              <Text h4 b>
                Book Stock
              </Text>
            </Input>
          </Col>
        </Row>
        <form action=""></form>
      </Modal.Content>
      <Modal.Action passive onClick={() => setEditModal(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={() => onEditSubmit()}>Edit</Modal.Action>
    </Modal>
  );
}
