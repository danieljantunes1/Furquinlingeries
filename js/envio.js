document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Obtendo os dados do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const endereco = document.getElementById('endereco').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const cep = document.getElementById('cep').value;
        const pagamento = document.querySelector('input[name="pagamento"]:checked').value;

        // Obtendo os itens do carrinho
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartDetails = cart.map(item => `${item.product} - ${item.color} - ${item.size} - R$ ${item.price.toFixed(2)}`).join('\n');

        // Criando a mensagem
        const message = `Dados do Cadastro e Envio:
        
        Nome: ${nome}
        Email: ${email}
        Telefone: ${telefone}
        Endereço: ${endereco}
        Bairro: ${bairro}
        Cidade: ${cidade}
        CEP: ${cep}
        Pagamento: ${pagamento}
        
        Itens:
        ${cartDetails}`;

        // Codificando a mensagem para URL
        const encodedMessage = encodeURIComponent(message);

        // Abrindo o WhatsApp
        window.open(`https://wa.me/554888779250?text=${encodedMessage}`, '_blank');

        // Zerando a sacola após o envio
        localStorage.removeItem('cart');
    });
});
