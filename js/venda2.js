document.addEventListener('DOMContentLoaded', function () {
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

    // Código para o carrinho de compras
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const sizeBoxes = document.querySelectorAll('.size-box');
    let selectedSize = null;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartCount.textContent = cart.length;
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
            product: document.querySelector('h3').textContent,
            color: document.querySelector('h4').textContent,
            size: selectedSize,
            price: parseFloat(document.querySelector('#preço1 p').textContent.replace('R$ ', '').replace(',', '.'))
        };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    });

    cartIcon.addEventListener('click', function () {
        window.location.href = '../sacola.html'; // Ajuste o caminho conforme necessário
    });

    updateCartCount();
});
