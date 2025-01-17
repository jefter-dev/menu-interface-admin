async function createTableAdditionals() {
    const loggedUser = getSessionUser();
    const container = document.querySelector('.body');

    // Exibe o placeholder de carregamento
    renderLoadingState(container);

    try {
        const response = await axios.get(`${HOST_REQUEST}/user/${loggedUser.id}/additionals`);
        const additionals = response.data;

        renderTable(container, additionals);
    } catch (error) {
        console.error('Erro ao carregar os adicionais:', error);
        container.innerHTML = `<p class="text-danger">Erro ao carregar os adicionais.</p>`;
    }
}

function renderLoadingState(container) {
    container.innerHTML = `
        <div class="container mt-4 mg-bottom-20">
            <table class="table table-hover border mb-0" id="additionalsTable">
                <thead class="fw-semibold text-nowrap">
                    <tr class="align-middle">
                        <th class="bg-body-secondary">Id</th>
                        <th class="bg-body-secondary">Nome</th>
                        <th class="bg-body-secondary text-center">Descrição</th>
                        <th class="bg-body-secondary text-center">Preço</th>
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
                    <td class="text-center"><span class="placeholder col-6"></span></td>
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
                    <td class="text-center"><span class="placeholder col-6"></span></td>
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
                    <td class="text-center"><span class="placeholder col-6"></span></td>
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
}

function renderTable(container, additionals) {
    const tableHTML = createTableHTML(additionals);
    container.innerHTML = tableHTML;

    // Adicionando os ouvintes de evento após inserir o HTML na página
    const table = document.getElementById('additionalsTable');
    table.addEventListener('click', handleTableClick);
}

function createTableHTML(additionals) {
    return `
        <div class="container mt-4 mg-bottom-20">
            ${createButtonAddAdditional()}
            <table class="table table-hover border mb-0" id="additionalsTable">
                <thead class="fw-semibold text-nowrap">
                    <tr class="align-middle">
                        <th class="bg-body-secondary">Id</th>
                        <th class="bg-body-secondary text-center">Nome</th>
                        <th class="bg-body-secondary text-center">Descrição</th>
                        <th class="bg-body-secondary text-center">Preço</th>
                        <th class="bg-body-secondary"></th>
                    </tr>
                </thead>
                <tbody>
                    ${additionals.map(additional => `
                        <tr class="align-middle">
                            <td><b>${additional.id || '-'}</b></td>
                            <td class="text-center">
                                <div class="text-nowrap"><span class="badge text-bg-primary">${additional.name || '-'}</span></div>
                            </td>
                            <td class="text-center">${additional.description || '-'}</td>
                            <td class="text-center"><strong>R$ ${additional.price || '0.00'}</strong></td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <svg class="icon">
                                            <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-options"></use>
                                        </svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-end">
                                        <a class="dropdown-item edit-additional-btn" href="javascript:;" data-additional='${JSON.stringify(additional)}'>Editar</a>
                                        <a class="dropdown-item text-danger delete-additional-btn" href="javascript:;" data-additional-id='${additional.id}'>Deletar</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function handleTableClick(event) {
    const target = event.target;

    if (target.classList.contains('edit-additional-btn')) {
        const additional = JSON.parse(target.dataset.additional);
        createFormAdditional(additional); // Chama a função para criar o formulário de edição do adicional
    } else if (target.classList.contains('delete-additional-btn')) {
        const additionalId = target.dataset.additionalId;
        deleteAdditional(additionalId); // Chama a função para deletar o adicional
    }
}

async function deleteAdditional(additionalId) {
    if (confirm('Tem certeza que deseja deletar este adicional?')) {
        try {
            const response = await axios.delete(`${HOST_REQUEST}/additional/${additionalId}`);

            if (response.status === 204) {
                toast("Adicional deletado com sucesso!", "Sucesso", "success");
                createTableAdditionals(); // Recarrega a tabela após a exclusão
            }
        } catch (error) {
            console.error('Erro ao deletar o adicional:', error);
            toast(error.response ? error.response.data : error.message, "Falha ao deletar", "danger");
        }
    }
}

function createButtonAddAdditional() {
    return `<div class="d-grid d-md-flex justify-content-md-end" style="margin-bottom: 10px;">
                <button onclick="createFormAdditional()" class="btn btn-primary" type="button">
                    <svg style="width: 18px; height: 18px;" class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-plus"></use>
                    </svg> Adicionar Adicional</button>
            </div>`;
}

function createFormAdditional(additional) {
    console.log("additional: ", additional); // DEBUG

    const loggedUser = getSessionUser();
    const isEdit = !!additional;
    const container = document.querySelector('.body');

    const formHTML = `
    <div class="container mt-4">
        <form class="card mb-3" id="additionalForm" action="/submit" method="POST">
            <div class="card-header">${isEdit ? 'Editar Adicional' : 'Cadastrar Adicional'}</div>
            <div class="card-body">
                <div class="row g-3">
                    <fieldset class="row mb-3">
                        <legend>Informações do Adicional</legend>
                        <div class="col-md-6 mb-3">
                            <label for="name" class="form-label">Nome <span class="badge text-bg-info">Adicional</span></label>
                            <input type="text" id="name" name="name" class="form-control" required>
                        </div>
                        <div class="col-md-6 mb-3"></div>
                        <div class="col-md-6 mb-3">
                            <label for="description" class="form-label">Descrição</label>
                            <input type="text" id="description" name="description" class="form-control">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="price" class="form-label">Preço</label>
                            <input type="number" id="price" name="price" class="form-control" step="0.01" required>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div class="card-footer d-grid gap-2 d-md-flex justify-content-md-end">
                <button onclick="closeFormAdditional()" type="button" class="btn btn-secondary">Voltar</button>
                <button type="submit" class="btn btn-primary">
                    ${isEdit ? "Atualizar Adicional" : "Salvar Adicional"}
                    <span class="spinner-border spinner-border-sm ms-2 d-none" role="status" aria-hidden="true" id="spinner"></span>
                </button>
            </div>
        </form>
    </div>
    `;

    container.innerHTML = formHTML;

    const form = document.getElementById('additionalForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const spinner = form.querySelector('#spinner');


    if (additional) {
        // Preenche os campos com os dados do adicional para edição
        form.querySelector('#name').value = additional.name || '';
        form.querySelector('#description').value = additional.description || '';
        form.querySelector('#price').value = Number(additional.price).toFixed(2);
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Mostra o spinner e desabilita o botão
        submitButton.disabled = true;
        spinner.classList.remove('d-none');

        const formData = new FormData(form);
        const additionalData = Object.fromEntries(formData.entries());

        const additionalToSend = {
            name: additionalData.name,
            description: additionalData.description,
            price: parseFloat(additionalData.price),
            user: {
                id: loggedUser.id
            }
        };

        let url = `${HOST_REQUEST}/additional`;
        let method = 'post';

        if (isEdit) {
            url = `${HOST_REQUEST}/additional/${additional.id}`;
            method = 'put';
            additionalToSend.id = additional.id;
        }

        try {
            const response = await axios({
                url: url,
                method: method,
                data: additionalToSend,
            });

            if (response.status === (isEdit ? 200 : 201)) {
                toast(`Adicional ${isEdit ? 'atualizado' : 'criado'} com sucesso!`, "Sucesso", "success");
                createTableAdditionals();
            }
        } catch (error) {
            console.error(`Erro ao ${isEdit ? 'atualizar' : 'criar'} o adicional: `, error);
            toast(error.response ? error.response.data : error.message, "Cadastro inválido", "danger");
        }
        finally {
            // Esconde o spinner e reabilita o botão
            submitButton.disabled = false;
            spinner.classList.add('d-none');
        }
    });
}

function closeFormAdditional() {
    createTableAdditionals();
}

createTableAdditionals();