# get_pattern

- args: `{"name":"View"}`
- isError: false
- ms: 293
- chars: 9610

---

Here are the guidelines for the `View` pattern for Primer:

1.  [Product UI](/product/)
2.  [Scenario patterns](/product/scenario-patterns/)
3.  [View](/product/scenario-patterns/view/)

View
====

Display or examine content in a specific format or perspective.

View spans an enormous range across GitHub, from reading a single file to browsing a directory tree, scanning a pull request diff, watching a workflow log stream, or opening a project item beside the board it lives on. What ties them together is a decision about surface: where to show the content, and how much to interrupt what someone's doing to see it. When the surface doesn't fit the content, people lose their place and have to work to get back.

[Where this happens](#where-this-happens)
-----------------------------------------

*   [View a file in a repository](https://docs.github.com/en/repositories/working-with-files/using-files/viewing-and-understanding-files)
*   [View the files changed in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)
*   [View the details of a workflow run](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/monitoring-workflows/viewing-workflow-run-history)
*   [View a discussion](https://docs.github.com/en/discussions/collaborating-with-your-community-using-discussions/participating-in-a-discussion)
*   [View full details of an item in a project](https://docs.github.com/en/issues/planning-and-tracking-with-projects/managing-items-in-your-project)
*   View the edit history of a comment on an issue

See [all view scenarios](https://github.com/github/scenarios/issues?q=is:issue+state:open+label:scenario+label:pattern:view) in the Scenarios repo (GitHub staff only).

[Implementation guidelines](#implementation-guidelines)
-------------------------------------------------------

*   **Navigation components:** Match the Primer component to the content structure so keyboard navigation and active-state semantics are handled for you: [NavList](/product/components/nav-list/) for sidebar item lists, [TreeView](/product/components/tree-view/) for hierarchies, and a tabbed control for switching between views of the same data. The [tabbed navigation decision guidance](/product/ui-patterns/navigation/#choosing-a-pattern-for-tabbed-navigation) covers whether to reach for [UnderlineNav](/product/components/underline-nav/), [UnderlinePanels](/product/components/underline-panels/), or [SegmentedControl](/product/components/segmented-control/) based on whether the view changes the URL.
    
*   **In-context surfaces:** Use a [Dialog side sheet](/product/components/dialog/guidelines/#side-sheets) for substantial detail shown without leaving the current view, and a centered [Dialog](/product/components/dialog/) only for transient, read-only content. Both manage focus and dismissal for you; see [Dialog accessibility](/product/components/dialog/accessibility/).
    
*   **Collapsible content:** For content people expand and collapse, like tree nodes, folded diff regions, or truncated text, reach for the established [progressive disclosure](/product/ui-patterns/progressive-disclosure/) affordances rather than a new control, so the trigger stays recognizable.
    
*   **Loading:** Scope a [Spinner](/product/components/spinner/) or [skeleton](/product/components/skeleton-box/) to the area the content will fill. See [Loading](/product/ui-patterns/loading/#scoping-loading-indicators-to-page-content).
    
*   **Errors:** Show failures inline where the content would have appeared with a [Banner](/product/components/banner/) or [Blankslate](/product/components/blankslate/), following [notification messaging](/product/ui-patterns/notification-messaging/).
    
*   **Announcements:** Announce asynchronously loaded content, status changes, and errors through a live region so they reach screen reader users. See [Accessible notifications and messages](/accessibility/patterns/accessible-notifications-and-messages/).
    
*   **Focus in split layouts:** When selecting a list item updates the detail in place, keep focus in the list so keyboard and screen reader users can keep moving through items, and announce the change through the live region rather than pulling focus into the detail.
    

[User experience principles](#user-experience-principles)
---------------------------------------------------------

### [Match the presentation to the content](#match-the-presentation-to-the-content)

How much content you show, and where you show it, should fit the content. Show the essentials first and let people reveal more on demand, so a view doesn't overwhelm with detail no one asked for. Then match the surface to how much the content should interrupt: primary content someone came to read belongs inline, substantial detail they want to glance at without leaving belongs in a side sheet, and brief, transient content belongs in a dialog or hovercard. A modal traps focus, so it suits a short read but makes exploring harder.

Do

Default to a simple view that shows the essentials, and let people opt into more detail by [expanding it in place](/product/ui-patterns/progressive-disclosure/) or opening a dedicated page when the detail warrants one.

Don’t

Present all the detail up front when most of it isn't needed yet, or make the essential content hard to find in it.

Do

Show primary content inline, put substantial in-context detail in a [side sheet](/product/components/dialog/guidelines/#side-sheets) that keeps the underlying view in place, and reserve a modal dialog for transient, supplementary content like an edit-history diff.

Don’t

Put primary content someone needs to explore inside a modal dialog, or send them to a new page when a side sheet would keep their context.

Do

Give hover-triggered content like a hovercard a [non-hover path](/product/getting-started/foundations/responsive/#hover-support) on touch devices, and let a side sheet fall back to a [bottom sheet or full-screen dialog](/product/components/dialog/guidelines/#narrow-viewport-placement) when there's no room beside the content.

Don’t

Rely on hover alone to reveal content, or assume a side sheet can always sit beside the view.

### [Avoid unnecessary navigation](#avoid-unnecessary-navigation)

Navigating away and back has a cost, so avoid it when content can come to people instead. Let them open detail from the thing itself and move between related items without leaving the view. The same holds when content is slow or fails: keep the loading and error states in place rather than replacing the whole view with a page-level spinner or a full error screen.

Do

Open an item's detail from its own title, and keep the parent list on screen in a [split layout](/product/ui-patterns/navigation/#parent-detail-split-page-layout), like the repository file tree, so people move between items without navigating away and back. At narrow widths or high zoom, let it [reflow](/product/getting-started/foundations/responsive/) to a single column with navigation between the two.

Don’t

Route people through a secondary control to reach detail, or force a full navigation away and back to move between related items.

Do

When people work through a list in order, like a notifications inbox or a review queue, let them advance to the next item from within the current one.

Don’t

Make people return to the list after each item when you know they're moving through it in sequence.

Do

Keep slow or failed content in place, so people stay oriented. Show a placeholder where it will appear, and give an inline error a recovery path like a raw view or a retry.

Don’t

Replace the whole view with a page-level spinner or a full error page for a transient failure, when the rest of the view could stay usable.

### [Make the current position unmistakable](#make-the-current-position-unmistakable)

When people move through tabs, a tree, or a list of items, they need to know where they are: which view is active, which item is selected, what's expanded. That signal gives [clear orientation](/product/ui-patterns/navigation/#clear-user-orientation) within the content, so make it obvious visually and expose it to assistive technology.

Do

Give the active view, selected item, and expanded state a clear cue that doesn't depend on color, and expose that state to assistive technology.

Don’t

Signal the current view or selection with color alone, or convey a state visually without exposing it to assistive technology.

### [Let people share and restore what they're viewing](#let-people-share-and-restore-what-theyre-viewing)

When what someone is viewing carries meaning (the active tab, a selected item, a highlighted line), people expect to link to it or return to it and find the same thing. Make that state reproducible so a shared link opens the same content and a reload doesn't lose someone's place, and give a direct way to copy the link. State that's transient, like a scroll offset, doesn't need it.

Do

Encode meaningful state, like the active tab, selection, or highlighted line, in the URL so a link or a reload restores it.

Don’t

Keep state worth sharing only in component memory, where a reload or a shared link loses the tab, selection, or position.

Do

Give people a control to copy a link to what they're viewing, like the code view's option to copy a permalink to a selected line range.

Don’t

Leave people to copy the address bar when it doesn't capture what they're looking at, or to assemble the link themselves.
