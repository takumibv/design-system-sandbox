Here are the guidelines for the `Filter` pattern for Primer:

1.  [Product UI](/product/)
2.  [Scenario patterns](/product/scenario-patterns/)
3.  [Filter](/product/scenario-patterns/filter/)

Filter
======

Reduce a collection of items to a subset that match certain criteria.

Reduce a collection of items to a subset that match certain criteria. Filter spans the structured [Filter](/product/internal-components/filter/) input, dropdown filters, searchable pickers, and dashboard facets across GitHub. The hard part is fitting the control to the task: a single dropdown for one simple choice, the Filter component when people need to combine and refine criteria. Filtering always narrows a collection that's already on screen; when the goal is to find things that aren't in view yet, that's [Search](/product/scenario-patterns/search/).

[Where this happens](#where-this-happens)
-----------------------------------------

*   [Filter the list of issues in a repository](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/filtering-and-searching-issues-and-pull-requests)
*   [Filter files in a pull request by name](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/filtering-files-in-a-pull-request)
*   [Filter workflow runs by status](https://docs.github.com/en/actions/how-tos/monitor-workflows/view-workflow-run-history)
*   [Filter the list of Dependabot alerts by severity level](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-dependabot-alerts/view-dependabot-alerts)
*   [Filter dashboard by data](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/remediate-alerts-at-scale/filtering-alerts-in-security-overview)
*   [Filter notifications in the inbox](https://docs.github.com/en/subscriptions-and-notifications/how-tos/viewing-and-triaging-notifications)
*   [View a filtered list of my starred repositories](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars)

See [all filter scenarios](https://github.com/github/scenarios/issues?q=is:issue+state:open+label:scenario+label:pattern:filter) in the Scenarios repo (GitHub staff only).

[Implementation guidelines](#implementation-guidelines)
-------------------------------------------------------

*   **Components:** Use [Filter](/product/internal-components/filter/) for structured filtering that combines several qualifiers, [SelectPanel](/product/components/select-panel/) for searchable pick-from-a-list filters, and [ActionMenu](/product/components/action-menu/) with [ActionList](/product/components/action-list/) for small single-select or multi-select option sets. Don't put form controls inside ActionMenu. Use [SelectPanel](/product/components/select-panel/) or [Dialog](/product/components/dialog/) instead when the option list itself needs filtering. With the Filter component, prefer the full variant (input plus advanced dialog button) for consistency, and use its `FilterRevert` subcomponent for the revert affordance.
    
*   **Text inputs:** Pair every filter input with a visible, programmatic label. Placeholder text can give an example, but it's [not a substitute for a label](/product/components/text-input/accessibility/). Use [TextInput](/product/components/text-input/) guidance for leading visuals, trailing clear actions, loading, and validation.
    
*   **Selections:** For dropdown filters, show the selected value in the trigger label and rely on [ActionMenu accessibility behavior](/product/components/action-menu/accessibility/) for keyboard handling, focus return, and selected state. If option counts are shown, pair [CounterLabel](/product/components/counter-label/accessibility/) with adjacent text that says what the count describes.
    
*   **Placement and state:** Put filters at the top of the content they govern and let the input use the full width available, since even a few qualifiers can fill the field. Reflect page-level filters in the URL by default, and reserve server-side persistence for cross-session user preferences that don't need to be shared.
    
*   **Loading and result updates:** Show loading in the results area when fetching takes more than a moment; the [Filter](/product/internal-components/filter/) component shows a skeleton loader for slow suggestion fetches automatically. Announce completed filter results with a persistent `role="status"` region. See [Loading: filter results](/product/ui-patterns/loading/#filter-results) and [Accessible notifications and messages](/accessibility/patterns/accessible-notifications-and-messages/).
    
*   **Validation and errors:** Use inline validation for invalid text queries, following [forms validation guidance](/product/ui-patterns/forms/#validation). If a server-side filter update fails, show the error near the relevant control with [Banner or InlineMessage](/product/ui-patterns/notification-messaging/), not a toast or a silent rollback.
    

[User experience principles](#user-experience-principles)
---------------------------------------------------------

### [Match the control to the filtering task](#match-the-control-to-the-filtering-task)

The right control depends on how much people need to express. The [Filter](/product/internal-components/filter/) component helps when people combine qualifiers, but it adds unnecessary weight when they are choosing one value from a short list.

Do

Match the filter component to the complexity of the task: [Filter](/product/internal-components/filter/) for open-ended filtering that combines several qualifiers, dropdown for small option sets, and SelectPanel for pick-from-a-list filtering.

Don’t

Build a bespoke filter control when a Primer component already covers the interaction.

Do

Use immediate apply for dropdown filters where the options are known and the selection is clear.

Don’t

Trigger a fetch on every character while someone is still composing a structured text query.

### [Make filter state visible and recoverable](#make-filter-state-visible-and-recoverable)

People need to know when a collection is narrowed, what narrowed it, and how to get back. Visible state also helps people understand copied links, bookmarks, and empty results.

Do

Persist filter state in URL parameters so filtered views are shareable and survive page reloads.

Don’t

Store page-level filter state only in local component state where it resets on every navigation.

Do

When a view loads with filters already applied, give people a clear way back to the original state, like a revert link.

Don’t

Pre-fill filters with no obvious way to return to the unfiltered or default view.

Do

Name the content being filtered in visible labels and helper text, like "Filter alerts".

Don’t

Use a generic placeholder like "Filter" as the only cue for what the input does.

Do

Show an active filter indicator when results are narrowed, and make it perceivable to screen readers, not color alone.

Don’t

Leave people guessing whether a filter is applied because the only signal is the changed result list.

Do

When filters return no results, show an empty state that names the active filters and makes reset or revert obvious.

Don’t

Show a generic empty state that leaves people guessing whether the list is empty or the filters removed every result.

### [Communicate changes without disrupting the task](#communicate-changes-without-disrupting-the-task)

Filtering should update the governed content in place and keep people oriented. Sighted users can see the list change; screen reader users need an equivalent status update.

Do

Announce the result count or status change after filtering completes using a persistent `role="status"` region. See [Loading: filter results](/product/ui-patterns/loading/#filter-results).

Don’t

Rely on visual-only updates to communicate that the list changed. Screen reader users may not be aware of the change.

Do

Show inline validation messages associated with the input when a query is invalid.

Don’t

Silently roll back a failed filter operation without telling the user what happened.

[Related scenario patterns](#related-scenario-patterns)
-------------------------------------------------------

*   [Search](/product/scenario-patterns/search/) finds things that aren't already in the list, where filtering narrows what's already on screen. The two often share an input, so build each behavior to its own pattern.
