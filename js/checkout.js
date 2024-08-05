document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-button');
    const cartSummaryElement = document.getElementById('cart-summary');
    
    if (!submitButton || !cartSummaryElement) {
        console.error('Elementos necessários não encontrados no DOM.');
        return;
    }

    function updateCartSummary() {
        const purchaseSummary = JSON.parse(localStorage.getItem('purchaseSummary')) || {};
        
        let resumoCompra = `
        <h2>Resumo da Compra</h2>
        <p>Total dos Produtos: R$ ${purchaseSummary.totalProdutos.toFixed(2)}</p>
        <p>Desconto: R$ ${purchaseSummary.desconto.toFixed(2)}</p>
        <p>Taxa de Entrega: R$ ${purchaseSummary.taxaEntrega.toFixed(2)}</p>
        <p>Valor Final: R$ ${purchaseSummary.valorFinal.toFixed(2)}</p>
        `;

        cartSummaryElement.innerHTML = resumoCompra;
    }

    function sendToWhatsApp() {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const endereco = document.getElementById('endereco').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const cep = document.getElementById('cep').value;
        const pagamento = document.getElementById('pagamento').value;

        if (!nome || !email || !telefone || !endereco || !bairro || !cidade || !cep || !pagamento) {
            alert('Por favor, preencha todos os campos do formulário.');
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let purchaseSummary = JSON.parse(localStorage.getItem('purchaseSummary')) || {};

        let cartItemsMessage = cart.map(item => {
            return `Produto: ${item.product}, Cor: ${item.color}, Tamanho: ${item.size}, Preço: R$ ${item.price.toFixed(2)}`;
        }).join('\n');

        let message = `Dados do Cadastro e Envio:
        
Nome: ${nome}
Email: ${email}
Telefone: ${telefone}
Endereço: ${endereco}
Bairro: ${bairro}
Cidade: ${cidade}
CEP: ${cep}
Pagamento: ${pagamento}

Itens da Sacola:
${cartItemsMessage}

Resumo da Compra:
Total dos Produtos: R$ ${purchaseSummary.totalProdutos.toFixed(2)}
Desconto: R$ ${purchaseSummary.desconto.toFixed(2)}
Taxa de Entrega: R$ ${purchaseSummary.taxaEntrega.toFixed(2)}
Valor Final: R$ ${purchaseSummary.valorFinal.toFixed(2)}
        `;

        let whatsappUrl = `https://wa.me/554888779250?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        // Zerando a sacola após o envio
        localStorage.removeItem('cart');
        localStorage.removeItem('purchaseSummary');
    }

    submitButton.addEventListener('click', sendToWhatsApp);

    updateCartSummary(); // Atualiza o resumo da compra ao carregar a página
});

document.addEventListener('DOMContentLoaded', function () {
    const totalProdutosElem = document.getElementById('total-produtos');
    const descontoElem = document.getElementById('desconto');
    const taxaEntregaElem = document.getElementById('taxa-entrega');
    const valorFinalElem = document.getElementById('valor-final');

    // Verifica se todos os elementos necessários existem
    if (!totalProdutosElem || !descontoElem || !taxaEntregaElem || !valorFinalElem) {
        console.error('Um ou mais elementos necessários não foram encontrados no DOM.');
        return;
    }

    // Obtém o resumo da compra do localStorage
    const purchaseSummary = JSON.parse(localStorage.getItem('purchaseSummary'));

    if (purchaseSummary) {
        totalProdutosElem.textContent = purchaseSummary.totalProdutos.toFixed(2);
        descontoElem.textContent = purchaseSummary.desconto.toFixed(2);
        taxaEntregaElem.textContent = purchaseSummary.taxaEntrega.toFixed(2);
        valorFinalElem.textContent = purchaseSummary.valorFinal.toFixed(2);
    } else {
        console.error('Resumo da compra não encontrado no localStorage.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit-button');
    
    if (!submitButton) {
        console.error('O botão de envio não foi encontrado!');
        return;
    }

    submitButton.addEventListener('click', function() {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const endereco = document.getElementById('endereco').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const cep = document.getElementById('cep').value;
        const pagamento = document.getElementById('pagamento').value;

        if (!nome || !email || !telefone || !endereco || !bairro || !cidade || !cep || !pagamento) {
            alert('Por favor, preencha todos os campos do formulário.');
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let purchaseSummary = JSON.parse(localStorage.getItem('purchaseSummary')) || {};

        // Verifica o que foi recuperado do localStorage
        console.log('Carrinho:', cart);
        console.log('Resumo da Compra:', purchaseSummary);

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
Email: ${email}
Telefone: ${telefone}
Endereço: ${endereco}
Bairro: ${bairro}
Cidade: ${cidade}
CEP: ${cep}
Pagamento: ${pagamento}

Itens da Sacola:
${cartItemsMessage}

${resumoCompra}`;

        console.log('Mensagem para WhatsApp:', message); // Verifica a mensagem final

        let whatsappUrl = `https://wa.me/554888779250?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});

