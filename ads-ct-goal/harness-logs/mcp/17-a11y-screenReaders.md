<!-- transport: remote https://mcp.atlassian.com/v1/ads/public/mcp -->
<!-- request: {"tool":"ads_get_a11y_guidelines","args":{"topic":"screenReaders"}} -->

{
  "topic": "screenReaders",
  "title": "Screen Reader Support",
  "description": "Guidelines for screen reader accessibility",
  "guidelines": [
    "Use aria-live regions for dynamic content announcements",
    "Provide skip links for keyboard users",
    "Use proper heading hierarchy",
    "Use semantic HTML elements",
    "Provide live regions for status updates",
    "Use VisuallyHidden for screen reader text"
  ],
  "codeExamples": [
    {
      "title": "Screen Reader Announcements",
      "code": "<div aria-live=\"polite\" role=\"status\">\n  {count} items selected\n</div>"
    },
    {
      "title": "Skip Links",
      "code": "<a href=\"#main-content\" className=\"skip-link\">\n  Skip to main content\n</a>"
    }
  ],
  "bestPractices": [
    "Test with multiple screen readers (NVDA, JAWS, VoiceOver)",
    "Use aria-live=\"polite\" for status updates",
    "Use aria-live=\"assertive\" for critical alerts",
    "Avoid announcing the same message repeatedly"
  ],
  "additionalResources": [
    "https://atlassian.design/llms-a11y.txt - Complete ADS accessibility documentation",
    "https://atlassian.design/foundations/accessibility - ADS accessibility foundation",
    "https://www.w3.org/WAI/WCAG21/quickref/ - WCAG 2.1 guidelines"
  ]
}
