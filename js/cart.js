document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const totalProdutos = document.getElementById('total-produtos');
    const desconto = document.getElementById('desconto');
    const taxaEntrega = document.getElementById('taxa-entrega');
    const valorFinal = document.getElementById('valor-final');

    // Verifica se os elementos existem no DOM
    if (!totalProdutos || !desconto || !taxaEntrega || !valorFinal) {
        console.error("Elementos do resumo do carrinho não encontrados.");
        console.log("total-produtos:", totalProdutos);
        console.log("desconto:", desconto);
        console.log("taxa-entrega:", taxaEntrega);
        console.log("valor-final:", valorFinal);
        return;
    }

    function updateCartCount() {
        const cartLength = cart.length;
        if (cartLength > 0) {
            cartCount.textContent = cartLength;
            cartCount.style.display = 'flex';
        } else {
            cartCount.textContent = '';
            cartCount.style.display = 'none';
        }
    }

    // Função para calcular e atualizar os valores do resumo do carrinho
    function updateResumo() {
        let total = 0;
        let descontoValor = 0; // Assumindo que o desconto é calculado em outro lugar
        let taxa = 10; // Valor fixo para taxa de entrega, substitua com sua lógica

        cart.forEach(item => {
            total += item.price * item.quantity; // Supondo que cada item tem 'price' e 'quantity'
        });

        const valorFinalCalc = total - descontoValor + taxa;

        totalProdutos.textContent = total.toFixed(2);
        desconto.textContent = descontoValor.toFixed(2);
        taxaEntrega.textContent = taxa.toFixed(2);
        valorFinal.textContent = valorFinalCalc.toFixed(2);
    }

    updateCartCount(); // Atualiza o contador ao carregar a página
    updateResumo(); // Atualiza o resumo ao carregar a página

    if (cartIcon) {
        cartIcon.addEventListener('click', function () {
            window.location.href = 'sacola.html'; // Ajuste o caminho conforme necessário
        });
    } else {
        console.error('Ícone do carrinho não encontrado.');
    }
});
