# ADS コンポーネントの usage / content / accessibility ガイドライン抜粋
# 出典: MCP ads_get_all_components（remote, 2026-11-05）

## Avatar (@atlaskit/avatar) status=general-availability category=images
A component for displaying user avatars with support for images, initials, and status indicators.

### usageGuidelines
- Use for user or entity (repo, space). Circle = person; hexagon = agent/AI; square = project/repo/space
- Use presence for availability; status for approval/permission states
- Use consistent sizing within the same context
- Place avatars in logical groupings (e.g., team members)
- Use presence indicators sparingly for real-time status only
- Provide fallback initials when images fail to load
- Always provide meaningful names for accessibility
- Use the `name` prop to include alternative text for screen readers
- For decorative images, remove the `name` prop or leave it empty so it will be ignored by assistive technologies
- Don't use a tooltip with an avatar when it's non-interactive or disabled. The tooltip won't work for keyboard users and screen readers

### contentGuidelines
- Use full names when possible for better recognition
- For companies/projects, use descriptive names
- Avoid generic terms like 'User' or 'Admin'
- Use consistent naming conventions across your app
- Keep names concise but meaningful

## AvatarGroup (@atlaskit/avatar-group) status=general-availability category=data-display
A component for displaying multiple avatars in a group with overlap and overflow handling.

### usageGuidelines
- Use for displaying multiple users or team members
- Consider overflow behavior for large groups
- Use appropriate sizing for context
- Provide clear user identification

### contentGuidelines
- Use meaningful names for users
- Consider group context and purpose
- Provide clear overflow indicators
- Use consistent naming patterns

### accessibilityGuidelines
- Provide clear labels for avatar groups
- Use appropriate overflow handling
- Ensure keyboard navigation support
- Provide clear user identification

## Badge (@atlaskit/badge) status=general-availability category=status-indicators
A badge is a visual indicator for numeric values such as tallies and scores, providing quick visual feedback.

### usageGuidelines
- Use for displaying counts, scores, or status indicators for a single item or label
- Use with one item/label only to avoid ambiguity
- Keep badge content concise and meaningful
- Use appropriate appearance variants for different contexts
- Position badges near relevant content
- Consider maximum value display limits
- Add a tooltip when the badge has an icon or needs extra context.
- Use Lozenge for non-numeric status; use Tag for labels

### contentGuidelines
- Use clear, concise numeric or text values
- Ensure values are meaningful to users
- Use consistent formatting across similar badges
- Consider localization for number formatting (locale-aware numbers)

### accessibilityGuidelines
- Ensure badge content is announced by screen readers
- Do not rely on color alone for positive/negative meaning
- Use appropriate color contrast for text readability
- Provide meaningful context for numeric values
- Consider alternative text for non-numeric badges

## Banner (@atlaskit/banner) status=general-availability category=messaging
A banner displays a prominent message at the top of the screen to communicate important information to users.

### usageGuidelines
- Use only for critical messaging: loss of data/functionality or important site-wide information
- Show one banner at a time and push content down
- Place at the top of the screen for maximum visibility
- Keep messaging concise and actionable
- Consider dismissibility for non-critical messages
- Use Flag for confirmations or minimal interaction; use Inline message when action is required

### contentGuidelines
- Use "we" not "you" in error messages
- Write clear, concise, scannable messages
- Include follow-up actions where relevant
- Use action-oriented language when appropriate
- Ensure messages are relevant to the current context

### accessibilityGuidelines
- Do not rely on color alone for severity; provide accessible label for warning/error icons
- Alert role is a live region and very noisy—use only when the message is very important
- Keep content concise to avoid truncation (truncation is not accessible)
- Use appropriate color contrast for text readability
- Provide clear, actionable messaging
- Consider keyboard navigation for interactive banners

## Button (@atlaskit/button) status=general-availability category=form
A versatile button component with multiple appearances and states for triggering actions. A button triggers an event or action. They let users know what will happen next. Note the root entrypoint of `@atlaskit/button` is deprecated and being replaced with `@atlaskit/button/new`.

### usageGuidelines
- Use primary buttons for the main action on a page
- Limit to one primary button per section
- Use compact size for tight spaces
- Use subtle buttons for secondary actions
- Use danger buttons sparingly for destructive actions
- Group related buttons together with ButtonGroup
- Use buttons for actions; use links for navigation (different semantics and assistive tech behavior)

