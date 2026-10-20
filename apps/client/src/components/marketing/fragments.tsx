import {
  IconBrandDiscord,
  IconCheck,
  IconGitMerge,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";

/**
 * Cropped, working pieces of the Triage product, shown on the public
 * pages at their true interface size. Each root carries data-ui so the
 * product's own conventions (1px control borders, token radii) apply
 * inside. Sample content throughout — see the marketing report.
 */

export type ReelStep = "report" | "candidate" | "decision";

/**
 * A Discord message arriving in a connected channel — the intake step.
 */
export function IntakeFragment({ compact = false }: { compact?: boolean }) {
  return (
    <div data-ui="" className="frag">
      <div className="frag-head">
        <span className="frag-tile" aria-hidden="true">
          <IconBrandDiscord size={14} stroke={2} />
        </span>
        <span className="frag-strong text-xs">#bug-reports</span>
        <span className="frag-discord ml-auto">via Discord · 09:12</span>
      </div>
      <div className="frag-body">
        <p className="frag-msg m-0">
          <span className="frag-strong">sam-qa</span> Checkout page freezes
          after applying a discount code — happens on Safari, two customers so
          far today.
        </p>
        {!compact && (
          <div className="mt-3 flex items-center gap-2">
            <span className="frag-tag">New</span>
            <span className="frag-note">Imported from #bug-reports</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * A ticket candidate drafted from the report, with the duplicate
 * suggestion and its evidence. Confirm and Dismiss really work here.
 */
export function CandidateFragment({
  showDuplicate = true,
}: {
  showDuplicate?: boolean;
}) {
  const [suggestion, setSuggestion] = useState<
    "open" | "confirmed" | "dismissed"
  >("open");

  return (
    <div data-ui="" className="frag">
      <div className="frag-head">
        <span className="frag-strong text-xs">Ticket candidate</span>
        <span className="frag-tag ml-auto">Draft</span>
      </div>
      <div className="frag-body">
        <p className="frag-title m-0">
          Discount code freezes checkout on Safari
        </p>
        <div className="mt-3">
          <div className="frag-row">
            <span className="frag-label">Area</span>
            <span>Checkout</span>
          </div>
          <div className="frag-row">
            <span className="frag-label">Reported by</span>
            <span>sam-qa · #bug-reports</span>
          </div>
        </div>

        {showDuplicate && (
          <div className="mt-3.5">
            <p className="frag-note mb-2 flex items-center gap-2">
              <IconGitMerge size={14} stroke={2} aria-hidden="true" />
              Likely duplicate
              <span className="frag-score">matched 0.86</span>
            </p>
            <div className="frag-quote">
              <p className="frag-strong m-0 text-xs">
                Checkout hangs with promo codes
              </p>
              <p className="frag-note mt-1">
                “applying a discount code… page freezes” overlaps with TR-104
              </p>
            </div>
            {suggestion === "open" ? (
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="frag-btn frag-btn-primary"
                  onClick={() => setSuggestion("confirmed")}
                >
                  <IconCheck size={14} stroke={2} aria-hidden="true" />
                  Confirm
                </button>
                <button
                  type="button"
                  className="frag-btn"
                  onClick={() => setSuggestion("dismissed")}
                >
                  <IconX size={14} stroke={2} aria-hidden="true" />
                  Dismiss
                </button>
              </div>
            ) : (
              <p className="frag-note mt-3 flex items-center gap-1.5">
                <IconCheck size={14} stroke={2} aria-hidden="true" />
                {suggestion === "confirmed"
                  ? "Confirmed: merged into TR-104"
                  : "Dismissed: kept as its own candidate"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * The review decision: approve or reject, then the record and the
 * Discord notification that follows. Approve and Reject really work.
 */
export function DecisionFragment() {
  const [decision, setDecision] = useState<"open" | "approved" | "rejected">(
    "open",
  );

  return (
    <div data-ui="" className="frag">
      <div className="frag-head">
        <span className="frag-strong text-xs">Review</span>
        <span className="frag-tag ml-auto">
          {decision === "open"
            ? "Waiting"
            : decision === "approved"
              ? "Approved"
              : "Rejected"}
        </span>
      </div>
      <div className="frag-body">
        <p className="frag-title m-0">
          Discount code freezes checkout on Safari
        </p>
        <p className="frag-note">Candidate TR-118 · from #bug-reports</p>

        {decision === "open" ? (
          <div className="mt-3.5 flex gap-2">
            <button
              type="button"
              className="frag-btn frag-btn-primary"
              onClick={() => setDecision("approved")}
            >
              <IconCheck size={14} stroke={2} aria-hidden="true" />
              Approve
            </button>
            <button
              type="button"
              className="frag-btn"
              onClick={() => setDecision("rejected")}
            >
              <IconX size={14} stroke={2} aria-hidden="true" />
              Reject
            </button>
          </div>
        ) : (
          <div className="mt-3.5">
            <div className="frag-row">
              <span className="frag-label">Decision</span>
              <span className="frag-strong">
                {decision === "approved" ? "Approved" : "Rejected"}
              </span>
            </div>
            <div className="frag-row">
              <span className="frag-label">Reviewer</span>
              <span>Amara · just now</span>
            </div>
            <p className="frag-note mt-3 flex items-center gap-1.5">
              <IconBrandDiscord size={14} stroke={2} aria-hidden="true" />
              Posted to #triage-log
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * The first screen of the product: naming a workspace. The field and the
 * segmented choice really work, and the button carries the name on.
 */
export function WorkspaceDialogFragment() {
  const [name, setName] = useState("Northwind mobile");
  const [invite, setInvite] = useState<"link" | "code">("link");

  return (
    <div data-ui="" className="frag">
      <div className="frag-head">
        <span className="frag-strong text-xs">Name your workspace</span>
      </div>
      <div className="frag-body">
        <label className="frag-note mb-1.5 block" htmlFor="workspace-name">
          Workspace name
        </label>
        <input
          id="workspace-name"
          className="frag-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <p className="frag-note mt-3.5 mb-1.5">Invite reviewers by</p>
        <fieldset className="frag-seg-wrap">
          <legend className="sr-only">Invite method</legend>
          <div className="frag-seg">
            <button
              type="button"
              aria-pressed={invite === "link"}
              onClick={() => setInvite("link")}
            >
              Link
            </button>
            <button
              type="button"
              aria-pressed={invite === "code"}
              onClick={() => setInvite("code")}
            >
              Code
            </button>
          </div>
        </fieldset>
        <div className="mt-4">
          <a
            className="frag-btn frag-btn-primary w-full"
            href={
              name.trim()
                ? `/sign-up?workspace=${encodeURIComponent(name.trim())}`
                : "/sign-up"
            }
          >
            Create workspace
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * A compact fragment of the review queue: three candidates with their
 * states, used where a list is worth more than a single card.
 */
export function QueueFragment() {
  return (
    <div data-ui="" className="frag">
      <div className="frag-head">
        <span className="frag-strong text-xs">
          Candidates · Northwind mobile
        </span>
        <span className="frag-tag ml-auto">3 waiting</span>
      </div>
      <div className="frag-body">
        <div className="frag-row">
          <span className="pr-4">Discount code freezes checkout on Safari</span>
          <span className="frag-tag">Duplicate 0.86</span>
        </div>
        <div className="frag-row">
          <span className="pr-4">Push notification lost after re-install</span>
          <span className="frag-tag">Waiting</span>
        </div>
        <div className="frag-row">
          <span className="pr-4">
            Search returns nothing for hyphenated names
          </span>
          <span className="frag-tag">Approved</span>
        </div>
      </div>
    </div>
  );
}
