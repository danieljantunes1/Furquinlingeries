document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Limpa o conteúdo existente
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

        // Atualiza a posição do rodapé
        const footer = document.getElementById('roda');
        if (cartItemsContainer.offsetHeight + cartItemsContainer.offsetTop + 100 > window.innerHeight) {
            footer.style.position = 'relative';
        } else {
            footer.style.position = 'absolute';
            footer.style.bottom = '0';
        }
    }

    function removeItem(index) {
        cart.splice(index, 1); // Remove o item do array
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay(); // Atualiza a exibição após a remoção
    }

    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const index = event.target.getAttribute('data-index');
            removeItem(index);
        }
    });

    updateCartDisplay();
});



// Em cart.js ou no arquivo específico para o carrinho de compras

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length > 0) {
    cartCount.textContent = cart.length;
    cartCount.classList.remove('hidden');
  } else {
    cartCount.textContent = '';
    cartCount.classList.add('hidden');
  }
}

// Atualizar o contador ao carregar a página
document.addEventListener('DOMContentLoaded', updateCartCount);

