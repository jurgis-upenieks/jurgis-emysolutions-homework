1) I have generated this project with command `npx create-vuetify@latest jurgis-emysolutions-homework --preset essentials --typescript --pm npm`, where:
- `npx` is npm tool for implicitly downloading and installing the 'create-vuetify' vue+vuetify project generation CLI npm tool before running it, and then runs it.
- `@latest` means that every time we run the create-vuetify, the npx makes sure that we use the latest version - updates it automatically before running.
- `--preset essentials` generates a project, where Vite, Pinia, Vue Router, and Layouts with Composition API are already integrated in the project.
- `--typescript` generates a project with TypeScript.
- `--pm npm` sets npm as the package manager.
So, by providing these parameters, after the project is generated, we don't have to explicitly install and integrate any npm libs in the project. The 'create-vuetify' already installs and integrates all that in the project.

2) After the empty project was generated, I added to the the gitlab repository with the following commands:
- `git init`
- `git add .`
- `git commit -m ‘initial’`
- Then in gitlab portal I create rep.
- Then `git remote add origin <addr>`.
- `git branch -M main`
- `git remote set-url origin <addr>`
- `git push origin main`

3) After the empty project was generated, I created Webstorm Junie Agent guideline rules, which I specifically tuned for this project requirements, technologies used in this project, clean, professional, and human-readable code.

