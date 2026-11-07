Here are the guidelines for the `Create` pattern for Primer:

1.  [Product UI](/product/)
2.  [Scenario patterns](/product/scenario-patterns/)
3.  [Create](/product/scenario-patterns/create/)

Create
======

Create a new thing.

Create covers making a new resource, from a repository or an issue down to a single label. It spans one-click actions that need no input, like starting a codespace on the current branch, and multi-field forms, like opening a new repository or gist. The decision every creation shares is how much to ask of someone before they get the thing they came for, and how to keep their effort safe if they abandon the action or the submission fails.

[Where this happens](#where-this-happens)
-----------------------------------------

*   [Create an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue)
*   [Create a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
*   [Create a label](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)
*   [Create a codespace](https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-for-a-repository)
*   [Create a project](https://docs.github.com/en/issues/planning-and-tracking-with-projects/creating-projects/creating-a-project)
*   [Create a gist](https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists/creating-gists)

See [all create scenarios](https://github.com/github/scenarios/issues?q=is:issue+state:open+label:scenario+label:pattern:create) in the Scenarios repo (GitHub staff only).

[Implementation guidelines](#implementation-guidelines)
-------------------------------------------------------

*   Match the surface to the task: an [ActionList](/product/components/action-list/) row or inline [TextInput](/product/components/text-input/) in place, a [Dialog](/product/components/dialog/) for a handful of fields, or a dedicated [PageLayout](/product/components/page-layout/) page for large or multi-step forms.
    
*   When creation sits inside a menu, use an [ActionMenu](/product/components/action-menu/) item with a type-specific Octicon as its leading visual to reinforce what's being created.
    
*   Use [PlusIcon](https://primer.style/octicons/icon/plus-16/) as the standard glyph for a generic create affordance, like the global create menu trigger or a one-click icon button. Give icon-only triggers a [descriptive accessible name](/accessibility/patterns/primer-components/descriptive-buttons/#meaningful-and-unique-names), like "Create a codespace on main", and expose progress through a `role="status"` live region.
    
*   When a create surface opens or closes, [manage focus](/accessibility/design-guidance/focus-management/) deliberately. Let a Dialog manage its own initial focus rather than forcing it to the first field, and return focus to the trigger when it closes. After a [soft navigation](/accessibility/design-guidance/app-like-web-experiences/) to a page form, focus the closest heading rather than a field; a hard navigation needs no focus management. When creation happens in place, move focus to the new item.
    
*   Don't add a success banner when the result is visible. When it isn't, use an [InlineMessage](/product/components/inline-message/) if people stay on the page or a [Banner](/product/components/banner/) after a redirect, following the saving pattern's [feedback](/product/ui-patterns/saving/#feedback) guidance, and announce the result to screen readers through a live region. See [Accessible notifications and messages](/accessibility/patterns/accessible-notifications-and-messages/) and [live regions inside a dialog](/product/components/dialog/accessibility/#live-region-usage).
    
*   In a [Dialog](/product/components/dialog/), warn before closing a form someone has started, following the saving pattern's [unsaved changes](/product/ui-patterns/saving/#unsaved-changes) guidance.
    
*   Wrap fields in [FormControl](/product/components/form-control/) with [TextInput](/product/components/text-input/) or [Textarea](/product/components/textarea/), and surface field-level errors with `FormControl.Validation`.
    
*   Use [Button](/product/components/button/) `variant="primary"` for the submit action, labelled with an active verb that names the item, like "Create repository", following the saving pattern's [button text](/product/ui-patterns/saving/#text) guidance. Show its [loading state](/product/components/button/#loading) while creation is in flight, and keep it enabled even when the form is invalid or unchanged, following the saving pattern's [button state](/product/ui-patterns/saving/#state) guidance.
    
*   Put form-level and server errors in a [Banner](/product/components/banner/) `variant="critical"` at the top of the form and move focus to it. For field-level validation errors, move focus to the first invalid field instead. Inside a dialog, follow the [notification messaging](/product/ui-patterns/notification-messaging/#inside-a-dialog) guidance.
    
*   Preserve entered input across a failed submit, and in the browser's session storage for long forms, so an accidental close or failure doesn't discard it, following the saving pattern's [explicit saving](/product/ui-patterns/saving/#explicit-saving) guidance.
    
*   When a create action has mutually exclusive variants, like a secret or public gist, let people choose at the point of submission rather than duplicating buttons.
    

[User experience principles](#user-experience-principles)
---------------------------------------------------------

### [Match the surface to how much you're asking of someone](#match-the-surface-to-how-much-youre-asking-of-someone)

The right surface depends on how much someone has to enter, how many decisions are involved, and how much it should interrupt what they're doing. Reach for the lightest surface that still gives the task enough room: inline on the page, a dialog over it, or a dedicated page.

Do

Create inline when a field or two is all it takes, or when the new item joins a list already on the page, like adding a label, so nothing interrupts the flow.

Don’t

Open a dialog or a new page for a one-field action that could happen in place.

Do

Use a dialog for a handful of fields people should stay in place for, so they can create something and carry on where they were.

Don’t

Send people to a full-page form for a handful of fields, taking over the screen and resetting focus to the top.

Do

Give the task its own page when it carries consequential choices or should survive a refresh, like a new repository, even when the required fields are few.

Don’t

Force something with lots of decisions into a dialog that leaves no room to weigh them.

### [Default what you can, and ask for the rest](#default-what-you-can-and-ask-for-the-rest)

Sensible defaults do two jobs. They save time by filling in what you can infer, and they guide people toward good choices by showing a reasonable starting point rather than an empty form. Infer what you can, suggest the rest, and where you can infer everything, skip the form.

Do

Offer one-click creation when reasonable defaults exist and the item is cheap to discard, like starting a codespace on the current branch.

Don’t

Put a form in front of people when nothing on it needs a decision, slowing down an action they'll repeat often.

Do

Pre-fill sensible defaults, like a visibility setting or a generated name, so people confirm and adjust rather than start from nothing.

Don’t

Present an empty form when you already know enough to fill most of it in.

### [Handle failures without losing the work](#handle-failures-without-losing-the-work)

Creation can fail, and people abandon it by accident. Losing what someone typed forces them to start over, and the cost grows with how much they'd invested. Keep the error where they can act on it, and hold on to their input. For high-investment items, a draft or private starting point lets people capture an idea before committing to the public act of creating it.

Do

Show field errors next to the fields they apply to, and form-wide errors at the top of the form, then move focus to the first error.

Don’t

Fail silently or drop people on a generic error page that strands them away from the form.

Do

Preserve what someone has entered when a submission fails or they close the form by accident, and warn before discarding a form they've started filling in.

Don’t

Clear every field when a submission fails, making people re-enter everything they already typed.

### [Name what's being created and confirm success](#name-whats-being-created-and-confirm-success)

Labels should say what people are about to create, not only that they're creating something. Naming the item type in the button gives it meaning out of context, which helps anyone scanning a row of buttons or a menu and matters most for screen reader users hearing the label alone. Once someone submits, confirm it worked and take them to what they created, and don't let a silently closing dialog be the only sign of success.

Do

Name the item type in the label, so triggers read "New \[thing\]" and submit buttons read "Create \[thing\]", like "New issue" and "Create repository".

Don’t

Use a bare "Create" where the surrounding context doesn't already name the thing, leaving the action ambiguous when the label is read on its own.

Do

Show a loading state on the submit button while the item is being created, and announce progress for longer-running actions.

Don’t

Leave the submit button unchanged while the item is being created, so it looks like nothing happened.

Do

Take people to the thing they created, or show it in place, so the outcome is obvious. For creation that takes time, like forking or creating from a template, hold them on a reassuring waiting state that keeps their input. See the saving pattern's [redirecting](/product/ui-patterns/saving/#redirecting) guidance.

Don’t

Leave people where they started with no sign of what they made, or discard their input while a slow creation runs.

### [Put create actions where people already are](#put-create-actions-where-people-already-are)

The global create menu is the platform-wide home for creation, but people won't seek it out for a feature they don't know exists. Pair it with a local entry point on the page where the new item will live, so the option is there the moment someone needs it. Where someone lacks permission, hide the action rather than showing a control they can't use.

Do

Offer both a global create menu entry and a local entry point on the page the new item belongs to.

Don’t

Rely on the global menu alone, hiding create behind a surface people may never open.

Do

Hide create actions people don't have permission to use.

Don’t

Show a disabled create button that keyboard users can't reach and that doesn't explain why it's unavailable.
