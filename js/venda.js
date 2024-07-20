document.addEventListener('DOMContentLoaded', function () {
    const imgGrande = document.querySelector('#fotinha1 img');
    const imgPequena = document.querySelector('#fotinha2 img');

    imgPequena.addEventListener('click', function () {
        const grandeSrc = imgGrande.src;
        const pequenaSrc = imgPequena.src;
        imgGrande.src = pequenaSrc;
        imgPequena.src = grandeSrc;
    });

    const sizeBoxes = document.querySelectorAll('.size-box');
    let selectedSize = null;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    sizeBoxes.forEach(box => {
        box.addEventListener('click', function () {
            sizeBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
            selectedSize = box.textContent;
        });
    });

    document.getElementById('add-to-cart').addEventListener('click', function () {
        const item = {
            product: document.querySelector('h4').textContent,
            color: document.querySelector('h5').textContent,
            size: selectedSize,
            price: parseFloat(document.querySelector('#preço1 p').textContent.replace('R$ ', ''))
        };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    });

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cart.length > 0) {
            cartCount.textContent = cart.length;
            cartCount.classList.remove('hidden');
        } else {
            cartCount.textContent = '';
            cartCount.classList.add('hidden');
        }
    }

    updateCartCount();
});
