<!-- transport: remote https://mcp.atlassian.com/v1/ads/public/mcp -->
<!-- request: {"tool":"ads_get_a11y_guidelines","args":{"topic":"colors"}} -->

{
  "topic": "colors",
  "title": "Color and Contrast Accessibility",
  "description": "Guidelines for using colors accessibly",
  "guidelines": [
    "Use design tokens for consistent contrast ratios",
    "Never rely on color alone for information",
    "Use color.text tokens for proper contrast",
    "Test with high contrast mode",
    "Ensure 4.5:1 contrast ratio for normal text",
    "Ensure 3:1 contrast ratio for large text"
  ],
  "codeExamples": [
    {
      "title": "Using Design Tokens for Colors",
      "code": "import { token } from '@atlaskit/tokens';\n\nconst styles = css({\n  color: token('color.text'),\n  backgroundColor: token('color.background.neutral'),\n});"
    },
    {
      "title": "Text Component with Color",
      "code": "import { Text } from '@atlaskit/primitives/compiled';\n\n<Text color=\"color.text.danger\">Error message</Text>\n<Text color=\"color.text.success\">Success message</Text>"
    }
  ],
  "bestPractices": [
    "Use color.text tokens for primary text",
    "Use color.text.subtle sparingly for secondary text",
    "Avoid color.text.disabled for critical information",
    "Test with different color vision types"
  ],
  "additionalResources": [
    "https://atlassian.design/llms-a11y.txt - Complete ADS accessibility documentation",
    "https://atlassian.design/foundations/accessibility - ADS accessibility foundation",
    "https://www.w3.org/WAI/WCAG21/quickref/ - WCAG 2.1 guidelines"
  ]
}
