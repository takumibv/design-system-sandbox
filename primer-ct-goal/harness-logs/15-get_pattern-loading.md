<!-- tool: get_pattern / args: {"name":"Loading"} / at: 2026-11-05T10:54:00.830Z / isError: false -->

Here are the guidelines for the `Loading` pattern for Primer:

1.  [Product UI](/product/)
2.  [UI Patterns](/product/ui-patterns/)
3.  [Loading](/product/ui-patterns/loading/)

Loading
=======

How to use loading states to help users stay informed and engaged while waiting.

Performance is a priority at GitHub, and the first approach is to improve the speed of our processes. However, there are times when we can't avoid making users wait. In these cases, maintaining [visibility of system status](https://www.nngroup.com/articles/visibility-system-status/) through loading states can help users feel stable and in control.

Without indicating that something is loading, users may think a process has silently failed. This can lead to confusion and frustration.

Some of our components already have loading states built in. Rely on component-specific patterns before designing your own loading experiences.

Examples:

*   [DataTable](/product/components/data-table/#in-a-loading-state)
*   [SelectPanel](/product/components/select-panel/#loading)
*   [TreeView](/product/components/tree-view/#asynchronously-loading-child-nodes)

[Loading indicators](#loading-indicators)
-----------------------------------------

Loading indicators reassure users that their request is actively being executed, and can sometimes be used to set an expectation for how long they'll be waiting. They may even reduce the users' perception of time.

Animation in loading indicators helps reassure the user that the process is active and the system isn't frozen. However, animation can become distracting or overwhelming. Loading indicators' animation should be subtle and used sparingly.

### [Determinate loading indicators](#determinate-loading-indicators)

Determinate loading indicators may be used when the progress or duration of a process is known or can be estimated. This type of loading gives the user an idea of how much longer they'll have to wait.

Determinate loading indicators work best for processes that are likely to take longer (approximately 3 or more seconds). Shorter waiting times don't give the user enough time to process the information conveyed by a determinate loading indicator.

![A ProgressBar with % completed text](https://github.com/primer/design/assets/2313998/973ab0ca-4f5c-4e06-98f2-e66fdf706943)

### [Indeterminate loading indicators](#indeterminate-loading-indicators)

Indeterminate loading indicators may be used when the progress or duration of a process is variable or unknown.

This type of loading gives the user a sense that something is happening, but not how long it will take.

#### [Spinner](#spinner)

A [Spinner](/product/components/spinner/) is the most versatile indeterminate loading indicator. It may be used in place of content that is loading, or adjacent to a loading message

![PR status checks being replaced by a Spinner](https://github.com/primer/design/assets/2313998/4f4e897e-bbda-4cbc-bd0f-962450c6b5b6)

#### [Content skeleton](#content-skeleton)

For large areas of loading content, the loading content may be replaced by a vague representation of the content. This shows users the general shape of the page and could make them perceive the real content as loading faster.

Examples:

*   [SkeletonText](/product/components/skeleton-loaders/#skeletontext)
*   [SkeletonAvatar](/product/components/skeleton-loaders/#skeletonavatar)
*   [SkeletonBox](/product/components/skeleton-loaders/#skeletonbox)

#### [Animated icon or illustration](#animated-icon-or-illustration)

An animated icon or illustration may be used as a "branding moment" for special loading states. This should be used sparingly.

#### [Loading text](#loading-text)

Text may accompany any of the above loading indicators to give the user more context about the process.

[Adapting to different wait times](#adapting-to-different-wait-times)
---------------------------------------------------------------------

The following is meant as general guidance since we can't accurately predict how long a process will take. It's difficult to give even a rough estimate of how long a process will take due to unknown variables such as network speed, device performance, and server load.

![3 images: 1. crossed out loader; 2. Spinner; 3. ProgressBar with text;](https://github.com/primer/design/assets/2313998/7b42b9aa-c517-4620-833a-d12b7e6084bd)

**Less than 1 second:** Don't show a loading state. Seeing a loading indicator flash on the screen could be distracting and make the product feel slower than it is.

**1–3 seconds:** Use an indeterminate loading state. The user won't have enough time to process the information in a determinate loading state, and potentially cause frustration or confusion about missing information.

**3–10 seconds:** Use a determinate loading state if possible to keep the user informed about why they're waiting so long.

**More than 10 seconds:** Use a determinate loading state and avoid blocking other interactions by treating the process as a background task if possible. This reduces the interruption caused by a lengthy process, and could make wait times feel shorter if a user can shift their focus to other tasks. For example, the user can still interact with a pull request while they're waiting for CI actions to run.

[Lifecycle of a loading state](#lifecycle-of-a-loading-state)
-------------------------------------------------------------

![4 images: 1. explicitly excluded loading indicator; 2. Button in loading state; 3. success banner; 4. error banner](https://github.com/primer/design/assets/2313998/91f1ecd4-78e3-4178-a505-749ab05f3efa)

**Process initiated:** The moment just before loading begins. Usually initiated by a user action such as clicking a button or submitting a form

**Process in progress:** The process is underway. This is the actual loading state.

**Process complete successfully:** The process has finished successfully, and the user can continue with their task. If the user isn't navigated to a new context when the task has completed, this step may include some indication of success, such as a green checkmark or a success message.

**Process failed:** There was an error, and the process could not be completed. This step should include an error message that explains what went wrong and what the user's next time may be. For example, if the user can retry the process, include a button to do so.

[Incremental loading](#incremental-loading)
-------------------------------------------

Whenever possible, show each item in a collection as soon as it loads. Don't wait for every item in the collection to load before showing the items.

Do

Show content as soon as it's loaded.

Don’t

Don't wait for all content in a collection to be loaded before showing it.

Whenever possible, prioritize the most important pieces of data to load first. This shows the user the most important content first and gives them a chance to interact with things sooner. This could be especially helpful for somebody on a slow network.

![4 images of a repo card from the feed loading: 1. Skeleton; 2. Text; 3. Actions; 4. Images](https://github.com/primer/design/assets/2313998/ea5725c7-bec2-43a0-8cd9-43fba1a27a51)

[Scoping loading indicators to page content](#scoping-loading-indicators-to-page-content)
-----------------------------------------------------------------------------------------

A loading indicator should be placed nearest to the content they are standing in for. Avoid creating a jarring layout shift when the loaded content replaces the loading indicator.

Replace loading indicators with loaded content or error feedback as soon as possible to avoid burdening users with unnecessarily long wait times.

### [Interstitial loading screen](#interstitial-loading-screen)

Some processes navigate you to a new page once they've completed, and use an interstitial loading page as a transition. This should be done sparingly because loading a new page is a bigger interuption than showing a loading indicator in context on the page.

Interstitial loading screens are useful for:

*   processes that take a longer time (approximately 3 seconds or more) and result in a significant change such as the creation of a new repo
*   blocking the UI to prevent interruptions or changes to data

### [Large areas](#large-areas)

![3 images: 1. Spinner replacing status check box; 2. Spinner replacing PR/issues sidebar sections; 3. Spinner replacing modal content](https://github.com/primer/design/assets/2313998/9347a9a1-088b-4bf0-829a-a38ba1644525)

Position your loading state in the center of the region, but ensure it's still visible within the viewport.

### [Small areas](#small-areas)

To avoid information overload and visual noise, consider replacing a series of adjacent loading indicators with a single loading indicator.

Do

Reduce the number of loading indicators shown on a page.

Don’t

Don't show a loading indicator for every piece of loading content on the page.

[Accessibility](#accessibility)
-------------------------------

### [Conveying loading indicators](#conveying-loading-indicators)

Loading indicators are visual and need to be accessible to assistive technologies. This can be done with a text element we associate using `aria-labelledby`, or attributes such as `alt` (on an `img` element) and `title` (on a `svg` element). The loading text element may be visually hidden.

You may default to a generic label such as "loading", but try to be specific when possible. For example, when a Spinner replaces status checks in a pull request, it could have the label "loading status checks".

### [Avoid over-announcing loading states](#avoid-over-announcing-loading-states)

If you're using multiple loading indicators to convey a cluster of loading content, be mindful about how many announcements will be read aloud to screen reader users.

Since we discourage showing too many loading indicators on the page at once, this problem is most likely to happen when using a [content skeleton](#content-skeleton) loading indicator.

Do![](https://github.com/primer/design/assets/2313998/70905325-7561-417d-9fcd-2aae7c910bc8)

Have a single loading announcement for a collection of SkeletonLoaders

Don’t![](https://github.com/primer/design/assets/2313998/52e5ee70-9e14-4fa8-92d6-c03ac64dcddd)

Don't have a loading announcement for every piece of loading content

### [Conveying status](#conveying-status)

Communicate when a process has been initiated, when it's in progress, and when it has been completed or if it has failed.

There are many cases where it will be obvious that a process has completed or failed, and we won't need an additional announcement. For example, a page load or a new element getting focused.

For other cases, the status will need to be manually conveyed to assistive technologies. Use a `role="status"` message or put content in an `aria-live` element that communicates the status of a process.

#### [Filter results](#filter-results)

If the user needs to wait for filtering to complete, a screen reader should announce how many results were returned from filtering. For example: "No items match the filter", or "5 items match the filter".

To ensure that assistive technology is informed about the filter update, put the message in an element that has a `role` of `"status"`. The element with `role="status"` must always be rendered, not just when the message should be announced.

Implementations of this pattern can be seen in the following examples:

*   [Lookbook - Autocomplete](https://primer.style/view-components/lookbook/inspect/primer/alpha/auto_complete/playground)
*   [Storybook - ActionList](https://primer.style/react/storybook/?path=/story/components-actionlist-examples--async-list-with-spinner)

![](https://github.com/primer/design/assets/2313998/61171c17-274d-416b-81a7-825a610fdd24)

### [Preventing partially loaded content from being announced](#preventing-partially-loaded-content-from-being-announced)

If an `aria-live` region of a page is being updated, set `aria-busy="true"` on the live region until the updates are complete. Then, set `aria-busy="false"`. This prevent assistive technologies from announcing updates until the updates are complete.

### [Focus management](#focus-management)

Follow existing focus patterns. When focus needs to move, it should go to the most logical and predictable. Before implementing your own focus management strategy for a loading state, confirm that the component hasn't already implemented it. For example, when a [Dialog](/product/components/dialog/) closes, focus is automatically moved back to the control that opened the Dialog.

If the completed process results in navigating to a new page, just rely on the browser's default focus behavior for new pages.

If the process fails and a validation message is shown, move focus to the first focusable element in the error message. See the [form validation guidelines](/product/ui-patterns/forms/#validation-on-submit) for more info.

If the process loads new content, move focus to first focusable element in the newly loaded content. This pattern is also described in the [TreeView focus guidelines](/product/components/tree-view/#focus-out).

### [Disabling controls during loading](#disabling-controls-during-loading)

You may disable form controls after the user submits the form to avoid confusion over whether changes that were made during the submission process will be saved.

However, the button that initiates the a loading process may not be semantically disabled using `aria-disabled`. For more information about button loading states, see the [loading section](/product/components/button/#loading) of the Button component guidelines.

### [Motion considerations](#motion-considerations)

Animated loading indicators help reassure the user that the system isn't frozen, and should not be disabled when for users that prefer reduced motion. However, the animation in loading indicators should be kept as subtle as possible. Large, flashy animations would be harmful to users with sensitivity to motion.

[Related links](#related-links)
-------------------------------

*   [Graceful degradation](/product/ui-patterns/degraded-experiences/)
*   [Patterns for saving](/product/ui-patterns/saving/)
*   [ProgressBar](/product/components/progress-bar/)
*   [SkeletonLoaders](/product/components/skeleton-loaders/)
*   [Spinner](/product/components/spinner/)
