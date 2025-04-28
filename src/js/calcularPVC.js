document.addEventListener("DOMContentLoaded", () => {
    const areaComodo = document.getElementById("areaComodo");

    const fichasPVC = [
        {tamanho: "8m", area: 1.6, comprimento: 8},
        {tamanho: "7m", area: 1.4, comprimento: 7},
        {tamanho: "6m", area: 1.2, comprimento: 6},
        {tamanho: "5m", area: 1, comprimento: 5}
    ];

    const withImage = {
        "90": "120px",
        "0": "92%"
    };

    const arremates = [
        {"tamanho": 6, "label": "6m"},
        {"tamanho": 3, "label": "3m"}
    ];

    
    const pvcImage = document.getElementById("pvcImage");
    const pvcPosition = document.getElementById("pvcPosition");
    let largura, comprimento;
    let ladoLateral = 0;

    const rotationImage = (e) => {
        const imgPosition = e.target.value;
        pvcImage.style.width = withImage[imgPosition];
        pvcImage.style.transform = `rotate(${imgPosition}deg)`;

        const ladoSelecionado = e.target.value;
        const ladoForro = {
            "90": comprimento,  
            "0": largura        
        };
            
        calcularPVC();
    }

    const calcularPVC = () => {
        let area_comodo = comprimento * largura;
        let menor_desperdicio = Infinity;
        let ficha_ideal = null;
        let listaFichas = [];

        fichasPVC.forEach(ficha => {
            let quantidade_fichas = Math.ceil(area_comodo / ficha.area);
            let area_total_coberta = quantidade_fichas * ficha.area;
            let desperdicio = area_total_coberta - area_comodo;
            const desperdicioPorFicha = quantidade_fichas * desperdicio ;
            
            const quantidade_emenda = desperdicioPorFicha > comprimento ? quantidade_fichas - Math.floor(desperdicioPorFicha / comprimento) : quantidade_fichas;
            
            listaFichas.push({
                ficha: ficha.tamanho,
                quantidadeInteiras: quantidade_fichas,
                quantidadeEmendas: quantidade_emenda,
                desperdicio: desperdicio.toFixed(2)
            });

            if (desperdicio < menor_desperdicio) {
                menor_desperdicio = desperdicio;
                ficha_ideal = ficha;
            }
            
        });
        
        alterarVisualizacao(ficha_ideal, listaFichas);
        return { ficha_ideal, listaFichas };
    }

    const replaceDot = (value) => {
        value = value.replace(/,/gi, '.');
        return parseFloat(value);
    }

    pvcPosition.addEventListener("change", rotationImage);

    calcForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = areaComodo.value.toUpperCase().split("X");

        if (value[0] > value[1]) {
            comprimento = replaceDot(value[0]);
            largura = replaceDot(value[1]);
        } else {
            comprimento = replaceDot(value[1]);
            largura = replaceDot(value[0]);
            // ladoLateral = comprimento;
        }        

        // Agora chamamos calcularPVC e recebemos o retorno com menor_desperdicio
        const { ficha_ideal, listaFichas } = calcularPVC();
        alterarVisualizacao(ficha_ideal, listaFichas);

    });
    const alterarVisualizacao = (ficha_ideal, listaFichas) => {
        
        const spanLargura = document.getElementById("spanLargura");
        spanLargura.innerText = `${largura}m`;
        const spanComprimento = document.getElementById("spanComprimento");
        spanComprimento.innerText = `${comprimento}m`;

        // Exibindo a lista de fichas e suas quantidades
        const listaFichasElement = document.getElementById("listaFichas");
        listaFichasElement.innerHTML = "";
        listaFichas.forEach(ficha => {
            listaFichasElement.innerHTML += `
                <tr class="list-group">
                    <td class="list-item" >${ficha.ficha}</td>
                    <td class="list-item" >${ficha.quantidadeInteiras}</td>
                    <td class="list-item" >${ficha.quantidadeEmendas}</td>
                    <td class="list-item" >${(ficha.desperdicio)}m²</td>
                </tr>`;
                if(ficha.ficha == ficha_ideal.tamanho) {
                    listaFichasElement.lastChild.classList.add("ficha-ideal");
                }
        });

        // Exibindo a ficha recomendada
        const fichaRecomendadaElement = document.getElementById("fichaRecomendada");
        fichaRecomendadaElement.innerHTML = `
            <h3>${ficha_ideal.tamanho}</h3>
        `;

        // Cálculo dos arremates
        const arrematesIdeis = [];
        const perimentro = 2 * (parseFloat(largura) + parseFloat(comprimento));
        arremates.forEach(arremate => {
            let quantidade = Math.ceil(perimentro / arremate.tamanho);
            arrematesIdeis.push({
                "tamanho": arremate.label,
                "quantidade": quantidade
            });
        });

        // Exibindo arremates recomendados
        const arrematesRecomendados = document.getElementById("arrematesRecomendados");
        arrematesRecomendados.innerHTML = "";
        arrematesIdeis.forEach(arremate => {
            arrematesRecomendados.innerHTML += `
                <li>${arremate.tamanho}: ${arremate.quantidade} unidades
                </li>
                <span class="line-h" style="margin-top: 0;"></span>
                `;
                
        });
    }
});
