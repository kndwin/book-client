import { Text, Link } from "@geist-ui/react";
import Layout from "components/Layout";

export default function Home() {
  return (
    <Layout>
      <Text h1>Under developerment</Text>
      <Link color href="/dashboard">
        <Text h2>Dashboard</Text>
      </Link>
    </Layout>
  );
}
