document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.product} - ${item.color} - ${item.size} - R$ ${item.price.toFixed(2)}</span>
                <button data-index="${index}">Excluir</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        cartCount.textContent = cart.length;

        const footer = document.getElementById('roda');
        if (cartItemsContainer.offsetHeight + cartItemsContainer.offsetTop + 100 > window.innerHeight) {
            footer.style.position = 'relative';
        } else {
            footer.style.position = 'absolute';
            footer.style.bottom = '0';
        }
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const index = event.target.getAttribute('data-index');
            removeItem(index);
        }
    });

    updateCartDisplay();
});
