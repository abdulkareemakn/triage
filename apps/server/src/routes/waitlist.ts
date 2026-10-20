import type { JoinWaitlistResponse } from "@mern/shared";
import { Router } from "express";

import { type ValidatedLocals, validate } from "@/middleware/validate";
import { WaitlistEntry } from "@/models/waitlist-entry";
import { joinWaitlistSchema } from "@/schemas/waitlist";

export function waitlistRouter() {
  const router = Router();
  router.use((_req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
  });

  const joinRequest = { body: joinWaitlistSchema };
  type JoinLocals = ValidatedLocals<typeof joinRequest>;

  router.post<never, unknown, unknown, unknown, JoinLocals>(
    "/",
    validate(joinRequest),
    async (_req, res) => {
      const { email } = res.locals.validated.body;
      try {
        const result = await WaitlistEntry.updateOne(
          { email },
          { $setOnInsert: { email } },
          { upsert: true },
        );
        res
          .status(result.upsertedCount === 1 ? 201 : 200)
          .json({ status: "joined" } satisfies JoinWaitlistResponse);
      } catch (error) {
        // A concurrent insert can win the unique index before this upsert.
        if ((error as { code?: number }).code === 11000) {
          res
            .status(200)
            .json({ status: "joined" } satisfies JoinWaitlistResponse);
          return;
        }
        throw error;
      }
    },
  );

  return router;
}
