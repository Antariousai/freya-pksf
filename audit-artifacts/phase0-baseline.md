# Phase 0 Baseline Audit

## Lighthouse Desktop Baseline (local static server)

| Page | Perf | A11y | Best | SEO | FCP | LCP | Speed Index | TBT | CLS | TTI |
|---|---:|---:|---:|---:|---|---|---|---|---|---|
| / | 88 | 94 | 96 | 91 | 1.2 s | 1.8 s | 1.6 s | 0 ms | 0.001 | 1.8 s |
| /business | 77 | 90 | 96 | 100 | 1.0 s | 1.6 s | 1.5 s | 320 ms | 0 | 1.6 s |
| /government | 75 | 90 | 96 | 100 | 1.0 s | 1.6 s | 1.6 s | 380 ms | 0.002 | 1.6 s |
| /freya | 78 | 90 | 96 | 100 | 1.0 s | 1.6 s | 1.6 s | 310 ms | 0.003 | 1.6 s |

## Screenshot Matrix

Screenshots generated under `audit-artifacts/screenshots` for:
- Devices: iPhone SE (375x667), iPhone 12 (390x844), iPhone 15 (393x852), iPad (768x1024), 1366x768, 1920x1080
- Pages: `/`, `/business`, `/government`, `/freya`