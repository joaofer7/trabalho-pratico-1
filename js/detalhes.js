function carregarDetalhes() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const album = dados.albuns.find(a => a.id == id);

    if (album) {
        // Preenche Seção 1 (Informações Gerais)
        document.getElementById('detalhe-album').innerHTML = `
            <div class="row">
                <div class="col-md-6"><img src="${album.capa_principal}" class="img-fluid"></div>
                <div class="col-md-6">
                    <h1>${album.titulo}</h1>
                    <h3>${album.artista}</h3>
                    <span class="badge bg-success">Nota IA: ${album.nota_ia}</span>
                    <p class="mt-3">${album.analise_ia}</p>
                    <ul>
                        <li>Ano: ${album.ano}</li>
                        <li>Gênero: ${album.genero}</li>
                    </ul>
                </div>
            </div>`;
            
        // Preenche Seção 2 (Músicas/Fotos associadas)
        let trilhaHtml = '';
        album.musicas.forEach(m => {
            trilhaHtml += `
                <div class="col-md-4 text-center">
                    <img src="${m.img}" class="img-thumbnail">
                    <p>${m.nome}</p>
                </div>`;
        });
        document.getElementById('secao-musicas').innerHTML = trilhaHtml;
    }
}