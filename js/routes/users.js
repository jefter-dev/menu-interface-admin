// Função para criar a tabela dinamicamente
async function createTableUsers() {
    const container = document.querySelector('.body');

    // Placeholder da tabela
    container.innerHTML = `
        <div class="container mt-4 mg-bottom-20">
            <table class="table table-hover border mb-0" id="userTable">
                <thead class="fw-semibold text-nowrap">
                    <tr class="align-middle">
                        <th class="bg-body-secondary text-center">
                            <svg class="icon">
                                <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-people"></use>
                            </svg>
                        </th>
                        <th class="bg-body-secondary">Id</th>
                        <th class="bg-body-secondary">Nome</th>
                        <th class="bg-body-secondary">Username</th>
                        <th class="bg-body-secondary text-center">Email</th>
                        <th class="bg-body-secondary">CNPJ</th>
                        <th class="bg-body-secondary text-center">Endereço</th>
                        <th class="bg-body-secondary text-center">Hor. Funcionamento</th>
                        <th class="bg-body-secondary"></th>
                    </tr>
                </thead>
                <tbody>
                
                <tr class="align-middle">
                    <td class="text-center">
                        <div class="avatar avatar-md">
                            <img class="avatar-img placeholder" aria-hidden="true" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="placeholder">
                            <span class="avatar-status bg-success placeholder"></span>
                        </div>
                    </td>
                    <td><b class="placeholder col-6"></b></td>
                    <td>
                        <div class="text-nowrap"><span class="placeholder col-8"></span></div>
                        <div class="small text-body-secondary text-nowrap">
                            <span class="placeholder col-4"></span>
                            | Registrado: <span class="placeholder col-6"></span>
                        </div>
                    </td>
                    <td class="text-center"><span class="badge text-bg-primary placeholder col-4"></span></td>
                    <td><span class="placeholder col-8"></span></td>
                    <td><span class="placeholder col-5"></span></td>
                    <td>
                        <span class="placeholder col-6"></span>
                    </td>
                    <td class="text-center">
                        <span class="placeholder col-4"></span>
                    </td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-transparent p-0 placeholder col-4" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                
                            </button>
                        </div>
                    </td>
                </tr>
                <tr class="align-middle">
                    <td class="text-center">
                        <div class="avatar avatar-md">
                            <img class="avatar-img placeholder" aria-hidden="true" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="placeholder">
                            <span class="avatar-status bg-success placeholder"></span>
                        </div>
                    </td>
                    <td><b class="placeholder col-6"></b></td>
                    <td>
                        <div class="text-nowrap"><span class="placeholder col-8"></span></div>
                        <div class="small text-body-secondary text-nowrap">
                            <span class="placeholder col-4"></span>
                            | Registrado: <span class="placeholder col-6"></span>
                        </div>
                    </td>
                    <td class="text-center"><span class="badge text-bg-primary placeholder col-4"></span></td>
                    <td><span class="placeholder col-8"></span></td>
                    <td><span class="placeholder col-5"></span></td>
                    <td>
                        <span class="placeholder col-6"></span>
                    </td>
                    <td class="text-center">
                        <span class="placeholder col-4"></span>
                    </td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-transparent p-0 placeholder col-4" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                
                            </button>
                        </div>
                    </td>
                </tr>
                <tr class="align-middle">
                    <td class="text-center">
                        <div class="avatar avatar-md">
                            <img class="avatar-img placeholder" aria-hidden="true" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="placeholder">
                            <span class="avatar-status bg-success placeholder"></span>
                        </div>
                    </td>
                    <td><b class="placeholder col-6"></b></td>
                    <td>
                        <div class="text-nowrap"><span class="placeholder col-8"></span></div>
                        <div class="small text-body-secondary text-nowrap">
                            <span class="placeholder col-4"></span>
                            | Registrado: <span class="placeholder col-6"></span>
                        </div>
                    </td>
                    <td class="text-center"><span class="badge text-bg-primary placeholder col-4"></span></td>
                    <td><span class="placeholder col-8"></span></td>
                    <td><span class="placeholder col-5"></span></td>
                    <td>
                        <span class="placeholder col-6"></span>
                    </td>
                    <td class="text-center">
                        <span class="placeholder col-4"></span>
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
        const response = await axios.get(`${HOST_REQUEST}/user/all`);
        const users = response.data;

        const tableHTML = `
            <div class="container mt-4 mg-bottom-20">
                ${createButtonAddUser()}
                <table class="table table-hover border mb-0" id="userTable">
                    <thead class="fw-semibold text-nowrap">
                        <tr class="align-middle">
                            <th class="bg-body-secondary text-center">
                                <svg class="icon">
                                    <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-people"></use>
                                </svg>
                            </th>
                            <th class="bg-body-secondary">Id</th>
                            <th class="bg-body-secondary">Nome</th>
                            <th class="bg-body-secondary">Username</th>
                            <th class="bg-body-secondary text-center">Email</th>
                            <th class="bg-body-secondary">CNPJ</th>
                            <th class="bg-body-secondary text-center">Endereço</th>
                            <th class="bg-body-secondary text-center">Hor. Funcionamento</th>
                            <th class="bg-body-secondary"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(user => `
                            <tr class="align-middle">
                                <td class="text-center">
                                    <div class="avatar avatar-md">
                                        <img class="avatar-img" src="${user.image ? `${HOST_REQUEST}/uploads/user/${user.id}/${user.image}` : HOST + '/assets/img/no-icon.png'}" alt="${user.name || 'Sem nome'}">
                                        <span class="avatar-status bg-success"></span>
                                    </div>
                                </td>
                                <td><b>${user.id || '-'}</b></td>
                                <td>
                                    <div class="text-nowrap">${user.name || '-'}</div>
                                    <div class="small text-body-secondary text-nowrap">
                                        <span>${user.admin ? '<span class="badge badge-sm text-bg-warning">ADMIN</span>' : '<span class="badge badge-sm text-bg-primary">Estabelecimento</span>'}</span> | Registrado: ${formatDate(user.createdAt)}
                                    </div>
                                </td>
                                <td class="text-center">${user.username ? `<a target="_blank" href="${HOST_MENU}/${user.username}">
                                    <span class="badge text-bg-primary">${user.username}
                                    <svg class="icon">
                                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-external-link"></use>
                                    </svg>
                                </span></a>` : "-"}</td>
                                <td>${user.email || '-'}</td>
                                <td>${user.cnpj || '-'}</td>
                                <td>
                                    ${formatAddressDetails(user.address)}
                                </td>
                                <td class="text-center">
                                    ${formatOperatingHoursDetails(user.operatingHours)}
                                </td>
                                <td>
                                    <div class="dropdown">
                                        <button class="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                            <svg class="icon">
                                                <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-options"></use>
                                            </svg>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-end">
                                            <a class="dropdown-item edit-user-btn" href="javascript:;" data-user='${JSON.stringify(user)}'>Editar</a>
                                            <a class="dropdown-item text-danger delete-user-btn" href="javascript:;" data-user-id='${user.id}'>Deletar</a>
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
        const table = document.getElementById('userTable');
        table.addEventListener('click', handleTableClickUser);

    } catch (error) {
        console.error('Erro ao carregar os usuários:', error);
        container.innerHTML = `<p class="text-danger">Erro ao carregar os usuários.</p>`;
    }
}

function handleTableClickUser(event) {
    const target = event.target;
    if (target.classList.contains('edit-user-btn')) {
        const user = JSON.parse(target.dataset.user);
        createFormUser(user);
    } else if (target.classList.contains('delete-user-btn')) {
        const userId = target.dataset.userId;
        deleteUser(userId);
    }
}

async function deleteUser(userId) {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
        try {
            const response = await axios.delete(`${HOST_REQUEST}/user/${userId}`);
            // console.log("response [DELETE]: ", response); // DEBUG

            if (response.status === 204) {
                toast("Usuário deletado com sucesso!", "Sucesso", "success");
                createTableUsers(); // Recarrega a tabela após a exclusão
            }
        } catch (error) {
            console.error('Erro ao deletar o usuário:', error);
            toast(error.response ? error.response.data : error.message, "Falha ao deletar", "danger");
        }
    }
}

function createFormUser(user) {
    const loggedUser = getSessionUser();

    const isEdit = !!user;
    const formHTML = `<div class="container mt-4">
                <form class="card mb-3" id="userForm" action="/submit" method="POST">
                    <div class="card-header">${isEdit ? 'Editar' : 'Cadastro'}</div>
                    <div class="card-body">
                        <div class="row g-3">
                            <fieldset class="row mb-3">
                                <legend>Informações Gerais</legend>
   
                                <div class="col-md-6 mb-3">
                                    <label for="name" class="form-label">Nome <span class="badge text-bg-info">Usuário /
                                            Estabelecimento</span></label>
                                    <input type="text" id="name" name="name" class="form-control" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="username" class="form-label">Username</label>
                                    <input type="text" id="username" name="username" class="form-control" required>
                                </div>
   
                                <div class="col-md-6 mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" id="email" name="email" class="form-control" required>
                                </div>
   
                                <div class="col-md-6 mb-3">
                                    <label for="password" class="form-label">Senha ${!isEdit ? '<span class="badge text-bg-warning">Obrigatório</span>' : '<span class="badge text-bg-info">Se alterar</span>'}</label>
                                    <input type="password" id="password" name="password" class="form-control" ${!isEdit ? 'required' : ''}>
                                </div>
   
                                <div class="col-md-6 mb-3">
                                    <label for="admin" class="form-label">Acesso</label>
                                    <div class="form-check">
                                        <input type="checkbox" id="admin" name="admin"
                                            class="form-check-input check-default">
                                        <label for="admin" class="form-check-label"><span
                                                class="badge text-bg-warning">Administrador</span></label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                </div>
   
                                <div class="col-md-6">
                                    <label for="cnpj" class="form-label">CNPJ</label>
                                    <input type="text" id="cnpj" name="cnpj" class="form-control" required>
                                </div>
   
                                <div class="col-md-6">
                                    <label for="socialReason" class="form-label">Razão Social</label>
                                    <input type="text" id="socialReason" name="socialReason" class="form-control"
                                        required>
                                </div>
   
   
                                <div class="col-md-6">
                                    <label for="image" class="form-label">Imagem</label>
                                    <input type="file" id="image" name="image" class="form-control" accept="image/*">
                                    ${isEdit && user.image ? `<img src="${HOST_REQUEST}/uploads/user/${user.id}/${user.image}" alt="Imagem do usuário / estabelecimento" style="max-width: 100px; margin-top: 10px;" />` : ''}
                                </div>
                                 <div class="col-md-6">
                                    <label for="banner" class="form-label">Banner</label>
                                    <input type="file" id="banner" name="banner" class="form-control" accept="image/*">
                                    ${isEdit && user.banner ? `<img src="${HOST_REQUEST}/uploads/user/${user.id}/${user.banner}" alt="Banner do usuário / estabelecimento" style="max-width: 100px; margin-top: 10px;" />` : ''}
                                </div>
                            </fieldset>
   
                            <fieldset class="col-6">
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
   
                            <fieldset class="col-6">
                                <legend>Horário de Funcionamento</legend>
   
                                <div class="row g-2 align-items-center operating-hours">
                                    <div class="col-auto">
                                        <div class="form-check form-check-adjust">
                                            <input type="checkbox" id="monday" name="monday"
                                                class="form-check-input check-default">
                                            <label for="monday" class="form-check-label"><span
                                                    class="badge text-bg-warning">Segunda</span></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="mondayOpening" class="form-label">Abertura</label>
                                        <input type="time" id="mondayOpening" name="operatingHours[monday][openingTime]"
                                            class="form-control">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="mondayClosing" class="form-label">Fechamento</label>
                                        <input type="time" id="mondayClosing" name="operatingHours[monday][closingTime]"
                                            class="form-control">
                                    </div>
                                </div>
   
                                <div class="row g-2 align-items-center operating-hours">
                                    <div class="col-auto">
                                        <div class="form-check form-check-adjust">
                                            <input type="checkbox" id="tuesday" name="tuesday"
                                                class="form-check-input check-default">
                                            <label for="tuesday" class="form-check-label"><span
                                                    class="badge text-bg-warning">Terça</span></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="tuesdayOpening" class="form-label">Abertura</label>
                                        <input type="time" id="tuesdayOpening"
                                            name="operatingHours[tuesday][openingTime]" class="form-control">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="tuesdayClosing" class="form-label">Fechamento</label>
                                        <input type="time" id="tuesdayClosing"
                                            name="operatingHours[tuesday][closingTime]" class="form-control">
                                    </div>
                                </div>
   
                                <div class="row g-2 align-items-center operating-hours">
                                    <div class="col-auto">
                                        <div class="form-check form-check-adjust">
                                            <input type="checkbox" id="wednesday" name="wednesday"
                                                class="form-check-input check-default">
                                            <label for="wednesday" class="form-check-label"><span
                                                    class="badge text-bg-warning">Quarta</span></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="wednesdayOpening" class="form-label">Abertura</label>
                                        <input type="time" id="wednesdayOpening"
                                            name="operatingHours[wednesday][openingTime]" class="form-control">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="wednesdayClosing" class="form-label">Fechamento</label>
                                        <input type="time" id="wednesdayClosing"
                                            name="operatingHours[wednesday][closingTime]" class="form-control">
                                    </div>
                                </div>
   
                                <div class="row g-2 align-items-center operating-hours">
                                    <div class="col-auto">
                                        <div class="form-check form-check-adjust">
                                            <input type="checkbox" id="thursday" name="thursday"
                                                class="form-check-input check-default">
                                            <label for="thursday" class="form-check-label"><span
                                                    class="badge text-bg-warning">Quinta</span></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="thursdayOpening" class="form-label">Abertura</label>
                                        <input type="time" id="thursdayOpening"
                                            name="operatingHours[thursday][openingTime]" class="form-control">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="thursdayClosing" class="form-label">Fechamento</label>
                                        <input type="time" id="thursdayClosing"
                                            name="operatingHours[thursday][closingTime]" class="form-control">
                                    </div>
                                </div>
   
                                <div class="row g-2 align-items-center operating-hours">
                                    <div class="col-auto">
                                        <div class="form-check form-check-adjust">
                                            <input type="checkbox" id="friday" name="friday"
                                                class="form-check-input check-default">
                                            <label for="friday" class="form-check-label"><span
                                                    class="badge text-bg-warning">Sexta</span></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="fridayOpening" class="form-label">Abertura</label>
                                        <input type="time" id="fridayOpening" name="operatingHours[friday][openingTime]"
                                            class="form-control">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="fridayClosing" class="form-label">Fechamento</label>
                                        <input type="time" id="fridayClosing" name="operatingHours[friday][closingTime]"
                                            class="form-control">
                                    </div>
                                </div>
   
                                <div class="row g-2 align-items-center operating-hours">
                                    <div class="col-auto">
                                        <div class="form-check form-check-adjust">
                                            <input type="checkbox" id="saturday" name="saturday"
                                                class="form-check-input check-default">
                                            <label for="saturday" class="form-check-label"><span
                                                    class="badge text-bg-warning">Sábado</span></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="saturdayOpening" class="form-label">Abertura</label>
                                        <input type="time" id="saturdayOpening"
                                            name="operatingHours[saturday][openingTime]" class="form-control">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="saturdayClosing" class="form-label">Fechamento</label>
                                        <input type="time" id="saturdayClosing"
                                            name="operatingHours[saturday][closingTime]" class="form-control">
                                    </div>
                                </div>
   
                                <div class="row g-2 align-items-center operating-hours">
                                    <div class="col-auto">
                                        <div class="form-check form-check-adjust">
                                            <input type="checkbox" id="sunday" name="sunday"
                                                class="form-check-input check-default">
                                            <label for="sunday" class="form-check-label"><span
                                                    class="badge text-bg-warning">Domingo</span></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="sundayOpening" class="form-label">Abertura</label>
                                        <input type="time" id="sundayOpening" name="operatingHours[sunday][openingTime]"
                                            class="form-control">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="sundayClosing" class="form-label">Fechamento</label>
                                        <input type="time" id="sundayClosing" name="operatingHours[sunday][closingTime]"
                                            class="form-control">
                                    </div>
                                </div>
   
                            </fieldset>
                        </div>
                    </div>
                    <div class="card-footer d-grid gap-2 d-md-flex justify-content-md-end">
                        <button onclick="${loggedUser.admin ? "createTableUsers()" : "window.location = '" + HOST + "'"}" type="button" class="btn btn-secondary">Voltar</button>
                        <button type="submit" class="btn btn-primary">
                            <span class="spinner-border spinner-border-sm ms-2 d-none" role="status" aria-hidden="true" id="spinner"></span>
                            ${isEdit ? "Atualizar usuário" : "Salvar usuário"}
                        </button>
                    </div>
                </form>
            </div>`;

    const container = document.querySelector('.body');
    container.innerHTML = formHTML;

    const form = document.getElementById('userForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const spinner = form.querySelector('#spinner');

    if (user) {
        // Preenche os campos com os dados do usuário para edição
        form.querySelector('#name').value = user.name || '';
        form.querySelector('#username').value = user.username || '';
        form.querySelector('#email').value = user.email || '';
        form.querySelector('#cnpj').value = user.cnpj || '';
        form.querySelector('#socialReason').value = user.socialReason || '';

        if (user.address) {
            form.querySelector('#street').value = user.address.street || '';
            form.querySelector('#number').value = user.address.number || '';
            form.querySelector('#neighborhood').value = user.address.neighborhood || '';
            form.querySelector('#referencePoint').value = user.address.referencePoint || '';
            form.querySelector('#postalCode').value = user.address.postalCode || '';
            form.querySelector('#city').value = user.address.city || '';
        }

        form.querySelector('#admin').checked = user.admin || false;

        if (user.operatingHours) {
            user.operatingHours.forEach(oh => {
                if (oh.dayOfWeek === 'MONDAY') {
                    form.querySelector('#monday').checked = true;
                    form.querySelector('#mondayOpening').value = oh.openingTime.substring(0, 5);
                    form.querySelector('#mondayClosing').value = oh.closingTime.substring(0, 5);
                }
                if (oh.dayOfWeek === 'TUESDAY') {
                    form.querySelector('#tuesday').checked = true;
                    form.querySelector('#tuesdayOpening').value = oh.openingTime.substring(0, 5);
                    form.querySelector('#tuesdayClosing').value = oh.closingTime.substring(0, 5);
                }
                if (oh.dayOfWeek === 'WEDNESDAY') {
                    form.querySelector('#wednesday').checked = true;
                    form.querySelector('#wednesdayOpening').value = oh.openingTime.substring(0, 5);
                    form.querySelector('#wednesdayClosing').value = oh.closingTime.substring(0, 5);
                }
                if (oh.dayOfWeek === 'THURSDAY') {
                    form.querySelector('#thursday').checked = true;
                    form.querySelector('#thursdayOpening').value = oh.openingTime.substring(0, 5);
                    form.querySelector('#thursdayClosing').value = oh.closingTime.substring(0, 5);
                }
                if (oh.dayOfWeek === 'FRIDAY') {
                    form.querySelector('#friday').checked = true;
                    form.querySelector('#fridayOpening').value = oh.openingTime.substring(0, 5);
                    form.querySelector('#fridayClosing').value = oh.closingTime.substring(0, 5);
                }
                if (oh.dayOfWeek === 'SATURDAY') {
                    form.querySelector('#saturday').checked = true;
                    form.querySelector('#saturdayOpening').value = oh.openingTime.substring(0, 5);
                    form.querySelector('#saturdayClosing').value = oh.closingTime.substring(0, 5);
                }
                if (oh.dayOfWeek === 'SUNDAY') {
                    form.querySelector('#sunday').checked = true;
                    form.querySelector('#sundayOpening').value = oh.openingTime.substring(0, 5);
                    form.querySelector('#sundayClosing').value = oh.closingTime.substring(0, 5);
                }
            });
        }
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Mostra o spinner e desabilita o botão
        submitButton.disabled = true;
        spinner.classList.remove('d-none');

        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        userData.admin = userData.admin === 'on';

        const operatingHours = getOperatingHoursFromForm();

        const userToSend = {
            name: userData.name,
            username: userData.username,
            email: userData.email,
            password: userData.password,
            admin: userData.admin,
            cnpj: userData.cnpj,
            socialReason: userData.socialReason,
            address: {
                street: userData.street,
                number: userData.number,
                neighborhood: userData.neighborhood,
                referencePoint: userData.referencePoint,
                postalCode: userData.postalCode,
                city: userData.city,
                user: {
                    id: loggedUser.id
                }
            },
            operatingHours: operatingHours,
            user: {
                id: loggedUser.id
            }
        }

        let url = `${HOST_REQUEST}/user`;
        let method = 'post';
        let userId = null;

        if (isEdit) {
            url = `${HOST_REQUEST}/user/${user.id}`;
            method = 'put';
            userToSend.id = user.id; // Adiciona o ID para a atualização
            userId = user.id;
        }

        try {
            const response = await axios({
                url: url,
                method: method,
                data: userToSend,
            });

            if (response.status === (isEdit ? 200 : 201)) {
                userId = isEdit ? user.id : response.data.id;
                if (formData.get('image')?.size > 0) {
                    await uploadImage(formData.get('image'), userId, submitButton, spinner, 'image');
                }
                if (formData.get('banner')?.size > 0) {
                    await uploadImage(formData.get('banner'), userId, submitButton, spinner, 'banner');
                }
                toast(`Usuário ${isEdit ? 'atualizado' : 'criado'} com sucesso!`, "Sucesso", "success");

                if (loggedUser.admin) {
                    createTableUsers();
                } else {
                    window.location = HOST;
                }

                if (userToSend.id == loggedUser.id) {
                    saveSessionUser(response.data);
                }

            }
        } catch (error) {
            console.log(`Erro ao ${isEdit ? 'atualizar' : 'criar'} o usuário: `, error);
            toast(error.response ? error.response.data : error.message, "Cadastro inválido", "danger");
        } finally {
            // Esconde o spinner e reabilita o botão
            submitButton.disabled = false;
            spinner.classList.add('d-none');
        }
    });

    function getOperatingHoursFromForm() {
        const operatingHours = [];
        const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        daysOfWeek.forEach(day => {
            const dayCheckbox = document.getElementById(day);
            if (dayCheckbox && dayCheckbox.checked) {
                const openingTime = document.getElementById(`${day}Opening`).value;
                const closingTime = document.getElementById(`${day}Closing`).value;
                if (openingTime && closingTime) {
                    operatingHours.push({
                        dayOfWeek: day.toUpperCase(),
                        openingTime: openingTime + ":00",
                        closingTime: closingTime + ":00",
                        user: {
                            id: loggedUser.id
                        }
                    });
                }
            }
        });
        return operatingHours;
    }

    async function uploadImage(file, userId, submitButton, spinner, type) {
        const formData = new FormData();
        formData.append(type, file); // Use 'image' ou 'banner' como nome do campo

        // Mostra o spinner e desabilita o botão
        submitButton.disabled = true;
        spinner.classList.remove('d-none');

        let url = `${HOST_REQUEST}/user/${userId}/upload/${type}`; // Constroi a url corretamente


        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast(`${type.charAt(0).toUpperCase() + type.slice(1)} do produto atualizada com sucesso!`, "Sucesso", "success");
            return response.data.imageUrl;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
            console.error(`Erro ao enviar a ${type}:`, error);
            toast(errorMessage, `Falha ao enviar ${type}`, "danger");
            return null;
        }
        finally {
            // Esconde o spinner e reabilita o botão
            submitButton.disabled = false;
            spinner.classList.add('d-none');
        }
    }
}

// Função para formatar os horários de funcionamento como tabela
function formatOperatingHoursDetails(operatingHours) {
    if (!operatingHours || operatingHours.length === 0) {
        return '<div>-</div>';
    }

    return `
        <details>
            <summary>Ver horários</summary>
            <table class="table table-bordered table-sm mt-2">
                <thead>
                    <tr>
                        <th>Dia da Semana</th>
                        <th>Abertura</th>
                        <th>Fechamento</th>
                    </tr>
                </thead>
                <tbody>
                    ${operatingHours.map(hour => `
                        <tr>
                            <td>${hour.dayOfWeek || '-'}</td>
                            <td>${hour.openingTime || '-'}</td>
                            <td>${hour.closingTime || '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </details>
    `;
}

function createButtonAddUser() {
    return `<div class="d-grid d-md-flex justify-content-md-end" style="margin-bottom: 10px;">
                <button onclick="createFormUser()" class="btn btn-primary" type="button">
                    <svg style="width: 18px; height: 18px;" class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-user-plus"></use>
                    </svg> Adicionar usuário</button>
            </div>`;
}

// // Chamar a função para criar a tabela ao carregar a página
// createTableUsers();

async function createSelectUsers() {
    try {
        const response = await axios.get('http://localhost:8080/user/all?admin=true');
        const users = response.data;

        if (!users || users.length === 0) {
            const container = document.querySelector('.body');
            container.innerHTML = '<p>Nenhum usuário encontrado.</p>';
            return;
        }

        const selectHTML = `<div class="container mt-4">
                                <div class="mb-3">
                                <label for="userSelect" class="form-label">Selecionar Usuário</label>
                                <select id="userSelect" class="form-select" aria-label="Selecione um usuário">
                                    <option selected>Selecione um usuário</option>
                                    ${users.map(user => `<option value="${user.id}">${user.name} - ${user.username}</option>`).join('')}
                                    </select>
                                </div>
                            </div>`;

        const container = document.querySelector('.body');
        container.innerHTML = selectHTML;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        const container = document.querySelector('.body');
        container.innerHTML = '<p>Ocorreu um erro ao carregar os usuários.</p>';
    }
}

function fillFormWithTestData() {
    document.getElementById('name').value = 'TAPIOCARIA DONNA ZEFA';
    document.getElementById('username').value = 'tcdonnazefa';
    document.getElementById('email').value = 'donnazefa@menu.poo';
    document.getElementById('password').value = '123456';
    document.getElementById('admin').checked = true;
    document.getElementById('cnpj').value = '23964819000174';
    document.getElementById('socialReason').value = 'Allan de Araujo de souza';
    document.getElementById('street').value = 'Residencial Gaudi';
    document.getElementById('number').value = 'AP 005';
    document.getElementById('neighborhood').value = 'Centro';
    document.getElementById('referencePoint').value = 'Próximo à praça principal';
    document.getElementById('postalCode').value = '58135-000';
    document.getElementById('city').value = 'Esperança-PB';
    document.getElementById('monday').checked = true;
    document.getElementById('mondayOpening').value = '09:00';
    document.getElementById('mondayClosing').value = '18:00';
    document.getElementById('tuesday').checked = true;
    document.getElementById('tuesdayOpening').value = '10:00';
    document.getElementById('tuesdayClosing').value = '17:00';
    document.getElementById('thursday').checked = true;
    document.getElementById('thursdayOpening').value = '10:00';
    document.getElementById('thursdayClosing').value = '17:00';
}


// createFormUser();
// setTimeout(() => {
//     fillFormWithTestData();
// }, 1000)