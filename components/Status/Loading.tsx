import { Row, Spinner, Text } from "@geist-ui/react";

export default function Loading() {
  return (
    <Row
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Spinner size="large" />
    </Row>
  );
}
