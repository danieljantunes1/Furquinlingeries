document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const sizeBoxes = document.querySelectorAll('.size-box');
    const addToCartButton = document.getElementById('add-to-cart');
    
    if (!cartIcon || !cartCount || !addToCartButton) {
        console.error('Um ou mais elementos necessários não foram encontrados!');
        return;
    }

    let selectedSize = null;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    sizeBoxes.forEach(box => {
        box.addEventListener('click', function() {
            sizeBoxes.forEach(b => b.classList.remove('selected'));
            box.classList.add('selected');
            selectedSize = box.textContent;
        });
    });

    addToCartButton.addEventListener('click', function() {
        if (!selectedSize) {
            alert('Por favor, selecione um tamanho.');
            return;
        }
        const item = {
            product: document.querySelector('h3').textContent,
            color: document.querySelector('h4').textContent,
            size: selectedSize,
            price: parseFloat(document.querySelector('#preço1 p').textContent.replace('R$ ', ''))
        };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    });

    cartIcon.addEventListener('click', function() {
        window.location.href = '../sacola.html'; // Ajuste o caminho conforme necessário
    });

    updateCartCount();
});
