<!-- transport: remote https://mcp.atlassian.com/v1/ads/public/mcp -->
<!-- request: {"tool":"ads_analyze_a11y","args":{"code":"import Avatar, { AvatarContent } from \"@atlaskit/avatar\";\nimport { cssMap } from \"@atlaskit/css\";\nimport { Flex, Text } from \"@atlaskit/primitives/compiled\";\nimport { token } from \"@atlaskit/tokens\";\nimport type { Member } from \"../model\";\n\n// ADS の Avatar は src が無いと汎用の人型アイコンになり、頭文字を出す仕組みがない\n// （ガイドラインには \"Provide fallback initials\" とあるが API が無い）。\n// そこで AvatarContent の中身を差し替え、頭文字と人ごとの accent 色を出す。\n// accent 色は「意味を持たない識別用の色」（ads_get_guidelines: color roles）。\nconst tone = cssMap({\n\tblue: { width: \"100%\", height: \"100%\", backgroundColor: token(\"color.background.accent.blue.subtler\"), color: token(\"color.text.accent.blue.bolder\") },\n\tgreen: { width: \"100%\", height: \"100%\", backgroundColor: token(\"color.background.accent.green.subtler\"), color: token(\"color.text.accent.green.bolder\") },\n\tpurple: { width: \"100%\", height: \"100%\", backgroundColor: token(\"color.background.accent.purple.subtler\"), color: token(\"color.text.accent.purple.bolder\") },\n\torange: { width: \"100%\", height: \"100%\", backgroundColor: token(\"color.background.accent.orange.subtler\"), color: token(\"color.text.accent.orange.bolder\") },\n\tgray: { width: \"100%\", height: \"100%\", backgroundColor: token(\"color.background.accent.gray.subtler\"), color: token(\"color.text.accent.gray.bolder\") },\n});\n\ntype Size = \"small\" | \"medium\" | \"large\" | \"xlarge\";\n\nexport function PersonAvatar({ member, size = \"medium\", decorative = false }: { member: Member; size?: Size; decorative?: boolean }) {\n\tconst key = (member.color in tone ? member.color : \"gray\") as keyof typeof tone;\n\tconst initial = Array.from(member.name)[0] ?? \"?\";\n\treturn (\n\t\t<Avatar size={size} name={decorative ? undefined : member.name} src={member.image}>\n\t\t\t{member.image ? undefined : (\n\t\t\t\t<AvatarContent>\n\t\t\t\t\t<Flex xcss={tone[key]} alignItems=\"center\" justifyContent=\"center\" aria-hidden>\n\t\t\t\t\t\t<Text as=\"span\" weight=\"bold\" size={size === \"xlarge\" ? \"large\" : size === \"small\" ? \"small\" : \"medium\"} color=\"inherit\">\n\t\t\t\t\t\t\t{initial}\n\t\t\t\t\t\t</Text>\n\t\t\t\t\t</Flex>\n\t\t\t\t</AvatarContent>\n\t\t\t)}\n\t\t</Avatar>\n\t);\n}\n","componentName":"PersonAvatar","context":"CTスケジュール（日本語 UI）の画面"}} -->

{
  "summary": {
    "componentName": "PersonAvatar",
    "totalViolations": 0,
    "severityBreakdown": {
      "error": 0,
      "warning": 0
    },
    "context": "CTスケジュール（日本語 UI）の画面",
    "note": "Analysis completed using pattern matching (axe-core analysis failed)"
  },
  "violations": [],
  "suggestions": [],
  "error": "Axe-core analysis failed, used pattern-based analysis as fallback",
  "recommendations": [
    "Use ADS components for better accessibility out of the box",
    "Reference https://atlassian.design/llms-a11y.txt for detailed guidelines",
    "Test with keyboard navigation and screen readers",
    "Use automated accessibility testing tools"
  ]
}
