document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-button');
    const cartSummaryElement = document.querySelector('.tela2');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeModal = document.querySelector('.modal .close');
    const confirmButton = document.getElementById('confirm-button');
    const cancelButton = document.getElementById('cancel-button');
    const confirmationMessage = document.getElementById('confirmation-message');

    if (!submitButton) {
        console.error('O botão de envio não foi encontrado!');
    }
    if (!cartSummaryElement) {
        console.error('O elemento de resumo do carrinho não foi encontrado!');
    }

    if (!submitButton || !cartSummaryElement) {
        return;
    }

    function updateCartSummary() {
        const purchaseSummary = JSON.parse(localStorage.getItem('purchaseSummary')) || {};

        let resumoCompra = `
        <h2>Resumo da Compra</h2>
        <p>Total dos Produtos: R$ ${purchaseSummary.totalProdutos ? purchaseSummary.totalProdutos.toFixed(2) : '0.00'}</p>
        <p>Desconto: R$ ${purchaseSummary.desconto ? purchaseSummary.desconto.toFixed(2) : '0.00'}</p>
        <p>Taxa de Entrega: R$ ${purchaseSummary.taxaEntrega ? purchaseSummary.taxaEntrega.toFixed(2) : '0.00'}</p>
        <p>Valor Final: R$ ${purchaseSummary.valorFinal ? purchaseSummary.valorFinal.toFixed(2) : '0.00'}</p>
        `;

        cartSummaryElement.innerHTML = resumoCompra;
    }

    function validateForm() {
        const nome = document.getElementById('nome');
        const sobrenome = document.getElementById('sobrenome');
        const email = document.getElementById('email');
        const telefone = document.getElementById('telefone');
        const endereco = document.getElementById('endereco');
        const bairro = document.getElementById('bairro');
        const cidade = document.getElementById('cidade');
        const cep = document.getElementById('cep');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10,11}$/;
        const cepPattern = /^\d{5}-\d{3}$/;

        let errors = false;

        // Clear previous errors
        const inputs = [nome, sobrenome, email, telefone, endereco, bairro, cidade, cep];
        inputs.forEach(input => {
            input.style.borderColor = '';
            input.style.backgroundColor = '';
        });

        if (!nome.value) {
            nome.style.borderColor = 'red';
            nome.style.backgroundColor = '#ffe6e6'; // Light red
            errors = true;
        }
        if (!sobrenome.value) {
            sobrenome.style.borderColor = 'red';
            sobrenome.style.backgroundColor = '#ffe6e6'; // Light red
            errors = true;
        }
        if (!emailPattern.test(email.value)) {
            email.style.borderColor = 'red';
            email.style.backgroundColor = '#ffe6e6'; // Light red
            errors = true;
        }
        if (!phonePattern.test(telefone.value)) {
            telefone.style.borderColor = 'red';
            telefone.style.backgroundColor = '#ffe6e6'; // Light red
            errors = true;
        }
        if (!cepPattern.test(cep.value)) {
            cep.style.borderColor = 'red';
            cep.style.backgroundColor = '#ffe6e6'; // Light red
            errors = true;
        }
        if (!endereco.value) {
            endereco.style.borderColor = 'red';
            endereco.style.backgroundColor = '#ffe6e6'; // Light red
            errors = true;
        }
        if (!bairro.value) {
            bairro.style.borderColor = 'red';
            bairro.style.backgroundColor = '#ffe6e6'; // Light red
            errors = true;
        }
        if (!cidade.value) {
            cidade.style.borderColor = 'red';
            cidade.style.backgroundColor = '#ffe6e6'; // Light red
            errors = true;
        }

        if (errors) {
            alert('Por favor, corrija os campos destacados em vermelho.');
            return false;
        }
        return true;
    }

    function prepareConfirmationMessage() {
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const endereco = document.getElementById('endereco').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const cep = document.getElementById('cep').value;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let purchaseSummary = JSON.parse(localStorage.getItem('purchaseSummary')) || {};

        let cartItemsMessage = cart.map(item => {
            return `Produto: ${item.product}, Cor: ${item.color}, Tamanho: ${item.size}, Preço: R$ ${item.price.toFixed(2)}`;
        }).join('\n');

        let resumoCompra = `
Resumo da Compra:
Total dos Produtos: R$ ${purchaseSummary.totalProdutos ? purchaseSummary.totalProdutos.toFixed(2) : '0.00'}
Desconto: R$ ${purchaseSummary.desconto ? purchaseSummary.desconto.toFixed(2) : '0.00'}
Taxa de Entrega: R$ ${purchaseSummary.taxaEntrega ? purchaseSummary.taxaEntrega.toFixed(2) : '0.00'}
Valor Final: R$ ${purchaseSummary.valorFinal ? purchaseSummary.valorFinal.toFixed(2) : '0.00'}
        `;

        let message = `Dados do Cadastro e Envio:
        
Nome: ${nome}
Sobrenome: ${sobrenome}
Email: ${email}
Telefone: ${telefone}
CEP: ${cep}
Endereço: ${endereco}
Bairro: ${bairro}
Cidade: ${cidade}

Itens da Sacola:
${cartItemsMessage}

${resumoCompra}`;

        return message;
    }

    function showModal(message) {
        confirmationMessage.textContent = message;
        confirmationModal.style.display = 'block';
    }

    function hideModal() {
        confirmationModal.style.display = 'none';
    }

    function sendToWhatsApp() {
        let message = prepareConfirmationMessage();
        let whatsappUrl = `https://wa.me/554888779250?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        clearCart(); // Limpa o carrinho após o envio
    }

    function clearCart() {
        localStorage.removeItem('cart');
        localStorage.removeItem('purchaseSummary');
        // Atualiza o contador no ícone do carrinho se necessário
        // Pode ser necessário adicionar algum código para atualizar a UI do carrinho em outras páginas
    }

    submitButton.addEventListener('click', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário
        if (validateForm()) {
            let message = prepareConfirmationMessage();
            showModal(message);
        }
    });

    closeModal.addEventListener('click', hideModal);
    cancelButton.addEventListener('click', hideModal);
    confirmButton.addEventListener('click', function() {
        sendToWhatsApp();
        hideModal();
    });

    updateCartSummary(); // Atualiza o resumo da compra ao carregar a página
});
