# Woodpecker/GitHub Pages parity plan

`xel-docs` is a public static documentation site deployed by GitHub Pages. It is not a gen-deployd target: gen-deployd is the internal executor for the registered GEN/ XEL service targets, while this repository's deployment depends on the GitHub Pages environment, Pages artifact API, and OIDC permissions.

The current Woodpecker pipeline is intentionally PR-only and build-only. It must not replace `.github/workflows/deploy.yml` until all of the following are implemented and proven:

1. A trusted main-only Woodpecker workflow builds with the pinned Node toolchain and publishes the Pages artifact using a protected, least-privilege GitHub deployment credential.
2. A `pages` concurrency lock prevents overlapping publishes, matching the existing GitHub workflow.
3. A canary publish targets a disposable preview (or an equivalent artifact-only verification); compare the generated artifact manifest and asset hashes with GitHub's build.
4. Post-publish smoke checks verify the Pages URL returns 200 and representative documentation pages plus CSS/JS assets return 200.
5. Rollback is tested by republishing the previous successful artifact/SHA and verifying the same smoke checks.

Only after those checks pass should the GitHub workflow be disabled (retaining the file and an explicit rollback procedure). Deleting it or removing its Pages permissions before parity is established would remove the only proven deploy path.
