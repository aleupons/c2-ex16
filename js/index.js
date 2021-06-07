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

// Extraure la paraula a l'àmbit global
let paraulaGlobal;
const getParaula = (paraula) => (paraulaGlobal = paraula);

// Recollir la lletra de l'input cada cop que s'escriu
inputParaula.addEventListener("keyup", (e) => {
  if (e.target.value !== "") {
    const lletra = e.target.value.charAt(e.target.value.length - 1);
    compararLletres(paraulaGlobal.charAt(e.target.value.length - 1), lletra)
      ? console.log("bé")
      : console.log("mal");
  }
});

// Comparar lletra input amb lletra paraula
const compararLletres = (lletraParaula, lletraInput) => {
  if (lletraInput.toLowerCase() === lletraParaula.toLowerCase()) {
    return true;
  } else {
    return false;
  }
};

// Main
(async () => {
  const dades = await cridaApi();
  const paraules = dades.lista;
  const paraula = getRandom(paraules);
  getParaula(paraula);
  console.log(paraula);
})();
