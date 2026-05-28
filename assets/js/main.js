/* ========================= */
/* MODAL EDITAR */
/* precisa ficar no topo para o onclick enxergar */
/* ========================= */

window.abrirModalEditar = function(
    id,
    titulo,
    descricao,
    categoria,
    apresentador,
    local,
    data,
    destaque
){

    const modalEditarOverlay = document.getElementById("modalEditarOverlay")

    document.getElementById("editarId").value = id
    document.getElementById("editarTitulo").value = titulo
    document.getElementById("editarDescricao").value = descricao
    document.getElementById("editarCategoria").value = categoria
    document.getElementById("editarApresentador").value = apresentador
    document.getElementById("editarLocal").value = local
    document.getElementById("editarData").value = datagit status
    document.getElementById("editarDestaque").value = destaque

    modalEditarOverlay.classList.add("active")


    
}


/* ========================= */
/* FILTRO DE CATEGORIA */
/* ========================= */

const categoriaFiltro = document.getElementById("categoriaFiltro")

if(categoriaFiltro){

    categoriaFiltro.addEventListener("change", () => {

        const valor = categoriaFiltro.value.toLowerCase().trim()

        const cards = document.querySelectorAll(".card-evento")

        cards.forEach(card => {

            const categoria = card
                .querySelector(".categoria")
                .textContent
                .toLowerCase()
                .trim()

            if(valor === "todos" || categoria === valor){

                card.style.display = "flex"

            } else {

                card.style.display = "none"

            }

        })

    })

}

/* ========================= */
/* MODAL DETALHES */
/* ========================= */

const modalOverlay = document.getElementById("modalOverlay")

const modalTitulo = document.getElementById("modalTitulo")
const modalCategoria = document.getElementById("modalCategoria")
const modalData = document.getElementById("modalData")
const modalLocal = document.getElementById("modalLocal")
const modalProfessor = document.getElementById("modalProfessor")
const modalDescricao = document.getElementById("modalDescricao")

window.abrirModal = function(
    titulo,
    categoria,
    data,
    local,
    professor,
    descricao
){

    modalTitulo.textContent = titulo
    modalCategoria.textContent = categoria
    modalData.textContent = `📅 ${data}`
    modalLocal.textContent = `📍 ${local}`
    modalProfessor.textContent = `👨‍🏫 ${professor}`
    modalDescricao.textContent = descricao

    modalOverlay.classList.add("active")
}

/* FECHAR MODAL DETALHES */

const closeModal = document.getElementById("closeModal")

if(closeModal){

    closeModal.addEventListener("click", () => {

        modalOverlay.classList.remove("active")

    })

}

if(modalOverlay){

    modalOverlay.addEventListener("click", (event) => {

        if(event.target === modalOverlay){

            modalOverlay.classList.remove("active")

        }

    })

}

/* ========================= */
/* MODAL FORMULÁRIO */
/* ========================= */

const abrirForm = document.getElementById("abrirForm")
const modalFormOverlay = document.getElementById("modalFormOverlay")
const closeFormModal = document.getElementById("closeFormModal")

if(abrirForm){

    abrirForm.addEventListener("click", () => {

        modalFormOverlay.classList.add("active")

    })

}

if(closeFormModal){

    closeFormModal.addEventListener("click", () => {

        modalFormOverlay.classList.remove("active")

    })

}

if(modalFormOverlay){

    modalFormOverlay.addEventListener("click", (event) => {

        if(event.target === modalFormOverlay){

            modalFormOverlay.classList.remove("active")

        }

    })

}

/* ========================= */
/* FECHAR MODAL EDITAR */
/* ========================= */

const modalEditarOverlay = document.getElementById("modalEditarOverlay")
const closeEditarModal = document.getElementById("closeEditarModal")

if(closeEditarModal){

    closeEditarModal.addEventListener("click", () => {

        modalEditarOverlay.classList.remove("active")

    })

}

if(modalEditarOverlay){

    modalEditarOverlay.addEventListener("click", (event) => {

        if(event.target === modalEditarOverlay){

            modalEditarOverlay.classList.remove("active")

        }

    })

}

window.abrirModalEditar = function(){
    alert("modal editar funcionando")
}