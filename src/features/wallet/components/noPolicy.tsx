import { ArrowUpRight, BarChart } from "lucide-react";

interface Policy {
  id: string;
  name: string;
  interestRate: number;
  dividendYield: number;
}

interface NoPolicyViewProps {
  policies: Policy[];
  enrollInInvestmentPolicy: (policyId: string) => void;
}

export function NoPolicyView({
  policies,
  enrollInInvestmentPolicy,
}: NoPolicyViewProps) {
  return (
    <div>
      <div className="text-center py-10 border border-dashed border-white/10 rounded-xl mb-10">
        <BarChart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-1">
          No Active Investment Portfolio
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Choose an investment policy to start earning dividends and participating
          in business growth.
        </p>
      </div>

      {/* LIST OF POLICIES */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Investment Policies</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="rounded-lg p-5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{policy.name}</h4>

                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <span className="text-blue-400 font-bold">
                      {policy.interestRate}%
                    </span>
                    <span className="text-muted-foreground text-xs">growth</span>

                    <span className="text-emerald-400 font-bold ml-3">
                      {policy.dividendYield}%
                    </span>
                    <span className="text-muted-foreground text-xs">
                      dividend
                    </span>
                  </div>
                </div>

                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <button
                onClick={() => enrollInInvestmentPolicy(policy.id)}
                className="w-full mt-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
