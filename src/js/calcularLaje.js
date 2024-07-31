let area = 0;
let largura = 0;
let comprimento = 0;
document.addEventListener("DOMContentLoaded", () => {

  const inAbreviada = document.getElementById("inAbreviada");
  
  const lageForm = document.getElementById("lageForm");

  function replaceDot(value){
    value = value.replace(/,/gi, '.');
    return parseFloat(value);
  }

  
  lageForm.addEventListener("submit", (event) => {
    event.preventDefault();    

    const value = inAbreviada.value.toUpperCase().split("X");
    largura = replaceDot(value[0]);
    comprimento = replaceDot(value[1]);
    area = largura * comprimento;

    const tiposBloco = document.getElementsByName("bloco");
    const blockError = document.getElementById("blockError");
  
    
    let bloco = "";
    tiposBloco.forEach((blocoEscolhido) => {
      if (blocoEscolhido.checked) bloco = blocoEscolhido.value;
    });
    
    if (!bloco) {
      blockError.style.display = "block";
      return;
    }
    
    const nevrura = largura < comprimento ? comprimento * 2.5 : largura * 2.5;
    const unidadeBloco = bloco === "Isopor" ? area * 2 : area * 11.5;
    const malha = area / 6;
    const latasBrita = area * 1.25;
    const cimento = Math.ceil(area / 3);
    
    const nevruraModal = document.getElementById("nevruraModal");
    const unidadeBlocoModal = document.getElementById("unidadeBlocoModal");
    const blocoModal = document.getElementById("blocoModal");
    const malhaModal = document.getElementById("malhaModal");
    const latasBritaModal = document.getElementById("latasBritaModal");
    const cimentoModal = document.getElementById("cimentoModal");
    
    nevruraModal.innerText = nevrura.toFixed(0);
    unidadeBlocoModal.innerText = Math.ceil(unidadeBloco);
    blocoModal.innerText = bloco;
    malhaModal.innerText = Math.ceil(malha);
    latasBritaModal.innerText = Math.ceil(latasBrita);
    cimentoModal.innerText = cimento;
    
    const ehMetrosBritas = latasBrita > 50;
    if (ehMetrosBritas) {
      document.getElementById("qtdBrita").innerText = `  ou ${(latasBrita / 50).toFixed(2)}m³ de britas`;
    }
  });
  lageForm.removeEventListener("submit", (e)=>{})
  
});

document.removeEventListener("DOMContentLoaded", () => {});