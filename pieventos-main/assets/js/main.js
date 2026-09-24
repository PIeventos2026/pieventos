/* MODAL EDITAR */

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
    document.getElementById("editarData").value = data
    document.getElementById("editarDestaque").value = destaque

    modalEditarOverlay.classList.add("active")
}

/* FILTRO */

const categoriaFiltro = document.getElementById("categoriaFiltro")

if(categoriaFiltro){
    categoriaFiltro.addEventListener("change", () => {
        const valor = categoriaFiltro.value.toLowerCase().trim()
        const cards = document.querySelectorAll(".card-evento")

        cards.forEach(card => {
            const categoria = card.querySelector(".categoria").textContent.toLowerCase().trim()

            if(valor === "todos" || categoria === valor){
                card.style.display = "flex"
            } else {
                card.style.display = "none"
            }
        })
    })
}

/* MODAL DETALHES */

const modalOverlay = document.getElementById("modalOverlay")

window.abrirModal = function(titulo, categoria, data, local, professor, descricao){
    document.getElementById("modalTitulo").textContent = titulo
    document.getElementById("modalCategoria").textContent = categoria
    document.getElementById("modalData").textContent = `📅 ${data}`
    document.getElementById("modalLocal").textContent = `📍 ${local}`
    document.getElementById("modalProfessor").textContent = `👨‍🏫 ${professor}`
    document.getElementById("modalDescricao").textContent = descricao

    modalOverlay.classList.add("active")
}

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

/* MODAL ADICIONAR EVENTO */

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

/* FECHAR MODAL EDITAR */

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

/* MODAL INGRESSAR EVENTO */

const abrirIngresso = document.getElementById("abrirIngresso")
const modalIngressoOverlay = document.getElementById("modalIngressoOverlay")
const closeIngressoModal = document.getElementById("closeIngressoModal")

if(abrirIngresso){
    abrirIngresso.addEventListener("click", () => {
        modalIngressoOverlay.classList.add("active")
    })
}

if(closeIngressoModal){
    closeIngressoModal.addEventListener("click", () => {
        modalIngressoOverlay.classList.remove("active")
    })
}

if(modalIngressoOverlay){
    modalIngressoOverlay.addEventListener("click", (event) => {
        if(event.target === modalIngressoOverlay){
            modalIngressoOverlay.classList.remove("active")
        }
    })
}


window.scrollPara = function(id){

    const secao = document.getElementById(id)

    if(secao){

        const posicao = secao.offsetTop - 30

        window.scrollTo({
            top: posicao,
            behavior: "smooth"
        })

    }

}

window.scrollTopo = function(){

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

}