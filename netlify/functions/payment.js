const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Substitua pela sua chave secreta do Stripe

exports.handler = async (event) => {
  try {
    const { amount, currency, paymentMethodId } = JSON.parse(event.body);

    // Crie uma sessão de pagamento com Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true, // Confirma o pagamento
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

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
