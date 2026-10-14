import {
  IconArrowRight,
  IconBrandDiscord,
  IconCheck,
  IconLink,
  IconX,
} from "@tabler/icons-react";
import { cn } from "cn";
import type { CSSProperties } from "react";
import type { ReactNode } from "react";

/**
 * Interface fragments: the product's own pictures. Each is a
 * believable slice of the Triage workspace at true size, with real
 * labels and sample content, and is marked aria-hidden because it
 * is imagery, not interface. Every name, report and score here is
 * sample content from a demonstration workspace.
 */

function Fragment({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none", className)}>
      {children}
    </div>
  );
}

export function IntakeFragment({ className }: { className?: string }) {
  return (
    <Fragment className={className}>
      <div data-ui className="fx-card w-full p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="fx-small font-medium">Report text</p>
          <span className="fx-chip">New</span>
        </div>
        <div className="fx-field mt-3 p-3">
          <p className="fx-body leading-relaxed">
            The nightly export email never arrived, and the finance team needs
            the figures before Thursday. Re-running the job did not help.
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="fx-readout fx-soft tabular-nums">
            132 characters
          </span>
          <button className="fx-btn fx-btn--primary" type="button">
            Create candidate
            <IconArrowRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export function DiscordFragment({ className }: { className?: string }) {
  return (
    <Fragment className={className}>
      <div data-ui className="fx-card w-full p-4">
        <div className="flex items-center gap-2">
          <IconBrandDiscord aria-hidden="true" className="size-4" />
          <span className="fx-chip fx-chip--on">design-team</span>
          <span className="fx-readout fx-soft">channel</span>
        </div>
        <div className="mt-3 flex items-start gap-2.5">
          <span className="fx-avatar">M</span>
          <div className="min-w-0">
            <p className="fx-readout">
              <span className="font-medium">mara</span>{" "}
              <span className="fx-soft tabular-nums">14:32</span>
            </p>
            <p className="fx-small mt-0.5 leading-relaxed">
              staging deploy broke sign-in again, error 500 on /settings, can
              someone look
            </p>
          </div>
        </div>
        <div className="fx-rule mt-3 flex items-center justify-between gap-2 pt-3">
          <span className="fx-chip">Imported to intake</span>
          <span className="fx-readout fx-soft tabular-nums">14:33</span>
        </div>
      </div>
    </Fragment>
  );
}

export function CandidateFragment({ className }: { className?: string }) {
  return (
    <Fragment className={className}>
      <div data-ui className="fx-card w-full p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">Sign-in fails on Safari</p>
          <span className="fx-chip fx-chip--on">Awaiting review</span>
        </div>
        <p className="fx-small fx-soft mt-2 leading-relaxed">
          Since Tuesday, signing in with Safari fails on the settings page.
          Error 500 appears after entering the password.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="fx-chip">Typed intake</span>
          <span className="fx-chip tabular-nums">214 characters</span>
        </div>
        <div className="fx-rule mt-3 flex items-center justify-between gap-2 pt-3">
          <span className="fx-small fx-soft">Mara Chen</span>
          <span className="fx-readout fx-soft tabular-nums">14:32</span>
        </div>
      </div>
    </Fragment>
  );
}

export function DuplicateFragment({ className }: { className?: string }) {
  return (
    <Fragment className={className}>
      <div data-ui className="w-full">
        <div className="fx-card p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium">Sign-in fails on Safari</p>
            <span className="fx-chip">New candidate</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="fx-small font-medium tabular-nums">86% match</span>
          <div className="fx-bar flex-1" aria-hidden="true">
            <span style={{ "--match-width": "86%" } as CSSProperties} />
          </div>
        </div>
        <div className="fx-card mt-3 p-4">
          <p className="text-sm font-medium">Sign-in fails on Safari</p>
          <p className="fx-small fx-soft mt-1 leading-relaxed">
            Since Tuesday, signing in with Safari fails on the settings page.
            Error 500 appears after entering the password.
          </p>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="fx-btn fx-btn--primary flex-1" type="button">
            <IconCheck aria-hidden="true" className="size-4" />
            Confirm
          </button>
          <button className="fx-btn fx-btn--quiet flex-1" type="button">
            <IconX aria-hidden="true" className="size-4" />
            Dismiss
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export function ReviewFragment({ className }: { className?: string }) {
  return (
    <Fragment className={className}>
      <div data-ui className="fx-card w-full p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">Review</p>
          <span className="fx-chip">Awaiting review</span>
        </div>
        <p className="mt-3 text-sm font-medium">Sign-in fails on Safari</p>
        <p className="fx-small fx-soft mt-1 leading-relaxed">
          Since Tuesday, signing in with Safari fails on the settings page.
          Error 500 appears after entering the password.
        </p>
        <div className="mt-4 flex gap-2">
          <button className="fx-btn fx-btn--primary flex-1" type="button">
            <IconCheck aria-hidden="true" className="size-4" />
            Approve
          </button>
          <button className="fx-btn fx-btn--quiet flex-1" type="button">
            <IconX aria-hidden="true" className="size-4" />
            Reject
          </button>
        </div>
        <div className="fx-rule mt-4 flex items-center justify-between gap-2 pt-3">
          <span className="fx-small fx-soft">Decision recorded</span>
          <span className="fx-readout fx-soft tabular-nums">
            Mara Chen · 14:41
          </span>
        </div>
      </div>
    </Fragment>
  );
}

export function RolesFragment({ className }: { className?: string }) {
  return (
    <Fragment className={className}>
      <div data-ui className="fx-card w-full p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">Meridian</p>
          <span className="fx-chip">Workspace</span>
        </div>
        <div className="mt-3">
          <div className="fx-row pb-3">
            <span className="fx-avatar">MC</span>
            <span className="flex-1 text-sm">Mara Chen</span>
            <span className="fx-chip">Reviewer</span>
          </div>
          <div className="fx-row pb-3">
            <span className="fx-avatar">JB</span>
            <span className="flex-1 text-sm">Jonas Beck</span>
            <span className="fx-chip">Submitter</span>
          </div>
          <div className="fx-row">
            <span className="fx-avatar">PN</span>
            <span className="flex-1 text-sm">Priya Nair</span>
            <span className="fx-chip">Admin</span>
          </div>
        </div>
        <div className="fx-rule mt-3 flex items-center justify-between gap-2 pt-3">
          <span className="fx-small fx-soft">Invite by link or code</span>
          <IconLink aria-hidden="true" className="size-4 fx-soft" />
        </div>
      </div>
    </Fragment>
  );
}
