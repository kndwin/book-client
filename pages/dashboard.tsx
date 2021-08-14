import { useQuery } from "@apollo/client";
import {
  Unauthorized,
  Loading,
  Layout,
  UserDashboard,
  AdminDashboard,
} from "components";
import { GET_ROLE } from "graphql/reactiveVar";
import { useSession } from "next-auth/client";

export default function DashboardPage() {
  const [session, loading] = useSession();
  const { loading: roleLoading, error, data } = useQuery(GET_ROLE);
  const role = data.isRoleVar || session?.user?.role;
  console.log({ session, data });

  if (!!loading || !!roleLoading) {
    return <Loading />;
  }
  return (
    <Layout isSignedIn={role !== undefined}>
      {role === "USER" && <UserDashboard />}
      {role === "ADMIN" && <AdminDashboard />}
      {role !== "ADMIN" && role !== "USER" && <Unauthorized />}
    </Layout>
  );
}
