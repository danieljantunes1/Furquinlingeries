document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-button');
    const cartSummaryElement = document.querySelector('.tela2');
    const paymentMethodSelect = document.getElementById('payment-method');

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

        const inputs = [nome, sobrenome, email, telefone, endereco, bairro, cidade, cep, paymentMethodSelect];
        inputs.forEach(input => {
            input.style.borderColor = '';
            input.style.backgroundColor = '';
        });

        if (!nome.value) {
            nome.style.borderColor = 'red';
            nome.style.backgroundColor = '#ffe6e6'; 
            errors = true;
        }
        if (!sobrenome.value) {
            sobrenome.style.borderColor = 'red';
            sobrenome.style.backgroundColor = '#ffe6e6'; 
            errors = true;
        }
        if (!emailPattern.test(email.value)) {
            email.style.borderColor = 'red';
            email.style.backgroundColor = '#ffe6e6'; 
            errors = true;
        }
        if (!phonePattern.test(telefone.value)) {
            telefone.style.borderColor = 'red';
            telefone.style.backgroundColor = '#ffe6e6'; 
            errors = true;
        }
        if (!cepPattern.test(cep.value)) {
            cep.style.borderColor = 'red';
            cep.style.backgroundColor = '#ffe6e6'; 
            errors = true;
        }
        if (!endereco.value) {
            endereco.style.borderColor = 'red';
            endereco.style.backgroundColor = '#ffe6e6'; 
            errors = true;
        }
        if (!bairro.value) {
            bairro.style.borderColor = 'red';
            bairro.style.backgroundColor = '#ffe6e6'; 
            errors = true;
        }
        if (!cidade.value) {
            cidade.style.borderColor = 'red';
            cidade.style.backgroundColor = '#ffe6e6'; 
            errors = true;
        }
        if (!paymentMethodSelect.value) {
            paymentMethodSelect.style.borderColor = 'red';
            paymentMethodSelect.style.backgroundColor = '#ffe6e6'; 
            errors = true;
        }

        if (errors) {
            alert('Por favor, corrija os campos destacados em vermelho.');
            return false;
        }
        return true;
    }

    function prepareSummaryForRedirection() {
        const purchaseSummary = JSON.parse(localStorage.getItem('purchaseSummary')) || {};
        const queryParams = new URLSearchParams({
            totalProdutos: purchaseSummary.totalProdutos ? purchaseSummary.totalProdutos.toFixed(2) : '0.00',
            desconto: purchaseSummary.desconto ? purchaseSummary.desconto.toFixed(2) : '0.00',
            taxaEntrega: purchaseSummary.taxaEntrega ? purchaseSummary.taxaEntrega.toFixed(2) : '0.00',
            valorFinal: purchaseSummary.valorFinal ? purchaseSummary.valorFinal.toFixed(2) : '0.00',
            paymentMethod: paymentMethodSelect.value
        });

        return queryParams.toString();
    }

    submitButton.addEventListener('click', function(e) {
        e.preventDefault(); 
        if (validateForm()) {
            const summaryParams = prepareSummaryForRedirection();
            window.location.href = `checkout.html?${summaryParams}`;
        }
    });

    updateCartSummary();
});
