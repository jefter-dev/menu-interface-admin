async function createTableClients() {
    const loggedUser = getSessionUser();

    const container = document.querySelector('.body');

    // Placeholder da tabela
    container.innerHTML = `
        <div class="container mt-4 mg-bottom-20">
            <table class="table table-hover border mb-0" id="clientTable">
                <thead class="fw-semibold text-nowrap">
                    <tr class="align-middle">
                        <th class="bg-body-secondary">Id</th>
                        <th class="bg-body-secondary">Nome</th>
                        <th class="bg-body-secondary text-center">Email</th>
                        <th class="bg-body-secondary text-center">Endereço</th>
                        <th class="bg-body-secondary"></th>
                    </tr>
                </thead>
                <tbody>
                <tr class="align-middle">
                    <td><b class="placeholder col-6"></b></td>
                    <td>
                        <div class="text-nowrap"><span class="placeholder col-8"></span></div>
                    </td>
                    <td class="text-center"><span class="placeholder col-8"></span></td>
                <td>
                        <span class="placeholder col-6"></span>
                    </td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-transparent p-0 placeholder col-4" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                
                            </button>
                        </div>
                    </td>
                </tr>
                <tr class="align-middle">
                    <td><b class="placeholder col-6"></b></td>
                    <td>
                        <div class="text-nowrap"><span class="placeholder col-8"></span></div>
                    </td>
                    <td class="text-center"><span class="placeholder col-8"></span></td>
                <td>
                        <span class="placeholder col-6"></span>
                    </td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-transparent p-0 placeholder col-4" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                
                            </button>
                        </div>
                    </td>
                </tr>
                <tr class="align-middle">
                    <td><b class="placeholder col-6"></b></td>
                    <td>
                        <div class="text-nowrap"><span class="placeholder col-8"></span></div>
                    </td>
                    <td class="text-center"><span class="placeholder col-8"></span></td>
                <td>
                        <span class="placeholder col-6"></span>
                    </td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-transparent p-0 placeholder col-4" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                
                            </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    `;

    try {
        const response = await axios.get(`${HOST_REQUEST}/user/${loggedUser.id}/clients`);
        const clients = response.data;

        const tableHTML = `
            <div class="container mt-4 mg-bottom-20">
                ${createButtonAddClient()}
                <table class="table table-hover border mb-0" id="clientTable">
                    <thead class="fw-semibold text-nowrap">
                        <tr class="align-middle">
                            <th class="bg-body-secondary">Id</th>
                            <th class="bg-body-secondary">Nome</th>
                            <th class="bg-body-secondary text-center">Email</th>
                            <th class="bg-body-secondary text-center">Endereço</th>
                            <th class="bg-body-secondary"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${clients.map(client => `
                            <tr class="align-middle">
                                <td><b>${client.id || '-'}</b></td>
                                <td>
                                    <div class="text-nowrap">${client.name || '-'}</div>
                                </td>
                                <td class="text-center">${client.email || '-'}</td>
                                <td>
                                    ${formatAddressDetails(client.address)}
                                </td>
                                <td>
                                    <div class="dropdown">
                                        <button class="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                            <svg class="icon">
                                                <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-options"></use>
                                            </svg>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-end">
                                            <a class="dropdown-item edit-client-btn" href="javascript:;" data-client='${JSON.stringify(client)}'>Editar</a>
                                            <a class="dropdown-item text-danger delete-client-btn" href="javascript:;" data-client-id='${client.id}'>Deletar</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = tableHTML;

        // Adicionando os ouvintes de evento após inserir o HTML na página
        const table = document.getElementById('clientTable');
        table.addEventListener('click', handleTableClickClient);

    } catch (error) {
        console.error('Erro ao carregar os clientes:', error);
        container.innerHTML = `<p class="text-danger">Erro ao carregar os clientes.</p>`;
    }
}

function handleTableClickClient(event) {
    const target = event.target;

    if (target.classList.contains('edit-client-btn')) {
        const client = JSON.parse(target.dataset.client);
        createFormClient(client); // Chama a função para criar o formulário de edição do cliente
    } else if (target.classList.contains('delete-client-btn')) {
        const clientId = target.dataset.clientId;
        deleteClient(clientId); // Chama a função para deletar o cliente
    }
}

async function deleteClient(clientId) {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
        try {
            const response = await axios.delete(`${HOST_REQUEST}/client/${clientId}`);
            // console.log("response [DELETE]: ", response); // DEBUG

            if (response.status === 204) {
                toast("Cliente deletado com sucesso!", "Sucesso", "success");
                createTableClients(); // Recarrega a tabela após a exclusão
            }
        } catch (error) {
            console.error('Erro ao deletar o cliente:', error);
            toast(error.response ? error.response.data : error.message, "Falha ao deletar", "danger");
        }
    }
}

function createButtonAddClient() {
    return `<div class="d-grid d-md-flex justify-content-md-end" style="margin-bottom: 10px;">
                <button onclick="createFormClient()" class="btn btn-primary" type="button">
                    <svg style="width: 18px; height: 18px;" class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-user-plus"></use>
                    </svg> Adicionar Cliente</button>
            </div>`;
}

