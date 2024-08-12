document.addEventListener('DOMContentLoaded', function () {
    const stripe = Stripe('pk_live_51PmleS02iBR8Rj9Zdrd7B9HSHxh3E5jOQIsoYDCXZq0qwcTq23xTlaq4CPc5E1vp892FslHQozeTK9Ga5tYosbXD00lAF2Zga1'); // Substitua pela sua chave pública
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

document.getElementById('pay-button').addEventListener('click', async () => {
    const response = await fetch('/.netlify/functions/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 1000, // Exemplo: 10.00 USD
        currency: 'usd',
        paymentMethodId: 'pm_card_visa', // Substitua pelo ID do método de pagamento
      }),
    });
    const data = await response.json();
    if (data.success) {
      alert('Pagamento realizado com sucesso!');
    } else {
      alert('Erro no pagamento: ' + data.error);
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    const stripe = Stripe('pk_live_51PmleS02iBR8Rj9Zdrd7B9HSHxh3E5jOQIsoYDCXZq0qwcTq23xTlaq4CPc5E1vp892FslHQozeTK9Ga5tYosbXD00lAF2Zga1'); 
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

  