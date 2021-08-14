import { Row, Text } from "@geist-ui/react";

export default function Unauthorized() {
  return (
    <Row style={{ flexDirection: "column", alignItems: "center" }}>
      <Text h1>Unauthorized</Text>
      <Text>You are not allowed to see this page</Text>
    </Row>
  );
}
