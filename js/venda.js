document.addEventListener('DOMContentLoaded', function () {
    const imgGrande = document.querySelector('#fotinha1 img');
    const imgPequena = document.querySelector('#fotinha2 img');

    imgPequena.addEventListener('click', function () {
        // Armazena o src das imagens
        const grandeSrc = imgGrande.src;
        const pequenaSrc = imgPequena.src;

        // Troca os src das imagens
        imgGrande.src = pequenaSrc;
        imgPequena.src = grandeSrc;
    });

    // Código existente para o carrinho de compras
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
