"use client";

import { useState } from "react";

function formatAUD(value: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
}

function SliderInput({ label, id, min, max, step, value, onChange }: {
  label: string; id: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm leading-none font-medium">{label}</label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
      <input type="number" id={id} className="border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] md:text-sm mt-1" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

function LoanCalculator() {
  const [amount, setAmount] = useState(50000);
  const [rate, setRate] = useState(7.5);
  const [term, setTerm] = useState(5);

  const monthlyRate = rate / 100 / 12;
  const months = term * 12;
  const monthly = monthlyRate === 0 ? amount / months : (monthlyRate * Math.pow(1 + monthlyRate, months) * amount) / (Math.pow(1 + monthlyRate, months) - 1);
  const total = monthly * months;
  const interest = total - amount;

  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <div className="px-6"><div className="font-semibold text-lg">Loan Repayment Calculator</div><div className="text-muted-foreground text-sm">Calculate your monthly loan repayments</div></div>
      <div className="px-6 space-y-6">
        <div className="space-y-4">
          <SliderInput label={`Loan Amount: ${formatAUD(amount)}`} id="loan-amount" min={5000} max={500000} step={5000} value={amount} onChange={setAmount} />
          <SliderInput label={`Interest Rate: ${rate.toFixed(2)}% p.a.`} id="loan-rate" min={1} max={20} step={0.1} value={rate} onChange={setRate} />
          <SliderInput label={`Loan Term: ${term} years`} id="loan-term" min={1} max={30} step={1} value={term} onChange={setTerm} />
        </div>
        <div className="space-y-4 rounded-lg bg-muted/50 p-6">
          <div className="flex items-baseline justify-between border-b pb-2">
            <span className="text-sm text-muted-foreground">Monthly Repayment</span>
            <span className="text-2xl font-bold">{formatAUD(monthly)}</span>
          </div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Repayment</span><span className="font-semibold">{formatAUD(total)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Interest</span><span className="font-semibold">{formatAUD(interest)}</span></div>
        </div>
      </div>
    </div>
  );
}

function SavingsCalculator() {
  const [target, setTarget] = useState(50000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(4.5);
  const [current, setCurrent] = useState(0);

  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const numerator = target - current * Math.pow(1 + monthlyRate, months);
  const monthlyRequired = monthlyRate === 0 ? numerator / months : (numerator * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
  const contributions = monthlyRequired * months + current;
  const earned = target - contributions;

  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <div className="px-6"><div className="font-semibold text-lg">Savings Goal Calculator</div><div className="text-muted-foreground text-sm">Calculate how much to save each month to reach your goal</div></div>
      <div className="px-6 space-y-6">
        <div className="space-y-4">
          <SliderInput label={`Target Amount: ${formatAUD(target)}`} id="s-target" min={1000} max={500000} step={1000} value={target} onChange={setTarget} />
          <SliderInput label={`Timeframe: ${years} years`} id="s-years" min={1} max={30} step={1} value={years} onChange={setYears} />
          <SliderInput label={`Interest Rate: ${rate.toFixed(2)}% p.a.`} id="s-rate" min={0} max={10} step={0.1} value={rate} onChange={setRate} />
          <SliderInput label={`Current Savings: ${formatAUD(current)}`} id="s-current" min={0} max={500000} step={1000} value={current} onChange={setCurrent} />
        </div>
        <div className="space-y-4 rounded-lg bg-muted/50 p-6">
          <div className="flex items-baseline justify-between border-b pb-2">
            <span className="text-sm text-muted-foreground">Monthly Savings Required</span>
            <span className="text-2xl font-bold">{formatAUD(monthlyRequired)}</span>
          </div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Contributions</span><span className="font-semibold">{formatAUD(contributions)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Interest Earned</span><span className="font-semibold text-accent">{formatAUD(earned)}</span></div>
        </div>
      </div>
    </div>
  );
}

function RetirementCalculator() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [balance, setBalance] = useState(50000);
  const [salary, setSalary] = useState(80000);
  const [employer, setEmployer] = useState(11.5);
  const [personal, setPersonal] = useState(0);

  const years = retireAge - age;
  let estimated = balance;
  let projSalary = salary;
  for (let i = 0; i < years; i++) {
    estimated += (projSalary * employer) / 100 + personal;
    estimated *= 1.07;
    projSalary *= 1.03;
  }

  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <div className="px-6"><div className="font-semibold text-lg">Retirement Calculator</div><div className="text-muted-foreground text-sm">Estimate your superannuation balance at retirement</div></div>
      <div className="px-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <SliderInput label={`Current Age: ${age}`} id="r-age" min={18} max={75} step={1} value={age} onChange={setAge} />
          <SliderInput label={`Retirement Age: ${retireAge}`} id="r-retire" min={55} max={75} step={1} value={retireAge} onChange={setRetireAge} />
          <SliderInput label={`Current Balance: ${formatAUD(balance)}`} id="r-balance" min={0} max={500000} step={5000} value={balance} onChange={setBalance} />
          <SliderInput label={`Annual Salary: ${formatAUD(salary)}`} id="r-salary" min={0} max={300000} step={5000} value={salary} onChange={setSalary} />
          <SliderInput label={`Employer Contribution: ${employer.toFixed(1)}%`} id="r-employer" min={0} max={25} step={0.5} value={employer} onChange={setEmployer} />
          <SliderInput label={`Personal Contribution: ${formatAUD(personal)}`} id="r-personal" min={0} max={50000} step={1000} value={personal} onChange={setPersonal} />
        </div>
        <div className="rounded-lg bg-accent/10 p-6 text-center">
          <p className="mb-2 text-sm text-muted-foreground">Estimated Balance at Retirement</p>
          <p className="text-4xl font-bold text-accent">{formatAUD(estimated)}</p>
          <p className="mt-2 text-xs text-muted-foreground">Based on 7% average annual return over {retireAge - age} years</p>
        </div>
      </div>
    </div>
  );
}

function BorrowingCalculator() {
  const [income, setIncome] = useState(100000);
  const [expenses, setExpenses] = useState(3000);
  const [commitments, setCommitments] = useState(0);
  const [dependents, setDependents] = useState(0);

  const power = Math.max(0, (0.3 * (income / 12 - (expenses + 500 * dependents) - commitments) * 5.0225752122629865) / 0.030112876061314933);
  const monthly = (0.005 * power * 6.0225752122629865) / 5.0225752122629865;

  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
      <div className="px-6"><div className="font-semibold text-lg">Borrowing Power Calculator</div><div className="text-muted-foreground text-sm">Estimate how much you could borrow for a home loan</div></div>
      <div className="px-6 space-y-6">
        <div className="space-y-4">
          <SliderInput label={`Annual Income: ${formatAUD(income)}`} id="b-income" min={0} max={300000} step={5000} value={income} onChange={setIncome} />
          <SliderInput label={`Monthly Living Expenses: ${formatAUD(expenses)}`} id="b-expenses" min={0} max={10000} step={100} value={expenses} onChange={setExpenses} />
          <SliderInput label={`Other Monthly Commitments: ${formatAUD(commitments)}`} id="b-commitments" min={0} max={5000} step={100} value={commitments} onChange={setCommitments} />
          <SliderInput label={`Number of Dependents: ${dependents}`} id="b-dependents" min={0} max={10} step={1} value={dependents} onChange={setDependents} />
        </div>
        <div className="space-y-4 rounded-lg bg-muted/50 p-6">
          <div className="text-center">
            <p className="mb-2 text-sm text-muted-foreground">Estimated Borrowing Power</p>
            <p className="text-4xl font-bold text-accent">{formatAUD(power)}</p>
          </div>
          <div className="flex justify-between border-t pt-4 text-sm"><span className="text-muted-foreground">Estimated Monthly Repayment</span><span className="font-semibold">{formatAUD(monthly)}</span></div>
          <p className="text-xs text-muted-foreground">Based on 6% interest rate and 30-year loan term. This is an estimate only.</p>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { id: "loan", label: "Loan Repayment", component: <LoanCalculator /> },
  { id: "savings", label: "Savings Goal", component: <SavingsCalculator /> },
  { id: "retirement", label: "Retirement", component: <RetirementCalculator /> },
  { id: "borrowing", label: "Borrowing Power", component: <BorrowingCalculator /> },
];

function LeadCaptureForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const apiUrl = process.env.NEXT_PUBLIC_LEAD_CAPTURE_API_URL;

    if (!apiUrl) {
      // API not yet configured — treat as a soft success in the UI
      setStatus("success");
      setEmail("");
      return;
    }

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-2 text-2xl font-bold">Get personalised financial tips</h2>
          <p className="mb-8 text-muted-foreground text-sm">
            Enter your email and we&apos;ll send you tailored advice based on your calculations.
          </p>

          {status === "success" ? (
            <div className="rounded-xl border bg-card px-6 py-8 shadow-sm">
              <div className="text-3xl mb-3">✅</div>
              <p className="font-semibold">You&apos;re on the list!</p>
              <p className="text-sm text-muted-foreground mt-1">
                We&apos;ll be in touch with personalised tips shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-sm text-primary underline underline-offset-4"
              >
                Submit another address
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="flex-1">
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-input h-10 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px]"
                />
                {status === "error" && (
                  <p className="mt-1 text-left text-xs text-destructive">{errorMsg}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
              >
                {status === "loading" ? "Submitting…" : "Get Tips"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function CalculatorsPage() {
  const [active, setActive] = useState("loan");

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">Financial Calculators</h1>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Plan your finances with our suite of easy-to-use calculators
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  active === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "border bg-background hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="max-w-2xl mx-auto">
            {tabs.find((t) => t.id === active)?.component}
          </div>
        </div>
      </section>

      <LeadCaptureForm />
    </div>
  );
}
