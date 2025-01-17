async function createTableCategories() {
    const loggedUser = getSessionUser();
    const container = document.querySelector('.body');

    // Placeholder da tabela (mantido)
    container.innerHTML = `
        <div class="container mt-4 mg-bottom-20">
            <table class="table table-hover border mb-0" id="categoriesTable">
                <thead class="fw-semibold text-nowrap">
                    <tr class="align-middle">
                        <th class="bg-body-secondary">Id</th>
                        <th class="bg-body-secondary">Nome</th>
                        <th class="bg-body-secondary"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="align-middle">
                        <td><b class="placeholder col-6"></b></td>
                        <td>
                            <div class="text-nowrap"><span class="placeholder col-8"></span></div>
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
        console.log("URL PARA PEGAR OS DADOS DAS CATEGORIAS: ", `${HOST_REQUEST}/user/${loggedUser.id}/categories`);

        const response = await axios.get(`${HOST_REQUEST}/user/${loggedUser.id}/categories`);
        const categories = response.data;

        // DEBUG
        console.log("categories: ", `${HOST_REQUEST}/user/${loggedUser.id}/categories`);
        console.log("categories: ", categories);

        let tableHTML = `
            <div class="container mt-4 mg-bottom-20">
                ${createButtonAddCategory()}
                <table class="table table-hover border mb-0" id="categoriesTable">
                    <thead class="fw-semibold text-nowrap">
                        <tr class="align-middle">
                            <th class="bg-body-secondary">Id</th>
                            <th class="bg-body-secondary">Nome</th>
                            <th class="bg-body-secondary"></th>
                        </tr>
                    </thead>
                    <tbody>`;

        if (categories && categories.length > 0) {
            tableHTML += categories.map(category => `
                    <tr class="align-middle">
                        <td><b>${category.id || '-'}</b></td>
                        <td>
                            <div class="text-nowrap">${category.name || '-'}</div>
                            <div class="small text-body-secondary text-nowrap">
                                <span>Registrado: ${formatDate(category.createdAt)}
                            </div>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <svg class="icon">
                                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-options"></use>
                                    </svg>
                                </button>
                                <div class="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-end">
                                    <a class="dropdown-item edit-category-btn" href="javascript:;" data-category='${JSON.stringify(category)}'>Editar</a>
                                    <a class="dropdown-item text-danger delete-category-btn" href="javascript:;" data-category-id='${category.id}'>Deletar</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                `).join('');
        } else {
            tableHTML += `
                    <tr>
                        <td colspan="4" class="text-center">
                            Nenhuma categoria encontrada.
                        </td>
                    </tr>`;
        }


        tableHTML += `
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = tableHTML;


        const table = document.getElementById('categoriesTable');
        table.addEventListener('click', handleTableClick);


    } catch (error) {
        console.error('Erro ao carregar as categorias:', error);
        container.innerHTML = `<p class="text-danger">Erro ao carregar as categorias.</p>`;
    }
}

function handleTableClick(event) {
    const target = event.target;

    if (target.classList.contains('edit-category-btn')) {
        const category = JSON.parse(target.dataset.category);
        createFormCategory(category);
    } else if (target.classList.contains('delete-category-btn')) {
        const categoryId = target.dataset.categoryId;
        deleteCategory(categoryId);
    }
}

async function deleteCategory(categoryId) {
    if (confirm('Tem certeza que deseja deletar esta categoria?')) {
        try {
            const response = await axios.delete(`${HOST_REQUEST}/category/${categoryId}`);

            if (response.status === 204) {
                toast("Categoria deletada com sucesso!", "Sucesso", "success");
                createTableCategories();
            }
        } catch (error) {
            console.error('Erro ao deletar a categoria:', error);
            toast(error.response ? error.response.data : error.message, "Falha ao deletar", "danger");
        }
    }
}

function createButtonAddCategory() {
    return `<div class="d-grid d-md-flex justify-content-md-end" style="margin-bottom: 10px;">
                <button onclick="createFormCategory()" class="btn btn-primary" type="button">
                    <svg style="width: 18px; height: 18px;" class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-plus"></use>
                    </svg> Adicionar Categoria</button>
            </div>`;
}

function createFormCategory(category) {
    const loggedUser = getSessionUser();

    const isEdit = !!category;
    const formHTML = `
    <div class="container mt-4">
        <form class="card mb-3" id="categoryForm" action="/submit" method="POST">
            <div class="card-header">${isEdit ? 'Editar Categoria' : 'Cadastrar Categoria'}</div>
            <div class="card-body">
                <div class="row g-3">
                    <fieldset class="row mb-3">
                        <legend>Informações da Categoria</legend>
                        <div class="col-md-6 mb-3">
                            <label for="name" class="form-label">Nome <span class="badge text-bg-info">Categoria</span></label>
                            <input type="text" id="name" name="name" class="form-control" required>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div class="card-footer d-grid gap-2 d-md-flex justify-content-md-end">
                <button onclick="createTableCategories()" type="button" class="btn btn-secondary">Voltar</button>
                <button type="submit" class="btn btn-primary">
                    <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" id="spinner"></span>
                    ${isEdit ? "Atualizar Categoria" : "Salvar Categoria"}
                </button>
            </div>
        </form>
    </div>
    `;

    const container = document.querySelector('.body');
    container.innerHTML = formHTML;

    const form = document.getElementById('categoryForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const spinner = form.querySelector('#spinner');


    if (category) {
        // Preenche os campos com os dados da categoria para edição
        form.querySelector('#name').value = category.name || '';
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Mostra o spinner e desabilita o botão
        submitButton.disabled = true;
        spinner.classList.remove('d-none');

        const formData = new FormData(form);
        const categoryData = Object.fromEntries(formData.entries());

        const categoryToSend = {
            name: categoryData.name,
            user: {
                id: loggedUser.id
            }
        };

        let url = `${HOST_REQUEST}/category`;
        let method = 'post';

        if (isEdit) {
            url = `${HOST_REQUEST}/category/${category.id}`;
            method = 'put';
            categoryToSend.id = category.id;
        }

        try {
            const response = await axios({
                url: url,
                method: method,
                data: categoryToSend
            });

            if (response.status === (isEdit ? 200 : 201)) {
                toast(`Categoria ${isEdit ? 'atualizada' : 'criada'} com sucesso!`, "Sucesso", "success");
                createTableCategories();
            }
        } catch (error) {
            console.error(`Erro ao ${isEdit ? 'atualizar' : 'criar'} a categoria: `, error);
            toast(error.response ? error.response.data : error.message, "Cadastro inválido", "danger");
        }
        finally {
            // Esconde o spinner e reabilita o botão
            submitButton.disabled = false;
            spinner.classList.add('d-none');
        }
    });
}

createTableCategories();