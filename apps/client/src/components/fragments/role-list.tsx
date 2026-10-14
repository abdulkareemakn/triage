import { IconShield, IconUserPlus, IconUsers } from "@tabler/icons-react";

import { SAMPLE_ROLES, SAMPLE_WORKSPACE } from "@/lib/sample-data";

const roleIcon = {
  Submitter: IconUsers,
  Reviewer: IconUserPlus,
  Admin: IconShield,
} as const;

/** The workspace role contract, as the settings screen shows it. */
export function RoleListFragment() {
  return (
    <div
      data-ui
      className="w-full rounded-lg border border-border bg-card text-card-foreground"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <p className="text-body font-medium">Roles</p>
        <p className="text-small text-muted-foreground">{SAMPLE_WORKSPACE}</p>
      </div>

      <ul className="flex flex-col gap-2 px-3 pb-3">
        {SAMPLE_ROLES.map((entry) => {
          const RoleIcon = roleIcon[entry.role as keyof typeof roleIcon];
          return (
            <li
              className="flex items-start gap-3 rounded-lg bg-secondary p-3"
              key={entry.role}
            >
              <RoleIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <div className="min-w-0">
                <p className="text-small font-medium">{entry.role}</p>
                <p className="mt-1 text-small leading-relaxed text-muted-foreground">
                  {entry.permission}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
