import { Row, Spinner, Text } from "@geist-ui/react";

export default function Loading() {
  return (
    <Row
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Spinner size="large" />
    </Row>
  );
}
