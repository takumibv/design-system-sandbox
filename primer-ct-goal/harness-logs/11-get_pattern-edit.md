<!-- tool: get_pattern / args: {"name":"Edit"} / at: 2026-11-05T10:53:54.222Z / isError: false -->

Here are the guidelines for the `Edit` pattern for Primer:

1.  [Product UI](/product/)
2.  [Scenario patterns](/product/scenario-patterns/)
3.  [Edit](/product/scenario-patterns/edit/)

Edit
====

Change an existing thing.

Edit covers changing something that already exists, from fixing a typo in a comment to reworking an organization's settings across a dozen fields.

[Where this happens](#where-this-happens)
-----------------------------------------

*   [Edit a comment on an issue](https://docs.github.com/en/communities/moderating-comments-and-conversations/managing-disruptive-comments)
*   [Edit a file from the code view](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)
*   [Change basic profile details](https://docs.github.com/en/account-and-profile/tutorials/personalize-your-profile)
*   [Edit a repository variable](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables)
*   [Rename a branch in a repository](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/renaming-a-branch)

See [all edit scenarios](https://github.com/github/scenarios/issues?q=is:issue+state:open+label:scenario+label:pattern:edit) in the Scenarios repo (GitHub staff only).

[Implementation guidelines](#implementation-guidelines)
-------------------------------------------------------

*   Use [FormControl](/product/components/form-control/) for each editable field, [Dialog](/product/components/dialog/) when an edit needs someone's full attention, and a full-page form for settings that span several sections.
    
*   Use `PencilIcon` on [IconButton](/product/components/icon-button/) edit triggers, and give each one a name that identifies its target, following [descriptive button naming](/accessibility/patterns/primer-components/descriptive-buttons/#meaningful-and-unique-names).
    
*   Label the save button with a verb that names what will change. Show a [loading state](/product/components/button/#loading) while the save runs, and place the button adjacent to the input when the edit happens in place. See the saving pattern's [button text](/product/ui-patterns/saving/#text) guidance.
    
*   Validate on submit and tie each error message to its field, following [form validation](/product/ui-patterns/forms/#validation-on-submit) guidance, and show a failed save in place with a [Banner](/product/components/banner/#tone-variants) `variant="critical"` or an [InlineMessage](/product/components/inline-message/). Move focus to the first invalid field, or to the message when no single field is at fault.
    
*   When a save needs a separate confirmation, place it next to the control that triggered it rather than at the top of the page, following [Notification messaging](/product/ui-patterns/notification-messaging/#placement).
    
*   [Manage focus](/accessibility/design-guidance/focus-management/) when an edit surface opens and closes. Move it into the field for an inline edit, leave [Dialog](/product/components/dialog/accessibility/) to place its own, and return it to the trigger on close.
    
*   When an edit surface has a sticky save bar or floating toolbar, keep it clear of the field that has focus, so people can see what they're editing.
    
*   Warn before navigating away from or closing an edit someone has started, following the saving pattern's [unsaved changes](/product/ui-patterns/saving/#unsaved-changes) guidance.
    

[User experience principles](#user-experience-principles)
---------------------------------------------------------

### [Match the surface to the scope of the edit](#match-the-surface-to-the-scope-of-the-edit)

Reach for the lightest surface that still gives the edit enough room: in place next to the content, a dialog over it, or a dedicated page. Weigh consequence alongside scope, because changing one field can change other things at the same time. This choice also sets the save behavior, the feedback, and where the trigger goes, so make it first.

Do

Edit a single field in place, use a dialog when the edit needs someone's full attention, and use a full page for settings that span several sections.

Don’t

Send someone to a separate settings page to change one line of text.

Do

Preview what else an edit will affect before someone confirms it, like renaming a branch that retargets its open pull requests, and offer a way to undo it afterward. See [error forgiveness](/product/ui-patterns/saving/#error-forgiveness).

Don’t

Treat an edit as routine because it changes one field, when saving it also changes other things in the repository.

Do

Show people how their rich text will look while they write it, so they don't have to switch away to check.

Don’t

Make a preview mode the only way to check formatting, especially when switching to it costs people their place in the text.

### [Put the edit next to what it changes](#put-the-edit-next-to-what-it-changes)

Proximity makes an edit discoverable and shows what it affects. An edit that belongs to one visible thing should be reachable from that thing, while an edit that spans a whole resource belongs on its settings page.

Do

Put the trigger next to the content it edits, and show it only to people who can use it.

Don’t

Show an edit trigger to someone who doesn't have permission to use it, so they only find that out after clicking.

Do

Keep the edit trigger visible, or reveal it on keyboard focus as well as hover, so it's reachable without a pointer.

Don’t

Reveal the edit trigger on hover alone, which puts it out of reach on touch and for anyone using a keyboard.

Do

Allow one edit open at a time on a page where people can edit several things separately, following the saving pattern's [save button placement](/product/ui-patterns/saving/#placement) guidance.

Don’t

Open several editors at once, leaving a page of identical save buttons that give no clue which change each one saves.

### [Name what's being saved](#name-whats-being-saved)

A label that names the thing it changes makes sense on its own. That helps anyone scanning a page full of buttons, and matters most for screen reader users. They can list every button on the page and hear each label with none of the surrounding context to explain it.

Do

Label the save action with an active verb and the thing it changes, like "Update comment", when a page has more than one save action. A plain "Save changes" is enough when there's only one thing to save.

Don’t

Use "Done", "OK", or "Submit". At best they name the act of saving, never the thing it changes.

### [Default to explicit save](#default-to-explicit-save)

An [explicit save](/product/ui-patterns/saving/#explicit-saving) lets people check a change before they apply it, and stops a change happening by accident. That matters most for anyone moving through a set of options with a keyboard or a screen reader, where reading the choices shouldn't apply them. Editing nearly always involves content someone authored or configured, so an explicit save is the default here. Save on selection only for imperative controls, where choosing is itself the action.

Do

Use an explicit save for anything someone authored or configured.

Don’t

Save [declarative controls](/product/ui-patterns/saving/#declarative-controls) like text inputs, radio groups, and selects automatically as they change.

Do

Apply the change immediately for a single obvious toggle, like marking a notification as read, in line with [imperative controls](/product/ui-patterns/saving/#imperative-controls).

Don’t

Mix automatic and explicit saving in one form, so it's unclear which changes are already applied.

Do

Save on Enter in a single-line editor, and give a multi-line editor its own save control.

Don’t

Bind Enter to save in a multi-line editor, where people expect it to start a new line.

Do

Keep the save button enabled even when the form is unchanged or invalid, following the [button state](/product/ui-patterns/saving/#state) guidance, so people can submit and find out what needs fixing.

Don’t

Disable the save button based on form state. A disabled button can't take focus and its label is hard to read.

### [Let people cancel an edit](#let-people-cancel-an-edit)

People start edits by accident, misjudge what they meant to change, or change their mind partway through. Where the only way out is to save and then undo, or to reload the page, they're left with a change they didn't want. Every edit surface needs a visible cancel that restores the previous value, and a confirmation before discarding work worth keeping.

Do

Give every edit surface a visible cancel alongside the save button, and cancel on Escape as well, returning focus to the trigger to match the [Escape behavior](/product/components/overlay/accessibility/) of dialogs and overlays.

Don’t

Make Escape or a click outside the only way to abandon an edit, which leaves nothing to tap on a touch device.

Do

Put the content back to the value it had before the edit when someone cancels.

Don’t

Close the editor on cancel while keeping the typed change, so cancel and save do the same thing.

Do

Confirm before discarding an edit someone has put work into, using [ConfirmationDialog](/product/components/confirmation-dialog/guidelines/), and skip the prompt when they haven't typed anything.

Don’t

Discard a half-written edit because someone pressed Escape or clicked outside the editor.

### [Make it clear when changes are saved](#make-it-clear-when-changes-are-saved)

People who can't tell whether an edit saved assume it didn't, and some draft in another tool rather than risk losing work on GitHub. Show that an edit saved without anyone having to reload the page to check. The timing follows the [save method](#default-to-explicit-save): an explicit save confirms once when it runs, covering every change together, while a control that applies on selection confirms as soon as it's chosen.

Do

Show the updated content as the confirmation, and add a separate message only when the result isn't visible, like a setting that takes effect further down the page.

Don’t

Rely on the editor closing as the only signal. It communicates nothing to someone using a screen reader.

### [Protect work when a save fails](#protect-work-when-a-save-fails)

When a save fails, keep the draft and tell the person enough to fix it without guessing. This covers work lost to an accidental refresh or to someone else saving first, not only work lost to a failed request.

Do

Keep the editor open and the fields filled when a save fails, with the error next to whatever caused it.

Don’t

Discard what someone typed, or replace the page with a generic failure message they can't act on.

Do

Where losing work would be costly, like a code or wiki editor, keep a local draft so edits survive an accidental refresh.

Don’t

Reopen the editor empty after someone navigates back to it.

Do

For content several people can edit, check whether it changed while someone was working on it and show them the conflict before their save overwrites it.

Don’t

Silently overwrite someone else's change, so neither person knows the first edit is gone.
