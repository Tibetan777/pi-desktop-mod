# Pi Desktop Mod V15

This fork publishes the tested V15 modifications for [FaqFirebase/pi-desktop](https://github.com/FaqFirebase/pi-desktop) as a deterministic post-build overlay.

It is an **unofficial community mod/fork**. The application remains Pi Desktop; this repository is named Pi Desktop Mod to distinguish it from the upstream project.

## Build model

`npm run build` first runs the normal upstream `electron-vite build`, then applies the reviewed patches in `patches/v15/`. `scripts/apply-v15-overlay.mjs` checks the expected clean-bundle SHA-256 values before patching and verifies the expected public V15 SHA-256 values afterward. If the upstream generated bundle changes, the overlay fails closed instead of patching an unknown build.

## Included V15 behavior

- OMP-oriented provider/model handling and model-picker transport recovery.
- Provider-advertised thinking/effort capability handling without inventing unsupported levels.
- Usage/account telemetry separation so local OMP diagnostics are not presented as provider billing/account totals.
- Provider → model → session filtering for selected-period usage diagnostics.
- Session, UI, history, usage and runtime improvements carried by the accepted V15 snapshot.
- The built-in portable voice models and normal Pi Desktop voice workflow remain available.
- Update checks point to this fork's GitHub releases.

## Platform support

The public V15 overlay is verified and released for **Windows x64**.

Linux and macOS remain supported by upstream Pi Desktop, but this V15 overlay is not currently claimed as cross-platform. The renderer build output differs across operating systems, so the public mod CI deliberately refuses to imply Linux/macOS V15 compatibility without separate patches and verification.

## Public portability boundary

The maintainer's local V15 installation also has a private machine-local native speech acceleration layer that references models and executables stored on a specific local drive. That machine-specific layer is intentionally excluded from this public fork. It is not required for the standard portable voice models and would be invalid on another user's machine.

No local model files, local model paths, provider credentials, account state, sessions or other maintainer-specific runtime data are part of this repository or its release builds.

## Provider setup

Provider configuration is intentionally not bundled. After installation, each user configures and authenticates their own providers.

## Windows installer

The supported release artifacts are built by Electron Builder:

- `Pi-Desktop-0.2.0-alpha-win-x64-setup.exe` — NSIS installer.
- `Pi-Desktop-0.2.0-alpha-win-x64.exe` — portable executable.

This fork does not use MSI.

## Privacy

Never commit or package Pi Desktop user data, sessions, activity stores, OMP journals, browser/Electron profiles, cookies, OAuth tokens, API keys, GitHub tokens, private keys, recovery archives, personal prompt/history logs, or local model blobs.

Release artifacts are built on GitHub Actions from repository contents so the build runner has no access to the maintainer's local AppData or provider credentials.

## License

The upstream project is Apache-2.0 licensed. This fork retains the upstream license and attribution.
