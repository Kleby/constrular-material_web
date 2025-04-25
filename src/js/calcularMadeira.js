document.addEventListener('DOMContentLoaded', ()=>{
    const calcForm = document.getElementById('calcForm');
    const quantidadeLinhas = document.getElementById('quantidadeLinha');
    const quantidadeRipas = document.getElementById('quantidadeRipas');
    const quantidadeCaibro = document.getElementById('quantidadeCaibro');

    let larguraComodo = 0;
    let comprimentoComodo = 0;

    function replaceDot(value){
        const value = value.replace(/,/gi, '.');
        return parseFloat(value);
    }

    const pegarLarguraComprimento = () =>{
        const areaComodoArr = document.getElementById('areaComodo').value.toLowerCase().split('x');
        comprimentoComodo = areaComodoArr.reduce((acc, curr) =>{
            acc = parseInt(acc)
            curr = parseInt(curr);
            return acc > curr ? acc : curr;
        },0);
        larguraComodo = areaComodoArr.reduce((acc, curr) =>{
            acc = replaceDot(acc)
            curr = replaceDot(curr);
            return acc < curr ? acc : curr;
        },comprimentoComodo);
        
    }
    calcForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        pegarLarguraComprimento();
        let valorBitola;

        const selectOptions = document.getElementById('selectOptions');
        const distanciaBitola = document.getElementById('distanciaBitola');
        const distanciaLinha = document.getElementById('distanciaLinha');
        distanciaBitola.value = 0.35;
        distanciaLinha.value = 1.5;

        const calcularRipa = (valorBitola) =>{
            quantidadeRipas.innerText = Math.ceil(comprimentoComodo / valorBitola) + 3;
        }

        const calcularLinha = (distanciaLinha) =>{
            quantidadeLinhas.innerText = Math.ceil(comprimentoComodo / distanciaLinha);
        };


        const calcularCaibro = () => {
            quantidadeCaibro.innerText = Math.ceil(larguraComodo / 0.38) * 2;
        };


        selectOptions.addEventListener('change', (e)=>{            
            if(e.target.value.toLowerCase() === 'sim'){
                distanciaBitola.value = 0.175;
                distanciaLinha.value = 1.5;
            }else{
                distanciaBitola.value = 0.35;
                distanciaLinha.value = 2.0;
            }
            calcularRipa(distanciaBitola.value);
            calcularCaibro();
            calcularLinha(distanciaLinha.value);
        })        
        

        calcularRipa(distanciaBitola.value);
        calcularCaibro();
        
        calcularLinha(distanciaLinha.value);

        distanciaBitola.value += 'cm';

        distanciaBitola.addEventListener('click', (e)=>e.target.value = '');
        distanciaBitola.removeEventListener('click', (e)=>e.target.value = '');

        distanciaLinha.addEventListener('click', (e)=>e.target.value = '');
        distanciaLinha.removeEventListener('click', (e)=>e.target.value = '');

        distanciaBitola.addEventListener('input', (e)=>{
            valorBitola = e.target.value;           
            const valorBitolaFormatado = valorBitola;            
            valorBitola = valorBitolaFormatado;
            
            calcularRipa(valorBitola);
        })

        distanciaLinha.addEventListener('keyup', (e)=>{
            
            const valueLinha = e.target.value;
            if(valueLinha === ''){
                quantidadeLinhas.innerText = '0';
                return;
            }
            calcularLinha(valueLinha);
        })

        document.addEventListener("keydown", (e) => {            
            if (e.key === "Escape") {
              distanciaBitola.value = 0.35;
              distanciaLinha.value = 1.5;
            }
          });
        document.removeEventListener("keydown", () => {});

        distanciaBitola.addEventListener('focusout', (e)=>{
            valor = e.target.value;
            e.target.value = valorBitola + 'cm';
        })
        distanciaBitola.removeEventListener('focusout', (e)=>{});

    })

})