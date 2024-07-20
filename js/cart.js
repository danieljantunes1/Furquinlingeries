document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        if (cart.length > 0) {
            cartCount.textContent = cart.length;
            cartCount.classList.remove('hidden');
        } else {
            cartCount.textContent = '';
            cartCount.classList.add('hidden');
        }
    }

    cartIcon.addEventListener('click', function () {
        window.location.href = '../sacola.html'; // Ajuste o caminho conforme necessário
    });

    updateCartCount();
});
