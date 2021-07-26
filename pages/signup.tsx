import { useMutation } from "@apollo/client";
import { Dot, Button, Row, Text } from "@geist-ui/react";
import { Layout } from "components";
import { UPDATE_USERROLE } from "graphql/queries";

export default function SignUp() {
  const [updateUserRole] = useMutation(UPDATE_USERROLE);
  const onRoleClick = (e: React.MouseEvent) => {
    const { value: role } = e.target as HTMLButtonElement;
    updateUserRole({ variables: { role } });
  };
  return (
    <Layout isSignUp>
      <Row style={{ alignItems: "center" }}>
        <Dot type="secondary" />
        <Text b size={24}>
          Are you a student or a teacher?
        </Text>
        <Button
          onClick={(e) => onRoleClick(e)}
          size="small"
          auto
          style={{ margin: "0 1em" }}
        >
          Teacher
        </Button>
        <Button
          onClick={(e) => onRoleClick(e)}
          size="small"
          type="default"
          auto
        >
          Student
        </Button>
      </Row>
    </Layout>
  );
}
