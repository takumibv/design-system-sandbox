<!-- source: https://primer.style/product/getting-started/foundations/content/ -->
1.  [Product UI](/product/)
2.  [Getting started](/product/getting-started/)
3.  [Foundations](/product/getting-started/foundations/)
4.  [Content](/product/getting-started/foundations/content/)

Content
=======

These guidelines are specific to and focused on GitHub product interfaces.

Your first port of call for general content guidelines should be [GitHub’s content guide](https://github.com/github/brand/blob/main/docs/how-to-write-at-github.md) (link only accessible to GitHub staff), followed by the [Microsoft Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/).

[UI content principles](#ui-content-principles)
-----------------------------------------------

Keep the following principles in mind when creating UI content for GitHub.

### [1\. Keep it clear](#1-keep-it-clear)

Aim for a seventh-grade or below reading level. This means you should write text that is straightforward, without trying to be creative with words.

There are some useful tools you can use to test your content for simplicity and reading level:

*   [Grammarly](https://www.grammarly.com/)
*   [Hemingway](http://www.hemingwayapp.com/)
*   [Automatic Readability Checker](https://www.readabilityformulas.com/free-readability-formula-tests.php)

### [2\. Keep it consistent](#2-keep-it-consistent)

Refer to the same actions, sections, labels, landing pages, and so on, the same way across the product. But don’t sacrifice clarity over consistency.

[Voice and tone](#voice-and-tone)
---------------------------------

GitHub’s voice is:

*   Clear but not cold
*   Conversational but not jargon-y
*   Inclusive but not disingenuous
*   Helpful but not overly-prescriptive

You should consider the context of when a user will read something, keeping in mind that:

*   Humor isn’t welcome in all situations, for example: in errors, when waiting, or when something fails.
*   Error messages should be understandable by humans.

Read more about GitHub’s [voice and tone in the content guide](https://drive.google.com/drive/folders/1Y_cI1_T9FPh1wzA2nA_KKRum29ak23Or) (link only accessible to GitHub staff).

[Top 10 rules](#top-10-rules)
-----------------------------

If you’re in a hurry, these are the most important content guidelines to keep in mind, in no particular order.

*   Write in plain English, don’t sound like a robot.
*   Be brief, remove unnecessary words like adjectives and adverbs.
*   Use active voice.
*   Use sentence case, and when in doubt, don’t capitalize.
*   Always capitalize GitHub correctly.
*   Avoid gendered language.
*   Do not use slang or culturally-specific references.
*   Do not use “here” or “click here” in calls to action.
*   Be very thoughtful when introducing humor to the interface.
*   Have someone else proofread your text.

[Content guidelines](#content-guidelines)
-----------------------------------------

### [Acronyms and abbreviations](#acronyms-and-abbreviations)

Use acronyms when they are more widely used than the spelled out term.

“Pull request” should never be abbreviated. It’s always lowercase unless it’s starting a sentence.

### [Dates and time](#dates-and-time)

When referring to times, use am and pm, and not any other variation (a.m., A.M., AM).

All dates and times displayed should use the [RelativeTime](/product/components/relative-time/) component, which is able to format and localize dates into the users given locale, as well as display times relative to the current date, while also updating in real-time.

#### [Relative time](#relative-time)

Dates and times almost always appear relative to the current date, using shorthand formats to help users quickly determine how old something is or how soon something will be. For this, we use the RelativeTime component which displays dates rounded to the nearest unit, for example, "a minute ago" or "20 days ago". For dates that are more than 1 month from the current date, it can be more useful to display the date-time, as these items are less "current" and more "historical".

For more info, see the [relative dates section](/product/components/relative-time/guidelines/#relative-dates) in the RelativeTime component guidelines.

#### [Precise time](#precise-time)

Some dates are especially sensitive and always should be displayed in a precise date-time format, such as the creation or expiration of certificates and keys. When a user needs to take action before a particular time (such as an expiry date) then the precise date time should be displayed. These should display the weekday, the date, the month, and the year (if the year is not the current year), for example, "Thursday, 26 August 2021" or "Saturday, 31 December 2022".

For more info, see the [precise dates section](/product/components/relative-time/guidelines/#precise-dates) in the RelativeTime component guidelines.

#### [Elapsed time](#elapsed-time)

Some dates and times represent the start or (expected) end of an actively running task, for these the elapsed or remaining time should be displayed, as this information is more useful than when a task started. This format should display all units that are greater than zero, for example, "2 minutes, 24 seconds" or "8 hours, 15 seconds". For ephemeral tasks where timing needs to be quickly consumed, or where a lot of times may be displayed together, a compact time notation can be used, for example, "2m 24s" or "8h 15s".

For more info, see the [elapsed or remaining dates section](/product/components/relative-time/guidelines/#elapsed-or-remaining-dates) in the RelativeTime component guidelines.

#### [Date intervals](#date-intervals)

##### [When the date range is within the same year:](#when-the-date-range-is-within-the-same-year)

Use the `MMM DD - MMM DD, YYYY` format. **Example:** `Feb 17 - Feb 23, 2025`

##### [When the date range spans two years:](#when-the-date-range-spans-two-years)

Include the previous year and use the `MMM DD, YYYY - MMM DD, YYYY` format. **Example:** `Dec 30, 2024 - Jan 5, 2025`

##### [Displaying the current year](#displaying-the-current-year)

Showing the current year in date ranges depends on the context, but the recommendation is to **err on the side of including it** for clarity.

### [Emojis](#emojis)

Avoid using emojis, but when you do:

*   Use them only at the end of a sentence
*   Use only well-recognized emojis
*   Do not repeat emojis
*   Use emojis that will work well in both dark and light modes

### [Error messages](#error-messages)

Be friendly and helpful, and avoid jargon. Do not blame the user.

Do

> _Enter a name_  
> _Your name must be between 2 and 20 characters_

Don’t

> _Error 1234567890_  
> _You forgot to add your name_

Be specific.

Do

> _Enter a credit card number_

Don’t

> _Field required_

In most cases, apologizing won't fix the problem. As a rule, do not apologize too much in any situation in the UI.

Do

> _All checks failed_

Don’t

> _Sorry, all checks failed_

Do not try to be funny or humorous.

Do

> _Some checks failed_

Don’t

> _Oops, some checks failed_

### [Feedback](#feedback)

Feedback should be clear and reassuring, using the same terms used by the UI elements that triggered it. Don't try to be funny, and avoid jargon.

Do

> _Issue transfer in progress_  
>   
> 
> Feedback message when transferring an issue, using the same term ("transfer") as the trigger button

Don’t

> _Moving the issue_  
>   
> 
> Feedback message that uses a different term ("moving") than the trigger button

### [Forms](#forms)

Use sentence case for form titles, labels, and fields. Do not include colons in form labels.

### [Labels and buttons](#labels-and-buttons)

All labels and button text should be in sentence case, and not include punctuation.

Do

> _Save email preferences_  
> _1 linked pull request_  
> _12 days ago_

Don’t

> _Save email preferences._  
> _1 Linked pull request_  
> _12 Days ago_

When a sentence or label starts with a number (for example, “2 references”), the number is the first word, and the rest of the sentence should be in lowercase.

Action labels should start with an imperative verb that clearly indicates what to expect.

Do

> _Save preferences_

Action labels can be shortened to only include an adjective and a noun.

Do

> _New issue_

Use “sign in” rather than “log in”.

### [Links](#links)

Link text should be clear, unique, and informative, helping users understand where it leads. Context can come from the link itself, aria labels, or nearby text.

Do

> _You can find out more about our speakers at the [GitHub Universe site](https://githubuniverse.com/)._

Set the context of the image link from the text within the same container.

Do

>     <a href="/pricing">
>       <img src="pricing.png" role="presentation" />
>       Pricing information
>     </a>
>     

Never say “here” or “click here”.

Don’t

> _Click here to find out more about our speakers at GitHub Universe._

### [Punctuation](#punctuation)

Headings, labels and buttons should not include punctuation. In most cases, exclamation marks are not appropriate — most things aren't _that_ exciting.

Do

> _No code scanning alerts found_

Don’t

> _No code scanning alerts found!_

### [References to UI](#references-to-ui)

When referring to unclickable page names and sections, write them as they appear in the interface in quotation marks.

Do

> _Go to the “Email notifications settings” section._

When referring to button or link text that a user should click on, use bold text without quotation marks. Make sure all UI references match the capitalization in the interface. If you’re writing for a mobile app experience, use “tap”, instead of “click”.

Do

> _
> 
> Click **Save**
> 
> _

When referring to a folder, use a code tag.

Do

> _Open the `docs` folder._

### [Subject](#subject)

In most instances, address the user as "you" and items "owned" by the user as "your" or "yours".

Do

> _Update your profile_

Don’t

> _Update my profile_

Some exceptions exist and are usually related to legal language, such as when a user needs to agree to terms, or confirm a destructive action.

Do

> _I have read the Terms of Service_  
> _I understand, convert this issue to a discussion_

[What to avoid](#what-to-avoid)
-------------------------------

*   Do not say that something is “easy”, “quick”, or that the user “just” needs to do something.
*   Do not capitalize common terms. Only proper nouns and product names should be capitalized.
*   Do not use emoji in UI content, or to replace words.
*   Use the word “and” instead of an ampersand or the “+” sign.
*   Do not use exclamation marks to indicate excitement, most actions aren’t.
*   Do not use the greater than and less than symbols to indicate steps in a flow.
*   Do not use semicolons: they are hard to get right and can be replaced by a period most times.

[How to get help](#how-to-get-help)
-----------------------------------

If you need clarification and can’t find an answer in [GitHub’s content guide](https://github.com/github/brand/blob/main/content.md) (link only accessible to GitHub staff) or the [Microsoft Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/), or would like your UI content to be reviewed, please start a discussion in github/primer and someone in the team will get back to you. If your query is urgent, you can ask directly in the [#primer](https://github.slack.com/archives/CSGAVNZ19) channel.
