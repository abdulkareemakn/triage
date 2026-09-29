# Inherited starter notes

These notes came with the original documentation. They are not Triage tasks or
approved scope. Use the Kaneo Triage project for current work.

Use semantic color roles such as `background`, `foreground`, `primary`, and `border`.
Do not spread feature-specific hex values through components. Check contrast in light
and dark themes, keyboard navigation, narrow screens, and 200% zoom before treating a
design change as complete.

Mention the proper complete ShadCN tokens somewhere.

Create a landing page for the application.

## Launch documentation follow-up

- [ ] Align the API reference and validation guide with the shipped endpoints, or add the example route as a starter feature.
- [ ] Refresh the testing guide to match the checked-in E2E files and the upload lifecycle coverage.
- [ ] Present email as an integration foundation throughout the email and deployment guides, and show how an app feature can call the delivery helper.
- [ ] Describe the authentication foundation as API endpoints, session helpers, and protected middleware, with app-specific sign-in and sign-up flows built on top.
- [ ] Update `docs/README.md` with the current Cloudflare Pages publication workflow.
- [ ] Define and document a lifecycle for pending upload records and objects, including a cleanup job or TTL policy.
