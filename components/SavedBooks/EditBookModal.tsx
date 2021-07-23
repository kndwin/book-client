import {
  Col,
  Row,
  Modal,
  Input,
  Text,
  Spacer,
  Textarea,
} from "@geist-ui/react";
import type { BookInput } from "type";

type EditBookModalProps = {
  bookDetails: BookInput | undefined;
  setEditModal: (isEditModal: boolean) => void;
  editModal: boolean;
  editBook: () => void;
};

export default function EditBookModal({
  bookDetails,
  setEditModal,
  editModal,
  editBook,
}: EditBookModalProps) {
  return (
    <Modal open={editModal} onClose={() => setEditModal(false)}>
      <Modal.Title>Edit Book</Modal.Title>
      <Modal.Content style={{ textAlign: "left" }}>
        <Input width="100%" initialValue={bookDetails?.title}>
          <Text h4 b>
            Ttile
          </Text>
        </Input>
        <Spacer y={0.5} />
        <Input width="100%" initialValue={bookDetails?.authors}>
          <Text h4 b>
            Author
          </Text>
        </Input>

        <Text h4 b>
          Description
        </Text>
        <Textarea
          width="100%"
          minHeight="10em"
          initialValue={bookDetails?.description}
        />
        <Input width="100%" initialValue={bookDetails?.publishedDate}>
          <Text h4 b>
            Published Date
          </Text>
        </Input>
        <Input width="100%" initialValue={bookDetails?.publisher}>
          <Text h4 b>
            Publisher
          </Text>
        </Input>
        <Row>
          <Col span={11}>
            <Input width="100%" initialValue={bookDetails?.pageCount}>
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
              initialValue={bookDetails?.pageCount}
              name="pageCount"
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
      <Modal.Action onClick={() => editBook()}>Edit</Modal.Action>
    </Modal>
  );
}
