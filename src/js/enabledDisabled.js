document.addEventListener("DOMContentLoaded", () => {
  let areaComodo = document.getElementById("areaComodo");

  function addClassActivated(idSelecionado) {
    idSelecionado.classList.add("ativated");
    idSelecionado.classList.remove("disabled");
  }

  function AddClassDisabled(idSelecionado) {
    idSelecionado.classList.add("disabled");
    idSelecionado.classList.remove("activated");
  }

  const modalResult = document.getElementById("modalResult");
  const closeModal = document.getElementById("closeModal");
  console.log('aqui modal');
  
  
  closeModal.addEventListener("click", () => {
    AddClassDisabled(modalResult);
    limparDados();
    areaComodo.focus()
  });
  closeModal.removeEventListener("click", () => AddClassDisabled(modalResult));
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      limparDados();
      AddClassDisabled(modalResult);
      areaComodo.focus()
    }
  });
  document.removeEventListener("keydown", () => {});

  const btnCalc = document.getElementById("btnCalc");
  btnCalc.addEventListener("click", () => {
    addClassActivated(modalResult);
    areaComodo.blur()
  });
  btnCalc.removeEventListener("click", () => addClassActivated(modalResult));

  function limparDados() {
    areaComodo.value = "";
  }
});
document.removeEventListener("DOMContentLoaded", () => {});
