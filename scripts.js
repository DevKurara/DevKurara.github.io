document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const containerLightbox = document.querySelector('.container-lightbox');
    const fecharLightbox = document.querySelector('.fechar-lightbox');
    const posts = document.querySelectorAll('.item-post');

    posts.forEach(post => {
        post.addEventListener('click', function() {
            const subGaleria = this.querySelector('.sub-galeria');
            // Pega o título do atributo data-title. Se não tiver, usa o alt da imagem.
            const titulo = this.getAttribute('data-title') || this.querySelector('img').alt;
            
            // Limpa o conteúdo anterior do lightbox
            containerLightbox.innerHTML = '';
            
            if (subGaleria) {
                // Se tiver sub-galeria, pega todas as fotos dentro dela
                const imgs = subGaleria.querySelectorAll('img');
                imgs.forEach(img => {
                    const imgClone = document.createElement('img');
                    imgClone.src = img.src;
                    imgClone.alt = img.alt;
                    containerLightbox.appendChild(imgClone);
                });
            } else {
                // Se for uma foto única, pega a imagem principal do post
                const img = this.querySelector('img');
                const imgClone = document.createElement('img');
                imgClone.src = img.src;
                imgClone.alt = img.alt;
                containerLightbox.appendChild(imgClone);
            }

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