### contentGuidelines
- Use action verbs that describe the interaction
- Keep text concise (1-3 words ideal)
- Avoid generic terms like "Submit" or "Click here"
- Use sentence case
- Keep button labels consistent with surrounding UI (e.g. modal primary button should reflect modal intent)
- Use buttons for actions, links for navigation
- Only include one primary call to action (CTA) per area
- Start with the verb and specify what's being acted on
- Don't use punctuation in button labels

### accessibilityGuidelines
- Always provide meaningful labels for screen readers
- Provide loading state announcements for async actions

## IconButton (@atlaskit/button) status=general-availability category=form
A button that displays only an icon with an optional tooltip. Perfect for toolbar actions, compact interfaces, and when space is limited.

### usageGuidelines
- Use for toolbar actions and compact interfaces
- Choose icons that clearly represent their function
- Group related icon buttons together
- Use sparingly to avoid visual clutter
- Consider using tooltips for additional context
- Always provide a meaningful label for accessibility
- The icon should clearly represent the action it performs

### contentGuidelines
- Use clear, concise, descriptive labels
- Use action verbs (e.g., "Edit item", "Delete comment")
- Choose icons that are universally understood
- Avoid using icons without labels in critical actions

## Checkbox (@atlaskit/checkbox) status=general-availability category=forms-and-input
A checkbox is an input control that allows a user to select one or more options from a number of choices.

### usageGuidelines
- Use for multiple choice selections from a list, or for explicit confirmation (e.g. settings)
- Use indeterminate state when some but not all children in a group are selected
- Group related checkboxes logically
- Provide clear labels for each option
- Consider default states carefully
- Use Radio for single selection; Dropdown for compact single choice; Toggle for on/off

### contentGuidelines
- Write short, descriptive labels; no punctuation after labels
- Use consistent language across related options
- Avoid negative phrasing when possible
- Group related options together

### accessibilityGuidelines
- Include error messages for required or invalid checkbox state
- Do not use disabled if the control must stay in tab order; use validation and error message so screen reader users hear why and how to proceed
- Ensure proper labeling for all checkboxes
- Use clear, descriptive labels that explain the choice
- Provide keyboard navigation support
- Indicate required fields clearly
- Use appropriate error states and messaging

## DropdownMenu (@atlaskit/dropdown-menu) status=general-availability category=navigation
A dropdown menu component for displaying contextual actions and options.

### usageGuidelines
- Use for 5–15 items; navigation or command (action on selection)
- Avoid truncation—check max width; avoid truncated labels
- Nested menu: maximum two layers
- In a modal, use shouldRenderToParent for correct focus and screen reader behavior
- Disabled triggers are not supported (see Button a11y)
- Use Select for search/select; Checkbox for multiple from list; Radio for short single choice

### contentGuidelines
- Logical order (e.g. most selected first); group with uppercase section title
- Use verbs for actions, nouns for links; no articles; single line per item
- Use clear, descriptive menu item labels
- Keep menu item text concise
- Group related actions logically
- Use consistent terminology across menu items

### accessibilityGuidelines
- Avoid truncation—ensure max width does not cut off labels
- Focus lock when open; keyboard open should focus first item
- Nested menu: maximum two layers
- In modal use shouldRenderToParent for focus and voicing
- Provide clear labels for dropdown triggers
- Ensure keyboard navigation with arrow keys
- Use appropriate ARIA attributes

## EmptyState (@atlaskit/empty-state) status=general-availability category=status
A component for when there is nothing to display (no tasks, cleared inbox, no results).

### usageGuidelines
- Use when nothing to display in a view (no tasks, no results, cleared inbox)
- Header is required; illustration, description, and buttons are optional
- Use wide (464px) or narrow (304px) layout as appropriate
- Provide one primary CTA; do not stack multiple primary buttons
- Use illustration as spot only—do not resize; keep relevant, neutral or humorous
- Explain why the state is empty and provide clear next steps
- Consider i18n for illustrations (e.g. culturally neutral imagery, translatable alt text)

### contentGuidelines
- Blank slate: inspirational, motivating tone
- All done: celebratory tone
- No results: neutral tone with next steps
- Use clear, descriptive headers
- Provide specific next steps; avoid negative language

### accessibilityGuidelines
- Avoid jargon; use simple language
- Use descriptive link text (not "click here")
- Add alt text only if the illustration is meaningful; otherwise omit or mark decorative
- Provide clear empty state messaging
- Use appropriate headings and structure
- Ensure actionable content is accessible

