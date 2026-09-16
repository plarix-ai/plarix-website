"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { CONTACT_EMAIL, closing, processes } from "@/content/site";

type Status = "idle" | "sending" | "done" | "error";

const field =
  "w-full rounded-xl bg-white/[0.04] px-4 py-3.5 text-[15px] text-white placeholder:text-text-tertiary transition-colors duration-200 hover:bg-white/[0.06] focus:bg-white/[0.07] focus:outline-none";

export function CountForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          company: data.get("company"),
          email: data.get("email"),
          process: data.get("process"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "That did not go through.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? `${err.message} You can also reach us at ${CONTACT_EMAIL}.`
          : `Something went wrong. Email us at ${CONTACT_EMAIL}.`,
      );
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-ink-700 p-8 md:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
          <Check size={20} strokeWidth={2.4} />
        </span>
        <p className="mt-6 text-xl text-white" style={{ letterSpacing: "-0.02em" }}>
          Got it. We will be in touch within one business day.
        </p>
        <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-text-secondary">
          Next step is a twenty minute call to get read access sorted. Nothing to install, nothing
          to sign. If you want to move faster, reply straight to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-ink-700 p-6 md:p-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="sr-only">
            First name
          </label>
          <input id="firstName" name="firstName" required placeholder="First name" className={field} />
        </div>
        <div>
          <label htmlFor="lastName" className="sr-only">
            Last name
          </label>
          <input id="lastName" name="lastName" required placeholder="Last name" className={field} />
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor="company" className="sr-only">
          Company
        </label>
        <input id="company" name="company" required placeholder="Company" className={field} />
      </div>

      <div className="mt-3">
        <label htmlFor="email" className="sr-only">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Work email"
          className={field}
        />
      </div>

      <div className="mt-3">
        <label htmlFor="process" className="mb-2 block text-[13px] text-text-tertiary">
          Where would you want us to look first?
        </label>
        <select id="process" name="process" defaultValue="" className={`${field} appearance-none`}>
          <option value="" className="bg-ink-700">
            Not sure yet, show me the whole count
          </option>
          {processes.map((p) => (
            <option key={p.id} value={p.name} className="bg-ink-700">
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="solid-btn group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-black hover:bg-white/90 disabled:cursor-not-allowed disabled:bg-white/60 sm:w-auto"
      >
        {status === "sending" ? "Sending" : "Request the count"}
        {status === "sending" ? null : (
          <ArrowRight
            size={17}
            strokeWidth={2}
            className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          />
        )}
      </button>

      {status === "error" ? (
        <p role="alert" className="mt-4 text-sm leading-relaxed text-gold">
          {message}
        </p>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-text-tertiary">{closing.disclosure}</p>
      )}
    </form>
  );
}
