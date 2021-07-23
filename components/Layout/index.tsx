import { Button, Page, Text } from "@geist-ui/react";
import { FaGoogle } from "react-icons/fa";

type LayoutProps = {
  children: React.ReactNode;
  isSigned?: boolean;
};

export default function Layout({ children, isSigned = true }: LayoutProps) {
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
        <h2>dofie</h2>
        {isSigned ? (
          <Button auto type="secondary" icon={<FaGoogle />}>
            <Text b>Sign in</Text>
          </Button>
        ) : (
          <Text b>Welcome, Kevin</Text>
        )}
      </Page.Header>
      <Page.Content>{children}</Page.Content>
    </Page>
  );
}
