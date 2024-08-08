document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const sizeBoxes = document.querySelectorAll('.size-box');
    let selectedSize = null;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Seleciona as imagens
    const imgGrande = document.querySelector('#fotinha1 img');
    const imgPequena = document.querySelector('#fotinha2 img');

    if (imgGrande && imgPequena) {
        // Adiciona o evento de clique à imagem pequena para trocar as imagens
        imgPequena.addEventListener('click', function () {
            const grandeSrc = imgGrande.src;
            const pequenaSrc = imgPequena.src;

            imgGrande.src = pequenaSrc;
            imgPequena.src = grandeSrc;
        });
    } else {
        console.error('Imagens não encontradas.');
    }

    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.length;
            cartCount.style.display = cart.length > 0 ? 'block' : 'none'; // Exibe ou oculta o contador
        } else {
            console.error('Elemento #cart-count não encontrado no DOM.');
        }
    }

    sizeBoxes.forEach(box => {
        box.addEventListener('click', function () {
            sizeBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
            selectedSize = box.textContent.trim();
        });
    });

    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function () {
            if (!selectedSize) {
                alert('Por favor, selecione um tamanho.');
                return;
            }

            const item = {
                product: document.querySelector('h4')?.textContent.trim(),
                color: document.querySelector('h5')?.textContent.trim(),
                size: selectedSize,
                price: parseFloat(document.querySelector('#preço0 p')?.textContent.replace('R$ ', '').replace(',', '.'))
            };

            if (item.product && item.color && item.price) {
                cart.push(item);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount(); // Atualiza o contador imediatamente após adicionar o item
            } else {
                console.error('Informações do item não encontradas.');
            }
        });
    } else {
        console.error('Botão de adicionar ao carrinho não encontrado.');
    }

    if (cartIcon) {
        cartIcon.addEventListener('click', function () {
            window.location.href = '../sacola.html'; // Ajuste o caminho conforme necessário
        });
    } else {
        console.error('Ícone do carrinho não encontrado.');
    }

    updateCartCount(); // Atualiza o contador ao carregar a página
});

document.addEventListener('DOMContentLoaded', () => {
    const shareToggle = document.getElementById('share-toggle');
    const shareMenu = document.getElementById('share-menu');
    const copyLinkButton = document.getElementById('copy-link');
    
    // Função para alternar a exibição do menu de compartilhamento
    function toggleShareMenu() {
        const isVisible = shareMenu.style.display === 'block';
        shareMenu.style.display = isVisible ? 'none' : 'block';
    }

    // Adiciona o evento de clique ao ícone de compartilhamento
    if (shareToggle) {
        shareToggle.addEventListener('click', toggleShareMenu);
    }

    // Adiciona o evento de clique ao botão de copiar link
    if (copyLinkButton) {
        copyLinkButton.addEventListener('click', () => {
            const link = window.location.href; // Obtém o URL da página atual
            navigator.clipboard.writeText(link).then(() => {
                alert('Link copiado para a área de transferência!');
            }).catch(err => {
                console.error('Erro ao copiar o link: ', err);
            });
        });
    }
});
