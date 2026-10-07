/**
 * @author: João Kleby 
 * @description: Funções para cálculo de telhas
 * 
 * Como é realizado o calculo de telhas:
 * Russa 1ª : Área * 29 * fator de inclinação = 1,04 + 5% para margem  
 * Telha 2ª : Área * 33
 * Brasilit: Área / 1.22
 * 
 */




document.addEventListener("DOMContentLoaded", () => {
    const qtdTelhas = document.getElementById("qtdTelhas");
    const qtdTelhasRecomendadas = document.getElementById("qtdTelhasRecomendadas");

    function calcularTelha(valor, multiplicador) {
        qtdTelhas.innerHTML += Math.ceil(valor * multiplicador) + " Telhas"; ;
        qtdTelhasRecomendadas.innerHTML += Math.ceil(valor * multiplicador * 1.04) + " Telhas";
    };
    
    const telhaEscolhida = {
        telhaRussaPrimeira: (valor ) => calcularTelha(valor, 29),
        telhaSegunda: (valor) => calcularTelha(valor, 33),
        telhaBrasilit: (valor) => calcularTelha(valor, 1.22)
    }
    const form = document.getElementById("calcForm");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const valorSelecionado = document.querySelector('input[name="telha-selecionada"]:checked').value;
        const area = document.getElementById("areaComodo").value.trim().replace(/,/g, '.');
        const areaSeparada = area.split(/[^\d.]+/g).filter(Boolean).map(Number);
        const result = telhaEscolhida[valorSelecionado](areaSeparada[0] * areaSeparada[1]);
        console.log(Math.ceil(result));
    });

    form.removeEventListener("submit", function (e) {
        console.log(e);
    });

});