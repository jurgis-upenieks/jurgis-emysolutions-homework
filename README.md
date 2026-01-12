1) I generated this project with the command `npx create-vuetify@latest jurgis-emysolutions-homework --preset essentials --typescript --pm npm`, where:
- `npx` is an npm tool that downloads `create-vuetify` (the Vue + Vuetify project generator CLI) if needed, runs it, and then exits.
- It is best to let `create-vuetify` install and integrate dependencies during project generation, because it selects compatible versions. This avoids spending time on version incompatibilities.
- `@latest` ensures that each time we run `create-vuetify`, `npx` uses the latest version (it updates it automatically before running).
- `--preset essentials` generates a project where Vite, Pinia, Vue Router, and layouts with the Composition API are already integrated.
- `--typescript` generates a project with TypeScript.
- `--pm npm` sets npm as the package manager.
With these parameters, once the project is generated, we do not need to manually install or integrate additional npm libraries. `create-vuetify` already sets up everything listed above.

2) After generating the empty project, I added it to the GitHub repository with the following commands:
- `git init`
- `git add .`
- `git commit -m 'initial'`
- Then, in the GitHub portal, I created an empty repository.
- Then `git remote add origin git@github.com:jurgis-upenieks/jurgis-emysolutions-homework.git`.
- `git branch -M main`
- `git remote set-url origin git@github.com:jurgis-upenieks/jurgis-emysolutions-homework.git`
- I added my SSH public key in the GitHub portal.
- `git push origin main`

3) If you want to get the project code and run the front end locally:
- `git clone https://github.com/jurgis-upenieks/jurgis-emysolutions-homework.git`
- `cd jurgis-emysolutions-homework`
- `npm install`
- `npm run dev`
- In a web browser, open http://localhost:3000/

4) After generating the empty project, I created WebStorm Junie Agent guideline rules in `.junie/guidelines.md`, tuned specifically for this project's requirements, the technologies used here, and clean, professional, human-readable code.
- After each agent query, I also run the extra follow-up prompt below. Even though the same rule exists in the guidelines file, the agent may only partially follow it. This costs extra tokens, but it helps ensure that I am comfortable with the code I submit for review:
```
Now drastically reduce the code size of your complete code changes by heavily refactoring, heavily reworking and heavily cleaning up, and take special care so that:
1. Everything needs to be tuned to be easily readable specifically by humans;
2. The structuring of code needs to be tuned specifically for human easy comprehension;
3. When humans will be reading through the entirety of this code, for humans specifically it should not be like going through a maze;
4. Too much fragmentation, choppiness, separation of code parts is not allowed, because too much of it makes it harder for humans specifically to comprehend the full picture of the code. It should be made easy for humans to comprehend the full picture of the code, so code separation should be reserved only for where it's really needed for code reusability;
5. Removing unused code;
```
- For about a year now, I have been using WebStorm's built-in AI Agent to speed up development. I have learned to tune the agent to my preferences with custom guideline rules. I do not blindly trust the agent's suggested changes; I always review them carefully and make sure the final result is easy for humans to read.
- Depending on the size and complexity of the required changes, I switch between different models to minimize costs: I use Gemini 3 Flash for smaller tasks, GPT 5.2 for more complex tasks, and Claude Opus 4.5 for the most complex tasks.

5) Styling
- To keep a globally consistent web design across the project, no custom styles are used anywhere: there are no component style files, no `<style>` sections in components, no styling objects, no custom inline styles (via `style` attributes), and no custom CSS classes.
- All styling is done via the Vuetify theme system, using Vuetify utility classes and Vuetify system styling props.
- All style overrides are done only by overriding the global Vuetify theme in the central theme override configuration file.
- To avoid spacing and sizing breakpoint utility class boilerplate, I globally overrode the spacing and sizing system to be fully responsive. For example, the standard Vuetify utility class `pt-3` now resolves to `clamp(6px, min(1.5vw, 1.5vh), 18px)`. I overrode all standard Vuetify spacings and sizings to resolve to clamps instead of fixed values; see the overrides in `src/plugins/vuetify.ts`. This reduces breakpoint boilerplate in templates and makes responsiveness more dynamic and universal.
- No component- or page-specific styling classes exist in the global theme override configuration. Instead, overrides are kept generic by overriding standard Vuetify classes, so custom classes are unnecessary.

6) Universally reusable components
- Instead of inlining or instantiating the deletion confirmation and task creation/editing dialogs inside the task board page component, I created universal `FormDialog` and `ConfirmationDialog` components. They are instantiated globally in `src/App.vue` and can be opened via store callback functions (as an alternative to the Vue composable approach). This reduces parent-component boilerplate, simplifies dialog usage, and helps keep the project maintainable and consistent over time.
- The task board search and filtering toolbar is implemented as a reusable component: `src/components/TaskSearchFilters.vue`.
- Status columns and their tasks are split into separate components: `src/components/StatusColumn.vue` and `src/components/TaskCard.vue`.

7) Pinia store
- Dialog state uses the `src/stores/dialogs.ts` Pinia store.
- Task state uses the `src/stores/tasks.ts` Pinia store.
- Back-end endpoints are simulated with `localStorage`.

8) Features
- The text search input supports tokens separated by spaces. Tokens are combined with AND logic, matching is case-insensitive and diacritic-insensitive, and token order does not matter.
- Users can reorder the tasks in a status column by dragging and dropping.
- Users can change the status of tasks by simply dragging and dropping a task between the status columns.
- Responsive across different screen sizes.

9) I set up GitHub + Netlify pipelines so that every merge to the `main` branch automatically triggers the build and deployment pipelines to production.