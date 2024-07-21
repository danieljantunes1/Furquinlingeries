document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-btn');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const goToCartBtn = document.getElementById('go-to-cart');

    // Mostrar o pop-up
    function showPopup() {
        popup.style.display = 'block';
    }

    // Fechar o pop-up
    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    continueShoppingBtn.addEventListener('click', function () {
        window.location.href = 'calcinhas/calcinhas.html'; // Ajuste conforme necessário
    });

    goToCartBtn.addEventListener('click', function () {
        window.location.href = 'sacola.html'; // Ajuste conforme necessário
    });

    // Simular a abertura do pop-up para demonstração
    showPopup();
});
