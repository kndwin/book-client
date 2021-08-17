import { useMutation, useQuery } from "@apollo/client";
import {
  Unauthorized,
  Loading,
  Layout,
  UserDashboard,
  AdminDashboard,
} from "components";
import { GET_ROLE } from "graphql/reactiveVar";
import { useSession } from "next-auth/client";
import { UPDATE_USER } from "graphql/queries";
import { useEffect } from "react";
import { useToasts } from "@geist-ui/react";

export default function DashboardPage() {
  const [, setToast] = useToasts();
  const [session, loading] = useSession();
  const { loading: roleLoading, data } = useQuery(GET_ROLE);
  const [updateUser] = useMutation(UPDATE_USER, {
    onError: (e) => {
      setToast({
        //@ts-ignore
        text: `An error occured: ${e?.networkError?.statusCode}: ${e?.networkError?.name} `,
        type: "error",
      });
      console.log(JSON.stringify(e, null, 2));
    },
  });
  const role = data.isRoleVar || session?.user?.role || "USER";

  if (!!loading) {
    return <Loading />;
  }

  useEffect(() => {
    const updateUserFunction = async () => {
      if (session?.user?.role) {
        await updateUser({
          variables: {
            user: {
              role: "USER",
            },
            id: session?.user?.id,
          },
        });
      }
    };
    updateUserFunction();
  }, []);

  return (
    <Layout isSignedIn={role !== undefined}>
      {role === "USER" && <UserDashboard />}
      {role === "ADMIN" && <AdminDashboard />}
      {role !== "ADMIN" && role !== "USER" && <Unauthorized />}
    </Layout>
  );
}
