document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const containerLightbox = document.querySelector('.container-lightbox');
    const fecharLightbox = document.querySelector('.fechar-lightbox');
    const posts = document.querySelectorAll('.item-post');
    const containerScroll = document.querySelector('.container-lightbox');

containerScroll.addEventListener('wheel', (evt) => {
    // Se o usuário rodar a bolinha, ele rola horizontalmente
    if (evt.deltaY !== 0) {
        evt.preventDefault();
        containerScroll.scrollLeft += evt.deltaY;
    }
}, { passive: false });

    posts.forEach(post => {
        post.addEventListener('click', function() {
            const subGaleria = this.querySelector('.sub-galeria');
            // Pega o título do atributo data-title. Se não tiver, usa o alt da imagem.
            const titulo = this.getAttribute('data-title') || this.querySelector('img').alt;
            
            // Limpa o conteúdo anterior do lightbox
            containerLightbox.innerHTML = '';
            
            // ... dentro de post.addEventListener('click', function() { ...
if (subGaleria) {
    // SE TIVER SUB-GALERIA, PEGA TODAS AS FOTOS/PDFs DENTRO DELA
    const itens = subGaleria.querySelectorAll('img, .sub-galeria-item'); 
    itens.forEach(item => {
    // Se for uma imagem, usa o src. Se for o span, usa o data-src
    const source = item.src || item.dataset.src;
    
    // Verifica se a fonte termina com .pdf
    if (source.toLowerCase().endsWith('.pdf')) {
        const pdfEmbed = document.createElement('iframe');
        pdfEmbed.src = source;
        pdfEmbed.className = 'pdf-lightbox';
        containerLightbox.appendChild(pdfEmbed);
    } else {
        // É IMAGEM NORMAL
        const imgClone = document.createElement('img');
        imgClone.src = source;
        imgClone.alt = item.alt || 'Imagem';
        containerLightbox.appendChild(imgClone);
    }
});
} else {
    // SE FOR UMA FOTO ÚNICA
    const img = this.querySelector('img');
    const imgClone = document.createElement('img');
    imgClone.src = img.src;
    imgClone.alt = img.alt;
    containerLightbox.appendChild(imgClone);
}
// ... resto do código

            // Define o título no canto inferior esquerdo
            document.getElementById('titulo-lightbox').textContent = titulo;
            
            // Abre o lightbox
            lightbox.classList.add('ativo');
        });
    });

    // Fechar ao clicar no X
    fecharLightbox.addEventListener('click', function() {
        lightbox.classList.remove('ativo');
    });

    // Fechar ao clicar fora das fotos (no fundo translúcido)
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === containerLightbox) {
            lightbox.classList.remove('ativo');
        }
    });

    // Fechar ao apertar a tecla ESC do teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('ativo')) {
            lightbox.classList.remove('ativo');
        }
    });
});


/* Troca de pagina Smooth */

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Se o link abrir em outra aba ou for apenas um âncora, ignora
            if (this.target === '_blank' || this.getAttribute('href').startsWith('#')) return;

            e.preventDefault(); // Impede a navegação imediata
            const href = this.href;

            document.body.classList.add('fade-out'); // Aplica a animação

            // Aguarda o tempo da animação e depois navega
            setTimeout(() => {
                window.location.href = href;
            }, 500); 
        });
    });
});

