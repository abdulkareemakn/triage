import { IconBuilding, IconChevronDown, IconUsers } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

/**
 * More true-size pieces of Triage's interface, used on the features page. All
 * names, workspaces and roles shown are sample content.
 */

function Panel({
  children,
  className,
  label,
  meta,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
  meta?: string;
}) {
  return (
    <div
      data-ui
      className={cn(
        "w-full rounded-lg border border-border bg-card text-card-foreground",
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-4 rounded-t-lg bg-muted px-4 py-3">
        <p className="text-sm font-medium">{label}</p>
        {meta ? (
          <p className="text-xs text-muted-foreground tabular-nums">{meta}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function WorkspaceSwitcher() {
  const workspaces = [
    { name: "Northwind", members: 9, active: true },
    { name: "Northwind Labs", members: 4, active: false },
    { name: "Internal tools", members: 6, active: false },
  ];

  return (
    <Panel label="Workspaces" meta="3 joined">
      <ul className="grid gap-1 p-2">
        {workspaces.map((workspace) => (
          <li key={workspace.name}>
            <button
              type="button"
              aria-current={workspace.active ? "true" : undefined}
              className={cn(
                "flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                workspace.active
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-muted",
              )}
            >
              <IconBuilding size={16} aria-hidden="true" />
              <span className="font-medium">{workspace.name}</span>
              <span className="ml-auto flex items-center gap-2 text-muted-foreground tabular-nums">
                <IconUsers size={16} aria-hidden="true" />
                {workspace.members}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="rounded-b-lg bg-muted px-4 py-3 text-xs text-muted-foreground">
        One account can join several workspaces. Everything below the switcher
        belongs to the one that is active.
      </p>
    </Panel>
  );
}

const roleRows = [
  {
    role: "Submitter",
    allow: "Add intake and candidates",
    deny: "Cannot approve or reject",
  },
  {
    role: "Reviewer",
    allow: "See every submission in the workspace",
    deny: "Cannot manage invitations",
  },
  {
    role: "Admin",
    allow: "Everything a reviewer can do",
    deny: "Also invites people and changes roles",
  },
];

export function RolesPanel() {
  return (
    <Panel label="Roles" meta="Northwind">
      <ul className="grid gap-2 p-3">
        {roleRows.map((row) => (
          <li
            key={row.role}
            className="grid gap-1 rounded-md bg-muted px-4 py-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4"
          >
            <p className="text-sm font-medium">{row.role}</p>
            <p className="text-sm leading-6 text-muted-foreground">
              {row.allow}. {row.deny}.
            </p>
          </li>
        ))}
      </ul>
      <p className="rounded-b-lg bg-muted px-4 py-3 text-xs text-muted-foreground">
        An admin invites people with a link or a code.
      </p>
    </Panel>
  );
}

const queueRows = [
  {
    id: "cand-1042",
    title: "Promo code leaves the old basket total",
    status: "Approved",
    tone: "bg-primary text-primary-foreground",
  },
  {
    id: "cand-1039",
    title: "CSV export drops the last row",
    status: "Needs a decision",
    tone: "bg-accent text-accent-foreground",
  },
  {
    id: "cand-1031",
    title: "Session expires during file upload",
    status: "Rejected",
    tone: "bg-destructive/10 text-destructive",
  },
  {
    id: "cand-1028",
    title: "Search returns nothing for accented names",
    status: "Needs a decision",
    tone: "bg-accent text-accent-foreground",
  },
];

export function CandidateList() {
  return (
    <Panel label="Candidates" meta="Northwind · 4 open">
      <ul className="grid gap-2 p-3">
        {queueRows.map((row) => (
          <li
            key={row.id}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md bg-muted px-4 py-3"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{row.title}</span>
              <span className="block text-xs text-muted-foreground tabular-nums">
                {row.id}
              </span>
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-md px-3 py-1 text-xs font-medium",
                row.tone,
              )}
            >
              {row.status}
            </span>
          </li>
        ))}
      </ul>
      <p className="rounded-b-lg bg-muted px-4 py-3 text-xs text-muted-foreground">
        Candidates are only ever created by a person. Nothing enters this list
        without somebody submitting the text.
      </p>
    </Panel>
  );
}

export function RoleSelect() {
  return (
    <div
      data-ui
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-card-foreground"
    >
      <IconUsers size={16} aria-hidden="true" />
      <span>Reviewer</span>
      <IconChevronDown size={16} aria-hidden="true" />
    </div>
  );
}
