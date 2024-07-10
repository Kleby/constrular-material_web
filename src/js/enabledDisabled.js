document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("blockChange")
    .addEventListener("change", () => (blockError.style.display = "none"));
  document
    .querySelector(".block__container")
    .removeEventListener("change", () => {});

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
  
  closeModal.addEventListener("click", () => {
    AddClassDisabled(modalResult);
    limparDados();
    inAbreviada.focus()
  });
  closeModal.removeEventListener("click", () => AddClassDisabled(modalResult));
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      limparDados();
      AddClassDisabled(modalResult);
      inAbreviada.focus()
    }
  });
  document.removeEventListener("keydown", () => {});

  const btnCalc = document.getElementById("btnCalc");
  btnCalc.addEventListener("click", () => {
    addClassActivated(modalResult);
    inAbreviada.blur()
  });
  btnCalc.removeEventListener("click", () => addClassActivated(modalResult));

  function limparDados() {
    inAbreviada.value = "";
  }
});
document.removeEventListener("DOMContentLoaded", () => {});
