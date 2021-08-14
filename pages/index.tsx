import { Text } from "@geist-ui/react";
import { Loading } from "components";
import Layout from "components/Layout";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log({ session });
    // @ts-ignore
    localStorage.setItem("token", session?.jwtToken);
    if (session?.jwtToken) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <Layout>
      {!!loading || !!session ? (
        <Loading />
      ) : (
        <Text b size={30}>
          🔨 Under developerment
        </Text>
      )}
    </Layout>
  );
}
