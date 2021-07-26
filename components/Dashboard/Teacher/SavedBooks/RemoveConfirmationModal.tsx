import { Modal, Fieldset, Button, Text } from "@geist-ui/react";
import type { BookInput } from "types";

type RemoveConfirmationModalProps = {
  openConfirmationModal: boolean;
  setOpenConfirmationModal: (status: boolean) => void;
  removeBook: () => void;
  bookDetails: BookInput | undefined;
};
export default function RemoveConfirmationModal({
  openConfirmationModal,
  setOpenConfirmationModal,
  removeBook,
  bookDetails,
}: RemoveConfirmationModalProps) {
  return (
    <Modal
      open={openConfirmationModal}
      onClose={() => setOpenConfirmationModal(false)}
    >
      <Fieldset>
        <Fieldset.Title>Removing Book</Fieldset.Title>
        <Fieldset.Subtitle>
          Are you sure you want to remove
          <br />
          {bookDetails?.title} - {bookDetails?.authors}?
        </Fieldset.Subtitle>
        <Fieldset.Footer>
          <Fieldset.Footer.Status>
            <Text type="error">This action is not reversible</Text>
          </Fieldset.Footer.Status>
          <Fieldset.Footer.Actions>
            <Button auto size="small" type="error" onClick={() => removeBook()}>
              Remove
            </Button>
          </Fieldset.Footer.Actions>
        </Fieldset.Footer>
      </Fieldset>
    </Modal>
  );
}
