Here are the usage guidelines for the `ConfirmationDialog` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [ConfirmationDialog](/product/components/confirmation-dialog/)
4.  [Guidelines](/product/components/confirmation-dialog/guidelines/)

ConfirmationDialog
==================

ConfirmationDialog is a specialized dialog component used to confirm user actions. It provides a simple way to ask users to confirm or cancel potentially destructive or important actions.

Page navigation navigation
--------------------------

*   [Overview](/product/components/confirmation-dialog/)
*   [Guidelines](/product/components/confirmation-dialog/guidelines/)
*   [Accessibility](/product/components/confirmation-dialog/accessibility/)

More items

[Usage](#usage)
---------------

ConfirmationDialog is used to confirm user actions, especially those that are destructive, irreversible, or have significant consequences. It provides a lightweight way to prevent accidental actions without navigating to a separate page.

### [When to use ConfirmationDialog](#when-to-use-confirmationdialog)

Use ConfirmationDialog for actions that have serious, permanent, or widespread impacts, such as:

*   **Destructive actions**: Deleting files, repositories, accounts, or other permanent data
*   **Irreversible actions**: Publishing content, sending notifications, or finalizing transactions
*   **High-impact actions**: Actions that affect multiple users or have system-wide consequences
*   **Actions with potential data loss**: Discarding unsaved changes or clearing forms

### [When not to use ConfirmationDialog](#when-not-to-use-confirmationdialog)

You should avoid using ConfirmationDialog for simpler, routine, or more complex scenarios that require different approaches:

*   **Low-risk actions**: Actions that can be easily undone or have minimal consequences
*   **Frequent actions**: Operations that users perform regularly (this creates fatigue)
*   **Complex decisions**: When users need extensive information to make a decision
*   **Multi-step processes**: Use a dedicated page or wizard instead

[Patterns](#patterns)
---------------------

### [Basic confirmation](#basic-confirmation)

Use for simple yes/no confirmations with clear consequences:

    <ConfirmationDialog
      title="Delete this file?"
      onClose={gesture => {
        if (gesture === 'confirm') {
          deleteFile()
        }
      }}
    >
      This action cannot be undone.
    </ConfirmationDialog>

### [Dangerous action confirmation](#dangerous-action-confirmation)

For destructive actions, use the danger button type and provide clear context:

    <ConfirmationDialog
      title="Delete repository?"
      confirmButtonContent="Delete repository"
      confirmButtonType="danger"
      onClose={gesture => {
        if (gesture === 'confirm') {
          deleteRepository()
        }
      }}
    >
      This will permanently delete the "my-repo" repository, including all files, commit history, and issues. This action
      cannot be undone.
    </ConfirmationDialog>

### [Custom button labels](#custom-button-labels)

Use action-specific button labels that clearly indicate what will happen:

    <ConfirmationDialog
      title="Publish draft?"
      confirmButtonContent="Publish now"
      cancelButtonContent="Keep as draft"
      confirmButtonType="primary"
    >
      This will make your post visible to all users immediately.
    </ConfirmationDialog>

### [Using with the useConfirm hook](#using-with-the-useconfirm-hook)

For imperative usage without managing state:

    import {useConfirm} from '@primer/react'
    
    function MyComponent() {
      const confirm = useConfirm()
    
      const handleDelete = async () => {
        const confirmed = await confirm({
          title: 'Delete item?',
          content: 'This action cannot be undone.',
          confirmButtonType: 'danger',
          confirmButtonContent: 'Delete item',
        })
    
        if (confirmed) {
          deleteItem()
        }
      }
    
      return <Button onClick={handleDelete}>Delete</Button>
    }

[Content guidelines](#content-guidelines)
-----------------------------------------

Follow these guidelines for writing clear and specific content across dialog titles, body content, and button labels:

### [Dialog title](#dialog-title)

*   Use a clear, specific question that describes the action
*   Keep it concise (ideally under 5 words)
*   End with a question mark when appropriate
*   Use sentence case

    // Good
    'Delete repository?'
    'Publish post?'
    'Discard changes?'
    
    // Avoid
    'Are you sure?'
    'Confirm action'
    'Delete?'

### [Body content](#body-content)

*   Provide enough context for users to make an informed decision
*   Explain consequences, especially if they're irreversible
*   Mention specific items being affected when relevant
*   Keep it concise but informative

    // Good
    "This will permanently delete the 'my-repo' repository, including all files and commit history. This action cannot be undone."
    
    // Avoid
    'This action cannot be undone.'

### [Button labels](#button-labels)

*   Use action-oriented language
*   Be specific about what will happen
*   Keep labels concise (1-3 words)
*   Use the imperative mood

    // Good
    confirmButtonContent = 'Delete repository'
    cancelButtonContent = 'Cancel'
    
    // Avoid
    confirmButtonContent = 'Yes'
    cancelButtonContent = 'No'

[Size guidelines](#size-guidelines)
-----------------------------------

Choose from three dialog sizes based on your content needs and use case:

### [Small](#small)

*   Brief confirmations with minimal content
*   Single-line titles and short body text
*   Width: 296px

### [Medium (default)](#medium-default)

*   Most confirmation scenarios
*   Standard length titles and explanatory content
*   Width: 320px

### [Large](#large)

*   Detailed confirmations requiring more explanation
*   Longer content that needs more horizontal space
*   Width: 480px

[Best practices](#best-practices)
---------------------------------

Here's what to keep in mind when using confirmation dialogs effectively:

### [Do](#do)

*   Use specific, action-oriented language
*   Provide clear consequences and context
*   Use danger styling for destructive actions
*   Test the confirmation flow end-to-end
*   Consider the frequency of the action

### [Don't](#dont)

*   Overuse confirmations for low-risk actions
*   Use generic "Are you sure?" messages
*   Create confirmation fatigue with excessive prompts
*   Hide important consequences in small text
*   Use confirmations for actions that can be easily undone
