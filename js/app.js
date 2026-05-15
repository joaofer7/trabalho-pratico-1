const dados = {
    "albuns": [
        {
            "id": 1,
            "titulo": "Random Access Memories",
            "artista": "Daft Punk",
            "descricao": "Uma jornada eletrônica que redefine o disco moderno.",
            "imagem_pincipal": "data:image/jpeg;base64,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",
            "destaque": true,
            "ano": 2013,
            "genero": "Electronic",
            "link_youtube":"https://www.youtube.com/watch?v=zKSsP2084nU&list=PLZ60rAdTLVNuCAWD8W3dZTLBXbSPda-DX",
            "faixas": [
                "Give Life Back to Music", "The Game of Love", "Giorgio by Moroder", 
                "Within", "Instant Crush", "Lose Yourself to Dance", "Touch", 
                "Get Lucky", "Beyond", "Motherboard", "Fragments of Time", "Doin' It Right", "Contact"
            ],
            "analise_ia": "Random Access Memories é uma ode à era disco e ao toque humano na música digital. A IA identifica uma perfeição técnica na mixagem, onde sintetizadores vintage se fundem organicamente com instrumentação ao vivo. É um álbum que celebra o passado enquanto projeta o futuro da produção musical."
        },
        {
            "id": 2,
            "titulo": "After Hours",
            "artista": "The Weeknd",
            "descricao": "O auge do synth-pop sombrio e cinematográfico.",
            "imagem_pincipal": "https://m.media-amazon.com/images/M/MV5BNzEzZTM3YmQtYmUzZS00YWQyLTk5MjQtYWM0NTlhZTc2MWMyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            "destaque": true,
            "ano": 2020,
            "genero": "R&B / Synth-pop",
            "link_youtube": "https://www.youtube.com/watch?v=i8r4zJC1i70&list=OLAK5uy_lwaD8UXRautA8W9eWT4zZOvwf5Ktxpax8&index=2",
            "faixas": [
                "Alone Again", "Too Late", "Hardest To Love", "Scared To Live", "Snowchild", 
                "Escape from LA", "Heartless", "Faith", "Blinding Lights", "In Your Eyes", 
                "Save Your Tears", "Repeat After Me", "After Hours", "Until I Bleed Out"
            ],
            "analise_ia": "A análise algorítmica deste álbum revela uma estrutura narrativa de 'descida ao caos'. As camadas de reverberação e os sintetizadores oitocentistas criam uma atmosfera de isolamento urbano. 'Blinding Lights' destaca-se por sua frequência rítmica viciante que ressoa globalmente."
        },

    
        {
            "id": 3,
            "titulo": "Ladrão",
            "artista": "Djonga",
            "descricao": "Um manifesto político e social que reafirma Djonga como uma das maiores vozes do rap nacional.",
            "imagem_pincipal": "https://upload.wikimedia.org/wikipedia/pt/b/b0/Djonga_-_Ladr%C3%A3o.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20200414163611", 
            "destaque": true,
            "ano": 2019,
            "genero": "Rap Nacional",
            "link_youtube":"https://www.youtube.com/watch?v=dGLAZ2izDiY&list=PLEE-L5Au_XzcTtkFvGmQOAjVPcDVqYw5I",
            "faixas": ["Hat-trick", "Bença", "Leal", "Deus e o Diabo na Terra do Sol", "Tipo", "Ladrão", "Bené", "Mlk 400", "Voz", "Moleque Atrevido"],
            "analise_ia": "A análise léxica aponta uma densidade lírica acima da média. Djonga utiliza metáforas históricas para construir uma narrativa de empoderamento e resgate de identidade. A produção é seca e impactante, priorizando a mensagem."
        },
        {
            "id": 4,
            "titulo": "Gigantes",
            "artista": "BK'",
            "descricao": "Um álbum que explora a grandiosidade e as fragilidades da vida urbana e do sucesso.",
            "imagem_pincipal": "data:image/jpeg;base64,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",
            "destaque": false,
            "ano": 2018,
            "genero": "Hip Hop / Rap",
            "link_youtube":"https://www.youtube.com/watch?v=J_6yHvZFr2E&list=PLvnkn1Ox2Ufu-NVLuoXLZyMack-2UN1Kc",
            "faixas": ["Gigantes", "Sextou", "Deus do Furdunço", "Correria", "Como Eu Sou", "Extermínio", "Vem Cá", "Planos", "Por Dentro", "Titãs", "Julius", "Abebe Bikila", "Cenas"],
            "analise_ia": "Gigantes é um estudo sobre a psique humana sob pressão. A IA identifica uma transição fluida entre beats agressivos e melodias introspectivas. BK' utiliza o espaço urbano do Rio de Janeiro como um cenário mitológico moderno."
        },
        
{
    "id": 6,
    "titulo": "Vivaz",
    "artista": "Filipe Ret",
    "descricao": "O álbum de estreia que definiu a estética do 'TTK' e consolidou Ret como um fenômeno do rap melódico e filosófico.",
    "imagem_pincipal": "https://t2.genius.com/unsafe/300x300/https%3A%2F%2Fimages.genius.com%2Ff344471d1b349b8c522e3f860846583f.999x999x1.png", 
    "destaque": false,
    "ano": 2012,
    "genero": "Rap / Hip Hop",
    "link_youtube": "https://www.youtube.com/watch?v=KYSMLqaLo5s&list=PLFfiWeiw4cm3TyGtq0W7ZNp1fGAmIRLKk",
    "faixas": [
        "Vivaz",
        "Réu Confesso",
        "Doutores da Vida",
        "Neurótico de Guerra",
        "Sessão de Descarrego",
        "Invicto",
        "Filho do Dono",
        "Livre e Triste",
        "Devaneios",
        "Nova Sorte"
    ],
    "analise_ia": "Vivaz apresenta uma arquitetura sonora baseada em graves profundos e rimas que oscilam entre o existencialismo e a vivência de rua. A IA identifica uma frequência emocional nostálgica, típica do rap carioca do início da década de 2010, com métricas que favorecem a longevidade das faixas no streaming."
},
        {
            "id": 6,
            "titulo": "Justice",
            "artista": "Justin Bieber",
            "descricao": "Um álbum que mistura vulnerabilidade pop com influências de R&B e mensagens de cura.",
            "imagem_pincipal": "https://upload.wikimedia.org/wikipedia/pt/thumb/0/08/Justin_Bieber_-_Justice.png/250px-Justin_Bieber_-_Justice.png?utm_source=pt.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
            "destaque": false,
            "ano": 2021,
            "genero": "Pop / R&B",
            "link_youtube":"https://www.youtube.com/watch?v=p4w5Tv1yIlA&list=OLAK5uy_lXMDMvVniP2CYwBI6kM7mCNOl2NCBPpuE",
            "faixas": ["2 Much", "Deserve You", "As I Am", "Off My Face", "Holy", "Unstable", "Hold On", "Somebody", "Ghost", "Peaches", "Lonely"],
            "analise_ia": "O algoritmo detecta uma maturação vocal significativa. Justice utiliza harmonias de gospel e sintetizadores suaves para criar um ambiente de conforto. 'Peaches' é identificada como um 'pico de dopamina' devido à sua estrutura harmônica repetitiva e agradável."
        }
    ]

};