## Flag (@atlaskit/flag) status=general-availability category=feedback
A component for displaying brief messages.

### usageGuidelines
- Use for confirmations and alerts needing minimal interaction
- Position at bottom left; overlays content
- Default: dismissible, event-driven (e.g. avatar update). Bold: not dismissible, severity (success/loading/warning/error), collapsed/expanded
- Use Banner for critical/system messages; Inline message when action is required; Modal for immediate action

### contentGuidelines
- Be clear about what went wrong for errors
- Provide specific steps to resolve issues
- Use a helpful, non-threatening tone
- Clearly state potential consequences for warnings
- Confirm outcome then get out of the way for success messages
- Information: inform, no action needed
- Warning: before action, empathy, offer alternative
- Error: explain what went wrong and next step; use "we" not "you"
- Success: confirm outcome, then get out of the way; option to view details
- Be clear and concise; use a helpful, non-threatening tone

### accessibilityGuidelines
- Keep copy concise for zoom and long words
- Use h2 for title via `headingLevel` prop; maintain heading hierarchy
- Do not stack dismissible and non-dismissible flags
- Do not rely on color alone for severity
- Avoid dead ends—always indicate how to proceed
- Do not use auto-dismiss for critical messages
- Use descriptive link text that describes the destination
- Ensure flag content is announced by screen readers
- Consider screen reader announcement conflicts

## ErrorMessage (@atlaskit/form) status=general-availability category=form
Displays validation error text for a form field.

### usageGuidelines
- Use within MessageWrapper when field validation fails
- Show specific, actionable error messages
- Place below the form control

### contentGuidelines
- Provide specific error messages
- Explain how to fix the error

## Field (@atlaskit/form) status=general-availability category=form
A form field wrapper that provides label, validation, and error handling. Used with any form control via the component prop.

### usageGuidelines
- Use for each form input; provide name, label, and component
- Use isRequired for required fields
- Use validate for validation logic; use helperMessage for instructions
- Wrap messages in MessageWrapper with HelperMessage, ErrorMessage, ValidMessage

### contentGuidelines
- Use clear, descriptive labels
- Provide specific error messages
- Use helper text for complex fields

## Form (@atlaskit/form) status=general-availability category=form
A component for building forms with validation and state management.

### usageGuidelines
- Use when users need to provide and submit information (settings, create work item)
- Use with textfield, select, radio, checkbox and other form controls
- Structure: title, description, required legend, asterisk, helper text, labels above fields, character counter where needed, sections, footer with primary/secondary actions
- Provide clear field labels and instructions
- Mark required fields with asterisk (*)
- Provide specific error messages

### contentGuidelines
- Use clear, concise labels
- Use labels and helper text for critical info—not placeholder alone (exception: search with icon + label)
- Provide specific error messages
- Use consistent terminology
- Always include a visible label (exception: search fields)
- Match field length to intended content length

### accessibilityGuidelines
- Autofocus the first field when appropriate
- Use visible labels for all fields (search is the exception)
- Never disable the submit button—use validation and instructions so users know how to proceed
- Support autofill tokens and persist form state on refresh where appropriate
- Use inline validation with clear instructions
- Provide clear labels for all form fields
- Ensure keyboard navigation between fields
- Mark required fields clearly

## HelperMessage (@atlaskit/form) status=general-availability category=form
Displays helper or hint text for a form field.

### usageGuidelines
- Use within MessageWrapper to show instructions or hints
- Place below the form control
- Use for critical info—not placeholder alone

### contentGuidelines
- Provide clear, actionable instructions
- Keep helper text concise

## Heading (@atlaskit/heading) status=general-availability category=primitive
A component for creating accessible, consistently styled headings with proper hierarchy. Headings are sized to contrast with content, increase visual hierarchy, and help readers easily understand the structure of content.

### usageGuidelines
- Use the `HeadingContextProvider` offering to maintain heading levels in complex layouts
- Maintain proper heading hierarchy
- Keep headings concise and meaningful
- Use sentence case for most headings
- Use the `color` prop for inverse text on dark backgrounds
- Do NOT use any inline styles, you must use the `size` (required) and `color` (optional) props available

### contentGuidelines
- Use clear, descriptive heading text
- Maintain proper heading hierarchy
- Keep headings concise and meaningful
- Use sentence case for most headings
- Make headings descriptive of the content that follows

