import { Text } from "@geist-ui/react";
import { Loading } from "components";
import Layout from "components/Layout";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role) {
      router.push("/dashboard");
    } else if (session?.user?.role === null) {
      router.push("/signup");
    }
  }, [loading]);

  return (
    <Layout>
      {loading || !!session ? <Loading /> : <Text h1>Under developerment</Text>}
    </Layout>
  );
}
