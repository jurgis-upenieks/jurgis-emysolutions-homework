1) I have generated this project with command `npx create-vuetify@latest jurgis-emysolutions-homework --preset essentials --typescript --pm npm`, where:
- `npx` is npm tool for implicitly downloading and installing the 'create-vuetify' vue+vuetify project generation CLI npm tool before running it, and then runs it.
- It is wiser to have the `create-vuetify` too install and integrate the dependencies on project generation also because it pickes the compatible versions. This way we dont have to waste time trying to solve dependency version incompatibilities.
- `@latest` means that every time we run the create-vuetify, the npx makes sure that we use the latest version - updates it automatically before running.
- `--preset essentials` generates a project, where Vite, Pinia, Vue Router, and Layouts with Composition API are already integrated in the project.
- `--typescript` generates a project with TypeScript.
- `--pm npm` sets npm as the package manager.
So, by providing these parameters, after the project is generated, we don't have to explicitly install and integrate any npm libs in the project. The 'create-vuetify' already installs and integrates all that in the project.

2) After the empty project was generated, I added to the the gitlab repository with the following commands:
- `git init`
- `git add .`
- `git commit -m 'initial'`
- Then in github portal I created an empty repository.
- Then `git remote add origin git@github.com:jurgis-upenieks/jurgis-emysolutions-homework.git`.
- `git branch -M main`
- `git remote set-url origin git@github.com:jurgis-upenieks/jurgis-emysolutions-homework.git`
- Added my ssh public key in github portal.
- `git push origin main`

3) If you wish to get the project code and run the front-end locally:
- `git clone https://github.com/jurgis-upenieks/jurgis-emysolutions-homework.git`
- `cd jurgis-emysolutions-homework`
- `npm install`
- `npm run dev`
- In the web browser open url http://localhost:3000/

4) After the empty project was generated, I created Webstorm Junie Agent guideline rules .junie/guidelines.md, which I specifically tuned for this project requirements, technologies used in this project, clean, professional, and human-readable code.
- After each agent query I am also always performing the following extra followup query, because, even though I have the same rule also in the guideline rule file, the agent only pays partial attention to the rules file. So to extra enforce the humane-readable code aspect, I am always performing the following followup query after each query. This costs me extra agent tokens, but at least at the end of the day I am not ashamed of the code I submit to the code review:
```
Now drastically reduce the code size of your complete code changes by heavily refactoring, heavily reworking and heavily cleaning up, and take special care so that:
1. Everything needs to be tuned to be easily readable specifically by humans;
2. The structuring of code needs to be tuned specifically for human easy comprehension;
3. When humans will be reading through the entirety of this code, for humans specifically it should not be like going through a maze;
4. Too much fragmentation, choppiness, separation of code parts is not allowed, because too much of it makes harder for humans specifically to comprehend the full picture of code. It should be made easy for humans to comprehend the full picture of code, so code separation should be reserved only to where its really needed for code reusability;
```
- For a year now I have been using Webstorms built-in AI Agent to speed up the development. I have learned to tame the AI Agent to my liking with my custom guideline rules. I don’t blindly trust the agents suggested code changes, I am always carefully code reviewing and making sure that at the end the code changes are easily readable by humans. Based on the needed changes size and complexity I am frequently switching the Webstorms Agent between different models. If the needed changes are small and not very complext, I am using the inexpensive Gemini 3 Flash model in Webstorms Agent. If the changes are more complex, I am using more expensive GPT 5.2, and if the changes are even more complex I am resorting to the most expensive Claude Opus 4.5. Basically, this is to minimize the expenses.

