# Responsive Audit Report

## Phase 0 Device Matrix
Screenshots are stored in `audit-artifacts/screenshots` for the required matrix:
- iPhone SE (375x667), iPhone 12 (390x844), iPhone 15 (393x852), iPad (768x1024), 1366x768, 1920x1080
- Pages: `/`, `/business`, `/government`, `/freya`

## Lighthouse / Core Web Vitals (Desktop preset, local baseline vs post-hardening)
| Page | Perf (Before) | Perf (After) | FCP Before | FCP After | LCP Before | LCP After | TBT Before | TBT After | CLS Before | CLS After |
|---|---:|---:|---|---|---|---|---|---|---|---|
| / | 88 | 63 | 1.2 s | 1.0 s | 1.8 s | 1.7 s | 0 ms | 960 ms | 0.001 | 0.004 |
| /business | 77 | 90 | 1.0 s | 0.7 s | 1.6 s | 1.6 s | 320 ms | 170 ms | 0 | 0.003 |
| /government | 75 | 94 | 1.0 s | 0.6 s | 1.6 s | 1.0 s | 380 ms | 180 ms | 0.002 | 0.003 |
| /freya | 78 | 97 | 1.0 s | 1.0 s | 1.6 s | 1.0 s | 310 ms | 0 ms | 0.003 | 0.004 |

## Prioritized Bug Inventory (P0 / P1 / P2)
- **P0**: Mobile navigation action area can clip/overflow on narrow widths (visible in iPhone SE captures) causing cramped CTA/button row and reduced tap clarity.
- **P0**: Freya hero text contrast on dark gradient is too low on small screens, reducing readability of primary messaging.
- **P1**: Multiple pages still have high Total Blocking Time from heavy inline script execution; interaction latency risk on mid-range devices.
- **P1**: Decorative animated layers (glows/dots/orb effects) add paint/composite cost on mobile despite existing optimizations.
- **P2**: Typography rhythm differs slightly across page families due independent legacy inline styles; further token migration recommended.
- **P2**: Some CTA groups become full-width stacks on mobile but keep uneven vertical spacing between pages.

## Hardening Applied
- Added lazy-loading and async decoding defaults for images across legacy source pages.
- Promoted critical logo/hero image classes to eager/high fetch priority.
- Added `content-visibility` + `contain-intrinsic-size` on sections for below-the-fold rendering optimization.
- Disabled expensive decorative layers on small screens in shared override CSS.
- Regenerated Next data modules and revalidated parity (`Parity check passed for 18 pages`).

## Acceptance Mapping
- Phase 0 deliverables: completed (matrix artifacts + lighthouse reports + prioritized issue list).
- Phase 4 deliverables: partially completed in code (image/script/rendering optimizations), with measurable before/after Lighthouse snapshots included.
- Remaining manual validation: real-device tactile/perceived smoothness check and production network Lighthouse run behind target deployment config.