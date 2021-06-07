// Connexió a la API
const urlApi = "http://localhost:3001/palabras";
const cridaApi = async () => {
  const response = await fetch(urlApi);
  const dades = await response.json();
  return dades;
};

// Element random
const getRandom = (array) => {
  // Valor (índex array) entre 0 i array.length-1
  const random = array[Math.floor(Math.random() * array.length)];
  return random;
};

// Elements del DOM
const inputParaula = document.querySelector("#paraula");
inputParaula.value = "";
const hangman = document.querySelector("#hangman");
const final = document.querySelector(".final");
const lletres = document.querySelector(".lletres");
const errors = document.querySelector(".errors");

// Variables a l'àmbit global
let paraulaGlobal;
const setParaula = (paraula) => (paraulaGlobal = paraula);
let comptadorIntents = 1;
const setComptador = (comptador) => (comptadorIntents = comptador);

// Recollir la lletra de l'input cada cop que s'escriu
inputParaula.addEventListener("keyup", (e) => {
  if (e.target.value !== "") {
    const lletra = e.target.value.charAt(e.target.value.length - 1);
    if (comptadorIntents < 12) {
      const indexs = compararLletres(paraulaGlobal, lletra);
      if (indexs.length !== 0) {
        const incognites = lletres.textContent.split(" ");
        for (const index of indexs) {
          incognites[index] = lletra;
        }
        lletres.textContent = incognites.join(" ");
      } else {
        dibuixarError(comptadorIntents, lletra);
      }
    } else {
      final.textContent = "Has perdut.";
      inputParaula.disabled = true;
      reiniciar();
    }
  } else if (
    lletres.textContent.split(" ").join("").toLowerCase() ===
    paraulaGlobal.toLowerCase()
  ) {
    final.textContent = "Molt bé, has encertat la paraula.";
    inputParaula.disabled = true;
    reiniciar();
  }
});

// Comparar lletra input amb lletra paraula
const compararLletres = (paraula, lletra) => {
  const lletresParaula = paraula.split("");
  const indexs = [];
  for (const i in lletresParaula) {
    if (lletresParaula[i].toLowerCase() === lletra.toLowerCase()) {
      indexs.push(i);
    }
  }
  if (indexs !== []) {
    return indexs;
  } else {
    return [];
  }
};

// Dibuixar si l'usuari s'equivoca amb una lletra
const dibuixarError = (intent, lletra) => {
  hangman.querySelector(`.stage${intent}`).classList.add("on");
  setComptador(intent + 1);
  errors.textContent += ` ${lletra}`;
};

// Fer aparèixer botó per reiniciar
const reiniciar = () => {
  const botoTornarhi = document.createElement("button");
  botoTornarhi.textContent = "Torna-ho a intentar";
  document.body.append(botoTornarhi);
  botoTornarhi.addEventListener("click", () => location.reload());
};

// Main
(async () => {
  const dades = await cridaApi();
  const paraules = dades.lista;
  const paraula = getRandom(paraules);
  setParaula(paraula);
  const incognita = "_ ";
  let incognites = "";
  for (const i in paraula.split("")) {
    incognites += incognita;
  }
  incognites = incognites.slice(0, -1);
  lletres.textContent = incognites;
})();
