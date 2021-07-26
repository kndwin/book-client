import { Row, Link, Avatar, Button, Page, Text } from "@geist-ui/react";
import { FaGoogle, FaArrowLeft } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/client";

type LayoutProps = {
  children: React.ReactNode;
  isSignedIn?: boolean;
  isSignUp?: boolean;
};

export default function Layout({
  children,
  isSignedIn = false,
  isSignUp = false,
}: LayoutProps) {
  const [session, loading] = useSession();
  return (
    <Page size="large">
      <Page.Header
        style={{
          padding: "2em 0 1em 0",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href={isSignedIn ? "/dashboard" : "/"}>
          <Text h2>dofie</Text>
        </Link>
        {!isSignUp && !isSignedIn && (
          <Button
            auto
            onClick={() =>
              signIn("google", {
                callbackUrl: `${process.env.NEXTAUTH_URL}`,
              })
            }
            ghost
            size="small"
            type="error"
            icon={<FaGoogle />}
          >
            <Text b>Sign in</Text>
          </Button>
        )}
        {!isSignUp && isSignedIn && (
          <Row style={{ alignItems: "center" }}>
            {loading ? (
              <Text>Loading</Text>
            ) : (
              <Row style={{ alignItems: "center" }}>
                <Avatar
                  src={
                    // @ts-ignore
                    session?.user?.image?.toString()
                  }
                />
                <Text b style={{ margin: "0 1em" }}>
                  Welcome,{" "}
                  {
                    // @ts-ignore
                    session?.user?.name?.split(" ")[0]
                  }
                </Text>
              </Row>
            )}
            <Button
              auto
              size="small"
              onClick={() =>
                signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}` })
              }
              type="secondary"
            >
              <Text b>Sign out</Text>
            </Button>
          </Row>
        )}
        {isSignUp && (
          <Row style={{ alignItems: "center" }}>
            <Avatar
              src={
                // @ts-ignore
                session?.user?.image?.toString()
              }
            />
            <Text b style={{ margin: "0 1em" }}>
              Welcome,{" "}
              {
                // @ts-ignore
                session?.user?.name?.split(" ")[0]
              }
            </Text>
          </Row>
        )}
      </Page.Header>
      <Page.Content>{children}</Page.Content>
    </Page>
  );
}
