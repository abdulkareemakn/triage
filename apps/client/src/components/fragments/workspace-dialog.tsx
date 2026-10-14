import { IconArrowNarrowRight, IconUsers } from "@tabler/icons-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildRequestAccessMailto } from "@/lib/contact";
import { SAMPLE_WORKSPACE } from "@/lib/sample-data";

const roles = ["Reviewer", "Submitter"] as const;

/**
 * The closing step, already open: name a workspace, choose how you would join,
 * and the request email is written with both filled in.
 */
export function WorkspaceDialogFragment() {
  const [workspace, setWorkspace] = useState(SAMPLE_WORKSPACE);
  const [role, setRole] = useState<(typeof roles)[number]>("Reviewer");

  return (
    <div
      data-ui
      className="dialog-surface w-full max-w-[26rem] rounded-lg border border-border bg-card p-5 text-card-foreground"
    >
      <h3 className="text-body font-medium">Name your workspace</h3>
      <p className="mt-1.5 text-small text-muted-foreground">
        One workspace per team. Everyone in it shares the same queue.
      </p>

      <form
        className="mt-4 flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex flex-col gap-2">
          <label className="text-small font-medium" htmlFor="workspace-name">
            Workspace
          </label>
          <Input
            className="min-h-11"
            id="workspace-name"
            onChange={(event) => setWorkspace(event.target.value)}
            placeholder="Acme Payments"
            value={workspace}
          />
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="flex items-center gap-2 text-small font-medium">
            <IconUsers aria-hidden="true" className="size-4" />
            You would join as
          </legend>
          <div className="flex gap-2">
            {roles.map((option) => {
              const selected = option === role;
              return (
                <Button
                  aria-pressed={selected}
                  className="min-h-11 flex-1"
                  key={option}
                  onClick={() => setRole(option)}
                  variant={selected ? "default" : "secondary"}
                >
                  {option}
                </Button>
              );
            })}
          </div>
        </fieldset>

        <a
          className={buttonVariants({ size: "xl" })}
          href={buildRequestAccessMailto(workspace, role)}
        >
          Request access
          <IconArrowNarrowRight aria-hidden="true" className="size-5" />
        </a>
      </form>
    </div>
  );
}