### accessibilityGuidelines
- Maintain proper heading hierarchy (h1 to h6)
- Use only one h1 per page for main page titles
- Ensure minimum 4.5:1 color contrast for text readability
- Use clear, descriptive heading text that describes the content below

## Image (@atlaskit/image) status=open-beta category=data-display
A component for displaying images with theme support.

### usageGuidelines
- Use for displaying images in content
- Provide appropriate alt text
- Consider responsive image sizing
- Handle loading and error states

### contentGuidelines
- Use clear, descriptive alt text
- Choose appropriate image dimensions
- Consider image quality and file size
- Use meaningful image content

### accessibilityGuidelines
- Always provide meaningful alt text
- Ensure appropriate image sizing
- Consider loading states and error handling
- Use appropriate image formats

## InlineMessage (@atlaskit/inline-message) status=general-availability category=feedback
In-context notification for more info, warning, error, or confirmation.

### usageGuidelines
- Use for in-context notifications: more info, warning, error, confirmation
- Icon/title/secondary can be used to reveal full message in a popup with context/links
- Keep content to a maximum of five lines (truncation is not accessible)
- Use Flag for minimal interaction; Banner for critical/system; Modal when immediate action is required

### contentGuidelines
- Use clear, concise message text
- Provide specific, actionable feedback
- Use appropriate tone for message type
- Keep messages focused and relevant
- Warning: before action, empathy, offer alternative
- Error: explain and next step; use "we" not "you"
- Confirmation: confirm, then get out of the way
- Information: inform, no action needed
- Use clear, concise message text; keep focused and relevant

### accessibilityGuidelines
- Keep to max five lines—truncation is not accessible
- Recommend a title; icon-only is easily missed by screen readers
- Use iconLabel when there is no title or when the icon adds context (e.g. error)
- Ensure message content is announced by screen readers
- Use appropriate message types and colors

## Link (@atlaskit/link) status=general-availability category=navigation
A component for navigation links.

### usageGuidelines
- Use for navigation to other pages or sections, downloads, or contact (phone, email)
- Use default (underlined) with regular text so links are distinguishable
- Use subtle appearance only when context already indicates it is a link (e.g. nav, breadcrumbs)
- Use Link button when the link should look like a button
- Do not open in a new window without warning (e.g. icon or explicit indication)

### contentGuidelines
- Use clear, descriptive link text that describes the destination
- Do not confuse with buttons—links navigate, buttons perform actions
- Avoid generic text like 'click here'

### accessibilityGuidelines
- Do not use subtle appearance with regular body text—default has underline/color for distinguishability
- Use subtle only when context already indicates it is a link (e.g. nav, breadcrumbs)
- Provide clear link text that describes the destination
- Use appropriate ARIA attributes for links
- Ensure keyboard navigation support
- Provide clear visual indicators for link state

## Lozenge (@atlaskit/lozenge) status=general-availability category=status-indicators
A lozenge is a visual indicator used to highlight an item's status for quick recognition.

### usageGuidelines
- Subtle (default): for long tables and general use
- Bold: use sparingly (e.g. Pipeline/Jira status)
- Always combine color with a concise, accurate label
- Use Badge for tallies/counts; use Tag for labels

### contentGuidelines
- Use clear, concise text; use accurate labels (e.g. "Error", "Warning")
- Do not use for long text—lozenge is not focusable and truncation at ~200px is not accessible
- Ensure text is meaningful and descriptive
- Use consistent terminology across lozenges

### accessibilityGuidelines
- Do not rely on color alone; always pair with an accurate text label
- Ensure sufficient color contrast for text readability
- Do not use for long text—truncation is not accessible and lozenge is not focusable
- Provide appropriate labels for screen readers
- Consider color-blind users when choosing colors

## Modal (@atlaskit/modal-dialog) status=general-availability category=overlay
A modal dialog component for important content.

### usageGuidelines
- Use for immediate task or critical/warning requiring a response; blocking until closed
- Use sparingly—modals are invasive
- One task per modal; limit interactions; no nested modals (inaccessible)
- Anatomy: header (h1 title), close button, body, footer with primary + cancel/close
- Footer: primary button on the right of secondary; multiple dismissal methods (close button, Esc, blanket click, Cancel/Close)
- Use Popup for smaller info + controls; Spotlight for onboarding; Inline message for alert/action

### contentGuidelines
- Use clear, descriptive titles
- Primary button label should reflect the modal title
- Use action verbs in button labels
- Keep content focused on a single task or message
- Use sentence case for all text

