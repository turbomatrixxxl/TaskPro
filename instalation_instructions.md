Pasii care recomand la aplicatia react de la zero:
-creare repozitoriu nou pe github
-deschidere github desktop si cloneaza repozitoriu
-deschide cu vs code din github desktop
-deschide terminal nou : npx create-react-app . (punct inseamna ca vei instala aplicatia in acel folder curent, tu deja ai numele aplicatiei pentru ca ai inceput cu repozitoriu nou in github)
-terminal: npm start
-acum poti sa dai publish branch din github desktop (important 1*)
-acum faci acele 2 setari in setttings action, general, sa fie bifat la ultima Read and write permissions si apoi bifare la casuta Allow GitHub Actions to create and approve pull requests, SAVE
-apoi in vs code terminal: npm install --save gh-pages
-package.json partea de scripts:
"scripts": {
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
} (important 1*)
-tot in package.json primele chei si valori:
"name": "<nume-repozitoriu>",
"version": "0.1.0",
"private": true,
"homepage": "https://<username github>.github.io/<nume-repozitoriu>",
-terminal: npm run deploy
-creare folder nou in aplicatie: .github/workflows
-.github/workflows creare fisier nou: deploy.yml
-continut deploy.yml:
name: Deploy to GitHub Pages
on:
push:
branches: - main
jobs:
build-and-deploy:
runs-on: ubuntu-latest
steps: - name: Checkout repository
uses: actions/checkout@v2 - name: Set up Node.js
uses: actions/setup-node@v2
with:
node-version: "14" - name: Install dependencies
run: npm install - name: Build the app
run: npm run build - name: Deploy to GitHub Pages
uses: peaceiris/actions-gh-pages@v3
with:
github_token: ${{ secrets.GITHUB_TOKEN }}
publish_dir: ./build
-push din github desktop
-incearca sa faci schimbari in aplicatie si apoi push din github desktop
-asteapta cateva minute sa se actualizeze pagina live din github pages
-daca pagina nu se actualizeaza la click pe acel link din github pages, click refresh cand esti pe acel link de github pages
