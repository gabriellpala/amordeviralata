document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const host = 'http://localhost/admin';
        const apiURL = host + 'api/email.php';

        // Coleta os dados do formulário
        const formData = new FormData(this);

        // Envia a requisição via fetch
        fetch(apiURL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Limpa as mensagens de erro/sucesso
            document.getElementById('submitSuccessMessage').classList.add('d-none');
            document.getElementById('submitErrorMessage').classList.add('d-none');

            if (data.status === 'success') {
                // Exibe a mensagem de sucesso
                document.getElementById('submitSuccessMessage').classList.remove('d-none');
                
                // Limpa o formulário
                document.getElementById('contactForm').reset();
            } else {
                // Exibe a mensagem de erro
                document.getElementById('submitErrorMessage').classList.remove('d-none');
                alert(data.message); // Mostra detalhes do erro, se necessário
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            // Exibe a mensagem de erro
            document.getElementById('submitErrorMessage').classList.remove('d-none');
        });
    });
});
