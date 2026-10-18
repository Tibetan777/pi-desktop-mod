# Pi Desktop Mod V15.1

This repository is an **unofficial community mod/fork** of [FaqFirebase/pi-desktop](https://github.com/FaqFirebase/pi-desktop).

V15.1 is maintained as a deterministic post-build overlay and is currently verified for **Windows x64**.

## Public defaults

Fresh public installs intentionally use a portable, OMP-first configuration:

- `piEngine: 'omp'`
- `piExecutablePath: 'omp'`
- `defaultThinkingLevel: 'low'`
- provider: unset
- model: unset
- permission mode: `ask-edits`
- theme: `system`
- portable voice configuration only

These defaults reproduce the useful OMP-oriented behavior of the maintainer's setup without copying private provider/account state, trusted-machine permissions, private themes, or machine-local voice models.

OMP itself is an external runtime and is not bundled into the Pi Desktop installer. The source's supported OMP install command is:

```powershell
bun install -g @oh-my-pi/pi-coding-agent
```

Pi Desktop then detects `omp` / `omp.exe`; a custom executable/install-directory path can also be selected in Settings.

## Build model

`npm run build` runs the upstream `electron-vite build`, then applies the reviewed patches in `patches/v15/`. `scripts/apply-v15-overlay.mjs` verifies the clean bundle SHA-256 values before patching and the expected public V15 SHA-256 values afterward.

If the generated base changes, the overlay fails closed instead of applying to unknown output.

## Included V15 behavior

- OMP model discovery and model-picker transport recovery.
- Provider-advertised thinking/effort capability handling.
- Local OMP telemetry kept distinct from provider-native account/quota/billing data.
- Provider → model → session filtering for selected-period usage diagnostics.
- Session, history, UI, usage, and runtime improvements from the accepted V15 mod.
- Portable Pi Desktop voice workflow.
- Update checks directed to this fork's releases.

## Platform support

The public V15 overlay is verified and released for **Windows x64** only. Upstream Pi Desktop supports additional platforms, but this fork does not claim V15 Linux/macOS compatibility until separate generated bundles are tested and supported.

## Public portability boundary

The maintainer's local installation has additional machine-specific configuration. It is deliberately not copied into the public build.

Excluded material includes local model files/paths, provider credentials, account state, sessions, usage journals, cookies, OAuth state, private keys, recovery archives, local themes, and private native speech acceleration.

## Provider setup

Provider configuration is never bundled. Each user authenticates and configures their own providers and models after OMP is available.

## Windows packaging

Electron Builder produces an NSIS setup executable plus a portable Windows executable. This fork does not use MSI.

## License

The upstream project is Apache-2.0 licensed. This fork retains upstream license and attribution.
