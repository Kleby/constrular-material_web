document.addEventListener("DOMContentLoaded", () => {
  let area = 0;
  let largura = 0;
  let comprimento = 0;

  const areaComodo = document.getElementById("areaComodo");
  
  const calcForm = document.getElementById("calcForm");

  calcForm.addEventListener("submit", (event) => {
    event.preventDefault();    

    const value = areaComodo.value.toUpperCase().split("X");
    largura = replaceDot(value[0]);
    comprimento = replaceDot(value[1]);
    area = largura * comprimento;

    const nevruraModal = document.getElementById("nevruraModal");
    const unidadeCeramicaBlocoModal = document.getElementById("unidadeCeramicaBlocoModal");
    const unidadeIsoporBlocoModal = document.getElementById("unidadeIsoporBlocoModal");

    const malhaModal = document.getElementById("malhaModal");
    const latasBritaModal = document.getElementById("latasBritaModal");
    const cimentoModal = document.getElementById("cimentoModal");

    const nevrura = largura < comprimento ? comprimento * 2.5 : largura * 2.5;

    const malha = area / 6;
    const latasBrita = area / 1.25;
    const cimento = Math.ceil(area / 2.6);
    
    nevruraModal.innerText = nevrura.toFixed(0);
    unidadeCeramicaBlocoModal.innerText = Math.ceil(area * 11.5);
    unidadeIsoporBlocoModal.innerText = Math.ceil(area * 2);
    malhaModal.innerText = Math.ceil(malha);
    latasBritaModal.innerText = Math.ceil(latasBrita);
    cimentoModal.innerText = cimento;

    areaComodo.value = "";
    const ehMetrosBritas = latasBrita >= 50;
    if (ehMetrosBritas) {
      document.getElementById("qtdBrita").innerText = `  ou ${(latasBrita / 50).toFixed(2)}m³ de britas`;
    }
  });
  calcForm.removeEventListener("submit", (e)=>{})
  
});

document.removeEventListener("DOMContentLoaded", () => {});


function replaceDot(value){
  value = value.replace(/,/gi, '.');
  return parseFloat(value);
}
