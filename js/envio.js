document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit-button').addEventListener('click', function () {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const endereco = document.getElementById('endereco').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const cep = document.getElementById('cep').value;
        const pagamento = document.getElementById('pagamento').value;

        // Monta a mensagem
        const message = `Dados do Cadastro e Envio:\n\n` +
                        `nome: ${nome}\n` +
                        `email: ${email}\n` +
                        `telefone: ${telefone}\n` +
                        `endereco: ${endereco}\n` +
                        `bairro: ${bairro}\n` +
                        `cidade: ${cidade}\n` +
                        `cep: ${cep}\n` +
                        `pagamento: ${pagamento}`;

        // Número de telefone do destinatário
        const phoneNumber = '5548996368579';
        // Codifica a mensagem para a URL
        const encodedMessage = encodeURIComponent(message);
        // Cria a URL para WhatsApp Web
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Abre a URL em uma nova aba
        window.open(whatsappURL, '_blank');
    });
});
