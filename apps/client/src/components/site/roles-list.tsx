/**
 * The role contract from the product record, as two-ended
 * rows: the permission on the left, its scope on the right.
 */
import { cn } from "cn";

const roles = [
  {
    group: "Submitter",
    dot: "triage-dot--a",
    rows: [
      { text: "Add intake and candidates", value: "text or Discord" },
      { text: "View candidate status", value: "own work" },
    ],
  },
  {
    group: "Reviewer",
    dot: "triage-dot--b",
    rows: [
      { text: "View workspace submissions", value: "whole workspace" },
      { text: "Approve or reject candidates", value: "one decision each" },
    ],
  },
  {
    group: "Admin",
    dot: "triage-dot--c",
    rows: [
      { text: "Submitter and reviewer actions", value: "both roles" },
      { text: "Manage invitations and roles", value: "link or code" },
    ],
  },
] as const;

export function RolesList({ className }: { className?: string }) {
  return (
    <div className={className}>
      {roles.map((role, roleIndex) => (
        <div className={cn(roleIndex > 0 && "mt-10")} key={role.group}>
          <p className="text-base text-muted-foreground">{role.group}</p>
          <ul className="mt-4">
            {role.rows.map((row) => (
              <li className="flex h-9 items-center gap-2" key={row.text}>
                <span
                  aria-hidden="true"
                  className={cn("size-4 rounded-full", role.dot)}
                />
                <span className="text-base">{row.text}</span>
                <span className="flex-1" />
                <span className="text-right text-[0.8125rem] tabular-nums text-muted-foreground">
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
