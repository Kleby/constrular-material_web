document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("anoAtual").innerText = new Date().getFullYear();

  const listNevruras = [];
  for (let i = 6.4; i > 0.9; i -= 0.2) {
    if (i === 6.2) continue;
    listNevruras.push(i.toFixed(2));
  }

  calcForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    document.getElementById("drawElements").innerHTML = "";

    const areaModal = parseFloat(nevruraModal.innerText);
    const objTamanhos = {};
    let restante = 0;
    
    const ladoMenor = largura > comprimento ? comprimento : largura;
    let ladoMenorAux = ladoMenor;

    for (const tam in listNevruras) {
      let tamNumero = parseFloat(listNevruras[tam]);
      let count = 0;

      while (ladoMenorAux >= tamNumero && restante <= areaModal) {
        restante += tamNumero;
        count++;
        if((ladoMenorAux > tamNumero) && (ladoMenorAux < parseFloat(listNevruras[tam - 1]))){
          tamNumero = parseFloat(listNevruras[tam - 1])
        }
        ladoMenorAux -= tamNumero;
        ladoMenorAux = ladoMenorAux.toFixed(2);
        document.getElementById("drawElements").innerHTML += `<span class="line" style="height:${128*tamNumero/ladoMenor}px;"><span class="description-size">${tamNumero}m</span></span>`
    }
      objTamanhos[tamNumero] = count;
    }

    const modalDescription = document.getElementById("modalDescription");
    modalDescription.innerHTML = "";
    
    let qtdParaUsar = 0;
    
    for (const tam in objTamanhos) {
      if (objTamanhos[tam]){
        qtdParaUsar += objTamanhos[tam]
      }
    }

    for (const tam in objTamanhos) {
      if (objTamanhos[tam]){
        modalDescription.innerHTML += `<span class="modal__value">${objTamanhos[tam] * Math.floor(areaModal/qtdParaUsar)} <i class="separete"></i>${tam}m</span>`;
      }
    }
    document.getElementById("drawHeight").innerText = comprimento !== ladoMenor? comprimento+"m" : largura+"m" ;
    document.getElementById("drawWidth").innerText = largura === ladoMenor? largura+"m" : comprimento+"m";
  });

  calcForm.removeEventListener("submit", ()=>{})
});

document.removeEventListener("DOMContentLoaded", () => {});
