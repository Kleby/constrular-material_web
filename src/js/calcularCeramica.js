document.addEventListener("DOMContentLoaded", function (){

    calcForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const areaComodo = document.getElementById("areaComodo");

    function replaceDot(value){
        value = value.replace(/,/gi, '.');
        return parseFloat(value);
    }
    const value = areaComodo.value.toUpperCase().split("X");

    largura = replaceDot(value[0]);
    comprimento = replaceDot(value[1]);


    const area = Number(largura) * Number(comprimento);

    const quantidadePorCaixa = document.getElementById("quantidadePorCaixa").value;

    qtdCeramicas = Math.ceil((area+area*0.05)/Number(quantidadePorCaixa));
    
    document.getElementById("qtdCeramicasAUsar").innerText = qtdCeramicas;
    quantidadePorCaixa.value = 0; 
    });
});

document.removeEventListener("DOMContentLoaded", function(e){});