### accessibilityGuidelines
- Modal must have a title: use title component, or titleId from useModal, or label (avoid if no visual title)
- Close button is required (except rare cases—consult a11y team)
- Do not rely on color alone for severity; provide accessible label for icons
- Focus order: 1) close (or title or container), 2) first focusable, 3) secondary button, 4) primary, 5) return focus to trigger on close
- Dismiss via: close button, Esc, click blanket, Cancel/Close in footer
- Ensure modal content is announced by screen readers
- Ensure keyboard navigation and escape key support
- Maintain focus within modal when open

## PageHeader (@atlaskit/page-header) status=general-availability category=layout
A component for page headers.

### usageGuidelines
- Use for consistent page header layout
- Include breadcrumbs for navigation context
- Provide relevant page actions
- Use appropriate header hierarchy

### contentGuidelines
- Use clear, descriptive page titles
- Provide meaningful breadcrumb labels
- Use action-oriented button text
- Keep header content focused

### accessibilityGuidelines
- Provide clear page titles
- Use appropriate heading hierarchy
- Ensure breadcrumb navigation is accessible
- Provide clear action labels

## Popup (@atlaskit/popup) status=general-availability category=overlay
A component for displaying popup content relative to a trigger element.

### usageGuidelines
- Use for contextual content that appears on demand
- Position appropriately relative to trigger
- Consider dismissal behavior
- Use appropriate content sizing

### contentGuidelines
- Keep popup content focused and relevant
- Use clear, concise content
- Provide appropriate actions when needed
- Consider content hierarchy

### accessibilityGuidelines
- Provide appropriate focus management
- Use clear trigger labels
- Ensure keyboard navigation support
- Provide escape key dismissal

## Box (@atlaskit/primitives) status=general-availability category=primitive
A primitive Box component for layout and container purposes with compiled styling support.

### usageGuidelines
- Use for basic layout and container needs
- Leverage compiled styling for performance
- Use appropriate spacing and layout props
- Consider semantic HTML when possible

### contentGuidelines
- Use for appropriate layout purposes
- Maintain consistent spacing and layout patterns
- Consider accessibility and semantic structure

## Inline (@atlaskit/primitives) status=general-availability category=primitive
A primitive Inline component for horizontal layout with consistent spacing.

### usageGuidelines
- Use for horizontal layout needs
- Leverage compiled styling for performance
- Use appropriate spacing and alignment props
- Consider wrapping behavior

### contentGuidelines
- Use for appropriate horizontal grouping
- Maintain consistent spacing patterns
- Consider content flow and readability

## Stack (@atlaskit/primitives) status=general-availability category=primitive
A primitive Stack component for vertical and horizontal layout with consistent spacing.

### usageGuidelines
- Use for consistent vertical or horizontal layouts
- Leverage compiled styling for performance
- Use appropriate spacing and alignment props
- Consider responsive behavior

### contentGuidelines
- Use for appropriate layout grouping
- Maintain consistent spacing patterns
- Consider content hierarchy and flow

## Text (@atlaskit/primitives) status=general-availability category=primitive
A primitive Text component for typography with compiled styling support.

### usageGuidelines
- Use for text content with consistent typography
- Leverage compiled styling for performance
- Use appropriate font size and weight props
- Consider semantic HTML elements

### contentGuidelines
- Use for appropriate text content
- Maintain consistent typography patterns
- Consider readability and hierarchy

## Radio (@atlaskit/radio) status=general-availability category=form
A radio button component for single selection from a set of mutually exclusive choices. Use for custom radio button presentations like options in tables or when you need fine control over individual radio buttons.

### usageGuidelines
- Use for custom radio button presentations (e.g., options in tables)
- Use when you need fine control over individual radio buttons
- List options in logical order (most likely to least likely)
- Make one option the default (safest, most secure option)
- Add 'None' option if unselected state is needed
- Add 'Other' option if not all options can be listed

### contentGuidelines
- Use clear, descriptive labels that provide context
- Keep labels concise but informative
- Use sentence case for labels
- Avoid overlapping or skipping numeric choices

### accessibilityGuidelines
- Include error messages for required or invalid radio fields
- Never preselect high-risk options for payment, privacy, or security
- Don't use disabled radio buttons if they need to remain in tab order
- Use validation instead of disabled state for better accessibility

