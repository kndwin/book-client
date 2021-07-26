import {
  Unauthorized,
  Loading,
  Layout,
  TeacherDashboard,
  StudentDashboard,
} from "components";
import { useSession } from "next-auth/client";

export default function DashboardPage() {
  const [session, loading] = useSession();
  const role = session?.user?.role;
  if (!!loading) {
    return <Loading />;
  }
  return (
    <Layout isSignedIn={role === undefined}>
      {role === undefined && <Unauthorized />}
      {role === "TEACHER" && <TeacherDashboard />}
      {role === "STUDENT" && <StudentDashboard />}
    </Layout>
  );
}
