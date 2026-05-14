function carregarHome() {
    let carrosselContent = document.querySelector('.carousel-inner');
    let cardsContent = document.getElementById('grid-albuns');

    // Monta Carrossel (Destaques)
    const destaques = dados.albuns.filter(a => a.destaque);
    destaques.forEach((album, index) => {
        carrosselContent.innerHTML += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${album.capa_principal}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block bg-dark-opacity">
                    <h5>${album.titulo}</h5>
                    <p>${album.analise_ia}</p>
                </div>
            </div>`;
    });

    // Monta Cards (Todos)
    dados.albuns.forEach(album => {
        cardsContent.innerHTML += `
            <div class="col-12 col-md-3 mb-4">
                <div class="card h-100">
                    <img src="${album.capa_principal}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${album.titulo}</h5>
                        <p class="card-text">${album.artista}</p>
                        <a href="detalhes.html?id=${album.id}" class="btn btn-primary">Ver Avaliação IA</a>
                    </div>
                </div>
            </div>`;
    });
}