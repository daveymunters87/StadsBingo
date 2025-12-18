import { getTeamFromSession } from "@/lib/auth";
import DashboardContent from "@/components/user/dashboard/DashboardContent";

export default async function Dashboard() {
  const team = await getTeamFromSession();

  return <DashboardContent team={team} />;
}
