const dados = {
    livros: [
        {
            id: 1,
            nome: "O Alienista",
            autor: "Machado de Assis",
            genero: "Ficção Literária",
            ano: 1882,
            paginas: 96,
            destaque: true,
            imagem: "../images/oalienista.jpg",
            descricao: "Clássico da literatura brasileira que acompanha os estudos do médico Simão Bacamarte sobre a loucura na cidade de Itaguaí.",
            personagens: [
                { nome: "Simão Bacamarte", imagem: "../images/oalienista.jpg" },
                { nome: "Dona Evarista", imagem: "../images/oalienista.jpg" },
                { nome: "Padre Lopes", imagem: "../images/oalienista.jpg" }
            ]
        },
        {
            id: 2,
            nome: "O Cérebro Leitor",
            autor: "Stanislas Dehaene",
            genero: "Ciência / Psicologia",
            ano: 2007,
            paginas: 396,
            destaque: true,
            imagem: "../images/ocerebroleitor.jpg",
            descricao: "Uma investigação profunda sobre como a leitura transforma nossa mente e como a nossa arquitetura cerebral se adapta à palavra escrita.",
            personagens: [
                { nome: "Córtex Visual", imagem: "../images/ocerebroleitor.jpg" },
                { nome: "Neurônios de Leitura", imagem: "../images/ocerebroleitor.jpg" }
            ]
        },
        {
            id: 3,
            nome: "A Paixão Segundo G.H.",
            autor: "Clarice Lispector",
            genero: "Ficção Psicológica",
            ano: 1964,
            paginas: 176,
            destaque: true,
            imagem: "../images/paixaosobregh.jpg",
            descricao: "Narrativa introspectiva que acompanha uma profunda crise existencial vivida por G.H.",
            personagens: [
                { nome: "G.H.", imagem: "../images/paixaosobregh.jpg" },
                { nome: "Janair", imagem: "../images/paixaosobregh.jpg" },
                { nome: "Barata", imagem: "../images/paixaosobregh.jpg" }
            ]
        }
    ]
};

function renderizarCarrossel() {
    const sliderContainer = document.getElementById("slider-destaques");
    if (!sliderContainer) return;

    const livrosDestaque = dados.livros.filter(livro => livro.destaque === true);
    let slidesHTML = "";
    
    livrosDestaque.forEach((livro, index) => {
        let classeAtiva = index === 0 ? "active" : "";
        
        slidesHTML += `
            <div class="carousel-item ${classeAtiva}">
                <img src="${livro.imagem}" class="d-block w-100" alt="${livro.nome}" style="height: 400px; object-fit: cover;">
                <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                    <h3>${livro.nome}</h3>
                    <p>${livro.autor} - ${livro.ano}</p>
                    <a href="detalhes.html?id=${livro.id}" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
        `;
    });
    sliderContainer.innerHTML = slidesHTML;
}

function renderizarCards() {
    const listaLivros = document.getElementById("lista-livros");
    if (!listaLivros) return;
    
    let cardsHTML = "";
    
    dados.livros.forEach(livro => {
        cardsHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${livro.imagem}" class="card-img-top" alt="${livro.nome}" style="height: 250px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${livro.nome}</h5>
                        <p class="card-text"><strong>Autor:</strong> ${livro.autor}</p>
                        <p class="card-text"><strong>Gênero:</strong> ${livro.genero}</p>
                        <p class="card-text">${livro.descricao.substring(0, 100)}...</p>
                        <a href="detalhes.html?id=${livro.id}" class="btn btn-primary">Ver detalhes</a>
                    </div>
                </div>
            </div>
        `;
    });
    listaLivros.innerHTML = cardsHTML;
}

function getIdDaURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

function renderizarDetalhes() {
    const container = document.getElementById('detalhes-livro');
    if (!container) return;

    const id = getIdDaURL();
    const livro = dados.livros.find(l => l.id === id);
    
    if (!livro) {
        container.innerHTML = '<h2 class="text-center">Livro não encontrado</h2>';
        return;
    }
    
    let personagensHTML = '<h3 class="mt-5 mb-3">Personagens</h3><div class="row">';
    
    livro.personagens.forEach(personagem => {
        personagensHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${personagem.imagem}" class="card-img-top" alt="${personagem.nome}" style="height: 250px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${personagem.nome}</h5>
                    </div>
                </div>
            </div>
        `;
    });
    
    personagensHTML += '</div>';
    
    container.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${livro.imagem}" class="img-fluid rounded" alt="${livro.nome}">
            </div>
            <div class="col-md-6">
                <h2>${livro.nome}</h2>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p><strong>Gênero:</strong> ${livro.genero}</p>
                <p><strong>Ano:</strong> ${livro.ano}</p>
                <p><strong>Páginas:</strong> ${livro.paginas}</p>
                <p><strong>Descrição:</strong> ${livro.descricao}</p>
            </div>
        </div>
        ${personagensHTML}
    `;
}

renderizarCarrossel();
renderizarCards();