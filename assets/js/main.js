const eventos = [

    {
        titulo: "Workshop de Desenvolvimento Web",
        categoria: "Tecnologia",
        professor: "Gustavo",
        data: "20 Maio 2026",
        local: "Lab 3"
    },

    {
        titulo: "Palestra sobre Agronegócio",
        categoria: "Agronegócio",
        professor: "Fulano",
        data: "25 Maio 2026",
        local: "Auditório"
    },

    {
        titulo: "Workshop de UX/UI",
        categoria: "Workshop",
        professor: "Fulano",
        data: "30 Maio 2026",
        local: "Lab 1"
    },

    {
        titulo: "Palestra de Inteligência Artificial",
        categoria: "Palestra",
        professor: "Fulano",
        data: "02 Junho 2026",
        local: "Auditório"
    }

]

const eventosGrid = document.getElementById("eventosGrid")

function renderizarEventos(lista){

    eventosGrid.innerHTML = ""

    lista.forEach(evento => {

        eventosGrid.innerHTML += `

            <div class="card">

                <div class="card-banner"></div>

                <div class="card-content">

                    <span class="categoria">
                        ${evento.categoria}
                    </span>

                    <h3>${evento.titulo}</h3>

                    <div class="card-info">

                        <p>📅 ${evento.data}</p>

                        <p>📍 ${evento.local}</p>

                        <p>👨‍🏫 ${evento.professor}</p>

                    </div>

                    <button>
                        Ver detalhes
                    </button>

                </div>

            </div>

        `
    })

}

renderizarEventos(eventos)

const categoriaFiltro = document.getElementById("categoriaFiltro")

categoriaFiltro.addEventListener("change", () => {

    const valor = categoriaFiltro.value

    if(valor === "todos"){

        renderizarEventos(eventos)

        return
    }

    const filtrados = eventos.filter(evento =>
        evento.categoria === valor
    )

    renderizarEventos(filtrados)

})