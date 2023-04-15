// 1. Qu'affiche le code suivant ?

window.foo = 1;
var foo = 2;
console.log(window.foo);
// 2 car var foo = 2 revient à faire window.foo = 2;, car le mot clé "var" crée une variable globale
// rattachée au contexte global qui est l'objet Window

// 2. Pour quelle(s) valeur(s) de foo cette fonction affiche-t-elle "OK"?

function test(foo) {
  if (!foo) {
    console.log("OK");
  }
}
// Toutes les valeurs dites "falsy", autrement dit les valeurs qui, une fois castées en boolean, vaudront false
// 0, '', null, undefined, false, NaN

// 3. Qu'affiche le code suivant ? Pourquoi?

var array = [];
for (var i = 1; i < 4; ++i) {
  array.push(function () {
    return i;
  });
}
var sum = 0;
for (var fn of array) {
  sum += fn.call(null);
}
console.log(sum);

// Le code précédent affiche 12 car une fois la boucle exécutée, la variable globale "i" vaut 4, on a donc un array contenant 3 fonctions anonymes qui,
// une fois appelées, renverront la valeur de "i", donc 4, cette valeur étant ajoutée à la variable "sum", initialisée à 0,
// ce qui donne 0 + 4 (4), puis 4 + 4 (8), et enfin 8 + 4 (donc 12)

// 4. Qu'affiche le code suivant ?

const create = (value) => new Promise((r) => r(value));
const createA = () => create("A");
const createB = () => create("B");
// 1
createA()
  .then(() => createB())
  .then(console.log);
// Donne "B" (on rentre dans le premier then, puis celui-ci retourne une Promise qui retourne elle-même "B")

// 2
createA().then(createB()).then(console.log);
// Donne "A" (on entre dans le premier then, mais celui-ci n'est pas pour argument une fonction mais un appel de fonction,
// on retourne donc la valeur de la première Promise, donc "A")

// 3
createA().then(createB).then(console.log);
// Donne "B" (premier then, puis le second retourne "B", car le premier then prend en argument l'expression "createB" qui est une Promise qui retourne "B")

// 4
createA()
  .then(() => {
    createB();
  })
  .then(console.log);
// Donne undefined (on entre dans le premier then, qui prend une fonction qui ne retourne rien - le retour de "createB()", n'ets lui-même pas retourné)

// 5
createA().then("C").then(console.log);
// Donne "A" (on entre dans le premier then mais celui-ci prenant comme argument le String "C", c'est la valeur de la première Promise qui est retournée, donc "A")

// 5. On veut créer une table de multiplication pour 2 entiers entre 1 et 9.
// Ecrivez une fonction qui retourne un object ou tableau contenant les résultats des multiplications.
// On veut pouvoir accéder aux résultats de cette façon: a[5][6] = 5 * 6 = 30

let a = Array.from({ length: 10 }, (_, i) => i).map((n) =>
  Array.from({ length: 10 }, (__, index) => n * index)
);

// ou

a = [...Array(10).keys()].map((n) => [...Array(10).keys()].map((m) => n * m));

/*
[
  [0,0,0,0,0,0,0,0,0,0],
  [0,1,2,3,4,5,6,7,8,9],
  [0,2,4,6,8,10,12,14,16,18],
  [0,3,6,9,12,15,18,21,24,27],
  [0,4,8,12,16,20,24,28,32,36],
  [0,5,10,15,20,25,30,35,40,45],
  [0,6,12,18,24,30,36,42,48,54],
  [0,7,14,21,28,35,42,49,56,63],
  [0,8,16,24,32,40,48,56,64,72],
  [0,9,18,27,36,45,54,63,72,81]]
*/

// a[5][6] retourne bien 30

// 6. Un palindrome est un mot qui reste identique quand on le lit de gauche à droite et de droite à gauche. Par exemple, kayak est un palindrome, mais pas domos.
// Ecrivez une fonction qui vérifie si une chaîne est un palindrome.
// On ignorera les différences entre majuscules et minuscules.
// Par exemple, test('Kayak') doit retourner true et test('domos') doit retourner false.

const test = (str) =>
  str.toLowerCase().split("").reverse().join("") === str.toLowerCase();

// 7. Corrigez le code suivant pour qu'il affiche 4 et 8

function Foo(factor) {
  this.a = factor;
  this.multiply = function (value) {
    return value * this.a;
  };
}
var foo = new Foo(4);
[1, 2].map(foo.multiply).forEach((n) => console.log(n));

// Correction :

[1, 2].map((n) => foo.multiply(n)).forEach((n) => console.log(n));

// ou

[1, 2].map(foo.multiply.bind(foo)).forEach((n) => console.log(n));

// ou encore en déclarant la fonction multiply en tant qu'arrow function,
// qui permet de garantir la valeur de this car celle-ci sera toujours celle de son contexte de déclaration

function Foo(factor) {
  this.a = factor;
  this.multiply = (value) => {
    return value * this.a;
  };
}

// Explication : ici le fait de passer foo.multiply équivaut à déclarer directement la fonction à la ligne 115 en ligne 120, ce qui change le context de "this"
// this est maintenant lié au contexte global du script, c'est-à-dire à l'objet Window, le retour de la fonction multiply (`return value * this.a;`)
// équivaut donc à écrire `return value * window.a;`, comme window.a n'est pas déclaré on a une addition qui prend la forme de 4 + undefined, ce qui donne NaN
// Pour fixer ce problème il faut faire en sorte que this soit bien lié à l'instance de class Foo (ici la variable `foo`)
