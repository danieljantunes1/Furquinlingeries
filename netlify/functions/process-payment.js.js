// netlify/functions/process-payment.js

exports.handler = async (event) => {
    try {
        // Lógica para processar o pagamento
        const body = JSON.parse(event.body);

        // Exemplo: enviar uma resposta simples
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Pagamento processado com sucesso!',
                data: body
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Erro ao processar o pagamento',
                error: error.message
            })
        };
    }
};