function createFormClient(client) {
    const loggedUser = getSessionUser();

    const isEdit = !!client;
    const formHTML = `
    <div class="container mt-4">
        <form class="card mb-3" id="clientForm" action="/submit" method="POST">
            <div class="card-header">${isEdit ? 'Editar Cliente' : 'Cadastrar Cliente'}</div>
            <div class="card-body">
                <div class="row g-3">
                    <fieldset class="row mb-3">
                        <legend>Informações Gerais</legend>
                            <div class="col-md-6 mb-3">
                                <label for="name" class="form-label">Nome <span class="badge text-bg-info">Cliente</span></label>
                                <input type="text" id="name" name="name" class="form-control" required>
                            </div>
                            <div class="col-md-6 mb-3"></div>
                            <div class="col-md-6 mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" id="email" name="email" class="form-control" required>
                            </div>

                            <div class="col-md-6 mb-3">
                                <label for="password" class="form-label">Senha ${!isEdit ? '<span class="badge text-bg-warning">Obrigatório</span>' : '<span class="badge text-bg-info">Digite a senha para altera-la</span>'}</label>
                                <input type="password" id="password" name="password" class="form-control" ${!isEdit ? 'required' : ''}>
                            </div>
                    </fieldset>

                    <fieldset class="col-12">
                        <fieldset class="row">
                            <legend>Endereço</legend>

                            <div class="col-md-9 mb-3">
                                <label for="street" class="form-label">Rua</label>
                                <input type="text" id="street" name="street" class="form-control" required>
                            </div>

                            <div class="col-md-3 mb-3">
                                <label for="number" class="form-label">Número</label>
                                <input type="text" id="number" name="number" class="form-control" required>
                            </div>

                            <div class="col-md-4 mb-3">
                                <label for="neighborhood" class="form-label">Bairro</label>
                                <input type="text" id="neighborhood" name="neighborhood" class="form-control"
                                    required>
                            </div>

                            <div class="col-md-8 mb-3">
                                <label for="referencePoint" class="form-label">Ponto de Referência</label>
                                <input type="text" id="referencePoint" name="referencePoint"
                                    class="form-control">
                            </div>

                            <div class="col-md-6 mb-3">
                                <label for="postalCode" class="form-label">CEP</label>
                                <input type="text" id="postalCode" name="postalCode" class="form-control"
                                    required>
                            </div>

                            <div class="col-md-6 mb-3">
                                <label for="city" class="form-label">Cidade</label>
                                <input type="text" id="city" name="city" class="form-control" required>
                            </div>
                        </fieldset>
                    </fieldset>
                </div>
            </div>
            <div class="card-footer d-grid gap-2 d-md-flex justify-content-md-end">
                <button onclick="createTableClients()" type="button" class="btn btn-secondary">Voltar</button>
                <button type="submit" class="btn btn-primary">
                    <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" id="spinner"></span>
                    ${isEdit ? "Atualizar Cliente" : "Salvar Cliente"}
                </button>
            </div>
        </form>
    </div>
    `;

    const container = document.querySelector('.body');
    container.innerHTML = formHTML;

    const form = document.getElementById('clientForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const spinner = form.querySelector('#spinner');

    if (client) {
        // Preenche os campos com os dados do cliente para edição
        form.querySelector('#name').value = client.name || '';
        form.querySelector('#email').value = client.email || '';

        if (client.address) {
            form.querySelector('#street').value = client.address.street || '';
            form.querySelector('#number').value = client.address.number || '';
            form.querySelector('#neighborhood').value = client.address.neighborhood || '';
            form.querySelector('#referencePoint').value = client.address.referencePoint || '';
            form.querySelector('#postalCode').value = client.address.postalCode || '';
            form.querySelector('#city').value = client.address.city || '';
        }
    }
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        // Mostra o spinner e desabilita o botão
        submitButton.disabled = true;
        spinner.classList.remove('d-none');


        const formData = new FormData(form);
        const clientData = Object.fromEntries(formData.entries());

        const clientToSend = {
            name: clientData.name,
            email: clientData.email,
            address: {
                street: clientData.street,
                number: clientData.number,
                neighborhood: clientData.neighborhood,
                referencePoint: clientData.referencePoint,
                postalCode: clientData.postalCode,
                city: clientData.city,
                user: {
                    id: loggedUser.id
                }
            },
            user: {
                id: loggedUser.id
            }
        };

        console.log("clientToSend: ", clientToSend);

        let url = `${HOST_REQUEST}/client`;
        let method = 'post';

        if (isEdit) {
            url = `${HOST_REQUEST}/client/${client.id}`;
            method = 'put';
            clientToSend.id = client.id; // Adiciona o ID para a atualização
        }

        try {
            const response = await axios({
                url: url,
                method: method,
                data: clientToSend,
            });
            console.log('response', response);

            if (response.status === (isEdit ? 200 : 201)) {
                toast(`Cliente ${isEdit ? 'atualizado' : 'criado'} com sucesso!`, "Sucesso", "success");
                createTableClients();
            }
        } catch (error) {
            console.log(`Erro ao ${isEdit ? 'atualizar' : 'criar'} o cliente: `, error);
            toast(error.response ? error.response.data : error.message, "Cadastro inválido", "danger");
        }
        finally {
            // Esconde o spinner e reabilita o botão
            submitButton.disabled = false;
            spinner.classList.add('d-none');
        }
    });
}

createTableClients();