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
                <button data-index="${index}">X</button>
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


        document.addEventListener('DOMContentLoaded', function () {
            const cartItemsContainer = document.getElementById('cart-items-container');
            const totalProdutosElem = document.getElementById('total-produtos');
            const descontoElem = document.getElementById('desconto');
            const taxaEntregaElem = document.getElementById('taxa-entrega');
            const valorFinalElem = document.getElementById('valor-final');

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            function updateCartDisplay() {
                cartItemsContainer.innerHTML = ''; // Limpa o conteúdo existente

                let totalProdutos = 0;
                cart.forEach((item, index) => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'cart-item';

                    // Adiciona detalhes do item
                    const itemDetails = document.createElement('span');
                    itemDetails.textContent = `${item.product} - ${item.color} - ${item.size} - R$ ${item.price.toFixed(2)}`;
                    itemElement.appendChild(itemDetails);

                    // Botão de Remover Item
                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'X';
                    removeButton.addEventListener('click', function() {
                        removeItem(index);
                    });
                    itemElement.appendChild(removeButton);

                    // Adiciona o elemento do item ao container
                    cartItemsContainer.appendChild(itemElement);

                    // Adiciona o preço do item ao total dos produtos
                    totalProdutos += item.price;
                });

                // Exibe o total dos produtos
                totalProdutosElem.textContent = totalProdutos.toFixed(2);

                // Simula desconto e taxa de entrega (ajuste conforme necessário)
                const desconto = 0; // Exemplo de desconto
                const taxaEntrega = 13.00; // Exemplo de taxa de entrega

                // Exibe o desconto e a taxa de entrega (opcional)
                descontoElem.textContent = desconto.toFixed(2);
                taxaEntregaElem.textContent = taxaEntrega.toFixed(2);

                // Calcula o valor final (total dos produtos - desconto + taxa de entrega)
                const valorFinal = totalProdutos - desconto + taxaEntrega;
                valorFinalElem.textContent = valorFinal.toFixed(2);
            }

            function removeItem(index) {
                cart.splice(index, 1); // Remove o item do array
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay(); // Atualiza a exibição após a remoção
            }

            updateCartDisplay(); // Atualiza a exibição ao carregar a página
        });