# get_component_accessibility_guidelines

- args: `{"name":"ConfirmationDialog"}`
- isError: false
- ms: 367
- chars: 4898

---

Here are the accessibility guidelines for the `ConfirmationDialog` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [ConfirmationDialog](/product/components/confirmation-dialog/)
4.  [Accessibility](/product/components/confirmation-dialog/accessibility/)

ConfirmationDialog
==================

ConfirmationDialog is a specialized dialog component used to confirm user actions. It provides a simple way to ask users to confirm or cancel potentially destructive or important actions.

Page navigation navigation
--------------------------

*   [Overview](/product/components/confirmation-dialog/)
*   [Guidelines](/product/components/confirmation-dialog/guidelines/)
*   [Accessibility](/product/components/confirmation-dialog/accessibility/)

More items

[Best practices](#best-practices)
---------------------------------

### [Use clear, descriptive titles](#use-clear-descriptive-titles)

The ConfirmationDialog title should clearly describe the action being confirmed. Use specific language that helps users understand what will happen.

    // Good: Specific and clear
    <ConfirmationDialog title="Delete repository?">
      This action cannot be undone. This will permanently delete the "my-repo" repository.
    </ConfirmationDialog>
    
    // Avoid: Vague or generic
    <ConfirmationDialog title="Are you sure?">
      This action cannot be undone.
    </ConfirmationDialog>

### [Use appropriate button labels](#use-appropriate-button-labels)

Button labels should be action-oriented and specific to the context. Avoid generic labels like "OK" or "Yes/No" when possible.

    // Good: Action-specific labels
    <ConfirmationDialog
      title="Delete repository?"
      confirmButtonContent="Delete repository"
      cancelButtonContent="Cancel"
    >
      This action cannot be undone.
    </ConfirmationDialog>
    
    // Avoid: Generic labels
    <ConfirmationDialog
      title="Delete repository?"
      confirmButtonContent="Yes"
      cancelButtonContent="No"
    >
      This action cannot be undone.
    </ConfirmationDialog>

### [Use danger styling for destructive actions](#use-danger-styling-for-destructive-actions)

When the confirmation involves a destructive or irreversible action, use the `danger` button type to provide visual emphasis.

    <ConfirmationDialog title="Delete repository?" confirmButtonContent="Delete repository" confirmButtonType="danger">
      This action cannot be undone.
    </ConfirmationDialog>

[Keyboard navigation](#keyboard-navigation)
-------------------------------------------

ConfirmationDialog supports full keyboard navigation:

*   **Tab**: Navigate between the cancel and confirm buttons
*   **Shift + Tab**: Navigate backwards between buttons
*   **Enter**: Activate the focused button
*   **Escape**: Close the dialog (equivalent to clicking cancel)

[Focus management](#focus-management)
-------------------------------------

*   When the dialog opens, focus is automatically placed on the appropriate button:
    *   For dangerous actions (confirmButtonType="danger"), focus is placed on the Cancel button
    *   For non-dangerous actions, focus is placed on the Confirm button
*   When the dialog closes, focus returns to the element that triggered it

[Screen reader support](#screen-reader-support)
-----------------------------------------------

*   Uses `alertdialog` role for proper screen reader announcement
*   The title serves as the accessible name for the dialog
*   Button labels are announced clearly to screen reader users
*   The dialog content provides context for the confirmation action

[ARIA attributes](#aria-attributes)
-----------------------------------

The ConfirmationDialog automatically applies appropriate ARIA attributes:

*   `role="alertdialog"` - Indicates this is a modal dialog requiring user response
*   `aria-labelledby` - Points to the dialog title
*   `aria-describedby` - Points to the dialog content for additional context
*   `aria-modal="true"` - Indicates the dialog is modal

[Implementation guidelines](#implementation-guidelines)
-------------------------------------------------------

### [Always provide context](#always-provide-context)

Include enough information in the dialog content to help users make an informed decision:

    <ConfirmationDialog title="Delete 5 selected items?">
      This will permanently delete the selected files. This action cannot be undone.
    </ConfirmationDialog>

### [Consider the consequences](#consider-the-consequences)

For actions with significant consequences, consider requiring additional confirmation or providing undo functionality where possible.

### [Test with assistive technology](#test-with-assistive-technology)

Always test ConfirmationDialog implementations with screen readers and keyboard-only navigation to ensure accessibility compliance.
