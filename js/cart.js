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

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (!nome || !email || !telefone || !endereco || !bairro || !cidade || !cep || !pagamento) {
            alert('Por favor, preencha todos os campos do formulário.');
            return;
        }

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
${cartItemsMessage}`;

        let whatsappUrl = `https://wa.me/554888779250?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});
