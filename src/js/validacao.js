document.addEventListener("DOMContentLoaded", ()=>{
    const areaComodo = document.getElementById('areaComodo');
    
    document.getElementById("anoAtual").innerText = new Date().getFullYear();
    
    let isValid = false;
    
    areaComodo.addEventListener("input", function (){
        isValue(this);        
    })
    btnCalc.classList.add("btn-disabled");

    calcForm.addEventListener("submit", event =>{
        event.preventDefault();
        
        fieldValid(areaComodo)

        if(!isValid){
            btnCalc.classList.add("btn-disabled");
        }
        else{
            btnCalc.classList.remove("btn-disabled")
        }
        isValid = false;
        
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
            areaComodo.value = ""
        }
    })
})