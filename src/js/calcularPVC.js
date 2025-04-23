document.addEventListener("DOMContentLoaded", ()=>{
    const areaComodo = document.getElementById("areaComodo");
    const fichasPVC = [
        {tamanho: "8m", area: 1.6, largura: 0.2},
        {tamanho: "7m", area: 1.4, largura: 0.2},
        {tamanho: "6m", area: 1.2, largura: 0.2},
        {tamanho: "5m", area: 1,   largura: 0.2}
    ];

    const arremates = [
        {"tamanho": 6, "label": "6m"},
        {"tamanho": 3, "label": "3m"}
    ];

    function ehInteiro(n){
        return n === parseInt(n);
    }

    // pvcPosition = document.getElementById("pvcPosition");
    // pvcImage = document.getElementById("pvcImage");
    // pvcPosition.addEventListener("change", function(){
    //     switch(this.value){
    //         case "vertical":
    //             pvcImage.classList.remove("horizontal");
    //             pvcImage.classList.add("vertical");
    //             break;
            
    //         default:
    //             pvcImage.classList.remove("vertical");
    //             pvcImage.classList.add("horizontal");
    //             break;
    //     }
    // });
    
    calcForm.addEventListener("submit", function (e) {
        e.preventDefault();
        function replaceDot(value){
            value = value.replace(/,/gi, '.');
            return parseFloat(value);
        }
        const value = areaComodo.value.toUpperCase().split("X");

        largura = replaceDot(value[0]);
        comprimento = replaceDot(value[1]);

        const tamanhoFichaCliente = document.getElementById("tamanhoFichaCliente").value;

        const area = largura * comprimento;
        const perimentro = (largura + comprimento) * 2;
        let fichasIdeais = [];
        if(!tamanhoFichaCliente){
            fichasPVC.forEach(ficha => {
                if(ehInteiro(area/ficha.area)) {
                    fichasIdeais.push({
                        "tamanho": ficha.tamanho,
                        "quantidade": area/ficha.area
                    });
                }
            }); 
        }
        else{
            fichasIdeais.push({
                "tamanho": tamanhoFichaCliente,
                "quantidade": Math.ceil(area/fichasPVC.find(ficha => ficha.tamanho === tamanhoFichaCliente+"m").area)
            });
        }
        if(fichasIdeais.length === 0){
            fichasIdeais.push(
                {
                    "tamanho": 5,
                    "quantidade": Math.ceil(area/5)
                }); 
        }

        const arrematesIdeis = [];
        arremates.forEach(arremate => {            
            arrematesIdeis.push({
                "tamanho": arremate.label,
                "quantidade": Math.ceil(perimentro/arremate.tamanho)
            });
        });
        
        const arrematesRecomendados = document.getElementById("arrematesRecomendados");
        arrematesRecomendados.innerHTML = "";
        arrematesIdeis.forEach(arremate => {
            arrematesRecomendados.innerHTML += `<li>${arremate.tamanho}: ${arremate.quantidade} unidades</li>`;
        });

        const fichasRecomendadas = document.getElementById("fichasRecomendadas");
        fichasRecomendadas.innerHTML = "";
        fichasIdeais.forEach(ficha => {
            fichasRecomendadas.innerHTML += `<li>${ficha.tamanho}: ${ficha.quantidade} unidades</li>`;
        });

        areaComodo.value = "";

    });
});