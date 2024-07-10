document.addEventListener("DOMContentLoaded", ()=>{

    document.getElementById("anoAtual").innerText = new Date().getFullYear();

    let isValid = false;

    inAbreviada.addEventListener("input", function (){
        isValue(this)
    })

    lageForm.addEventListener("submit", event =>{
        event.preventDefault();
        
        fieldValid(inAbreviada)

        if(!isValid){
            btnCalc.classList.add("btn-disabled");
        }
        else{
            btnCalc.classList.remove("btn-disabled")
        }
    })

    function fieldValid(element){
        if(!element.value){
            element.nextElementSibling.classList.add("enabled");            
            return isValid = false;
        }
        element.nextElementSibling.classList.remove("enabled");            
        return isValid = true;
    }
    
    function isValue(element){
            isValid = element.value.length > 0;
            const regex = /^.+X.+$/gi;
            isValid = regex.test(element.value);
            if(isValid){
                return btnCalc.classList.remove("btn-disabled");
            }
            btnCalc.classList.add("btn-disabled");
    }   
    document.addEventListener("keydown", e => {
        if(e.key === "Enter" && !isValid){
            e.preventDefault();
        }
    })
})