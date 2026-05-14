// Estrutura de dados JSON
const dados = {
    "albuns": [
        {
            "id": 1,
            "titulo": "Random Access Memories",
            "artista": "Daft Punk",
            "descricao": "Uma jornada eletrônica que redefine o disco moderno.",
            "imagem_pincipal": "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500", // Link de exemplo
            "destaque": true
        },
        {
            "id": 2,
            "titulo": "After Hours",
            "artista": "The Weeknd",
            "descricao": "O auge do synth-pop sombrio e cinematográfico.",
            "imagem_pincipal": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500",
            "destaque": false
        },
        // Adicione mais álbuns aqui para preencher a grade...
    ]
};

function carregarHome() {
    const containerCards = document.getElementById('grid-albuns');
    const containerCarousel = document.getElementById('carousel-items');

    if (!containerCards || !containerCarousel) return;

    // 1. Limpa os containers (caso haja algo estático)
    containerCards.innerHTML = '';
    containerCarousel.innerHTML = '';

    // 2. Preenche o Carrossel (Apenas os que têm destaque: true)
    const albunsDestaque = dados.albuns.filter(a => a.destaque);
    albunsDestaque.forEach((album, index) => {
        containerCarousel.innerHTML += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${album.imagem_pincipal}" class="d-block w-100" alt="${album.titulo}">
                <div class="carousel-caption">
                    <h5>${album.titulo}</h5>
                    <p>${album.descricao}</p>
                    <a href="detalhe.html?id=${album.id}" class="btn btn-success">Ver Análise</a>
                </div>
            </div>`;
    });

    // 3. Preenche a Grade de Álbuns (Todos os álbuns)
    dados.albuns.forEach(album => {
        containerCards.innerHTML += `
            <div class="col-12 col-sm-6 col-md-3">
                <div class="card">
                    <img src="${album.imagem_pincipal}" class="card-img-top" alt="${album.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${album.titulo}</h5>
                        <p class="card-text">${album.artista}</p>
                        <a href="detalhe.html?id=${album.id}" class="btn btn-outline-success btn-sm">Abrir Detalhes</a>
                    </div>
                </div>
            </div>`;
    });
}