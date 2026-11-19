import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  Globe2,
  LockKeyhole,
  Play,
  Sparkles,
} from "lucide-react";
import BrainIcon from "../icons/BrainIcon";

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
  note: string;
}

export default function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  footer,
  note,
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090b11] text-slate-100 selection:bg-violet-400/30">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_14%_8%,rgba(91,63,210,0.18),transparent_32%),radial-gradient(ellipse_at_85%_78%,rgba(48,87,174,0.12),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-8 pt-6 sm:px-8 sm:pt-8 lg:px-12">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-violet-600 shadow-lg shadow-violet-950/40 ring-1 ring-white/10">
              <BrainIcon />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-white">Second Brain</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-500">Keep what matters</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-[11px] font-medium text-slate-400 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
            Your private space for ideas
          </div>
        </header>

        <div className="grid flex-1 items-center gap-10 py-10 md:py-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:py-14">
          <section className="mx-auto w-full max-w-2xl lg:mx-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-3 py-1.5 text-xs font-medium text-violet-200">
              <Sparkles size={14} />
              A calmer way to collect what inspires you
            </div>

            <h1 className="mt-6 max-w-xl text-[2.65rem] font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.65rem]">
              Ideas are better when you can <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-sky-200 bg-clip-text text-transparent">find them again.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              Keep the videos, links, and passing thoughts worth coming back to. Your personal library, ready when you are.
            </p>

            <div className="relative mt-8 hidden h-[210px] max-w-[510px] sm:mt-10 sm:block sm:h-[240px]">
              <div className="absolute left-1 top-4 w-[62%] rotate-[-4deg] rounded-[22px] border border-slate-700/80 bg-[#171c27] p-4 shadow-[0_22px_55px_rgba(0,0,0,0.28)] sm:left-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    <Bookmark size={13} className="text-violet-300" />
                    Saved thought
                  </div>
                  <span className="rounded-full bg-violet-400/10 px-2 py-1 text-[10px] text-violet-200">Idea</span>
                </div>
                <p className="mt-5 max-w-[250px] text-base font-medium leading-6 text-slate-100 sm:text-lg">
                  “Make it easy to return to the things that move you.”
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  Your notes, all in one place
                </div>
              </div>

              <div className="absolute right-1 top-10 w-[38%] rotate-[5deg] rounded-[18px] border border-slate-700 bg-[#202634] p-3 shadow-[0_18px_45px_rgba(0,0,0,0.35)] sm:right-0 sm:top-12 sm:p-4">
                <div className="flex h-16 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/30 to-violet-500/20 sm:h-20">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/60 text-white ring-1 ring-white/20">
                    <Play size={14} fill="currentColor" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-300">
                  <Globe2 size={13} className="shrink-0 text-sky-300" />
                  <span className="truncate">A link worth keeping</span>
                  <ArrowUpRight size={12} className="shrink-0 text-slate-500" />
                </div>
              </div>

              <div className="absolute bottom-0 left-[15%] flex items-center gap-2 rounded-full border border-slate-700/80 bg-[#111620] px-3 py-2 text-[10px] text-slate-400 shadow-xl sm:left-[22%]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300"><Check size={12} /></span>
                Collected. Organized. Yours.
              </div>
            </div>

            <div className="mt-1 hidden max-w-md items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600 sm:flex">
              <span>Collect</span><span className="h-px flex-1 bg-slate-800" /><span>Curate</span><span className="h-px flex-1 bg-slate-800" /><span>Recall</span>
            </div>
          </section>

          <section className="relative mx-auto w-full max-w-[430px] lg:mx-0 lg:justify-self-end">
            <div className="pointer-events-none absolute -inset-5 rounded-[36px] bg-gradient-to-br from-violet-600/15 via-transparent to-sky-500/10 blur-2xl" />
            <div className="relative rounded-[28px] border border-slate-700/80 bg-[#111620]/95 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.4)] sm:p-8">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/80 text-violet-200">
                <Bookmark size={19} />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-violet-300">{eyebrow}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-[28px]">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>

              <div className="mt-6">{children}</div>

              <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-800 pt-5 text-[11px] text-slate-500">
                <LockKeyhole size={13} />
                {note}
              </div>

              <div className="mt-5 text-center text-sm text-slate-400">{footer}</div>
            </div>
          </section>
        </div>

        <footer className="flex items-center justify-between border-t border-slate-900 pt-4 text-[10px] uppercase tracking-[0.14em] text-slate-600">
          <span>Second Brain</span>
          <span>Make room for what matters</span>
        </footer>
      </div>
    </main>
  );
}
