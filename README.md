# Pi Desktop Mod

[![V15 Windows Build](https://github.com/Tibetan777/pi-desktop-mod/actions/workflows/v15-windows.yml/badge.svg)](https://github.com/Tibetan777/pi-desktop-mod/actions/workflows/v15-windows.yml)
[![Upstream](https://img.shields.io/badge/upstream-FaqFirebase%2Fpi--desktop-555)](https://github.com/FaqFirebase/pi-desktop)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)

An **unofficial community mod/fork** of [FaqFirebase/pi-desktop](https://github.com/FaqFirebase/pi-desktop).

This repository does not claim the original Pi Desktop project as its own. It keeps the upstream application and adds a tested V15 modification layer focused on OMP/provider reliability, model capability handling, usage diagnostics, and a Windows release path.

The app itself is still called **Pi Desktop**. The repository is named **Pi Desktop Mod** to make the relationship clear.

> **Current public build:** V15, Windows x64. Linux and macOS remain upstream-supported platforms, but this V15 overlay is currently verified and released for Windows only.

## Screenshots

Actual V15 mod build, cropped to avoid publishing local project names, sessions, account data, or private usage totals.

![Pi Desktop Mod home](docs/screenshots/mod-home.png)

### Usage diagnostics

![Pi Desktop Mod usage filters](docs/screenshots/mod-usage.png)

## What this mod adds

| Area | V15 modification |
| --- | --- |
| OMP model picker | Recovers from the OMP v1 transport-size failure by negotiating protocol v2 and retrying model discovery once when that exact transport error occurs. |
| Thinking / effort levels | Uses OMP/provider-advertised capabilities instead of inventing unsupported effort levels. |
| Usage diagnostics | Separates **local OMP request/journal telemetry** from provider-native account/quota/billing data. Local counters are never presented as provider billing totals. |
| Usage navigation | Adds clearer provider → model → session filtering and selected-period diagnostics. |
| Session/UI/runtime | Carries the accepted V15 session, history, UI, usage and runtime improvements from the maintained mod snapshot. |
| Voice | Keeps Pi Desktop's normal portable local voice workflow. The maintainer's machine-specific speech acceleration layer and local model files are deliberately excluded. |
| Windows release | Reproducible Windows x64 CI producing NSIS installer and portable EXE builds. |
| Updates | Mod releases are distributed from this fork's GitHub Releases. |

For implementation details, see [V15_MOD.md](V15_MOD.md).

## Download

Use the current V15 prerelease:

**[Pi Desktop Mod V15 — Windows x64](https://github.com/Tibetan777/pi-desktop-mod/releases/tag/v0.2.0-alpha-v15)**

Available files:

- `Pi-Desktop-0.2.0-alpha-win-x64-setup.exe` — NSIS installer, recommended.
- `Pi-Desktop-0.2.0-alpha-win-x64.exe` — portable build.

The binaries are not code-signed, so Windows SmartScreen may warn on first launch.

Provider credentials are **not** bundled. Install the app, then configure/authenticate your own providers.

## How V15 is applied

The mod is maintained as a deterministic post-build overlay in `patches/v15/`.

`npm run build`:

1. runs the normal upstream Electron/Vite build;
2. verifies the expected clean generated bundle hashes;
3. applies the reviewed V15 patches;
4. verifies the expected V15 output hashes.

If the upstream generated bundle no longer matches the expected base, the overlay **fails closed** rather than patching unknown output.

## Build status and platform support

The public V15 release is currently **Windows x64 only**.

The inherited upstream multi-platform release workflow was intentionally changed to Windows-only for this mod because the generated renderer bundle differs by platform. Treating the Windows V15 patch as a Linux/macOS patch caused misleading failed checks even though the Windows build was valid.

The dedicated `V15 Windows Build` workflow verifies:

- lint;
- unit tests;
- TypeScript type-check;
- deterministic V15 overlay;
- Windows NSIS + portable packaging.

## Privacy / publication boundary

This public fork intentionally excludes maintainer-specific runtime data, including:

- Pi/OMP sessions and conversation history;
- activity/usage stores and local journal data;
- provider account state;
- cookies and Electron/browser profiles;
- OAuth access/refresh tokens;
- API keys, GitHub tokens and private keys;
- local recovery archives;
- local model files and private machine-specific model paths;
- the maintainer's private native speech acceleration setup.

Screenshots in this README are privacy-safe crops from the actual mod UI.

## Build from source

This fork inherits the upstream build prerequisites. See the [upstream project](https://github.com/FaqFirebase/pi-desktop) for the full platform/development documentation.

For the supported Windows V15 build:

```powershell
git clone https://github.com/Tibetan777/pi-desktop-mod.git
cd pi-desktop-mod
npm ci
npm run lint
npm run typecheck
npm run build
npx --no-install electron-builder --win nsis portable --x64 --publish never
```

## Upstream

Original project: **[FaqFirebase/pi-desktop](https://github.com/FaqFirebase/pi-desktop)**

Pi Desktop is a free, open-source Electron GUI for Pi and oh-my-pi coding agents. This repository is a fork that adds the modifications described above.

Please use the upstream repository for the original project, upstream documentation, cross-platform releases, and upstream issue tracking.

## License

Apache-2.0, inherited from the upstream project. Upstream copyright and license notices are retained.
