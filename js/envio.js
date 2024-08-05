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