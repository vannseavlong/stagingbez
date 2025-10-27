# Events Reference (web-v2)

All analytics event names are prefixed automatically with `web-v2:` when sent via `trackEvent()`.

Below is a short catalogue of events implemented in the codebase and their typical parameters. Use these as a source of truth for analytics and marketing.

- web-v2:page_view
  - params: { path: string, language?: string }
  - Emitted on route change. Captured by `AnalyticsProviderClient`.

- web-v2:section_view
  - params: { section: string }
  - Fired once when a section enters the viewport (use `useSectionView(ref, name)`).

- web-v2:telegram_click
  - params: { source?: string, href?: string }
  - When the floating Telegram widget is clicked.

- web-v2:telegram_close
  - params: { source?: string }
  - When the floating Telegram widget is closed.

- web-v2:language_change
  - params: { from?: string, to: string }
  - When user changes UI language.

- web-v2:footer_media_click
  - params: { platform: string, href?: string }
  - Clicks on footer social icons (Telegram, Facebook, TikTok, Instagram).

- web-v2:download_click
  - params: { platform: string, href?: string }
  - User clicks the Download App button; platform indicates chosen store or detected platform.

- web-v2:contact_click
  - params: { source?: string, path?: string }
  - User clicks Contact Us button.

- web-v2:contact_navigate
  - params: { target: string }
  - Attempt to navigate to contact section root.

- web-v2:contact_navigate_fail
  - params: { target: string }
  - Navigation attempt failed (fallback used).

- web-v2:service_card_click
  - params: { title?: string }
  - Click on a service card.

- web-v2:video_play
  - params: { video_index: number, video_id: string, title?: string }
  - When testimonial video is played.

- web-v2:video_close
  - params: { video_index: number, video_id: string, title?: string }
  - When testimonial video is closed.

Common params attached automatically by the analytics wrapper:
- utm_source, utm_medium, utm_campaign (if present on first visit)
- referrer
- is_direct (boolean)

If you'd like, I can extend this file with expected dashboard filters, BigQuery SQL snippets, or a CSV mapping for non-technical stakeholders.
