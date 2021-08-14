import { Dot, Button, Row, Text } from "@geist-ui/react";
import { Layout } from "components";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { isRoleVar } from "graphql/reactiveVar";

export default function SignUp() {
  const [updateUserRole] = useMutation(UPDATE_USER, {
    onError: (e) => console.log(JSON.stringify(e, null, 2)),
    onCompleted: (e) => console.log(JSON.stringify(e, null, 2)),
  });
  const [session] = useSession();
  const router = useRouter();
  console.log({ session });
  const onRoleClick = async (role: string) => {};
  return (
    <Layout isSignUp>
      <Row style={{ alignItems: "center" }}>
        <Dot type="secondary" />
        <Text b size={24}>
          Are you a student or a teacher?
        </Text>
        <Button
          onClick={() => onRoleClick("TEACHER")}
          size="small"
          auto
          style={{ margin: "0 1em" }}
        >
          Teacher
        </Button>
        <Button
          onClick={() => onRoleClick("STUDENT")}
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
