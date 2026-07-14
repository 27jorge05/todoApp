const dialog = document.querySelector("#miDialog");
const abrirDialog = document.querySelector("#abrirDialog");
const cerrarDialog = document.querySelector("#cerrarDialog");
const botonFondo = document.querySelector("#botonFondo");

abrirDialog.addEventListener("click", () => {
  dialog.showModal();
});

cerrarDialog.addEventListener("click", () => {
  dialog.close();
});

botonFondo.addEventListener("click", () => {
  alert("Todavía puedes usar la página");
});