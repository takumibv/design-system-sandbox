# get_pattern

- args: `{"name":"Delete"}`
- isError: false
- ms: 350
- chars: 6694

---

Here are the guidelines for the `Delete` pattern for Primer:

1.  [Product UI](/product/)
2.  [Scenario patterns](/product/scenario-patterns/)
3.  [Delete](/product/scenario-patterns/delete/)

Delete
======

Delete an existing thing. Remove it permanently, or disassociate it from something.

Delete covers permanently destroying a resource or disassociating it from a context. It runs from high-stakes and irreversible, like deleting a repository, to routine, like removing a label from an issue. How much friction to put in someone's way depends on how much damage a mistake would do.

[Where this happens](#where-this-happens)
-----------------------------------------

*   [Delete a project](https://docs.github.com/en/issues/planning-and-tracking-with-projects/managing-your-project/closing-and-deleting-your-projects)
*   [Delete an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/administering-issues/deleting-an-issue)
*   [Remove an item from a project](https://docs.github.com/en/issues/planning-and-tracking-with-projects/managing-items-in-your-project/archiving-items-from-your-project)
*   Remove a file from a gist

See [all delete scenarios](https://github.com/github/scenarios/issues?q=is:issue+state:open+label:scenario+label:pattern:delete) in the Scenarios repo (GitHub staff only).

[Implementation guidelines](#implementation-guidelines)
-------------------------------------------------------

*   Use [ConfirmationDialog](/product/components/confirmation-dialog/) for most delete confirmations. It has built-in focus management and sets `role="alertdialog"` automatically. For type-to-confirm flows that need a text input, use [Dialog](/product/components/dialog/) instead, but you'll need to handle `returnFocusRef` manually.
    
*   Use [ActionList.Item](/product/components/action-list/) `variant="danger"` for delete options in menus and action lists. This applies danger styling through the theme rather than CSS classes. [TrashIcon](https://primer.style/octicons/icon/trash-16/) is the standard leading visual.
    
*   Use [Button](/product/components/button/) `variant="danger"` for the confirm button, and pair the color with a [clear text label](/accessibility/patterns/primer-components/descriptive-buttons/#meaningful-and-unique-names), like "Delete repository", so the destructive intent doesn't rely on color alone.
    
*   Show a [loading state](/product/components/button/) on the confirm button when the deletion is likely to take more than a moment, so people know their action registered.
    
*   When deletion removes the current page's primary resource, redirect to the parent page, like the list or container the item belonged to.
    
*   When deletion happens in place and removes the focused item or the control that opened the dialog, [set focus](/accessibility/design-guidance/focus-management/) instead of letting it fall back to the page. Prefer the previous equivalent control because it keeps people near known context. If there isn't one, move focus to the grouping container, list heading, or another stable parent with a useful accessible name and role.
    
*   Don't add a visible success banner by default. The item disappearing or the redirect is usually signal enough, in line with [notification messaging](/product/ui-patterns/notification-messaging/) guidance. Always announce the result to screen readers through a live region. See [Accessible notifications and messages](/accessibility/patterns/accessible-notifications-and-messages/).
    
*   When a deletion fails, keep the dialog open and show a [Banner](/product/components/banner/) `variant="critical"` inside it so people can retry without losing context. See [notification messaging](/product/ui-patterns/notification-messaging/#inside-a-dialog).
    

[User experience principles](#user-experience-principles)
---------------------------------------------------------

### [Match friction to the cost of a mistake](#match-friction-to-the-cost-of-a-mistake)

Too much friction slows people down and trains them to click through every warning. Too little risks data loss they can't undo.

Do

Place high-impact deletions in a danger zone within settings, and keep low-impact deletions inline or in a contextual menu.

Don’t

Surface every delete action in the same place, with the same weight, regardless of how much damage a mistake would do.

Do

Match the amount of friction to the blast radius. Use type-to-confirm for org-wide or repo-wide impact, a simple dialog for single resources, and no confirmation for reversible actions.

Don’t

Use the same confirmation dialog for "remove item from project" (reversible) and "delete project" (permanent).

Do

Reserve type-to-confirm for irreversible actions with wide blast radius, so the extra friction still means something when people hit it.

Don’t

Wrap a routine reversible action, like removing a label, in a confirmation dialog. People learn to click through and stop reading.

### [Prefer reversibility over confirmation](#prefer-reversibility-over-confirmation)

An undo protects someone who makes a mistake without interrupting someone who doesn't. A confirmation dialog interrupts everyone, and people dismiss it out of habit.

Do

Offer an undo window for actions you can reverse, instead of a prompt that blocks everyone up front.

Don’t

Gate a low-stakes, recoverable action behind a confirmation dialog when a brief undo would do the same job.

Do

For high-value resources with dependencies, offer a reversible "Disable" step alongside permanent "Delete".

Don’t

Jump straight to permanent deletion when a reversible alternative would serve the user's intent.

### [Make the consequences clear before committing](#make-the-consequences-clear-before-committing)

Show what gets deleted and whether it can be recovered. Match the wording to what actually happens.

Do

Name what's affected and whether it's permanent, like "Delete label?" with a line on what gets removed.

Don’t

Fall back on a generic "Are you sure?" that hides what's about to happen.

Do

Label the confirm button with the action, like "Delete repository", so it reads clearly out of context. Keep it to a few words, in line with the [ConfirmationDialog guidelines](/product/components/confirmation-dialog/guidelines/).

Don’t

Use "Yes", "OK", or "Confirm". They don't say what happens. The one exception is type-to-confirm, where a fuller phrase like "I understand, delete this project" is deliberate.

Do

Say "Remove" when the thing still exists elsewhere, and "Delete" when it's permanently destroyed.

Don’t

Say "Delete" for an action that only disassociates. The wording promises more than it does.
