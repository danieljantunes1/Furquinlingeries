document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit-button');
    if (!submitButton) {
        console.error('Botão de enviar não encontrado!');
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

        const mensagem = `Dados do Cadastro e Envio:\n\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nEndereço: ${endereco}\nBairro: ${bairro}\nCidade: ${cidade}\nCEP: ${cep}\nPagamento: ${pagamento}`;

        const whatsappNumber = '5548996368579';
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(mensagem)}`;

        window.open(whatsappUrl, '_blank');
    });
});
