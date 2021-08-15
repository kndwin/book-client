import { Text } from "@geist-ui/react";
import { Loading } from "components";
import Layout from "components/Layout";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [session, loading] = useSession();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {}, []);
  useEffect(() => {
    // @ts-ignore
    localStorage.setItem("token", session?.jwtToken);
    if (session?.jwtToken) {
      router.push("/dashboard");
    }
  }, [session, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Layout>
      {!!loading || !!session ? <Loading /> : <Text h1>Books</Text>}
    </Layout>
  );
}
