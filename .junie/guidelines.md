---
apply: always
---

# AI coding agent guideline rules

Applies to all new or changed code. Use all the AI agent default implicit rules while prioritizing and not ignoring all the following explicit rules, which are the top priority over implicit rules.

1) Code needs to be tuned for easy reading by humans specifically and also for easy full picture comprehension by humans specifically:
- Code needs to be tuned to be easily readable specifically by humans.
- The structuring of code needs to be tuned specifically for human easy comprehension.
- When humans will be reading through the entirety of this code, for humans specifically, it should not be like going through a maze.
- Too much fragmentation, choppiness, separation of code parts is not allowed, because too much of it makes harder for humans specifically to comprehend the full picture of code. It should be made easy for humans to comprehend the full picture of code, so code separation should be reserved only to where it's really needed for code reusability.
- Removing unused code.

2) Project‑wide consistency
- MUST inspect the entire project before adding or changing code to identify the already established approach/pattern for what needs to be changed and follow the established approach/pattern. And need to prioritize the most recently implemented parts of the project when picking which already established approach/pattern to follow.
- MUST NOT mix different approaches across files or components, use what is already established throughout the project.
- MUST try to stick to the "surgical" philosophy when possible to avoid causing regressions in the surrounding and in the directly and indirectly related existing code throughout the project.

3) Styling
- To have a fully globally consistant webdesign throughout the entire project, no custom styles are allowed to be used anywhere throughout the entire project - there should not be component style files, no <style> sections in components, no styling objects, no custom inline styles with `style` attributes, no custom css classes.
- All styling should be used from the Vuetify theme system by using vuetify utility classes and vuetify system styling props.
- All styling overrides should be done only by overriding the vuetify global theme in the central theme overrides config file.
- To avoid unnecessary spacing and sizing breakpoint utility classes (like `pt-sm-3`) boilerplate, instead use globally overridden spacing and sizing system utility classes for fully responsive approach, because for example the standard vuetify utility class `pt-3` is overriden to now resolve to `clamp(6px, min(1.5vw, 1.5vh), 18px)`. All vuetify standard spacings and sizings are made to resolve to clamps instead of constant unresponsive values, see overrides in src/plugins/vuetify.ts. So using the breakpoint classes is no longer necessary nor allowed, also making the responsiveness much more dynamic and universal.
- Because in this project standard theme spacing and sizes (like px-4) are overridden to be already responsive resolving to for example 'clamp(8px, min(2vw, 2vh), 16px)', SHOULD NOT use breakpoint classes like px-sm-6, but instead only px-6 for example.
- MUST NOT use static/constant spacings and sizes, but only the theme variables.
- MUST NOT use custom styles, but only what is already provided by vuetify theme system.
- MUST instead use template-inlined global theme variables, vuetify styling system props and vuetify utility classes.
- For styling must use vuetify built-in semantic props approach as the first priority, and vuetify utility classes as the second priority.
- MUST NOT use hard-coded values for fonts, sizes, and colors.
- Instead MUST explore which is the closest already existing theme variable when need to specify a font, size or color.
- MUST use gap spacings over explicit child margins/padding.
- Spacing and sizing breakpoints are not allowed. Only clamping approach is allowed through global theme overrides config, for example `clamp(6px, min(1.5vw, 1.5vh), 18px)`, but with the approriate values in that expression.

4) Templates need to use only the most contextually semantically appropriate Vuetify components and in the most appropriate Vuetify structure/hierarchy.
- MUST NOT use low-level tags, such as div, span, button, input, etc.
- MUST use the most appropriate Vuetify components with the most appropriate structure/hierarchy.

5) Minimalism; prefer built‑ins over custom
- MUST avoid boilerplate and custom implementations when a built‑in exists.
- When trying to explore built-in ways, don't add additional external dependencies/libraries, but instead rely on already available dependencies/libraries.
- MUST prefer concise built‑in professional patterns over custom implementation.
- If it cannot be achieved with built‑ins, MUST rework the layout/structure to enable using built-ins but only to the really necessary extent.

6) For state management MUST use Pinia.

7) For code organization MUST use Composition API.

8) MUST use TypeScript instead of plain JavaScript.
- MUST NOT use `any`, but instead an appropriate proper TypeScript type – preferably built-in or a existing struct or interface, or as a last resort, if there really is no existing type - create a new one in a proper way how the types should be organized and located.

9) Cleanup after changes
- After making changes, in new code only, always additionally MUST considerably reduce boilerplate and clean up by leveraging built‑ins and already available infrastrucure/components over custom implementation, while still keeping what is really needed functionally and visually.

10) Prevent regressions
- When making changes MOST make sure that they will not cause any regressions arround the project, that they will not break existing functionality in other pages and in other components.
- Also, after making changes, MUST again double check if they didn not cause any regressions arround the project, that they didnt break existing functionality in other pages and in other components.

11) No code comments
- MUST NOT write any code comments in new changes.
- MUST convey intent via clear, self‑descriptive names and small functions/components following "code is the best documentation" philosophy.

12) Avoid bad unsafe approaches
- MUST NOT use dangerouslySetInnerHTML, but resort to safer and more professional alternatives.

13) Semantic input-to-action patterns
- Prefer semantic input-to-action: use form submission, not ad‑hoc key handling, so Enter triggers the primary action while preserving accessibility and focus.

14) Preserve layout on semantic refactors
- When replacing a layout container with a more semantic Vuetify component, keep the previous width/height, padding, alignment and grow/shrink behavior in all known usages unless the task explicitly calls for a visual change.

15) No automated tests
- MUST NOT write new automated tests (unit-tests, process-tests, integration-tests, e2e tests, and other types of automated tests)
- MUST NOT run any automated test during or after making changes.
- Should only run or change automated tests if explicitly asked to do so.

16) No linter warnings, errors, deprecated code, and such allowed.
- MUST only at the very end after making all changes, check if in the changes there are linting errors, warnings, deprecated code, and such, and if there are any, fix them.
- When checking for linting warnings, errors, and deprecations, rely on webstorms integrated built-ins, instead of running formatting and linting commands in the terminal.
- When fixing the identified linting warnings, errors, and deprecations, don't use formating terminal tools, but fix with your artificial intelligence and simplest ones with webstroms integrated built-ins.

17) When asked to fix a bug
- When asked to fix a bug, MUST do your best, investigate very carefully, thoughtfully and very wide and very deep, and make sure to not cause any functional or visual regressions in the touched parts and anywhere throughout the rest of the site where the touched parts are directly or indirectly used.