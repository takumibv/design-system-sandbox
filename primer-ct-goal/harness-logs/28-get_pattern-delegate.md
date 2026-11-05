<!-- tool: get_pattern / args: {"name":"Delegate"} / at: 2026-11-05T10:54:21.953Z / isError: false -->

Here are the guidelines for the `Delegate` pattern for Primer:

1.  [Product UI](/product/)
2.  [Scenario patterns](/product/scenario-patterns/)
3.  [Delegate](/product/scenario-patterns/delegate/)

Delegate
========

Hand off responsibility to a human or an agent to complete work on your behalf.

Delegation assigns work to another human or agent to carry out independently. The person relinquishes control, expects a result back, and may monitor progress in between. It ranges from assigning an issue to instructing an agent to open a pull request. The work can run for minutes or hours, so the core tension is keeping people informed and in control of something that, by design, operates without them.

[Where this happens](#where-this-happens)
-----------------------------------------

*   [Assign an issue or PR to another user or campaign](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/assigning-issues-and-pull-requests-to-other-github-users)
*   [Assign the agent to an issue or pull request](https://docs.github.com/copilot/how-tos/use-copilot-agents/cloud-agent/create-a-pr#assigning-an-issue-to-copilot)
*   [Assign a person or team to a security campaign](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/remediate-alerts-at-scale/creating-managing-security-campaigns)
*   [Comment @copilot on an issue to delegate work](https://docs.github.com/copilot/using-github-copilot/coding-agent/about-assigning-tasks-to-copilot)
*   [Have an agent write code and generate a pull request](https://docs.github.com/copilot/how-tos/use-copilot-agents/cloud-agent/create-a-pr)
*   [Delegate a task in Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/delegate-tasks-to-cca)

See [all delegate scenarios](https://github.com/github/scenarios/issues?q=is:issue+state:open+label:scenario+label:pattern:delegate) in the Scenarios repo (GitHub staff only).

[Implementation guidelines](#implementation-guidelines)
-------------------------------------------------------

These guidelines apply to both agent and human delegation. For agent-specific structure, focus, and announcements, see [Copilot accessibility practices](/accessibility/patterns/copilot-accessibility-practices/).

*   Use a focused and transient surface, like [Dialog](/product/components/dialog/), when delegation requires structured input. For simpler assignments, an inline control is enough.
    
*   Surface delegate activity as progress signals via existing notification channels and live region announcements. See [accessible notifications and messages](/accessibility/patterns/accessible-notifications-and-messages/).
    
*   Every delegate entry point must have a meaningful accessible name that describes the action and its context. Avoid generic or repeated labels that don't distinguish one delegate from another. See [descriptive buttons](/accessibility/patterns/primer-components/descriptive-buttons/).
    
*   Show a [loading state](/product/components/button/#loading) on the submit control so the handoff registers, and use a persistent status indicator for the long-running work rather than holding people in a [loading](/product/ui-patterns/loading/) spinner.
    
*   Show errors at the point they occur paired with a recovery action, so people can resolve the problem without losing context or progress. This can be due to an agent failure, a declined assignment, an unavailable human, or a permissions issue.
    
*   Preserve a readable trail of decisions and actions so people can review, audit, or hand off context. For agent delegates, surface a high-level activity log and avoid exposing sensitive content. For human delegates, link to commits and comments on the item.
    
*   Use distinct visual treatments to distinguish human delegates from agent delegates. Use [Avatar](/product/components/avatar/) for people and the branded [CopilotIcon](https://primer.style/octicons/icon/copilot-16/) for agents. When both appear on the same object, nest the agent indicator under the human assignee to show the delegation hierarchy.
    

[User experience principles](#user-experience-principles)
---------------------------------------------------------

### [Confirm the handoff and show progress in context](#confirm-the-handoff-and-show-progress-in-context)

Make every decision visible throughout the delegation lifecycle and keep the experience rooted in the person's current context, not a separate page. People should follow progress without digging or navigating away, so the result never arrives as a surprise.

Do

Confirm the delegation was received and notify when it completes or needs attention, in the same context where people initiated it. People should be able to start, monitor, and resume without leaving their workflow.

Don’t

Process silently or leave people to discover a completed or failed delegation on their own.

Do

Show incremental progress immediately. Announce state changes via a live region and pair color with text or icons so updates reach everyone.

Don’t

Limit feedback to a binary "working" or "done" indicator or display every detail inline.

Do

Ask for input when conflicts or ambiguity arise, offering specific options rather than open-ended questions where possible.

Don’t

Decide autonomously when intent is unclear.

### [Keep a decision trail visible and use consistent language](#keep-a-decision-trail-visible-and-use-consistent-language)

Progress should be visible at a glance, any time. When people can check in on delegated work without hunting for it, they build the confidence and trust to delegate more in the future.

Do

Keep status indicators at a consistent position next to the item being worked on, and display results inline for quick delegations.

Don’t

Show status only in a separate page disconnected from the item, or force people to navigate elsewhere for results.

Do

Use consistent language, including the same noun for the work unit and verbs for actions across entry points, status, errors, and sharing.

Don’t

Mix terminology across the same workflow.

Do

Preserve a readable trail of decisions and actions so people can review, audit, or hand off context. Use progressive disclosure for details like logs or diffs.

Don’t

Discard the delegate's reasoning or activity log once the task completes.

### [Surface failures with clear next steps](#surface-failures-with-clear-next-steps)

When a task fails, people need to know what went wrong and how to recover. Clear error messages with concrete next steps reduce anxiety and help people move forward.

Do

Name what failed, explain why, and offer a concrete next step. Announce them immediately so that screen readers are also informed.

Don’t

Show a generic error with no path forward, or bury failures where people have to hunt for them.

Do

Show what was accomplished when a delegation partially succeeds and offer a path to complete the rest.

Don’t

Treat partial success as total failure.

Do

Match the severity of the feedback to the severity of the failure, and require explicit confirmation before any destructive actions.

Don’t

Fire a high-urgency alert for a minor issue, or let a destructive action proceed without human confirmation.

### [Let people steer after they delegate](#let-people-steer-after-they-delegate)

People should be able to pause, stop, or redirect at any point. Simple tasks can run straight through, but complex ones need moments to pause and review. The delegation process should fit into the person’s way of working, not the other way around.

Do

Offer mid-task controls without requiring a restart. For agents, provide pause, edit, and resume. For people, provide scope updates and added context.

Don’t

Force people to start over or wait when the delegate goes off track.

Do

Provide clear options to accept the result, request changes, revert to the prior state, or try a different approach after the task is completed.

Don’t

Auto-merge or auto-publish output with no review gate.

Do

For long-running work, support URL-addressable task state so people can bookmark, share, and return to exactly where they left off.

Don’t

Require people to remember where they started a task and manually dig through a list to find the task again.
