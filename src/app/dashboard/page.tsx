import GraphCard from "@/features/dashboard/components/graphCard";
import DashboardHeader from "@/features/dashboard/components/header";
import OverviewCards from "@/features/dashboard/components/overviewCard";
import DdashboardHeader from "@/features/dashboard/components/testHeader";
import TransactionsCard from "@/features/dashboard/components/transactionsCard";

export default function DashboardPage() {
  return (
    <main className="text-text-primary">
      <section className="">
        <DdashboardHeader userName="John Doe" />
        {/* <DashboardHeader /> */}
      </section>
      <section>
        <OverviewCards />
      </section>
      <section className="py-4">
        <TransactionsCard />
      </section>
      <section>
        <GraphCard />
      </section>
    </main>
  );
}
