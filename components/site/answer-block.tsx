import { Reveal } from "./reveal";

/**
 * A question and its answer, placed high on the page and written so the whole thing
 * can be lifted without editing. Answer engines quote a passage, not a page, and a
 * passage that opens with the answer is the one they can use.
 *
 * Set on a hairline like every other structural divide here, rather than the thick
 * coloured left rule a callout usually reaches for.
 */
export function AnswerBlock({
  question,
  answer,
  className = "",
}: {
  question: string;
  answer: string;
  className?: string;
}) {
  return (
    <Reveal className={`border-t border-hairline-strong pt-7 ${className}`}>
      <h2 className="t-h4 text-white">{question}</h2>
      <p className="mt-3 max-w-[70ch] t-body-lg text-text-secondary">{answer}</p>
    </Reveal>
  );
}
