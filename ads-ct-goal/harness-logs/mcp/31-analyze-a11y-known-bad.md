<!-- transport: remote https://mcp.atlassian.com/v1/ads/public/mcp -->
<!-- request: {"tool":"ads_analyze_a11y","args":{"code":"export const Bad = () => (<div><img src=\"a.png\" /><button><svg /></button><div onClick={() => {}}>click</div><input type=\"text\" placeholder=\"Name\" /></div>);","componentName":"KnownBad"}} -->

{
  "summary": {
    "componentName": "KnownBad",
    "totalViolations": 3,
    "severityBreakdown": {
      "error": 2,
      "warning": 1
    },
    "context": "No additional context provided",
    "note": "Analysis completed using pattern matching (axe-core analysis failed)"
  },
  "violations": [
    {
      "type": "Image without alt text",
      "severity": "error",
      "count": 1,
      "suggestion": "Use the ads_suggest_a11y_fixes tool for ADS Image solutions. Describe the issue as \"image missing alt\", \"missing alt text\", or \"image accessibility\".",
      "adsFix": "Use the ads_suggest_a11y_fixes tool for specific ADS component solutions",
      "example": "The ads_suggest_a11y_fixes tool provides detailed code examples",
      "source": "pattern-analysis-fallback"
    },
    {
      "type": "Clickable div without accessibility",
      "severity": "warning",
      "count": 1,
      "suggestion": "Use the ads_suggest_a11y_fixes tool for ADS solutions. Describe the issue as \"clickable div\", \"interactive div\", or \"div with click handler\".",
      "adsFix": "Use the ads_suggest_a11y_fixes tool for specific ADS component solutions",
      "example": "The ads_suggest_a11y_fixes tool provides detailed code examples",
      "source": "pattern-analysis-fallback"
    },
    {
      "type": "Input without associated label",
      "severity": "error",
      "count": 1,
      "suggestion": "Use the ads_suggest_a11y_fixes tool for ADS form solutions. Describe the issue as \"input missing label\", \"form field without label\", or \"unlabeled input\".",
      "adsFix": "Use the ads_suggest_a11y_fixes tool for specific ADS component solutions",
      "example": "The ads_suggest_a11y_fixes tool provides detailed code examples",
      "source": "pattern-analysis-fallback"
    }
  ],
  "suggestions": [
    {
      "title": "Accessibility Improvements Needed",
      "description": "Found 3 accessibility issues in your code.",
      "violations": [
        {
          "type": "Image without alt text",
          "severity": "error",
          "count": 1,
          "suggestion": "Use the ads_suggest_a11y_fixes tool for ADS Image solutions. Describe the issue as \"image missing alt\", \"missing alt text\", or \"image accessibility\".",
          "adsFix": "Use the ads_suggest_a11y_fixes tool for specific ADS component solutions",
          "example": "The ads_suggest_a11y_fixes tool provides detailed code examples",
          "source": "pattern-analysis-fallback"
        },
        {
          "type": "Clickable div without accessibility",
          "severity": "warning",
          "count": 1,
          "suggestion": "Use the ads_suggest_a11y_fixes tool for ADS solutions. Describe the issue as \"clickable div\", \"interactive div\", or \"div with click handler\".",
          "adsFix": "Use the ads_suggest_a11y_fixes tool for specific ADS component solutions",
          "example": "The ads_suggest_a11y_fixes tool provides detailed code examples",
          "source": "pattern-analysis-fallback"
        },
        {
          "type": "Input without associated label",
          "severity": "error",
          "count": 1,
          "suggestion": "Use the ads_suggest_a11y_fixes tool for ADS form solutions. Describe the issue as \"input missing label\", \"form field without label\", or \"unlabeled input\".",
          "adsFix": "Use the ads_suggest_a11y_fixes tool for specific ADS component solutions",
          "example": "The ads_suggest_a11y_fixes tool provides detailed code examples",
          "source": "pattern-analysis-fallback"
        }
      ],
      "nextSteps": [
        "Review each violation and apply the suggested fixes",
        "Use ADS components instead of custom implementations",
        "Test with screen readers and keyboard navigation",
        "Run automated accessibility tests"
      ]
    }
  ],
  "error": "Axe-core analysis failed, used pattern-based analysis as fallback",
  "recommendations": [
    "Use ADS components for better accessibility out of the box",
    "Reference https://atlassian.design/llms-a11y.txt for detailed guidelines",
    "Test with keyboard navigation and screen readers",
    "Use automated accessibility testing tools"
  ]
}
