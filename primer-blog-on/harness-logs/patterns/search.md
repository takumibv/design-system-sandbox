Here are the guidelines for the `Search` pattern for Primer:

1.  [Product UI](/product/)
2.  [Scenario patterns](/product/scenario-patterns/)
3.  [Search](/product/scenario-patterns/search/)

Search
======

Find things that match specific criteria.

Search finds things that match specific criteria, reaching for results that aren't already on the page. It runs from a scoped in-page search, like finding a branch in a repository, to a global, cross-context jump, like the command palette. Search and [Filter](/product/scenario-patterns/filter/) sit close together and often share an input, so the first job is knowing which one you're building: this page covers finding things that aren't in view yet, and Filter covers narrowing a collection that's already visible.

[Where this happens](#where-this-happens)
-----------------------------------------

*   [Search for an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/filtering-and-searching-issues-and-pull-requests)
*   [Search for pull requests](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests)
*   [Search for a file with the command palette](https://docs.github.com/en/get-started/accessibility/github-command-palette)
*   [Search the list of branches in a repository](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/viewing-branches-in-your-repository)
*   [Search existing labels in a repository](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)
*   Search within job logs
*   Search for a gist

See [all search scenarios](https://github.com/github/scenarios/issues?q=is:issue+state:open+label:scenario+label:pattern:search) in the Scenarios repo (GitHub staff only).

[Implementation guidelines](#implementation-guidelines)
-------------------------------------------------------

*   Use [TextInput](/product/components/text-input/) with a [leading visual](/product/components/text-input/#with-a-leading-visual) (SearchIcon) for simple text search, and [Dialog](/product/components/dialog/) for command-palette style jump-to search. For structured search that combines several qualifiers, like author, label, status, or repository, use the [Filter](/product/internal-components/filter/) component, which handles suggestion loading, tokenised qualifiers, and validation. See [Filter's implementation guidelines](/product/scenario-patterns/filter/#implementation-guidelines) for guidance on structured queries.
    
*   Show loading with the [TextInput loading state](/product/components/text-input/#in-a-loading-state) and a descriptive `loaderText`, or skeleton rows for result lists, and set `aria-busy="true"` on the results container while it loads. The Filter component shows a skeleton loader for slow suggestion fetches automatically.
    
*   For no results, use a clear empty state such as [SelectPanel](/product/components/select-panel/#empty-state-message)'s message or a [Blankslate](/product/components/blankslate/) that names the query. The Filter component announces invalid-query validation through its own live region; for other inputs, associate the inline message with the input via `aria-describedby`.
    
*   Pair every input with a visible [FormControl](/product/components/form-control/) label by default. Only visually hide the label when equivalent visible text or a familiar search icon already identifies the input, and keep the accessible name aligned with that visible cue. Placeholder text can give an example, but it isn't a label. Add a clear button as a [trailing action](/product/components/text-input/#with-a-trailing-action) with an accessible name like "Clear search".
    
*   Announce result changes and match counters through a polite live region so screen reader users hear that results updated. See [Accessible notifications and messages](/accessibility/patterns/accessible-notifications-and-messages/).
    
*   Persist the query in URL parameters so a result view is shareable and survives a refresh, following [Filter's state guidance](/product/scenario-patterns/filter/#make-filter-state-visible-and-recoverable).
    

[User experience principles](#user-experience-principles)
---------------------------------------------------------

### [Distinguish searching from filtering](#distinguish-searching-from-filtering)

Search reaches for things that match criteria, often things not currently in view. Filtering narrows a collection that's already on screen, where people can watch it shrink. The two often share an input, but the intent differs, and treating them as the same thing leads to the wrong control, wrong wording, and wrong feedback. When a single field does both, follow the [Filter](/product/scenario-patterns/filter/) guidance for the narrowing behavior and this page for the search.

Do

Say "Search" when people are looking for things that may not be in view, and "Filter" when they're narrowing a list they can already see, so the label matches the intent.

Don’t

Label a control "Search" when it only narrows what's already on screen, or call a search a filter.

Do

Update results as people type when feedback is fast and helps them home in, and wait for an explicit submit when the query is deliberate or the results take a moment to return.

Don’t

Churn the results on every keystroke when each pass is slow or people are still composing a query, or force a submit when live, incremental feedback would guide them faster.

### [Match the search control to the task](#match-the-search-control-to-the-task)

The right control follows the complexity of the query. When search combines several qualifiers, like author, label, status, or repository, reach for the [Filter](/product/internal-components/filter/) component, the same structured control the [Filter pattern](/product/scenario-patterns/filter/#match-the-control-to-the-filtering-task) uses, rather than a bespoke query bar. Reserve it for genuinely structured search: for a single field, a plain input or a pick-from-a-list panel is lighter and clearer.

Do

Use a plain TextInput for single-field text search, [SelectPanel](/product/components/select-panel/) for searching a known list, the [Filter](/product/internal-components/filter/) component for structured search with several qualifiers, and a Dialog for command-palette style jump-to search across contexts.

Don’t

Reach for the Filter component when a single text field or SelectPanel would do, or build a bespoke control when a Primer or existing internal component already covers the interaction.

Do

Use the Octicons magnifying glass (SearchIcon) as the leading visual on every search input, so the field reads as search at a glance.

Don’t

Omit the icon or swap in an inconsistent one, leaving the input indistinguishable from any other text field.

### [Always respond to a search, even when it finds nothing](#always-respond-to-a-search-even-when-it-finds-nothing)

This is where search differs most from filtering: a search often brings in content that wasn't there before, so silence reads as a broken page. People need to know a query is running, and to get a clear answer when nothing matches. For screen reader users, an unannounced update is no feedback at all.

Do

Show a visible empty state that names what was searched and suggests a next step, like "We couldn't find any gists matching your search."

Don’t

Leave the results area blank or unchanged when a search returns nothing.

Do

Show a loading indicator whenever results take more than a moment to return, with skeleton rows for result lists or the TextInput loading state for the input itself.

Don’t

Leave people with no feedback between submitting a search and seeing results.

Do

For structured queries, validate inline and tie the message to the input so it's announced, rather than letting an invalid query fail quietly. If a search fails, show a non-modal error with a retry.

Don’t

Fail silently. A query that returns nothing, errors, or hangs with no response leaves people unsure whether search even works.

### [Make search discoverable](#make-search-discoverable)

A search nobody can find goes unused, and the fastest paths into search, like keyboard shortcuts, are invisible unless you signal them. This is distinct from filtering, where the control sits beside the list it narrows; search is often the way people reach content they can't yet see.

Do

Place the search input at the top of the content it governs, visible on load, with `role="search"` on the containing form so screen readers can jump to it.

Don’t

Require people to navigate to a separate page before they can start searching.

Do

Label the field with what is being searched, like "Search branches" or "Search labels".

Don’t

Use a generic label like "Search" when the scope is not obvious.

Do

Add a default keyboard shortcut only when search is frequent and buried in the interface. Avoid shortcuts that conflict with browser, operating system, assistive technology, or standard navigation commands. If a shortcut exists, signal it with persistent visible text or a keybinding hint near the input.

Don’t

Add a default shortcut for speed alone, or put the shortcut only in placeholder text, where it disappears once someone starts typing.

[Related scenario patterns](#related-scenario-patterns)
-------------------------------------------------------

*   [Filter](/product/scenario-patterns/filter/) narrows a collection that's already on the page, where search reaches for things that may not be in view. The two often share an input, so build each behavior to its own pattern.
