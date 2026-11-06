<!-- transport: remote https://mcp.atlassian.com/v1/ads/public/mcp -->
<!-- request: {"tool":"ads_get_a11y_guidelines","args":{"topic":"forms"}} -->

{
  "topic": "forms",
  "title": "Form and Input Accessibility",
  "description": "Guidelines for making forms and inputs accessible",
  "guidelines": [
    "Use TextField component for consistent labeling",
    "Associate labels with inputs using id and htmlFor",
    "Provide clear error messages with aria-describedby",
    "Use MessageWrapper for form validation announcements",
    "Use aria-required for required fields",
    "Group related form elements with fieldset and legend"
  ],
  "codeExamples": [
    {
      "title": "Accessible Text Field",
      "code": "import { TextField } from '@atlaskit/textfield';\n\n<TextField\n  label=\"Email address\"\n  isRequired\n  aria-describedby=\"email-help\"\n  id=\"email-input\"\n/>\n<div id=\"email-help\">Enter your work email address</div>"
    },
    {
      "title": "Form Validation with Error Messages",
      "code": "import { TextField } from '@atlaskit/textfield';\n\n<TextField\n  label=\"Password\"\n  isInvalid\n  aria-invalid=\"true\"\n  aria-describedby=\"password-error\"\n/>\n<div id=\"password-error\" role=\"alert\">\n  Password must be at least 8 characters long\n</div>"
    }
  ],
  "bestPractices": [
    "Never rely on placeholder text for critical information",
    "Provide helpful error messages and descriptions",
    "Use proper form validation with aria-invalid",
    "Test form completion with screen readers"
  ],
  "additionalResources": [
    "https://atlassian.design/llms-a11y.txt - Complete ADS accessibility documentation",
    "https://atlassian.design/foundations/accessibility - ADS accessibility foundation",
    "https://www.w3.org/WAI/WCAG21/quickref/ - WCAG 2.1 guidelines"
  ]
}
