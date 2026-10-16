---
name: presentation-web
description: Create polished, visually engaging static web pages for reports, demos, technical explanations, research presentations, and project showcases. Use when the user wants a presentation-oriented webpage that is easy to understand and visually compelling, not a generic admin dashboard.
---

# Presentation Web Skill

## Mission

Build a presentation-quality web page that helps an audience understand a subject quickly. Optimize for **visual storytelling, explanatory clarity, and live-demo reliability**—not merely decorative styling.

The page should answer:
1. What is the key message?
2. Why should the audience care?
3. How does the system, idea, or process work?
4. What evidence, example, or comparison makes the claim clear?
5. What should the audience remember?

## Before implementation

Infer the likely audience and purpose from the user's brief. If a critical requirement is missing, ask at most one concise question; otherwise make reasonable choices and proceed.

Create a short internal design plan:
- **Narrative:** a clear beginning, middle, and ending.
- **Visual concept:** choose one intentional art direction that fits the topic. Do not default to generic purple gradients, interchangeable SaaS cards, or a dashboard layout.
- **Content model:** decide which ideas are best explained by diagrams, timelines, comparisons, charts, annotated examples, or short text.
- **Presentation mode:** decide whether the page should scroll like an editorial story or advance like slides.
- **Technical approach:** inspect the existing project first. Preserve its framework and conventions. For a new, simple static deliverable, prefer a self-contained `index.html` with CSS and JavaScript unless the user requests a framework.

Do not expose lengthy planning unless asked. Implement the result.

## Visual design rules

### Art direction
- Establish a cohesive visual identity tied to the subject: palette, typography, spacing, imagery, iconography, and motion should work together.
- Use a deliberate palette with clear roles: background, surface, primary text, secondary text, and one or two accents.
- Use typography to create hierarchy: a strong title, readable body copy, and distinct labels or annotations.
- Use whitespace and alignment intentionally. Avoid making every item a rounded card.
- Use visual assets when they add meaning. Prefer meaningful diagrams and topic-relevant imagery over random stock decoration.
- Avoid default-looking AI design: excessive gradients, glassmorphism everywhere, identical cards, meaningless glowing blobs, oversized empty hero sections, and decorative icons with no semantic purpose.
- Keep animations purposeful, brief, and non-blocking. Respect `prefers-reduced-motion`.

### Layout and readability
- Design for a presentation screen first: 16:9 laptop/projector viewport, with responsive behavior for smaller screens.
- Maintain strong contrast and readable type at a distance.
- One screen or section should communicate one main idea.
- Use short headings, concise labels, and focused explanatory text. Do not dump source documents onto the page.
- Keep important content within the viewport when slide mode is used. Avoid clipped labels, overlapping elements, tiny captions, and unnecessary scrolling.
- Use consistent spacing, alignment, and component behavior throughout.

## Explain concepts visually

Choose the representation that best explains the content:
- **Process:** numbered stages, arrows, state transitions, or a timeline.
- **Architecture:** layered diagrams, component boundaries, and labeled data/control flows.
- **Comparison:** aligned columns, trade-off matrix, before/after, or small multiples.
- **Quantitative evidence:** clear charts with labeled axes, units, legends, and a one-sentence takeaway.
- **Abstract concepts:** progressive disclosure, annotated diagrams, concrete examples, and a short “intuition first, formal definition second” explanation.
- **System behavior:** let the audience reveal one step at a time and show the current state.
- **Project results:** show the problem, approach, evidence, limitations, and next step.

Every diagram must have a clear reading order. Label arrows and explain what moves along them. Do not use decorative diagrams that look technical but do not encode real relationships.

For technical explanations, define acronyms and specialized terms on first use when the audience may not know them. Keep terminology accurate. Do not oversimplify away important distinctions.

## Narrative structure

For a multi-section report, prefer a story such as:
1. **Opening:** title, context, and the core message.
2. **Problem:** what is difficult, missing, or inefficient?
3. **Approach:** the central idea or proposed solution.
4. **Mechanism:** how it works, preferably visually.
5. **Evidence/demo:** example, result, comparison, or interactive walkthrough.
6. **Conclusion:** key takeaways, limitations, and next steps.

Adapt this structure to the topic; do not force every page into the same template. Avoid adding sections merely to make the page longer.

## Presentation interactions

When useful, include:
- Keyboard navigation: left/right arrows, Page Up/Down, and Home/End in slide mode.
- A visible progress indicator and current-section/slide count.
- Previous/next controls that work with mouse and keyboard.
- Full-screen toggle where browser support permits.
- Step-by-step reveal for complex diagrams or processes.
- Subtle transitions that do not delay the speaker.
- A presenter-notes area that can be toggled without appearing in the audience-facing view.
- A clear reset/replay action for interactive demonstrations.

Do not add interactions just for novelty. Every control must work. Provide visible focus states and sensible button labels. Avoid relying on hover alone to reveal essential information.

## Content integrity

- Never fabricate statistics, experimental results, citations, user testimonials, product capabilities, or project outcomes.
- If information is missing, use clearly marked placeholders or explain the assumption.
- Distinguish established facts, assumptions, proposals, and illustrative examples.
- Preserve the user's intended message and technical correctness.
- Prefer one specific, concrete example over several vague claims.
- Make the main conclusion explicit rather than expecting the audience to infer it from a chart.

## Implementation requirements

- Produce working code, not just a mockup or design description.
- Prefer semantic HTML, maintainable CSS variables, and small, clear JavaScript functions.
- Use existing project dependencies where appropriate; do not add a large framework for a simple static page.
- If using charts, use an available project library when present. Otherwise create a simple SVG/CSS chart or use a lightweight dependency only when justified.
- If external fonts, images, or CDNs are used, make that dependency clear and provide a graceful fallback when possible.
- Avoid unnecessary network calls. The core page should remain usable if nonessential external assets fail.
- Do not embed secrets, credentials, private data, or hidden tracking.
- Keep content and styling easy to edit after generation.
- Add meaningful page metadata and a useful document title.

## Quality review before delivery

Inspect the result and fix issues before reporting completion. Check:
- Does the first screen communicate the topic and key message immediately?
- Is the visual style distinctive and consistent rather than a generic template?
- Can a viewer understand the diagrams without a spoken explanation?
- Is the narrative ordered logically, with no unexplained jumps?
- Are claims, labels, units, and terminology accurate?
- Do all buttons, keyboard shortcuts, navigation, and toggles work?
- Does it fit a 16:9 presentation screen and adapt to smaller widths?
- Are there overflow, clipping, unreadable text, or console/runtime errors?
- Is the page still understandable with motion reduced or optional assets unavailable?

If browser preview or screenshot tools are available, use them to inspect the actual rendered page and iterate. Do not claim to have visually tested the page if you did not.

## Delivery format

After implementation, briefly report:
- Which files were created or changed.
- How to run/open the page.
- The key interactions and keyboard shortcuts.
- Any assumptions, placeholders, or external dependencies.
