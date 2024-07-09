document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-button');
    const form = document.getElementById('checkout-form');

    submitButton.addEventListener('click', function () {
        const formData = new FormData(form);

        // Convert FormData to a query string
        const formEntries = [...formData.entries()];
        const queryString = formEntries.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

        // URL do WhatsApp com a mensagem formatada
        const phoneNumber = '+5548996368579'; // Seu número de WhatsApp
        const message = `Dados do Cadastro e Envio:\n\n${formEntries.map(([key, value]) => `${key}: ${value}`).join('\n')}`;
        const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        // Redireciona para o WhatsApp
        window.location.href = whatsappURL;
    });
});
