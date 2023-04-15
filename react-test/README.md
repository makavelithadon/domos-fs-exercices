# Domos FS React exercise

## On souhaite créer un page pour ajouter des mots dans une liste (la suppression de mots de la liste n'est pas demandée).

L'ajout de mots et la visualisation de la liste doivent se faire dans le même écran.

Chaque mot ne doit contenir que des lettres et/ou des chiffres.
L'ajout d'un mot ou la récupération de la liste se fait en appelant le backend, qu'on peut simuler avec le code typescript suivant:

## Run the projet

```sh
cd path/to/project
```

```sh
npm i
```

```sh
npm run dev
```

Then execute the website by Ctrl + Click on the "Local" url from the CLI output (by default http://localhost:5173/)

Start to play with the UI

## Run the Unit Tests

```sh
npm run test
```

Visit the coverage report by opening the [coverage html](coverage/lcov-report/index.html) in your favorite brower

## Test the final build

```sh
npm run build
```

Run the build stored in [final build folder](dist/index.html) with some server runtime env (like [serve](https://github.com/vercel/serve))

By running for example:

```sh
npx serve dist
```

😃 Enjoy!