## RadioGroup (@atlaskit/radio) status=general-availability category=form
A radio group component that presents a list of options where only one choice can be selected. Use for most radio button scenarios where you want a simple list of mutually exclusive options.

### usageGuidelines
- Use for most radio button scenarios with simple option lists
- List options in logical order (most likely to least likely)
- Make one option the default (safest, most secure option)
- Add 'None' option if unselected state is needed
- Add 'Other' option if not all options can be listed
- Use select component for longer lists of options

### contentGuidelines
- Use clear, descriptive labels that provide context
- Keep labels concise but informative
- Use sentence case for labels
- Avoid overlapping or skipping numeric choices

### accessibilityGuidelines
- Include error messages for required or invalid radio fields
- Never preselect high-risk options for payment, privacy, or security
- Don't use disabled radio buttons if they need to remain in tab order
- Use validation instead of disabled state for better accessibility
- Ensure proper keyboard navigation with arrow keys

## SectionMessage (@atlaskit/section-message) status=general-availability category=feedback
A component for section-level messages.

### usageGuidelines
- Use for section-level important info that persists until action or resolution
- Use when: destructive consequences, action needed to proceed, connectivity or auth issues
- Anatomy: icon+color, title (optional), description, actions (optional)
- Use Banner for site-wide; Flag after an event; Inline message for smaller context

### contentGuidelines
- Title: state the issue or reason
- Description: clear, concise, empathetic; use active verbs
- Avoid blame—use "we're having trouble" not "you're having issues"
- Provide clear next steps when needed

### accessibilityGuidelines
- Do not rely on color alone for severity
- Avoid dead ends—always indicate how to proceed
- Use descriptive link text that describes the destination
- Ensure section message content is announced by screen readers
- Use appropriate color contrast for text readability
- Provide clear, actionable messaging
- Consider keyboard navigation for interactive section messages

## Select (@atlaskit/select) status=general-availability category=form
Select allows users to make a single selection or multiple selections from a list of options.

### usageGuidelines
- Use for choosing one or more from a list; common in forms and inline edit
- Use a visible label for the field—do not use placeholder as the only label (placeholder disappears and is not accessible)
- Use logical order (e.g. most selected first, numeric)
- Do not overwhelm with too many options
- Enable search for long option lists
- Consider loading states for async data
- Avoid alphabetical ordering (not localizable); use logical order for translatable option lists

### contentGuidelines
- Write clear, descriptive option labels
- Use consistent terminology across options
- Keep option text concise but meaningful
- Group related options only when all items are groupable; use well-known categories or for disambiguation (e.g. Portland ME vs OR); no group of one

### accessibilityGuidelines
- Use labels and helper text for the field—do not use placeholder as label (disappears on focus, not accessible)
- Clear control is removed from tab order; keyboard users clear selection via Delete
- Provide clear labels for all selects
- Ensure keyboard navigation with arrow keys
- Support screen reader announcements

## Skeleton (@atlaskit/skeleton) status=early-access category=loading
A skeleton acts as a placeholder for content, usually while the content loads.

### usageGuidelines
- Use to indicate content is loading
- Match skeleton structure to actual content layout
- Use appropriate animation and timing
- Replace with actual content when ready
- Consider different skeleton patterns for different content types

### contentGuidelines
- Use skeleton patterns that represent actual content structure
- Maintain consistent skeleton styling
- Consider content hierarchy in skeleton design
- Use appropriate animation timing

### accessibilityGuidelines
- Provide appropriate loading announcements
- Use skeleton patterns that match actual content structure
- Ensure skeleton content is not announced as actual content
- Consider screen reader experience during loading states

## Spinner (@atlaskit/spinner) status=general-availability category=feedback
A loading spinner component.

### usageGuidelines
- Use for loading states of unknown duration
- Consider delay before showing spinner
- Use appropriate size for context
- Provide loading context when possible

### contentGuidelines
- Use consistent spinner sizing
- Consider spinner placement and context
- Provide loading feedback when appropriate

### accessibilityGuidelines
- Provide appropriate loading announcements
- Use appropriate timing for spinner display
- Ensure spinner is announced to screen readers
- Consider alternative loading indicators

## Tabs (@atlaskit/tabs) status=general-availability category=navigation
Tabs are used to organize content by grouping similar information on the same page.

### usageGuidelines
- Use to organize related content on the same page without navigating away
- Use for concise content or content users access regularly
- Limit the number of tabs to avoid overcrowding
- Keep tab labels concise and descriptive
- Use consistent tab ordering and grouping
- Consider responsive behavior for many tabs

