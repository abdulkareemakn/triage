import { createFileRoute } from "@tanstack/react-router";

import { ContactForm, ContactIntro } from "@/components/contact";
import { ReviewQueueFragment } from "@/components/fragments/review-queue";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/contact")({ component: ContactPage });

export function ContactPage() {
  return (
    <>
      <section className="px-5 pt-10 pb-4 sm:px-8 lg:px-16 lg:pt-16 xl:px-20">
        <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <div>
            <h1 className="max-w-[16ch] font-serif text-display text-balance">
              Tell us how reports reach you
            </h1>
            <p className="mt-6 max-w-[46ch] text-lead text-foreground text-pretty">
              Describe the channel they arrive in, or paste an example. The form
              writes the email for you; it does not send one.
            </p>
            <ContactForm />
          </div>

          <Reveal className="lg:pt-10">
            <ContactIntro />
          </Reveal>
        </div>
      </section>

      <section className="mt-24 px-5 sm:mt-32 sm:px-8 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-[92rem] gap-10 rounded-lg bg-secondary p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20 lg:p-14">
          <div className="max-w-[38rem]">
            <h2 className="font-serif text-head text-balance">
              The queue your reports would land in
            </h2>
            <p className="mt-4 max-w-[52ch] text-body text-muted-foreground text-pretty">
              One list, ordered by arrival. Each report becomes a candidate, and
              a person decides. Try it here: the buttons work, and the workspace
              content is sample data.
            </p>
          </div>
          <div>
            <ReviewQueueFragment />
          </div>
        </div>
      </section>
    </>
  );
}
