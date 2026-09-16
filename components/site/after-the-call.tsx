import { Reveal } from "./reveal";
import { afterTheCall } from "@/content/site";

const dot = {
  done: "bg-white",
  stalled: "bg-gold",
  pending: "bg-white/20",
} as const;

export function AfterTheCall() {
  return (
    <section className="shell py-16 md:py-24">
      <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <Reveal as="h2" className="t-h2 max-w-[18ch]">
            {afterTheCall.heading}
          </Reveal>

          <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-text-secondary md:mt-10 md:text-xl">
            {afterTheCall.body.map((p, i) => (
              <Reveal as="p" key={i} delay={80 + i * 60}>
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal delay={220} className="mt-10 md:mt-14">
            <p className="max-w-[46ch] text-lg leading-snug text-white md:text-2xl">
              {afterTheCall.pivot}
            </p>
          </Reveal>
        </div>

        {/*
          One job's paper trail. Everything up to the filing window happened on its
          own. The last two steps are what a shop pays a person to remember.
        */}
        <Reveal delay={160} className="lg:pt-4">
          <p className="mb-7 t-label text-text-tertiary">
            One job, after the truck leaves
          </p>
          <ol className="relative">
            <span
              className="absolute left-[5px] top-2 bottom-2 w-px bg-white/10"
              aria-hidden="true"
            />
            {afterTheCall.trail.map((step) => (
              <li key={step.label} className="relative flex items-start gap-5 pb-7 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`relative mt-[7px] h-[11px] w-[11px] shrink-0 rounded-full ${dot[step.state]}`}
                >
                  {step.state === "stalled" ? (
                    <span className="absolute inset-0 animate-ping rounded-full bg-gold/60 [animation-duration:2.4s]" />
                  ) : null}
                </span>
                <span
                  className={`text-base md:text-lg ${
                    step.state === "pending" ? "text-text-tertiary" : "text-text-primary"
                  }`}
                >
                  {step.label}
                  {step.state === "stalled" ? (
                    <span className="mt-1 block text-sm text-gold">
                      Closes in 90 days. Nobody owns this step.
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
