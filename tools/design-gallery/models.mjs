export const GALLERY_PORT = 4100;

export const ROUTES = [
  { id: "landing", label: "Landing", path: "/" },
  { id: "features", label: "Features", path: "/features" },
  { id: "contact", label: "Contact", path: "/contact" },
  { id: "sign-in", label: "Sign in", path: "/sign-in" },
  { id: "sign-up", label: "Sign up", path: "/sign-up" },
];

export const VIEWPORTS = [
  { id: "desktop", label: "Desktop", width: 1440, height: 900 },
  { id: "laptop", label: "Laptop", width: 1280, height: 800 },
  { id: "tablet", label: "Tablet", width: 834, height: 1112 },
  { id: "mobile", label: "Mobile", width: 390, height: 844 },
];

/**
 * The model explorations are marketing sites, not product workspaces.
 * They all use the DESIGN.md palette and type families; the comparison is
 * about composition, motion, and the product fragments embedded in the pages.
 */
export const MODELS = [
  {
    id: "cat-jam",
    label: "Cat Jam",
    port: 4101,
    root: "cat-jam",
    branch: "model/cat-jam-triage-marketing",
    tag: "design-wall/cat-jam",
    discarded: true,
    direction:
      "Editorial split hero, cool indigo surfaces, serif display type, and border-delimited sections.",
    summary:
      "A calm, conventional B2B landing page. The split hero and live console mockup are the signature, but the page stays close to a safe SaaS template.",
    knownIssues: [
      "No mobile navigation menu; the Sheet primitive is installed but unused.",
      "The hero console is rendered twice (desktop and mobile) with hand-rolled fields.",
      "Heavy 2px borders run across most sections.",
      "index.html still carries the Launchpad starter title.",
    ],
    components: [
      {
        name: "TriageConsole",
        file: "apps/client/src/routes/index.tsx",
        note: "Interactive intake-to-candidate mockup in the hero; fakes a title and priority from word count.",
      },
      {
        name: "SiteHeader / SiteFooter",
        file: "apps/client/src/components/site-{header,footer}.tsx",
        note: "Sticky marketing chrome. The header has no mobile menu.",
      },
      {
        name: "Base UI primitives",
        file: "apps/client/src/components/ui/*",
        note: "Button (6 variants, 9 sizes), card, input, label; accordion, sheet, and textarea are installed.",
      },
    ],
  },
  {
    id: "ling-flash",
    label: "Ling Flash",
    port: 4102,
    root: "ling-flash",
    branch: "model/ling-flash-triage-marketing",
    tag: "design-wall/ling-flash",
    discarded: true,
    direction:
      "A narrow reading rail, receipt-edge process section, greyscale found photography, and a dark split hero.",
    summary:
      "The most distinctive editorial voice and the strongest live product instrument: create a candidate, score a duplicate, and confirm or dismiss it.",
    knownIssues: [
      "The --dark-* token layer is never defined, so parts of the hero and instrument palette are invalid.",
      "Fragments marked aria-hidden contain focusable buttons.",
      "The contact confirmation rarely appears because location.href is set before state updates.",
      "FAQ and CTA markup are duplicated verbatim between index and features.",
    ],
    components: [
      {
        name: "IntakeInstrument",
        file: "apps/client/src/components/site/instrument.tsx",
        note: "The best live flow: type a report, create a candidate, run a Jaccard duplicate score, confirm or dismiss.",
      },
      {
        name: "Fragments",
        file: "apps/client/src/components/site/fragments.tsx",
        note: "Six product-UI slices used as marketing evidence, including a review queue and duplicate match.",
      },
      {
        name: "RolesList",
        file: "apps/client/src/components/site/roles-list.tsx",
        note: "Dotted-leader permission rows; a strong pattern for role summaries.",
      },
      {
        name: "BrandMark",
        file: "apps/client/src/components/site/brand-mark.tsx",
        note: "Three sorted bars; the only custom identity mark in the six.",
      },
    ],
  },
  {
    id: "longcat",
    label: "Longcat",
    port: 4103,
    root: "longcat",
    branch: "model/longcat-triage-marketing",
    tag: "design-wall/longcat",
    discarded: false,
    direction:
      "Oversized editorial type, giant cropped accent discs, and full-bleed color-block bands.",
    summary:
      "A confident, stage-like marketing page. The four-stage TriageBoard is the centerpiece and the clearest explanation of the pipeline.",
    knownIssues: [
      "Find-and-replace bugs in icon names: IconSend message, IconSend it, IconUsers cannot sign in, IconSend to review.",
      "The SheetTitle wraps IconMenu incorrectly in the root header.",
      "Decorative discs and 84svh bands are oversized for a workspace product.",
      "index.html still carries the Launchpad starter title.",
    ],
    components: [
      {
        name: "TriageBoard",
        file: "apps/client/src/components/triage-board.tsx",
        note: "Four-stage intake to candidate to review to decision demo with duplicate evidence.",
      },
      {
        name: "Site chrome",
        file: "apps/client/src/routes/__root.tsx",
        note: "Inline header and deep-indigo footer with a mobile Sheet.",
      },
      {
        name: "Color-block bands",
        file: "apps/client/src/routes/index.tsx",
        note: "Full-bleed stage sections and cropped accent discs.",
      },
    ],
  },
  {
    id: "mimo-flash",
    label: "Mimo Flash",
    port: 4104,
    root: "mimo-flash",
    branch: "model/mimo-flash-triage-marketing",
    tag: "design-wall/mimo-flash",
    discarded: false,
    direction:
      "Warm paper, archival mail-sorting photography, a scroll-pinned product reel, and masked-line motion.",
    summary:
      "The most atmospheric direction. Its fragment convention and small motion primitives are the most reusable parts.",
    knownIssues: [
      "The 280svh scroll-pinned hero reel is expensive and complex for a workspace product.",
      "staggerBuckets and long link class strings are duplicated across routes.",
      "Sample copy is scattered through routes and fragments.",
      "index.html still carries the Launchpad starter title.",
    ],
    components: [
      {
        name: "Marketing fragments",
        file: "apps/client/src/components/marketing/fragments.tsx",
        note: "Intake, candidate, decision, queue, and workspace-dialog slices written against semantic data-ui tokens.",
      },
      {
        name: "Motion primitives",
        file: "apps/client/src/components/marketing/motion.tsx",
        note: "Reveal and MaskedLine with an IntersectionObserver fallback and reduced-motion handling.",
      },
      {
        name: "SiteHeader / SiteFooter",
        file: "apps/client/src/components/marketing/site-{header,footer}.tsx",
        note: "Clean chrome with photography credits in the footer.",
      },
      {
        name: "Scroll reel",
        file: "apps/client/src/routes/index.tsx",
        note: "A pinned hero that assembles the product story as the visitor scrolls.",
      },
    ],
  },
  {
    id: "space-bunny",
    label: "Space Bunny",
    port: 4105,
    root: "space-bunny",
    branch: "model/space-bunny-triage-marketing",
    tag: "design-wall/space-bunny",
    discarded: true,
    direction:
      "A navy notched hero, departure-board queue, and a reviewer plate with margin notes.",
    summary:
      "The most product-shaped marketing site. Its queue and reviewer compositions translate directly into the real workspace.",
    knownIssues: [
      "Reviewer notes are positioned with hardcoded pixel offsets inside a fixed 720px plate.",
      "The plate is brittle at narrow widths and needs an app-friendly replacement.",
      "Queue rows lack aria-controls for the expanded detail.",
      "index.html still carries the Launchpad starter title.",
    ],
    components: [
      {
        name: "IntakeDemo",
        file: "apps/client/src/components/product/intake-demo.tsx",
        note: "Three-stage intake demo with local duplicate scoring, disabled states, and sensible empty handling.",
      },
      {
        name: "QueueBoard",
        file: "apps/client/src/components/product/queue-board.tsx",
        note: "One-open departure-board queue with status colors and a wide detail row.",
      },
      {
        name: "ReviewerPanelPlate",
        file: "apps/client/src/components/product/reviewer-panel.tsx",
        note: "Candidate detail with annotated margin notes; strong concept, fragile fixed-pixel layout.",
      },
      {
        name: "Product fragments",
        file: "apps/client/src/components/product/fragments.tsx",
        note: "IntakeRecord, DuplicateSuggestion, DecisionRecord, DiscordChannel, and sample channel messages.",
      },
      {
        name: "AuthShell",
        file: "apps/client/src/components/site/auth-shell.tsx",
        note: "Two-column auth layout with product fragments in the aside.",
      },
      {
        name: "Site shell",
        file: "apps/client/src/components/site/site-shell.tsx",
        note: "Shared page width, gutters, and header/footer composition.",
      },
    ],
  },
  {
    id: "step-5",
    label: "Step 5",
    port: 4106,
    root: "step-5",
    branch: "model/step-5-triage-marketing",
    tag: "design-wall/step-5",
    discarded: true,
    direction:
      "A switchboard and card-index archive metaphor, five named type steps, and a consistent data-ui fragment grammar.",
    summary:
      "The most coherent system and the best fragment grammar. Its review queue and decision log are the closest to real product UI.",
    knownIssues: [
      "Archival photography belongs to the marketing surface, not the workspace chrome.",
      "Capability arrays are duplicated with drifted copy between index and features.",
      "Fragments bypass the Card and Button primitives in places.",
      "Decision changes are not announced with aria-live.",
    ],
    components: [
      {
        name: "ReviewQueueFragment",
        file: "apps/client/src/components/fragments/review-queue.tsx",
        note: "The strongest live slice: approve or reject, confirm or dismiss a duplicate, record the time, start over.",
      },
      {
        name: "CandidateCardFragment",
        file: "apps/client/src/components/fragments/candidate-card.tsx",
        note: "Candidate summary with source, reporter, and body copy.",
      },
      {
        name: "DuplicateSuggestionFragment",
        file: "apps/client/src/components/fragments/duplicate-suggestion.tsx",
        note: "Matched candidate, score, and quoted evidence.",
      },
      {
        name: "DecisionLogFragment",
        file: "apps/client/src/components/fragments/decision-log.tsx",
        note: "Recorded decision with reviewer and time.",
      },
      {
        name: "IntakeListFragment",
        file: "apps/client/src/components/fragments/intake-list.tsx",
        note: "Incoming source items with channel and timestamp.",
      },
      {
        name: "NotificationFragment",
        file: "apps/client/src/components/fragments/notification.tsx",
        note: "Discord review notification pattern.",
      },
      {
        name: "RoleListFragment",
        file: "apps/client/src/components/fragments/role-list.tsx",
        note: "Submitter, reviewer, and admin permission summary.",
      },
      {
        name: "WorkspaceDialogFragment",
        file: "apps/client/src/components/fragments/workspace-dialog.tsx",
        note: "Workspace name and role chooser presented as a flat dialog-style card.",
      },
      {
        name: "CreditedPhoto",
        file: "apps/client/src/components/credited-photo.tsx",
        note: "Found photography with credit handling; marketing-only.",
      },
      {
        name: "MaskedLines / Reveal",
        file: "apps/client/src/components/reveal.tsx",
        note: "Baseline-rise headline and scroll reveal with reduced-motion discipline.",
      },
      {
        name: "AuthPage",
        file: "apps/client/src/components/auth-page.tsx",
        note: "Shared sign-in and sign-up composition.",
      },
    ],
  },
  {
    id: "combined",
    label: "Combined",
    port: 4107,
    root: "combined",
    branch: "model/combined-triage-marketing",
    tag: "design-wall/combined",
    discarded: false,
    combined: true,
    direction:
      "Longcat's editorial hero, working board, four color bands, and FAQ, with Mimo Flash's word-slot prose. The duplicate Mimo sections and closing CTA were removed after the first review.",
    summary:
      "The trimmed single-page merge of the two finalists. Headers, footers, and a closing CTA are intentionally absent so they can be designed separately.",
    knownIssues: [
      "The page intentionally ends at the FAQ; headers, footers, and a closing CTA still need to be designed.",
      "Mimo's reel, call-and-response, feature rows, context, integrations, roles, and the previous closing CTA are no longer rendered.",
      "The removed sections remain in git history under the earlier design-wall tags.",
    ],
    components: [
      {
        name: "Opening hero",
        file: "apps/client/src/components/combined/longcat.tsx",
        note: "Longcat's giant statement and accent disc, with Mimo's masked-line entrance.",
      },
      {
        name: "Working board",
        file: "apps/client/src/components/combined/longcat.tsx",
        note: "Longcat's four-stage TriageBoard, synchronized with the large stage list.",
      },
      {
        name: "Four stage bands",
        file: "apps/client/src/components/combined/longcat.tsx",
        note: "Longcat's full-bleed color bands with the four static product cards.",
      },
      {
        name: "What Triage does prose",
        file: "apps/client/src/components/combined/mimo.tsx",
        note: "Mimo's word-slot paragraph with inline product objects.",
      },
      {
        name: "Questions",
        file: "apps/client/src/components/combined/longcat.tsx",
        note: "Longcat's sticky-heading FAQ accordion.",
      },
    ],
  },
];
