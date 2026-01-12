1) I have generated this project with the command `npx create-vuetify@latest jurgis-emysolutions-homework --preset essentials --typescript --pm npm`, where:
- `npx` is an npm tool for implicitly downloading and installing the 'create-vuetify' Vue+Vuetify project generation CLI npm tool before running it, and then runs it.
- It is wiser to have `create-vuetify` install and integrate the dependencies on project generation because it picks the compatible versions. This way we don't have to waste time trying to solve dependency version incompatibilities.
- `@latest` means that every time we run create-vuetify, npx makes sure that we use the latest version - it updates it automatically before running.
- `--preset essentials` generates a project where Vite, Pinia, Vue Router, and Layouts with Composition API are already integrated.
- `--typescript` generates a project with TypeScript.
- `--pm npm` sets npm as the package manager.
So, by providing these parameters, after the project is generated, we don't have to explicitly install and integrate any npm libraries in the project. The 'create-vuetify' tool already installs and integrates all of that in the project.

2) After the empty project was generated, I added it to the GitHub repository with the following commands:
- `git init`
- `git add .`
- `git commit -m 'initial'`
- Then in the GitHub portal I created an empty repository.
- Then `git remote add origin git@github.com:jurgis-upenieks/jurgis-emysolutions-homework.git`.
- `git branch -M main`
- `git remote set-url origin git@github.com:jurgis-upenieks/jurgis-emysolutions-homework.git`
- Added my SSH public key in the GitHub portal.
- `git push origin main`

3) If you wish to get the project code and run the front-end locally:
- `git clone https://github.com/jurgis-upenieks/jurgis-emysolutions-homework.git`
- `cd jurgis-emysolutions-homework`
- `npm install`
- `npm run dev`
- In the web browser open URL http://localhost:3000/

4) After the empty project was generated, I created WebStorm Junie Agent guideline rules in .junie/guidelines.md, which I specifically tuned for this project's requirements, technologies used in this project, and clean, professional, human-readable code.
- After each agent query I also always perform the following extra follow-up query, because even though I have the same rule in the guideline rules file, the agent only pays partial attention to the rules file. So to further enforce the human-readable code aspect, I always perform the following follow-up query after each query. This costs me extra agent tokens, but at least at the end of the day I am not ashamed of the code I submit to code review:
```
Now drastically reduce the code size of your complete code changes by heavily refactoring, heavily reworking and heavily cleaning up, and take special care so that:
1. Everything needs to be tuned to be easily readable specifically by humans;
2. The structuring of code needs to be tuned specifically for human easy comprehension;
3. When humans will be reading through the entirety of this code, for humans specifically it should not be like going through a maze;
4. Too much fragmentation, choppiness, separation of code parts is not allowed, because too much of it makes it harder for humans specifically to comprehend the full picture of the code. It should be made easy for humans to comprehend the full picture of the code, so code separation should be reserved only for where it's really needed for code reusability;
5. Removing unused code;
```
- For a year now I have been using WebStorm's built-in AI Agent to speed up development. I have learned to tame the AI Agent to my liking with my custom guideline rules. I don't blindly trust the agent's suggested code changes; I am always carefully code reviewing and making sure that at the end the code changes are easily readable by humans. Based on the needed changes' size and complexity, I frequently switch the WebStorm Agent between different models. If the needed changes are small and not very complex, I use the inexpensive Gemini 3 Flash model in the WebStorm Agent. If the changes are more complex, I use the more expensive GPT 5.2, and if the changes are even more complex, I resort to the most expensive Claude Opus 4.5. Basically, this is to minimize expenses.

5) Styling
- To have a fully globally consistent web design throughout the entire project, no custom styles are used anywhere throughout the entire project - there are no component style files, no <style> sections in components, no styling objects, no custom inline styles with `style` attributes, and no custom CSS classes.
- All styling is done using the Vuetify theme system by using Vuetify utility classes and Vuetify system styling props.
- All styling overrides are done only by overriding the Vuetify global theme in the central theme overrides config file.
- To avoid unnecessary spacing and sizing breakpoint utility class boilerplate, I have instead globally overridden the spacing and sizing system to use a fully responsive approach, so that for example the standard Vuetify utility class `pt-3` now resolves to `clamp(6px, min(1.5vw, 1.5vh), 18px)`. I have overridden all Vuetify standard spacings and sizings to resolve to clamps instead of constant unresponsive values; see my overrides in src/plugins/vuetify.ts. This significantly reduces the unnecessary breakpoint class boilerplate in templates and makes the responsiveness much more dynamic and universal.
- No component or page-specific styling custom classes are located in the global theme overrides config. Instead, all overrides are made generic by overriding standard Vuetify classes, so that we don't even have to use custom classes.

6) Universally reusable components
- Instead of inlining or instantiating the deletion confirmation and task creation/editing dialogs in the task board page component, I have made universal FormDialog and ConfirmationDialog components, instantiated globally in src/App.vue, and made them callable through store callback functions (an alternative to the Vue composable approach). This way the instantiation boilerplate in parents is avoided and dialog calling is simplified. This also makes the project more maintainable and consistent in the long term.
- The task board search and filtering toolbar is made into a reusable component: src/components/TaskSearchFilters.vue.
- The status columns and their tasks are separated out into separate components: src/components/StatusColumn.vue and src/components/TaskCard.vue.

7) Pinia store
- The dialogs data uses the src/stores/dialogs.ts Pinia store.
- The tasks data uses the src/stores/tasks.ts Pinia store.
- We are simulating the back-end endpoints with localStorage.

8) Features
- The text search input supports tokens separated by spaces, AND logic is used between tokens, tokens are case insensitive, international character insensitive, and the order of tokens is insensitive.
- Users can reorder the tasks in a status column by dragging and dropping.
- Users can change the status of tasks by simply dragging and dropping a task between the status columns.
- Responsive for different screen sizes.

9) I have set up the GitHub + Netlify pipelines so that every time a merge to the main branch happens, it automatically triggers build and deploy pipelines to production.