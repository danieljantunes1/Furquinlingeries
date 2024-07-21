document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const sizeBoxes = document.querySelectorAll('.size-box');
    let selectedSize = null;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

     // Seleciona as imagens
    const imgGrande = document.querySelector('#fotinha1 img');
    const imgPequena = document.querySelector('#fotinha2 img');

    // Adiciona o evento de clique à imagem pequena para trocar as imagens
    imgPequena.addEventListener('click', function () {
        const grandeSrc = imgGrande.src;
        const pequenaSrc = imgPequena.src;

        imgGrande.src = pequenaSrc;
        imgPequena.src = grandeSrc;
    });

    function updateCartCount() {
        cartCount.textContent = cart.length;
        if (cart.length > 0) {
            cartCount.style.display = 'block'; // Exibe o contador se houver itens no carrinho
        } else {
            cartCount.style.display = 'none'; // Oculta o contador se estiver vazio
        }
    }

    sizeBoxes.forEach(box => {
        box.addEventListener('click', function () {
            sizeBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
            selectedSize = box.textContent;
        });
    });

    document.getElementById('add-to-cart').addEventListener('click', function () {
        if (!selectedSize) {
            alert('Por favor, selecione um tamanho.');
            return;
        }

        const item = {
            product: document.querySelector('h4').textContent,
            color: document.querySelector('h5').textContent,
            size: selectedSize,
            price: parseFloat(document.querySelector('#preço1 p').textContent.replace('R$ ', '').replace(',', '.'))
        };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount(); // Atualiza o contador imediatamente após adicionar o item
    });

    cartIcon.addEventListener('click', function () {
        window.location.href = '../sacola.html'; // Ajuste o caminho conforme necessário
    });

    updateCartCount(); // Atualiza o contador ao carregar a página
});