function carregarHome() {
    const containerCards = document.getElementById('grid-albuns');
    const containerCarousel = document.getElementById('carousel-items');
    if (!containerCards || !containerCarousel) return;

    containerCards.innerHTML = '';
    containerCarousel.innerHTML = '';

    const albunsDestaque = dados.albuns.filter(a => a.destaque);
    albunsDestaque.forEach((album, index) => {
        containerCarousel.innerHTML += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${album.imagem_pincipal}" class="d-block w-100" alt="${album.titulo}" style="height: 500px; object-fit: cover; filter: brightness(0.5);">
                <div class="carousel-caption">
                    <h5>${album.titulo}</h5>
                    <p>${album.descricao}</p>
                    <a href="detalhes.html?id=${album.id}" class="btn btn-success">Ver Análise</a>
                </div>
            </div>`;
    });

    dados.albuns.forEach(album => {
        containerCards.innerHTML += `
            <div class="col-12 col-sm-6 col-md-3">
                <div class="card bg-dark text-white border-secondary h-100">
                    <img src="${album.imagem_pincipal}" class="card-img-top" alt="${album.titulo}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${album.titulo}</h5>
                        <p class="card-text small text-secondary">${album.artista}</p>
                        <a href="detalhes.html?id=${album.id}" class="btn btn-outline-success btn-sm mt-auto">Detalhes</a>
                    </div>
                </div>
            </div>`;
    });
}

function carregarDetalhes() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const album = dados.albuns.find(a => a.id === id);

    const conteudo = document.getElementById('detalhe-conteudo');
    const secaoFaixas = document.getElementById('secao-atracoes');
    const secaoAnaliseIA = document.getElementById('analise-ia-container');

    if (album && conteudo) {
        // Injeta info básica
        conteudo.innerHTML = `
           <div class="row align-items-center mt-5">
        <div class="col-md-5">
            <img src="${album.imagem_pincipal}" class="img-fluid rounded shadow-lg" alt="${album.titulo}">
        </div>
        <div class="col-md-7 mt-4 mt-md-0">
            <h1 class="display-4 fw-bold">${album.titulo}</h1>
            <h2 class="text-success">${album.artista}</h2>
            <p class="lead mt-3">${album.descricao}</p>
            <p><strong>Ano:</strong> ${album.ano} | <strong>Gênero:</strong> ${album.genero}</p>

            <a href="${album.link_youtube}" target="_blank" class="btn btn-success btn-lg mt-3">
                Ouça Agora 
            </a>
            
        </div>
    </div>`;

        // Injeta faixas
        if (secaoFaixas) {
            secaoFaixas.innerHTML = album.faixas.map((faixa, index) => `
                <div class="col-md-4">
                    <div class="p-3 border border-secondary rounded bg-dark text-white shadow-sm">
                        <span class="text-success fw-bold">${index + 1}.</span> ${faixa}
                    </div>
                </div>`).join('');
        }

        // Injeta Análise Crítica (Nova aba/seção)
        if (secaoAnaliseIA) {
            secaoAnaliseIA.innerHTML = `
                <div class="alert alert-dark border-success mt-5 p-4">
                    <h4 class="text-success mb-3">🤖 Análise Crítica por IA</h4>
                    <p class="mb-0 fs-5" style="line-height: 1.8;">${album.analise_ia}</p>
                </div>`;
        }
    }
    // Função para salvar e exibir a crítica do usuário
function salvarCritica() {
    const areaTexto = document.getElementById('texto-critica');
    const feedbackContainer = document.getElementById('feedback-critica');
    const exibirCritica = document.getElementById('exibir-critica');
    const params = new URLSearchParams(window.location.search);
    const albumId = params.get('id');

    if (areaTexto.value.trim() === "") {
        alert("Por favor, escreva algo antes de publicar!");
        return;
    }

    // Exibe o texto na tela
    exibirCritica.innerText = areaTexto.value;
    feedbackContainer.classList.remove('d-none');
    
    // Limpa a área de texto
    areaTexto.value = "";

    // Log para fins de estudo (mostrando a modularização)
    console.log(`Crítica salva para o álbum ID: ${albumId}`);
}
}