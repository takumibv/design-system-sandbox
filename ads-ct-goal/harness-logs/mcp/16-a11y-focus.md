<!-- transport: remote https://mcp.atlassian.com/v1/ads/public/mcp -->
<!-- request: {"tool":"ads_get_a11y_guidelines","args":{"topic":"focus"}} -->

{
  "topic": "focus",
  "title": "Focus Management",
  "description": "Guidelines for proper focus management",
  "guidelines": [
    "Ensure logical tab order",
    "Provide visible focus indicators",
    "Handle focus trapping in modals",
    "Return focus when dialogs close",
    "Use Focusable component for custom elements",
    "Manage focus in dynamic content"
  ],
  "codeExamples": [
    {
      "title": "Focus Management in Modal",
      "code": "import { useRef, useEffect } from 'react';\n\nconst modalRef = useRef<HTMLDivElement>(null);\n\nuseEffect(() => {\n  if (isOpen && modalRef.current) {\n    modalRef.current.focus();\n  }\n}, [isOpen]);"
    },
    {
      "title": "Custom Focusable Element",
      "code": "import { Focusable } from '@atlaskit/primitives/compiled';\n\n<Focusable\n  as=\"div\"\n  tabIndex={0}\n  onKeyDown={(e) => {\n    if (e.key === 'Enter' || e.key === ' ') {\n      handleActivate();\n    }\n  }}\n>\n  Custom focusable element\n</Focusable>"
    }
  ],
  "bestPractices": [
    "Test focus order with keyboard navigation",
    "Ensure focus indicators are visible in all themes",
    "Handle focus restoration when components unmount",
    "Use focus trapping for modal dialogs"
  ],
  "additionalResources": [
    "https://atlassian.design/llms-a11y.txt - Complete ADS accessibility documentation",
    "https://atlassian.design/foundations/accessibility - ADS accessibility foundation",
    "https://www.w3.org/WAI/WCAG21/quickref/ - WCAG 2.1 guidelines"
  ]
}
