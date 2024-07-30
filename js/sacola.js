document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    const totalProdutosElem = document.getElementById('total-produtos');
    const descontoElem = document.getElementById('desconto');
    const taxaEntregaElem = document.getElementById('taxa-entrega');
    const valorFinalElem = document.getElementById('valor-final');
    const discountCodeInput = document.getElementById('discount-code');
    const applyDiscountButton = document.getElementById('apply-discount');
    const discountErrorElem = document.getElementById('discount-error');

    // Verifique se todos os elementos necessários existem
    if (!cartItemsContainer || !cartCount || !totalProdutosElem || !descontoElem || !taxaEntregaElem || !valorFinalElem || !discountCodeInput || !applyDiscountButton || !discountErrorElem) {
        console.error('Um ou mais elementos necessários não foram encontrados no DOM.');
        return;
    }

    const discountRemoveButton = document.createElement('button');
    discountRemoveButton.id = 'discount-remove';
    discountRemoveButton.textContent = '✖';
    discountRemoveButton.style.display = 'none';
    discountRemoveButton.style.color = 'red';
    descontoElem.appendChild(discountRemoveButton);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let discount = parseFloat(localStorage.getItem('discount')) || 0;

    function updateCartDisplay() {
        if (!cartItemsContainer || !totalProdutosElem || !descontoElem || !taxaEntregaElem || !valorFinalElem) {
            console.error('Um ou mais elementos necessários não foram encontrados no DOM.');
            return;
        }

        cartItemsContainer.innerHTML = '';
        let totalProdutos = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';

            const itemDetails = document.createElement('span');
            itemDetails.textContent = `${item.product} - ${item.color} - ${item.size} - R$ ${item.price.toFixed(2)}`;
            itemElement.appendChild(itemDetails);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'X';
            removeButton.addEventListener('click', function() {
                removeItem(index);
            });
            itemElement.appendChild(removeButton);

            cartItemsContainer.appendChild(itemElement);
            totalProdutos += item.price;
        });

        totalProdutosElem.textContent = totalProdutos.toFixed(2);

        // Verifica se o carrinho está vazio para ajustar o desconto
        if (cart.length === 0) {
            discount = 0;
            localStorage.removeItem('discount');
        }

        descontoElem.textContent = discount.toFixed(2);
        taxaEntregaElem.textContent = '13.00'; // Valor fixo
        valorFinalElem.textContent = (totalProdutos - discount + 13.00).toFixed(2);

        discountRemoveButton.style.display = discount > 0 ? 'inline' : 'none';
        discountErrorElem.style.display = 'none'; // Esconde a mensagem de erro
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount(); // Atualiza o contador do carrinho
    }

    function applyDiscount() {
        if (!discountCodeInput || !discountErrorElem) return;

        const code = discountCodeInput.value.trim();
        if (code === 'FURQUIN10') {
            discount = 10;
            discountErrorElem.textContent = ''; // Limpa a mensagem de erro
        } else if (code === 'FURQUIN20') {
            discount = 20;
            discountErrorElem.textContent = ''; // Limpa a mensagem de erro
        } else {
            discount = 0;
            discountErrorElem.textContent = 'Código inválido'; // Exibe a mensagem de erro
        }
        localStorage.setItem('discount', discount);
        updateCartDisplay();
    }

    function removeDiscount() {
        discount = 0;
        localStorage.removeItem('discount');
        updateCartDisplay();
    }

    function updateCartCount() {
        if (!cartCount) {
            console.error('Elemento #cart-count não encontrado no DOM.');
            return;
        }

        if (cart.length > 0) {
            cartCount.textContent = cart.length;
            cartCount.style.display = 'block'; // Mostra o contador
        } else {
            cartCount.textContent = '';
            cartCount.style.display = 'none'; // Esconde o contador
        }
    }

    applyDiscountButton.addEventListener('click', applyDiscount);
    discountRemoveButton.addEventListener('click', removeDiscount);

    updateCartCount(); // Inicializa o contador do carrinho
    updateCartDisplay();
});
