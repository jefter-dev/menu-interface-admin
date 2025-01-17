document.addEventListener('DOMContentLoaded', () => {
    console.log("AQUI LOGIN");
    // Obtém o formulário e adiciona um listener para capturar o submit
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita que o formulário recarregue a página
            const email = document.querySelector('input[type="text"]').value;
            const password = document.querySelector('input[type="password"]').value;
            login(email, password);
        });
    }
});

async function login(email, password) {
    try {
        const response = await axios.post(`${HOST_REQUEST}/auth/user/login`, {
            email: email,
            password: password
        });

        if (response.status >= 200 && response.status < 300) {
            // Login com sucesso
            console.log("Login realizado com sucesso!", response.data);
            toast("Login realizado com sucesso!<br><b>Redirecionando...</b>", "Login válido", "success");

            saveSessionUser(response.data);

            setTimeout(() => {
                window.location.href = HOST;
            }, 2000);
        }
    } catch (error) {
        // Erro de requisição (problema com a conexão, etc.)
        console.error("Erro ao realizar login:", error);
        toast(error.response ? error.response.data : error.message, "Login inválido", "danger");
    }
}