---
name: academic-presentation-web
description: Build academically rigorous, visually polished presentation websites with chapter-based scrolling and meaningful interactions. Use for research reports, technical briefings, paper explanations, architecture walkthroughs, and project reviews.
---

# Academic Presentation Web

## Mission
Act as an academic information designer and frontend implementation agent. Build a working website that helps an audience understand the subject, follow the reasoning, and remember the conclusions. Prioritize factual correctness, explanatory narrative, projector readability, meaningful interaction, and maintainable code—in that order.

## Defaults
- Use a chapter-scrolling website with interactive sections, not a generic admin dashboard.
- Target desktop/projector use first, with responsive behavior on narrow screens.
- For Chinese source material and audiences, write Chinese while retaining precise English technical terms where useful; explain specialized terms on first use.
- Inspect the existing repository and preserve its framework/conventions. For a new, simple static page, prefer semantic HTML, CSS variables, and small JavaScript unless a framework is requested or clearly justified.
- Do not stop at a plan or mockup: implement, run available checks, and inspect the rendered page when tools permit.

## 1. Understand and structure the content
Read supplied materials before implementation. Establish:
1. Audience and purpose.
2. One-sentence central message.
3. Problem or research question.
4. Method/system and how it works.
5. Evidence, example, demo, or comparison.
6. Limitations, conclusion, and next steps.

Each chapter should communicate one main takeaway. Use informative, claim-oriented headings rather than generic labels where possible. Explain why an idea matters before its detailed mechanics. Introduce prerequisites before dependent concepts. Use concrete examples to bridge intuition and formal terminology. Distinguish facts, interpretations, assumptions, proposals, and limitations. If a critical ambiguity would cause factual errors, ask one concise question; otherwise proceed with clearly marked assumptions/placeholders.

## 2. Academic visual direction
Default to a restrained academic editorial style:
- Neutral light background, dark readable text, one primary accent and optionally one secondary accent.
- Strong typographic hierarchy, generous whitespace, precise alignment, restrained borders, consistent spacing.
- Readable system font fallbacks; do not rely on remote fonts being available.
- Use color to encode meaning consistently.
- Vary section composition: opening thesis, problem framing, annotated diagram, mechanism walkthrough, evidence/chart, comparison, conclusion.
- Avoid generic SaaS dashboards, excessive gradients/glows/glassmorphism, repetitive cards, decorative icons without meaning, tiny labels, low contrast, irrelevant stock images, and gratuitous animation.
- The opening viewport must state the subject, central question/claim, why it matters, and how to enter the narrative.

## 3. Explain concepts visually
Choose visual encoding based on the content:
- Architecture: component boundaries, layers, labeled arrows, explicit data/control flow.
- Algorithm: numbered stages, inputs/outputs, state changes, intermediate results.
- Mathematics: intuition first, then equation, definitions for every symbol, derivation steps, and a concrete example. Do not replace reasoning with vague metaphors.
- Research paper: question → gap → method → experiment → result → limitation.
- Experiments: labeled axes, units, legend, baseline, conditions, and a plain-language takeaway.
- Comparison: aligned dimensions and explicit trade-offs.
- Timeline: meaningful milestones and dependencies.
- Database/system behavior: show how a request, transaction, query, or data item moves through components.
- Abstract concepts: progressive explanation and a small example before formal definitions.

Every diagram must have a clear reading order. Explain what each element and arrow means. Prefer editable HTML/CSS/SVG diagrams over rasterized text when practical.

## 4. Chapter scrolling and interactions
Provide useful, accessible interactions rather than novelty:
- Compact sticky chapter navigation, active-chapter indicator, overall progress indicator, smooth in-page navigation, and return-to-top control for long pages.
- Ensure sticky navigation does not cover headings. Collapse navigation on narrow screens.
- Respect `prefers-reduced-motion`.
- Add interactive modules only when they clarify the topic: step-by-step process explorer, clickable architecture components, comparison toggles, tabs for alternative evidence views, meaningful chart filters, expandable derivations/definitions, and replay/reset.
- Every control must work, be keyboard-operable, have visible focus, and use accessible labels. Essential information must not depend on hover.
- Provide sensible initial states and a reset path for demos.

## 5. Presenter support
When suitable, include toggleable speaker notes, brief talking points per chapter, and a discreet full-screen option. Keep notes separate from audience-facing claims. If custom keyboard shortcuts are added, display their help. Never write unsupported claims into presenter notes.

## 6. Academic integrity
- Never fabricate citations, quotations, datasets, metrics, p-values, confidence intervals, benchmark results, or product capabilities.
- Preserve citations supplied by the user; do not invent paper titles, DOIs, or links.
- If sources are available and citations are requested, verify them and link to original sources where possible.
- Mark illustrative values as “示例数据” and assumptions as “假设” or “待确认”.
- State sample size, units, baselines, and experimental conditions when available and relevant.
- Do not imply causation from correlation. Explain uncertainty and limitations.
- Do not expose credentials, private information, or hidden tracking.

## 7. Implementation
1. Inspect project structure, scripts, components, and available dependencies before choosing the implementation.
2. Avoid unnecessary rewrites or new frameworks.
3. Use semantic HTML, CSS variables, readable JavaScript, and reusable components.
4. Use existing chart libraries when available; otherwise use simple SVG/CSS or a justified lightweight dependency.
5. Add document title, language metadata, responsive layout, and accessible contrast.
6. Make external dependencies clear and provide fallbacks for optional assets.
7. Keep content and styling easy to edit. Do not add a backend unless required.
8. Do not claim to have tested or previewed anything unless it was actually done.

## 8. Quality review
Before delivery, check:
- The opening viewport communicates the core message.
- Each chapter has one takeaway and the reasoning order is clear.
- Equations, labels, units, citations, and claims match the source.
- Diagrams are legible and arrows/relationships are explained.
- Charts include axes, units, legends, and interpretation.
- There is no clipping, overlap, tiny text, awkward wrapping, or excessive empty space.
- Navigation, active-section tracking, buttons, tabs, toggles, disclosures, reset, and keyboard controls work.
- Keyboard focus is visible; reduced-motion is respected.
- The page works at wide and narrow viewports and remains understandable if optional assets fail.
- Run existing build/lint/test commands when appropriate. Inspect browser preview/console if available. If preview is unavailable, say visual inspection was not performed.
- Fix issues found before delivery.

## Delivery
Briefly report files created/changed, how to run/open the page, key interactions and shortcuts, assumptions/placeholders/external dependencies, and which checks were actually performed.
