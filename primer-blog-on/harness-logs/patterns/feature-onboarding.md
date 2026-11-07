Here are the guidelines for the `Feature Onboarding` pattern for Primer:

1.  [Product UI](/product/)
2.  [UI Patterns](/product/ui-patterns/)
3.  [Feature onboarding](/product/ui-patterns/feature-onboarding/)

Feature onboarding
==================

Onboarding is a virtual unboxing experience that helps users get started with a feature. This is a guide for designing onboarding for the product and does not include what to do for marketing pages, email announcements, social media, etc.

When designing a feature onboarding flow, remember to:

*   ✅ Think creatively utilizing different ways to onboard users, including patterns that are not explicitly mentioned in this document.
*   ✅ Create a well-rounded feature release campaign that may leverage both on and off-product avenues.
*   🚫 Do not leave feature announcement campaigns running forever.

[Usage guidelines](#usage-guidelines)
-------------------------------------

### [Proximity and proportion](#proximity-and-proportion)

*   Onboarding elements should be close to where the feature will live in perpetuity.
*   Consider the primary task on a page before disrupting the user with a feature callout.
*   Keep in mind the context, placement, and dominance of an onboarding element.
*   Onboarding UI choices should be proportional to the functional hierarchy of the feature on the page.

### [Do not derail or trap the user](#do-not-derail-or-trap-the-user)

*   Make it clear to the user how they may dismiss the message and return to their original task quickly.
*   Maintain context if a call-to-action links to a new page, i.e. open the link in a new tab or window to avoid losing a user's work.

### [Set clear campaign limits](#set-clear-campaign-limits)

Create a new feature release timeline with clear parameters and an appropriate ramp down plan:

*   **Define why**
    *   System triggers, e.g. a new feature released, a user should not need to dismiss the same announcement each time they visit a different repository.
    *   User triggers, e.g. a user visits a specific repository for the first time, if recurring, a user should feel added value each time they see the message.
    *   Consider how triggers may be tallied for users who belong to multiple repositories and organizations.
*   **Define when**
    *   Timebox to a maximum number of days a coordinated campaign will run across all targeted users.
    *   Specify a maximum number of impressions a user should see an in-product message. Respect when a user dismisses a message.

### [Avoid traffic collisions](#avoid-traffic-collisions)

*   Avoid showing too many alerts at once. There should be no more than 2 alerts at a time.
*   Consider what other alerts, teaching bubbles, or banners may be active on the page.

Don’t![Screenshot of two teaching bubbles overlapping](https://user-images.githubusercontent.com/66705495/92283281-6e48a500-eeb4-11ea-9b3c-5f3a95ef0479.png)

Don't forget to check coinciding feature releases on the same page.

### [Create efficient sequences](#create-efficient-sequences)

Sequence tasks in a logical way to increase onboarding success. Clearly define when a user starts and successfully completes an onboarding flow.

Treat feature onboarding as a story or a journey with a beginning, middle, and end.

#### [Beginning: Draw attention to the feature](#beginning-draw-attention-to-the-feature)

*   Invite the user to engage with an onboarding journey.
*   Use teaching bubbles, alert banners, the feature preview tray or announcement modals to draw attention to the feature.

Do![Example of the Blank Slate component in the Wiki tab of a repository.](https://user-images.githubusercontent.com/66705495/92768625-0929ff00-f34d-11ea-9524-bb3f88a4681e.png)

Use empty states or alert banners to call attention to a feature if users may discover the feature when starting a task.

Do![Example of a teaching bubble pointing out a new collaboration tool on GitHub](https://user-images.githubusercontent.com/66705495/92768727-2363dd00-f34d-11ea-84bf-36c2f3670589.png)

Use teaching bubbles or other easily dismissable elements if users will discover the feature when they are completing another task.

#### [Middle: Guide users through their task](#middle-guide-users-through-their-task)

*   Use form, checklist, or other components to help users complete their task.

![Example of a checklist on GitHub with two uncompleted tasks and one completed task](https://user-images.githubusercontent.com/6744014/89254411-e8df8580-d5d3-11ea-969f-5080a8c6b0d4.png)

Example of a checklist.

#### [End: Celebrate the finish](#end-celebrate-the-finish)

*   Clearly define when a user starts and successfully completes an onboarding flow.
*   Use a concise banner, or other message to confirm the user has completed their task.

[Teaching bubble](#teaching-bubble)
-----------------------------------

A teaching bubble is a [Popover](/product/components/popover/) that calls attention to a feature in a specific part of the page. Generally, teaching bubbles should be used to educate the user and enrich the task at hand.

### [Usage guidelines for teaching bubble](#usage-guidelines-for-teaching-bubble)

Teaching bubble Figma [sticker sheet](https://www.figma.com/file/Y2xJLFBrU7yyiDLlEkQXcF/Primer-Interfaces?node-id=2%3A1295&t=2xX6FwLSJ0Cq9Qkp-1).

Do

*   Highlight a new feature or important feature that extends or improves the user's experience on the page.
*   Show one teaching bubble at a time.
*   Include a headline that states the purpose of the message.
*   Keep messages short and concise, around 160 characters.
*   Make it clear how to easily dismiss the Popover.
*   Include supplementary information when applicable. Consider a "Learn more about…" link in the message body that opens a new window or tab without destroying a user's work or context.

Don’t

*   Don't point to hidden elements.
*   Don't use a teaching bubble if the user cannot immediately interact or benefit from the highlighted feature.
*   Don't derail users; call-to-actions should not remove the user from their current context.

### [Variations](#variations)

Example

Notes

Default

![Example of a default teaching bubble](https://user-images.githubusercontent.com/6744014/89239384-dc483680-d5ad-11ea-9463-3c56e1feefd9.png)

Generally, use a descriptive dismiss button over a close icon. "OK, got it" is the default dismissal button copy.

Condensed

![Example of a condensed teaching bubble](https://user-images.githubusercontent.com/6744014/89239379-db170980-d5ad-11ea-8327-fa8b035f5e0c.png)

Use a close icon for condensed messages. Remember to apply the correct tab order for screen readers to easily dismiss the teaching bubble at the end of the message.

Multiple buttons

![Example of a teaching bubble with multiple buttons](https://user-images.githubusercontent.com/6744014/89239536-58427e80-d5ae-11ea-9578-05c74c7701da.png)

Invite the user to engage with the value proposition promised. Include dismiss as a secondary button as "OK, dismiss". Additional links that takes the user to a new page should be linked from the text and must open in a new tab or window to prevent losing the user’s context.

Emoji

![Example of a teaching bubble with an emoji](https://user-images.githubusercontent.com/6744014/89239385-dc483680-d5ad-11ea-97e9-9ea6f54fe451.png)

Use emojis to inject personality into the message.

Pictograms

![Example of a teaching bubble with pictograms](https://user-images.githubusercontent.com/6744014/89239387-dce0cd00-d5ad-11ea-898b-b574bb837836.png)![Example of a teaching bubble with a pictogram](https://user-images.githubusercontent.com/6744014/89239389-dd796380-d5ad-11ea-84f4-c0819100fc2a.png)

Use pictograms to represent the feature.

Illustrations and gifs

![Example of a teaching bubble with a GIF](https://user-images.githubusercontent.com/6744014/90083962-d39be280-dcc8-11ea-9d38-4bc24f759ba9.gif)

Visually communicate or demonstrate a complex feature with illustrations and gifs to supplement a message.

[Inline feature discovery](#inline-feature-discovery)
-----------------------------------------------------

Inline feature discovery is a way to highlight features without obscuring other parts of the page while a user may be performing an existing task.

### [Page banner](#page-banner)

Use page banners for announcements that are relevant to the core task on the current page. Remember to consider using other feature announcement patterns or marketing strategies instead of disturbing the user with multiple announcements.

Include a clear way for users to dismiss a page banner and [clear campaign parameters](#set-clear-campaign-limits).

Do![Example of a page banner on the code tab of a repository](https://user-images.githubusercontent.com/66705495/92768839-41314200-f34d-11ea-8f62-dfca0d43adf0.png)

Call out a major feature or change in a page with an invitation to engage and a clear way to dismiss.

Don’t![Example of a page banner pointing out a small feature change](https://user-images.githubusercontent.com/66705495/92768935-56a66c00-f34d-11ea-8b78-18ca99bd0350.png)

Don't use a page banner to disproportionately highlight a small feature.

### [Inline banner](#inline-banner)

Use inline banners in a page with multiple steps or actions.

Example

Notes

Inline feature banner

![Example of an inline feature banner](https://user-images.githubusercontent.com/6744014/88744364-f5f40480-d0fb-11ea-97c4-5ab87b548a2c.png)

A short introduction to the Wiki feature while configuring repository settings.

Organization, repository, or user settings, where a feature is managed and customized, inline alert banners can highlight relevant features that may help better accomplish a user’s task.

Hidden revealed

![Example of an inline banner revealing an easter egg](https://user-images.githubusercontent.com/6744014/89241458-d35a6380-d5b3-11ea-9307-52c8ae80f2d3.png)

Discovering the Profile Readme when creating a new repository.

### [Empty states](#empty-states)

Use empty states as an integrated way to onboard users to new features. Read more about [empty states](/product/ui-patterns/empty-states/).

#### [In-product marketing empty state](#in-product-marketing-empty-state)

For special occasions, a first time experience may be more unique than the typical blank state. Take a more branded approach to engage and guide the user through complex experiences. Be aware of how the experience will change once the first-time UI is no longer there.

![Screenshot of the empty state for GitHub actions](https://user-images.githubusercontent.com/6744014/88744262-b3cac300-d0fb-11ea-9752-c43722a30399.png)

GitHub Actions branded first-time user experience

[Designated feature discovery areas](#designated-feature-discovery-areas)
-------------------------------------------------------------------------

The designated feature discovery areas are generally detached from where the feature actually lives and have a clear click-through for the user to try out the feature or to learn more.

### [Dashboard feature bulletin](#dashboard-feature-bulletin)

The top of the right sidebar in a user’s dashboard (logged-in home) is a designated area for feature discovery. They take the user directly to the feature in the product or the relevant marketing page.

When using a dashboard feature bulletin:

*   Limit messages to around 160 characters.
*   If there is a click-through, include a descriptive button; avoid hidden links.
*   Use color, with discretion, to spotlight and bring brand feature personality to the announcement.

![Example of a bulletin that leads to a marketing page](https://user-images.githubusercontent.com/6744014/89245516-d22e3400-d5bd-11ea-8124-110a698562d2.png)

An announcement about GitHub Teams in the feature preview bulletin leads to an off-platform marketing page.

### [Feature preview dialog](#feature-preview-dialog)

Feature previews allow teams to test features in production with users who opt in. A feature under private or public preview will be added to the Feature Preview dialog, accessible through the user dropdown.

**Note:** Features in preview should have a comprehensive release and redaction plan. No feature should remain in preview for longer than 2 months unmonitored.

![Feature preview dialog](https://user-images.githubusercontent.com/6744014/89245313-6b107f80-d5bd-11ea-86cb-b697c61a2d99.png)

[Lifecycles (labels)](#lifecycles-labels)
-----------------------------------------

Labels are a softer way to accentuate new features without derailing the user from their primary task.

Consider using standalone labels for features that appear in a user’s current view but may navigate away from their current page to fully engage with the feature. If the label is not part of a navigational item then it's important to include a `Give feedback` link to collect info on how the changes are perceived by the user.

### [Lifecycles](#lifecycles)

Depending on the size and impact of your ship you might only release to a fraction of users.

There are currently 4 main lifecycles: `Private preview`, `Public preview`, `General availability (GA)` and `Closing down`.

The `Private preview` lifecycle is often referred to as a `Staff ship` within GitHub.

Note: The `Technical preview` label may be used by any GitHub team for experiments and research projects that meet the Technical Preview criteria.

Appearance

Stage

Details

![private preview](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4996-3682.png&w=640&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4996-3682&t=A0uJvAA7Y0CNYEWI-4)

**Private Preview**  
(formerly Alpha, Private Beta, Staff)

\- Not publicly announced  
\- Support handled by the product and engineering team (no SLAs)

![public preview](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4996-3723.png&w=640&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4996-3723&t=A0uJvAA7Y0CNYEWI-4)

**Public Preview**  
(formerly Limited Public Beta, Public Beta)

\- Publicly announced  
\- Customers should not yet take production dependencies on the service (no SLAs)  
\- Support handled by the product and engineering teams. With VP Support approval, exceptions allow the Support team to handle tickets.

**General Availability**

\- Available to ALL GHEC Customers  
\- SLAs apply (where applicable, some products do not have SLAs)  
\- Support provided

We recommend gathering feedback through a discussion to enable seamless follow-up with the user. This discussion should specify the changes made, providing clarity to the user about what's new. In case of deprecating a feature, it's crucial to provide additional information through our documentation. Note that features that were never promoted beyond the `Private preview` lifecycle do not need to go through a deprecation lifecycle.

### [Color and terminology](#color-and-terminology)

It's important to stick to the correct terminology and label color when referring to a lifecycle. We no longer use the terms Alpha or Beta to identify stages and instead preview Private preview and Preview in the UI.

Do

![public preview label](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4996-17869.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4996-17869&t=A0uJvAA7Y0CNYEWI-4)

Use the correct label and link color

Don’t

![mistaken beta label wrong color](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4996-17935.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4996-17935&t=A0uJvAA7Y0CNYEWI-4)

Don't change the label or link color

### [Label usage and guidelines](#label-usage-and-guidelines)

For more information on how to properly use labels in the product, [please refer to the design guidelines.](/product/components/label/)
