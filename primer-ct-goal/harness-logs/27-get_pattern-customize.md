<!-- tool: get_pattern / args: {"name":"Customize"} / at: 2026-11-05T10:54:20.342Z / isError: false -->

Here are the guidelines for the `Customize` pattern for Primer:

1.  [Product UI](/product/)
2.  [Scenario patterns](/product/scenario-patterns/)
3.  [Customize](/product/scenario-patterns/customize/)

Customize
=========

Modify settings or appearance to suit individual preferences.

Customize covers letting someone modify a setting or appearance to suit their own preferences, from a diff's unified or split view to a profile's pinned repositories. The choices are usually small and low-stakes, so the work is in fitting the control, the save behavior, and the feedback to the weight of the decision without making a lightweight preference feel like a chore. On Copilot and other AI-powered surfaces, adapting to how someone works is a specific accessibility expectation set out in [Copilot Accessibility Principle 3](/accessibility/foundations/copilot-principles/#principle-3-adaptable-to-the-users-way-of-working).

[Where this happens](#where-this-happens)
-----------------------------------------

*   [Set a theme](https://docs.github.com/en/get-started/accessibility/managing-your-theme-settings)
*   [Switch between unified and split diff view on a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)
*   [Customize watch settings for a repository](https://docs.github.com/en/subscriptions-and-notifications/get-started/configuring-notifications)
*   [Change which items are pinned on my profile](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/pinning-items-to-your-profile)
*   [Set a CLI configuration value](https://cli.github.com/manual/gh_config_set)

See [all customize scenarios](https://github.com/github/scenarios/issues?q=is:issue+state:open+label:scenario+label:pattern:customize) in the Scenarios repo (GitHub staff only).

[Implementation guidelines](#implementation-guidelines)
-------------------------------------------------------

*   Check for an existing customization that covers the need before adding a new one, and consider whether a site-wide preference would serve people more consistently than a local one.
    
*   Reach for the lightest control that fits the choice, the one that takes the least effort to use, from a [ToggleSwitch](/product/components/toggle-switch/) or [SegmentedControl](/product/components/segmented-control/) for a small inline choice up to a [Dialog](/product/components/dialog/) for multi-select or reordering.
    
*   Match when you persist a change to the control type. See [automatic saving](/product/ui-patterns/saving/#automatic-saving) for imperative controls and [explicit saving](/product/ui-patterns/saving/#explicit-saving) for declarative ones.
    
*   Reveal advanced options only once they're relevant with [progressive disclosure](/product/ui-patterns/progressive-disclosure/), like choosing "Custom" in a repository's watch settings to show checkboxes for the specific events to notify on.
    
*   Give an icon-only trigger like a settings gear a descriptive accessible name. See [IconButton](/product/components/icon-button/) and [descriptive buttons](/accessibility/patterns/primer-components/descriptive-buttons/#meaningful-and-unique-names).
    
*   Announce a change that happens outside the viewport through a live region. See [Accessible notifications and messages](/accessibility/patterns/accessible-notifications-and-messages/).
    
*   If a save fails, keep the person's selection and show a [Banner](/product/components/banner/#tone-variants) `variant="critical"` that assistive technology announces.
    
*   Name the surface after the preference and label the save action with a verb that says what happens, following the [content foundations](/product/getting-started/foundations/content/).
    

[User experience principles](#user-experience-principles)
---------------------------------------------------------

### [Decide what's worth customizing](#decide-whats-worth-customizing)

A strong, accessible default is the starting point. Get it right for the widest range of people first, and add a preference only where people have a genuine reason to differ. The default should give an accessible experience on its own, so customization stays a way to fine-tune it rather than the only route to one. When someone has already set a preference at the system level, honor it rather than asking them to set it again.

Do

Ship an accessible default, so people get a usable experience before changing anything.

Don’t

Rely on a customization to reach a baseline the default should meet, unless it's a considered alternative for a need the default genuinely can't serve.

Do

Add a preference when people have a recurring reason to differ, such as an accessibility need or an established workflow, and choose a strong default so most people never need it.

Don’t

Turn every decision into a setting, since each toggle adds something to learn and maintain.

Do

Respect the appearance preferences people rely on to read comfortably, like a [color theme](/accessibility/design-guidance/color-considerations/#visual-themes), [larger text size](/accessibility/design-guidance/text-resize-and-spacing/), or [underlined links](/accessibility/patterns/primer-components/links/#visual-distinction--contrast), rather than overriding them with a fixed default.

Don’t

Override a preference someone has deliberately set, such as applying motion-heavy defaults when they've asked for reduced motion.

### [Match the surface to the complexity of the choice](#match-the-surface-to-the-complexity-of-the-choice)

A binary or small mutually-exclusive choice fits an inline control, a richer set of options fits a form, and a multi-select or reordering task fits a dialog. A surface heavier than the choice needs adds steps; a lighter one leaves the options no room. The control you pick also sets its save behavior, feedback, and placement, so choose it before working those out.

Do

Fit the surface to the choice: an inline control for a few immediate choices, a form for richer sets, a dialog for multi-select or reordering.

Don’t

Wrap a single preference change in a multi-step wizard.

Do

Constrain the choice to a [known set of options](/product/ui-patterns/forms/#a-set-of-selectable-options) so an invalid state can't be entered in the first place.

Don’t

Ask for free-text input when the preference has a known set of values.

### [Match saving to the kind of control](#match-saving-to-the-kind-of-control)

Customization controls come in two kinds, and the kind decides when to persist the change. [Imperative controls](/product/ui-patterns/saving/#imperative-controls) treat selection as the action, so they can save the moment someone chooses. [Declarative controls](/product/ui-patterns/saving/#declarative-controls) collect a choice the person confirms separately, and a screen reader user can land on one while arrow-keying through the options, so they need an explicit save.

Do

Save imperative controls on selection, where choosing is the action.

Don’t

Auto-save a radio group or checkbox. Screen reader users can trigger a selection while navigating, committing a preference they only meant to read past.

Do

Give declarative controls an explicit save action, and keep every control in a form on the same save model.

Don’t

Mix automatic and explicit saving in one form, so it's unclear what has already been committed.

Do

Offer a reset to defaults for a form or dialog with several declarative controls, where clearing each one by hand is tedious.

Don’t

Add a reset to a single inline control, where setting it back to its default is the same one action.

### [Confirm the change took effect](#confirm-the-change-took-effect)

People need to know their preference registered, and the confirmation should match both the scope of the change and how it saves. A control's own selected state is enough when the result is visible on screen, but a change that lands outside the viewport or isn't visual needs to be [announced to assistive technology](/accessibility/patterns/accessible-notifications-and-messages/). The timing follows the [save method](#match-saving-to-the-kind-of-control): an imperative control that saves on selection gives immediate feedback that it took effect, with screen readers announcing its new state, while a form of declarative controls confirms once when the save runs, covering every change together.

Do

Let the control's selected state confirm the change when the result is visible on screen.

Don’t

Rely on a page reload as the only sign that a preference was applied.

Do

Announce a change that affects content elsewhere on the page, like reordering a list and confirming the new order in a status message.

Don’t

Leave an off-screen or non-visual change with no feedback at all.

Do

Confirm a form of declarative controls once when the person saves, acknowledging all the changes together.

Don’t

Announce declarative choices one at a time as they're made, before the person has saved anything.

Do

Pair color with an icon, shape, or text change when marking a setting active, so the state reads [without relying on color alone](/accessibility/design-guidance/color-considerations/#dont-rely-on-color-alone).

Don’t

Use color alone to show that a customization is on, since it's invisible to people who can't distinguish the colors.

### [Put the control next to what it changes](#put-the-control-next-to-what-it-changes)

A preference that applies to one visible thing should be adjustable right there; a preference that applies everywhere belongs in a central settings location. When a setting lives somewhere else, point to it from where the person looks for it, so they know the customization exists. Proximity makes the control discoverable and signals what it affects. Persist the choice so it follows the person across their devices, and keep a shareable view separate from their saved preference rather than overwriting it.

Do

Place a contextual customization next to the content it changes, like a diff settings control in the diff toolbar.

Don’t

Bury a content-specific preference in a generic settings page away from what it affects.

Do

When a customization is controlled from another place, link to it from where the person expects to find it.

Don’t

Leave a person with no way to discover a preference that's set elsewhere.

Do

Save preferences to the person's account so they follow across devices, and keep a shareable view separate from the saved default.

Don’t

Store a cross-device preference only in the current browser, where it won't follow the person to another device.
