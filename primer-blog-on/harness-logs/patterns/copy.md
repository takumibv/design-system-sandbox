Here are the guidelines for the `Copy` pattern for Primer:

1.  [Product UI](/product/)
2.  [Scenario patterns](/product/scenario-patterns/)
3.  [Copy](/product/scenario-patterns/copy/)

Copy
====

Copy content to the clipboard.

Copy puts a piece of content (a branch name, a permalink, a code block, a token) onto the clipboard so someone can paste it somewhere else. What needs care is confirming the copy happened in a way everyone can perceive, including screen reader users, and handling the cases where the clipboard write is rejected or there's nothing valid to copy.

[Where this happens](#where-this-happens)
-----------------------------------------

*   [Copy a permalink to a file](https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files)
*   [Copy a permanent link to a code snippet](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-a-permanent-link-to-a-code-snippet)
*   Copy a branch name from the list of branches
*   Copy a response from Copilot Chat
*   Copy the text of an error

See [all copy scenarios](https://github.com/github/scenarios/issues?q=is:issue+state:open+label:scenario+label:pattern:copy) in the Scenarios repo (GitHub staff only).

[Implementation guidelines](#implementation-guidelines)
-------------------------------------------------------

*   Reach for the shared [CopyToClipboardButton](/product/internal-components/copy-to-clipboard-button/) (GitHub staff only) first. It already wraps the clipboard write, confirmation state, tooltip, and screen reader announcement, so most surfaces shouldn't build their own.
    
*   If you do need to build one or extend it for a server fetch, base it on [IconButton](/product/components/icon-button/) in its `invisible` variant. Use the [copy](https://primer.style/octicons/icon/copy-16/) octicon as the default state, the [check](https://primer.style/octicons/icon/check-16/) octicon in a success color as the confirmation state, and an alert icon in a critical color for errors.
    
*   When the content appears in a read-only field, embed the button as a [trailing action](/product/components/text-input/#with-a-trailing-action) inside [TextInput](/product/components/text-input/) and auto-select the field on focus.
    
*   Give the button an accessible label that names the content, keep focus on the button, and announce success or failure through a live region. See [IconButton accessibility](/product/components/icon-button/accessibility/) and [Accessible notifications and messages](/accessibility/patterns/accessible-notifications-and-messages/).
    

[User experience principles](#user-experience-principles)
---------------------------------------------------------

### [Make the copy a single click, right next to the content](#make-the-copy-a-single-click-right-next-to-the-content)

Copying is a momentary action, so it shouldn't carry any friction. Trigger it with one click on an icon button placed directly beside the content it copies, and skip confirmation dialogs and intermediate selection steps. Keep the button always visible rather than hiding it behind hover, so it stays reachable for keyboard and touch users. Only introduce a prior choice when the copy target genuinely varies, like switching a clone URL between HTTPS and SSH.

Do

Place the copy button inline, directly adjacent to the content, and copy in a single click.

Don’t

Reveal the copy button only on hover, which hides it from keyboard and touch users.

Do

When the content sits in a read-only field, embed the copy button as a trailing action and auto-select the field on focus, so keyboard users have a native fallback.

Don’t

Add a confirmation step or a separate screen for an action people expect to be instant.

### [Confirm the copy without making people wait](#confirm-the-copy-without-making-people-wait)

People need to know the copy worked, but the confirmation shouldn't get in their way. For content already on the client, the write is effectively instant, so swap the copy icon to a check icon in a success color and change the tooltip to "Copied!" for about two seconds, then revert. Only reach for a loading indicator when the content has to be fetched from the server first, and keep that indicator on the button itself rather than interrupting the flow.

Do

Show a brief icon swap to a success-colored check plus a "Copied!" tooltip for around two seconds after a successful copy.

Don’t

Write to the clipboard silently with no visual change, leaving people unsure whether it worked.

Do

When a copy needs a server fetch, show an inline loading indicator on the button and transition to the same success or error feedback when it resolves.

Don’t

Spin up a separate loading screen or block the page for a copy that takes a moment to fetch.

Do

Show the success state only once the clipboard write resolves, so "Copied!" always reflects what actually reached the clipboard.

Don’t

Flip to "Copied!" optimistically on click. A clipboard write can be rejected, and a confirmation that fired anyway is a false promise.

### [Confirm the copy for screen reader users too](#confirm-the-copy-for-screen-reader-users-too)

A visual icon swap is invisible to someone using a screen reader, so the success state has to be announced as well as shown. Pair the icon change with a visually hidden live-region announcement so non-sighted users hear "Copied!" without having to re-read the tooltip. This is the most common gap when a copy button is built from scratch or when a server-side variant duplicates the visual pattern without the announcement.

Do

Announce a successful copy through a visually hidden live region, alongside the visual confirmation.

Don’t

Rely on the icon swap alone, which screen reader users can't perceive.

### [Name what's being copied](#name-whats-being-copied)

A copy button is icon-only, so its accessible label is the only thing that tells a screen reader user what will land on their clipboard. Name the content in the label ("Copy branch name", "Copy URL") rather than a bare "Copy", and keep the success wording consistent across surfaces. When several copy buttons sit close together, specific labels are what let someone tell them apart. See [Descriptive buttons](/accessibility/patterns/primer-components/descriptive-buttons/#meaningful-and-unique-names) for what makes a button name meaningful and unique.

Do

Label the button with a short phrase that names the content, like "Copy branch name" or "Copy permalink".

Don’t

Use a generic label like "Copy" that doesn't say what ends up on the clipboard.

### [Don't let a copy fail silently](#dont-let-a-copy-fail-silently)

A clipboard write can be rejected by the browser, blocked by an enterprise policy, or fail outside a secure context. Don't let that pass unnoticed. Show a brief inline error state on the button using the same icon-swap mechanism as success (an alert icon in a critical color), announce it through a live region, and give people a manual way to recover, like selecting the value and pressing the platform copy shortcut.

Do

Surface a clipboard failure with an inline error indicator on the button, announced to screen readers.

Don’t

Fail silently when the clipboard write is rejected, leaving people to assume the copy worked.

Do

When a copy button can't function, like a secret that can't be previewed, remove it from the page rather than disabling it.

Don’t

Leave a disabled copy button in place. Follow the [non-functional button guidance](/product/ui-patterns/degraded-experiences/#handling-non-functional-buttons): default to removing it, and only keep it (as an inactive button) when removing would be disorienting.
