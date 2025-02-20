document.addEventListener("DOMContentLoaded", ()=>{
    const areaComodo = document.getElementById("areaComodo");
const fichasPVC = [
    {tamanho: "8m", area: 1.6, largura: 0.2},
    {tamanho: "7m", area: 1.4, largura: 0.2},
    {tamanho: "6m", area: 1.2, largura: 0.2},
    {tamanho: "5m", area: 1,   largura: 0.2}
];

    function ehInteiro(n){
        return n === parseInt(n);
    }

    pvcPosition = document.getElementById("pvcPosition");
    pvcImage = document.getElementById("pvcImage");
    pvcPosition.addEventListener("change", function(){
        switch(this.value){
            case "vertical":
                pvcImage.classList.remove("horizontal");
                pvcImage.classList.add("vertical");
                break;
            
            default:
                pvcImage.classList.remove("vertical");
                pvcImage.classList.add("horizontal");
                break;
        }
    });
    
    calcForm.addEventListener("submit", function (e) {
        e.preventDefault();
        function replaceDot(value){
            value = value.replace(/,/gi, '.');
            return parseFloat(value);
          }
        const value = areaComodo.value.toUpperCase().split("X");
        largura = replaceDot(value[0]);
        comprimento = replaceDot(value[1]);
        const area = largura * comprimento;
        const perimentro = (largura + comprimento) * 2;
        let fichasIdeais = [];
        fichasPVC.forEach(ficha => {
            if(ehInteiro(area/ficha.area)) { 
                fichasIdeais.push({
                    "tamanho": ficha.tamanho,
                    "quantidade": area/ficha.area
                });
            }
        }); 
        const fichasRecomendadas = document.getElementById("fichasRecomendadas");
        fichasRecomendadas.innerHTML = "";
        fichasIdeais.forEach(ficha => {
            fichasRecomendadas.innerHTML += `<li>${ficha.tamanho}: ${ficha.quantidade} unidades</li>`;
        });
    });
});