### contentGuidelines
- Write clear, descriptive tab labels
- Group related content logically
- Use consistent naming conventions
- Ensure tab content is relevant and complete

### accessibilityGuidelines
- Ensure proper keyboard navigation between tabs
- Use appropriate ARIA attributes for tab panels
- Provide clear focus indicators
- Announce tab changes to screen readers
- Ensure tab content is accessible

## Tag (@atlaskit/tag) status=general-availability category=data-display
A tag is a compact label used to classify, organize, and categorize information.

### usageGuidelines
- Use for object-related content; for people, teams, projects, spaces use AvatarTag
- Don't use for status or state—use lozenge instead
- Use TagGroup to control layout of multiple tags
- Don't use tags within user-generated text (e.g. editor)
- Tags can be non-interactive, links, or removable (isRemovable)

### contentGuidelines
- Use clear, descriptive tag labels
- Keep tag text concise; max 200px causes truncation
- Use color intentionally to organize related content
- For people, teams, spaces, or projects use avatar tag

### accessibilityGuidelines
- Provide appropriate labels for tags
- Ensure sufficient color contrast for text readability
- Use clear, descriptive tag text
- Consider keyboard navigation for interactive tags
- Provide alternative text for tag removal actions

## TextField (@atlaskit/textfield) status=general-availability category=form
A single-line text input component.

### usageGuidelines
- Use for single-line text in forms, modals, search, cards
- Label is required (above input); helper text optional
- Do not use placeholder for critical info—use label or helper text (search exception: search icon + accessible label)
- Consider character limits and validation

### contentGuidelines
- Write clear, short labels
- Use helper text for examples/formatting; keep helper visible after input
- Provide appropriate error messages
- Consider content length and formatting

### accessibilityGuidelines
- Use visible label or proper association; do not use placeholder for critical info—use label or helper (search is exception with icon + accessible label)
- Do not nest interactive elements (causes focus issues)
- Custom validation: validate onBlur; use error container with aria-live="polite" and aria-relevant/aria-atomic for dynamic announcements
- Provide clear labels for all textfields
- Provide keyboard navigation support
- Indicate required fields clearly
- Use appropriate error states and messaging

## Toggle (@atlaskit/toggle) status=general-availability category=forms-and-input
A toggle is used to view or switch between enabled or disabled states.

### usageGuidelines
- Use for binary on/off states
- Provide clear labels that describe the toggle's function
- Use appropriate default states
- Consider immediate vs. delayed state changes
- Use consistent toggle behavior across the interface

### contentGuidelines
- Write clear, descriptive labels
- Use action-oriented language when appropriate
- Ensure labels clearly indicate what the toggle controls
- Use consistent terminology across toggles

### accessibilityGuidelines
- Provide clear labels for all toggles
- Use appropriate ARIA attributes for toggle state
- Ensure keyboard navigation support
- Provide clear visual feedback for state changes
- Use descriptive labels that explain the toggle's purpose

## Tooltip (@atlaskit/tooltip) status=general-availability category=overlays-and-layering
A tooltip is a floating, non-actionable label used to explain a user interface element or feature.

### usageGuidelines
- Use only on interactive elements (must be focusable for keyboard and screen readers)
- Opens on hover or focus; content is text only
- Use with icon buttons for labels; for useful but non-essential info (e.g. shortcuts); for truncated text when truncation is unavoidable
- Never use on disabled elements (see Button a11y)
- Do not put critical info in tooltip—use labels, helper text, or inline message
- No interactive or visual content inside (no links/buttons/icons)—use Popup or Modal
- Use Inline message for richer/longer content; Popup/Modal for interactive content

### contentGuidelines
- Keep concise; do not repeat the visible label
- Use helpful, non-essential information only
- Icon button and link icon button have their own content guidelines

### accessibilityGuidelines
- Use only on interactive elements (keyboard focusable; screen reader can reach them)
- Never use tooltips on disabled elements
- Do not put critical information in tooltips—use visible labels, helper text, or inline message
- No links, buttons, or icons inside tooltip—use Popup or Modal for interactive content
- Keyboard shortcuts shown in tooltip are not exposed to assistive tech—provide an alternative (e.g. panel, dialog)
- Ensure tooltip content is announced by screen readers
- Provide keyboard access (hover + focus trigger)

