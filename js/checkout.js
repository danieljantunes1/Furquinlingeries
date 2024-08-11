document.addEventListener('DOMContentLoaded', function () {
    const stripe = Stripe('your-publishable-key'); // Substitua pela sua chave pública
    const checkoutButton = document.getElementById('checkout-button');

    checkoutButton.addEventListener('click', function () {
        fetch('/create-checkout-session', {
            method: 'POST',
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (sessionId) {
            return stripe.redirectToCheckout({ sessionId: sessionId });
        })
        .then(function (result) {
            if (result.error) {
                alert(result.error.message);
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
    });
});
