// Função para criar a tabela de pedidos
async function createTableOrders(selectedStatus = '') {
    // console.log("selectedStatus: ", selectedStatus); // DEBUG

    const loggedUser = getSessionUser();
    const container = document.querySelector('.body');

    // Placeholder da tabela
    container.innerHTML = `
        <div class="container mt-4 mg-bottom-20">
            <table class="table table-hover border mb-0" id="ordersTable">
                <thead class="fw-semibold text-nowrap">
                    <tr class="align-middle">
                        <th class="bg-body-secondary">Id</th>
                        <th class="bg-body-secondary">Total</th>
                        <th class="bg-body-secondary text-center">Status</th>
                        <th class="bg-body-secondary text-center">Cliente</th>
                        <th class="bg-body-secondary text-center">Data Criação</th>
                        <th class="bg-body-secondary text-center">Última Atualização</th>
                        <th class="bg-body-secondary"></th>
                    </tr>
                </thead>
                <tbody>
                <tr class="align-middle">
                    <td><b class="placeholder col-6"></b></td>
                    <td>
                        <div class="text-nowrap"><span class="placeholder col-8"></span></div>
                    </td>
                    <td class="text-center"><span class="placeholder col-6"></span></td>
                    <td class="text-center"><span class="placeholder col-8"></span></td>
                    <td class="text-center"><span class="placeholder col-8"></span></td>
                    <td class="text-center"><span class="placeholder col-8"></span></td>
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
                    <td class="text-center"><span class="placeholder col-6"></span></td>
                    <td class="text-center"><span class="placeholder col-8"></span></td>
                    <td class="text-center"><span class="placeholder col-8"></span></td>
                    <td class="text-center"><span class="placeholder col-8"></span></td>
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
                    <td class="text-center"><span class="placeholder col-6"></span></td>
                    <td class="text-center"><span class="placeholder col-8"></span></td>
                    <td class="text-center"><span class="placeholder col-8"></span></td>
                    <td class="text-center"><span class="placeholder col-8"></span></td>
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
        const ordersResponse = await axios.get(`${HOST_REQUEST}/user/${loggedUser.id}/orders${selectedStatus != "" && selectedStatus != null ? `?status=${selectedStatus}` : ""}`);
        console.log("URL REQUEST: ", `${HOST_REQUEST}/user/${loggedUser.id}/orders?status=${selectedStatus}`);

        const orders = ordersResponse.data;
        console.log(`${HOST_REQUEST}/user/${loggedUser.id}/orders?status=${selectedStatus}`, orders); // DEBUG

        const tableHTML = `
        <div class="container mt-4 mg-bottom-20">
            ${createButtonAddOrder()}
            <div class="mb-3 d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <label for="orderStatusFilter" class="me-2">Filtrar por <span class="badge text-bg-primary">Status</span>: </label>
                    <select class="form-select form-select-sm" id="orderStatusFilter">
                        <option value="" ${selectedStatus === '' ? 'selected' : ''}>-- TODOS --</option>
                        <option value="PENDING" ${selectedStatus === 'PENDING' ? 'selected' : ''}>Pendente</option>
                        <option value="PROCESSING" ${selectedStatus === 'PROCESSING' ? 'selected' : ''}>Processando</option>
                        <option value="COMPLETED" ${selectedStatus === 'COMPLETED' ? 'selected' : ''}>Concluído</option>
                        <option value="CANCELLED" ${selectedStatus === 'CANCELLED' ? 'selected' : ''}>Cancelado</option>
                    </select>
                </div>
            </div>
            <table class="table table-hover border mb-0" id="ordersTable">
                <thead class="fw-semibold text-nowrap">
                    <tr class="align-middle">
                        <th class="bg-body-secondary text-center">
                            <svg class="icon">
                                <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cart"></use>
                            </svg>
                        </th>
                        <th class="bg-body-secondary">Id</th>
                        <th class="bg-body-secondary">Total</th>
                        <th class="bg-body-secondary text-center">Status</th>
                        <th class="bg-body-secondary text-center">Cliente</th>
                        <th class="bg-body-secondary text-center">Data Criação</th>
                        <th class="bg-body-secondary text-center">Última Atualização</th>
                        <th class="bg-body-secondary">Alterar status</th>
                        <th class="bg-body-secondary"></th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr class="align-middle">
                            <td class="text-center">
                                <svg class="icon">
                                    <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cart"></use>
                                </svg>
                            </td>
                            <td><b>${order.id || '-'}</b></td>
                            <td>R$ ${order.total ? order.total.toFixed(2) : '0.00'}</td>
                            <td class="text-center">
                            
                            <div style="display: flex; align-items: center; flex-direction: column; gap: 10px;}" 
                                class="badge
                                    ${order.status === 'PENDING' ? 'text-bg-warning' : ''}
                                    ${order.status === 'PROCESSING' ? 'text-bg-info' : ''}
                                    ${order.status === 'COMPLETED' ? 'text-bg-success' : ''}
                                    ${order.status === 'CANCELLED' ? 'text-bg-danger' : ''}
                            ">
                                ${order.status}
                                ${order.status === 'PROCESSING' ? `
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Carregando...</span>
                                    </div>
                                ` : ""}
                                </div>
                            </td>
                            <td class="text-center">${order.client ? order.client.name : "-"}</td>
                            <td class="text-center">${formatDateComplete(order.createdAt)}</td>
                            <td class="text-center">${formatDateComplete(order.updatedAt)}</td>
                            <td class="text-center">
                                <select class="form-select form-select-sm order-status-select" data-order-id="${order.id}">
                                    <option value="PENDING" ${order.status === 'PENDING' ? 'selected' : ''}>Pendente</option>
                                    <option value="PROCESSING" ${order.status === 'PROCESSING' ? 'selected' : ''}>Processando</option>
                                    <option value="COMPLETED" ${order.status === 'COMPLETED' ? 'selected' : ''}>Concluído</option>
                                    <option value="CANCELLED" ${order.status === 'CANCELLED' ? 'selected' : ''}>Cancelado</option>
                                </select>
                            </td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <svg class="icon">
                                            <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-options"></use>
                                        </svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-end">
                                        <a class="dropdown-item view-order-btn" href="javascript:;" data-order='${JSON.stringify(order)}'>Ver Detalhes</a>
                                        <a class="dropdown-item edit-order-btn" href="javascript:;" data-order='${JSON.stringify(order)}'>Editar</a>
                                        <a class="dropdown-item text-danger delete-order-btn" href="javascript:;" data-order-id='${order.id}'>Remover</a>
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

        const table = document.getElementById('ordersTable');
        table.addEventListener('change', handleOrderStatusChange);
        const statusFilter = document.getElementById('orderStatusFilter');
        statusFilter.addEventListener('change', handleStatusFilterChange);
        table.addEventListener('click', handleTableClickOrder);

    } catch (error) {
        console.error('Erro ao carregar os pedidos:', error);
        container.innerHTML = `<p class="text-danger">Erro ao carregar os pedidos.</p>`;
    }
}

// Função para manipular a mudança do status do pedido
async function handleOrderStatusChange(event) {
    if (event.target.classList.contains('order-status-select')) {
        const selectElement = event.target;
        const orderId = selectElement.getAttribute('data-order-id');
        const newStatus = selectElement.value;

        try {
            await axios.put(`${HOST_REQUEST}/order/${orderId}/status`, newStatus, {
                headers: {
                    'Content-Type': 'text/plain'  // Enviar o status como texto simples
                }
            });

            console.log(`Pedido ${orderId} atualizado para o status ${newStatus}`);
            createTableOrders(newStatus);

            toast(`Status atualizado!`, "Sucesso", "success");

        } catch (error) {
            console.error('Erro ao atualizar o status do pedido:', error);

            toast(`Erro ao atualizar o status do pedido.`, "Opss...", "danger");
        }
    }
}

// Função para manipular a mudança do filtro de status
async function handleStatusFilterChange(event) {
    const selectedStatus = event.target.value;
    createTableOrders(selectedStatus);
}

// Função para manipular clicks na tabela (para abrir o modal de detalhes)
function handleTableClickOrder(event) {
    const target = event.target;
    if (target.classList.contains('view-order-btn')) {
        const order = JSON.parse(target.getAttribute('data-order'));
        showOrderDetailsModal(order);
    } else if (target.classList.contains('edit-order-btn')) {
        const order = JSON.parse(target.dataset.order);

        createFormOrder(order);
    } else if (target.classList.contains('delete-order-btn')) {
        const orderId = target.getAttribute('data-order-id');
        deleteOrder(orderId);
    }
}

async function deleteOrder(orderId) {
    if (confirm('Tem certeza que deseja remover este pedido?')) {
        try {
            await axios.delete(`${HOST_REQUEST}/order/${orderId}`);
            console.log(`Pedido ${orderId} removido com sucesso`);
            createTableOrders(); // Recarregar a tabela
            toast('Pedido removido com sucesso!', 'Sucesso', 'success');
        } catch (error) {
            console.error('Erro ao remover o pedido:', error);
            toast('Erro ao remover o pedido', 'Ops...', 'danger');
        }
    }
}

// Função para manipular clicks no dropdown
function handleDropdownClick(event) {
    if (event.target.closest('.dropdown-toggle')) {
        const dropdown = event.target.closest('.dropdown');
        dropdown.classList.toggle('show');
        const menu = dropdown.querySelector('.dropdown-menu');
        menu.classList.toggle('show');
    }
}

function showOrderDetailsModal(order) {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.tabIndex = -1;
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title">Detalhes do Pedido #${order.id}</h6>
                    <button type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Status:</strong> 
                        <span class="badge 
                            ${order.status === 'PENDING' ? 'text-bg-warning' : ''}
                            ${order.status === 'PROCESSING' ? 'text-bg-info' : ''}
                            ${order.status === 'COMPLETED' ? 'text-bg-success' : ''}
                            ${order.status === 'CANCELLED' ? 'text-bg-danger' : ''}
                        ">
                            ${order.status}
                        </span>
                    </p>
                    <p><strong>Data Criação:</strong> ${formatDateComplete(order.createdAt)}</p>
                    <p><strong>Última Atualização:</strong> ${formatDateComplete(order.updatedAt)}</p>
                    ${order.orderItems && order.orderItems.length > 0 ? `
                        <h6>Itens do Pedido:</h6>
                        <ul class="list-group">
                            ${order.orderItems.map(item => `
                                <li class="list-group-item">
                                    ${item.product.image ? `<img src="${HOST_REQUEST}/uploads/product/${item.product.id}/${item.product.image}" alt="${item.product.name}" style="border-radius: var(--cui-border-radius); max-width: 70px; max-height: 70px; margin-right: 10px;">` : '<span style="max-width: 70px; max-height: 70px; margin-right: 10px;"></span>'}
                                    <strong>${item.product.name}</strong> x ${item.quantity} (R$ ${item.price ? item.price.toFixed(2) : '0.00'})
                                    ${item.orderItemAdditional && item.orderItemAdditional.length > 0 ? `
                                        <br>
                                        <details open>
                                            <summary>Adicionais</summary>
                                            <ul class="list-group">
                                                ${item.orderItemAdditional.map(additional => `
                                                    <li class="list-group-item">
                                                        <span class="badge text-bg-primary">${additional.additional.name}</span> x ${additional.quantity} (R$ ${additional.price ? additional.price.toFixed(2) : '0.00'})
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        </details>
                                    ` : ''}
                                </li>
                            `).join('')}
                        </ul>
                    ` : '<p>Nenhum item neste pedido.</p>'}
                    <p style="display: flex; margin-top: 15px; font-size: 20px; justify-content: flex-end;">
                        <strong>Total:</strong> <span style="font-size: 20px; margin-left: 5px;" class="badge text-bg-primary">R$ ${order.total ? order.total.toFixed(2) : '0.00'}</p>
                        </p>
                    ${order.observations ? `
                        <div style="margin-top: 10px;" class="alert alert-primary" role="alert">
                            <strong>Observações:</strong> ${order.observations}
                        </div>
                    ` : ''}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-coreui-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const modalInstance = new coreui.Modal(modal);
    modalInstance.show();
    modal.addEventListener('hidden.coreui.modal', function () {
        modal.remove();
    });
}

// Adiciona o event listener para fechar o dropdown quando clicar fora
document.addEventListener('click', function (event) {
    handleDropdownClick(event);
});

function createButtonAddOrder() {
    return `<div class="d-grid d-md-flex justify-content-md-end" style="margin-bottom: 10px;">
                <button onclick="createFormOrder()" class="btn btn-primary" type="button">
                    <svg style="width: 18px; height: 18px;" class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-plus"></use>
                    </svg> Adicionar pedido</button>
            </div>`;
}

async function createFormOrder(order) {
    const loggedUser = getSessionUser();
    const isEdit = !!order;
    let clients = [];
    let products = [];
    let categories = [];
    let selectedOrderItems = [];
    let filteredProducts = [];
    const container = document.querySelector('.body');
    container.innerHTML = '<div class="d-flex justify-content-center align-items-center" style="min-height: 300px;"> <div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span> </div> </div>';

    if (isEdit) {
        selectedOrderItems = order.orderItems.map(item => ({
            product: item.product,
            quantity: item.quantity,
            additionals: item.orderItemAdditional.map(add => ({
                additional: add.additional,
                quantity: add.quantity
            }))
        }));
    }

    try {
        await Promise.all([
            axios.get(`${HOST_REQUEST}/user/${loggedUser.id}/clients`).then(response => clients = response.data),
            axios.get(`${HOST_REQUEST}/${loggedUser.username}/categories`).then(response => categories = response.data),
            axios.get(`${HOST_REQUEST}/user/${loggedUser.id}/products`).then(response => {
                products = response.data;
                filteredProducts = [...products];
            })
        ]);
    } catch (error) {
        console.log("Erro ao buscar clientes, categorias ou produtos", error);
        toast("Erro ao buscar clientes, categorias ou produtos", "Erro", "danger");
        container.innerHTML = '';
        return;
    }

    const renderCategoriesAndProducts = (productsToRender) => {
        let html = '';

        html += `<div class="row row-cols-1 row-cols-md-2 g-3">`;
        categories.forEach(category => {
            const categoryProducts = productsToRender.filter(product =>
                product.categories.some(cat => cat.id === category.id)
            );

            if (categoryProducts.length > 0) {
                html += `
                <div class="col">
                <div style="margin-bottom: 20px;" class="accordion-item">
                    <h2 class="accordion-header" id="heading-${category.id}">
                        <button class="accordion-button" type="button" data-coreui-toggle="collapse" data-coreui-target="#collapse-${category.id}" aria-expanded="true" aria-controls="collapse-${category.id}">
                            ${category.name}
                        </button>
                    </h2>
                    <div id="collapse-${category.id}" class="accordion-collapse collapse show" aria-labelledby="heading-${category.id}">
                        <div class="accordion-body">
                        <div class="row row-cols-1 row-cols-md-3 g-3">
                            ${categoryProducts.map(product => `
                            <div class="col h-100">
                                <div class="card product-card h-100 d-flex flex-column" data-product='${JSON.stringify(product)}' data-product-id="${product.id}">
                                ${product.image ? `<div style="height: 200px; display: flex; justify-content: center; align-items: center; padding: 10px;"><img style="max-width: 100%; max-height: 100%; border-radius: var(--cui-border-radius);" src="${HOST_REQUEST}/uploads/product/${product.id}/${product.image}" class="card-img-top rounded" alt="${product.name}"></div>` : ''}
                                    <div class="card-body" style="overflow: hidden;">
                                        <h5 class="card-title" style="overflow: hidden; text-overflow: ellipsis;">${product.id} - ${product.name}</h5>
                                            <p class="card-text" style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${product.description ? product.description : ''}</p>
                                    </div>
                                    <div class="card-footer">
                                        <button style="float: right;" type="button" class="btn btn-sm btn-primary add-product-btn">
                                            <svg style="width: 18px; height: 18px;" class="nav-icon">
                                                <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-plus"></use>
                                            </svg> Adicionar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            </div>
                `;
            }
        });
        html += `</div>`;


        return `<div class="accordion" id="accordionProducts">${html}</div>`;
    }

    const statusOptions = isEdit ? `
        <div class="col-md-6 mb-3">
            <label for="status" class="form-label">Status do pedido</label>
            <select class="form-select form-select-sm" id="status" name="status">
                <option value="" ${order.status === '' ? 'selected' : ''}>-- TODOS --</option>
                <option value="PENDING" ${order.status === 'PENDING' ? 'selected' : ''}>Pendente</option>
                <option value="PROCESSING" ${order.status === 'PROCESSING' ? 'selected' : ''}>Processando</option>
                <option value="COMPLETED" ${order.status === 'COMPLETED' ? 'selected' : ''}>Concluído</option>
                <option value="CANCELLED" ${order.status === 'CANCELLED' ? 'selected' : ''}>Cancelado</option>
            </select>
        </div>
    `: '';

    const observationsValue = isEdit ? order.observations : '';

    const formHTML = `
        <div class="container mt-4">
            <div class="card mb-3">
                <div class="card-header">${isEdit ? 'Editar Pedido' : 'Novo Pedido'}</div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-6 mb-3">
                            <label for="client" class="form-label">Cliente</label>
                            <select class="form-select" id="client" name="client" ${isEdit ? "disabled" : ""}>
                                <option value="">Selecione um cliente</option>
                                ${clients.map(client => `
                                    <option value="${client.id}" ${isEdit && order?.client.id === client.id ? 'selected' : ''}>${client.id} - ${client.name} ${client.email ? `(${client.email})` : ""}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="observations" class="form-label">Observações</label>
                            <textarea rows="3" class="form-control" id="observations" name="observations" rows="1">${observationsValue}</textarea>
                        </div>
                        ${statusOptions}
                        <div class="col-md-12 mb-3">
                            <label for="productFilter" class="form-label">Filtrar Produtos</label>
                            <input type="text" class="form-control" id="productFilter" placeholder="Filtrar por nome" />
                        </div>
                    </div>

                    <div class="mb-3" id="productsContainer">
                        ${renderCategoriesAndProducts(filteredProducts)}
                    </div>

                    <div class="mb-3">
                        <legend>Itens do Pedido</legend>
                        <table class="table" id="selectedItemsTable">
                            <thead>
                                <tr>
                                    <th class="bg-body-secondary">
                                        <svg class="icon">
                                            <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-cart"></use>
                                        </svg>
                                    </th>
                                    <th class="bg-body-secondary">Produto</th>
                                    <th class="bg-body-secondary">Quantidade</th>
                                    <th class="bg-body-secondary">Preço Unitário</th>
                                    <th class="bg-body-secondary">Adicionais</th>
                                    <th class="bg-body-secondary">Total</th>
                                    <th class="bg-body-secondary"></th>
                                </tr>
                            </thead>
                            <tbody id="selectedItemsTbody">
                            ${isEdit ?
            selectedOrderItems.map((item, index) => `
                                    <tr data-item-index="${index}" data-product-id="${item.product.id}">
                                        <td>${item.product.image ? `<img src="${HOST_REQUEST}/uploads/product/${item.product.image}" alt="${item.product.name}" style="max-width: 70px; max-height: 70px; margin-right: 10px; border-radius: var(--cui-border-radius);">` : '<span style="max-width: 70px; max-height: 70px; margin-right: 10px;"></span>'}</td>
                                        <td>${item.product.name}</td>
                                        <td><input type="number" value="${item.quantity}" class="form-control quantity-input" data-item-index="${index}"  data-product-id="${item.product.id}" min="1" style="width: 60px;"></td>
                                        <td>R$ ${item.product.price.toFixed(2)}</td>
                                        <td>
                                            ${item.additionals ? item.additionals.map(add => `<div style="margin-bottom: 5px;"><span class="badge text-bg-primary">${add.additional.name}</span> x ${add.quantity} (R$ ${(add.additional.price * add.quantity).toFixed(2)})</div>`).join('') : ''}
                                        </td>
                                        <td>R$ ${((item.product.price * item.quantity) + (item.additionals || []).reduce((acc, add) => acc + (add.additional.price * add.quantity), 0)).toFixed(2)}</td>
                                        <td class="text-end">
                                            <button type="button" class="btn btn-sm btn-warning edit-additional-btn" data-item-index="${index}" data-product-id="${item.product.id}">
                                                <svg style="width: 18px; height: 18px;" class="nav-icon">
                                                    <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-list-rich"></use>
                                                </svg>  Adicionais
                                            </button>
                                            <button type="button" class="btn btn-sm btn-danger remove-item-btn" data-item-index="${index}" data-product-id="${item.product.id}">
                                                <svg style="width: 18px; height: 18px;" class="nav-icon">
                                                    <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-trash"></use>
                                                </svg> Remover
                                            </button>
                                        </td>
                                    </tr>
                                    `).join('') : ''}
                            </tbody>
                            <tfoot>
                                <tr style="font-size: 20px;" >
                                    <td colspan="5" class="text-end"><strong>Total do Pedido:</strong></td>
                                    <td id="totalPedido"><span style="font-size: 20px;" class="badge text-bg-primary">R$ ${isEdit ? order.total.toFixed(2) : '0.00'}</span></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="card-footer d-grid gap-2 d-md-flex justify-content-md-end">
                    <button onclick="${loggedUser.admin ? "createTableOrders()" : "window.location = '" + HOST + "'"}" type="button" class="btn btn-secondary">Voltar</button>
                    <button type="button" id="submitOrder" class="btn btn-primary">${isEdit ? 'Atualizar Pedido' : 'Criar Pedido'}</button>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = formHTML;

    const productsContainer = document.getElementById('productsContainer');
    const selectedItemsTable = document.getElementById('selectedItemsTable');
    const selectedItemsTbody = document.getElementById('selectedItemsTbody');
    const totalPedidoElement = document.getElementById('totalPedido');
    const productFilterInput = document.getElementById('productFilter');
    const submitButton = document.getElementById('submitOrder');

    function updateOrderTotal() {
        let total = 0;
        selectedOrderItems.forEach(item => {
            const itemTotal = (item.product.price * item.quantity) + (item.additionals || []).reduce((acc, add) => acc + (add.additional.price * add.quantity), 0);
            total += itemTotal;
        });
        totalPedidoElement.innerHTML = `<span style="font-size: 20px;" class="badge text-bg-primary">R$ ${total.toFixed(2)}</span>`;
    }


    // Função que renderiza um item na tabela (usada na criação e atualização)
    function renderSelectedItem(item, index) {
        const tr = document.createElement('tr');
        tr.setAttribute('data-product-id', item.product.id);
        tr.setAttribute('data-item-index', index);
        tr.innerHTML = `
            <td>${item.product.image ? `<img src="${HOST_REQUEST}/uploads/product/${item.product.image}" alt="${item.product.name}" style="max-width: 70px; max-height: 70px; margin-right: 10px; border-radius: var(--cui-border-radius);">` : '<span style="max-width: 70px; max-height: 70px; margin-right: 10px;"></span>'}</td>
            <td>${item.product.name}</td>
            <td><input type="number" value="${item.quantity}" class="form-control quantity-input" data-item-index="${index}" data-product-id="${item.product.id}" min="1" style="width: 100px;"></td>
            <td>R$ ${item.product.price.toFixed(2)}</td>
            <td>
                ${item.additionals ? item.additionals.map(add => `<div style="margin-bottom: 5px;"><span class="badge text-bg-primary">${add.additional.name}</span> x ${add.quantity} (R$ ${(add.additional.price * add.quantity).toFixed(2)})</div>`).join('') : ''}
            </td>
            <td>R$ ${((item.product.price * item.quantity) + (item.additionals || []).reduce((acc, add) => acc + (add.additional.price * add.quantity), 0)).toFixed(2)}</td>
                <td class="text-end">
                <button type="button" class="btn btn-sm btn-warning edit-additional-btn" data-item-index="${index}"  data-product-id="${item.product.id}">
                    <svg style="width: 18px; height: 18px;" class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-list-rich"></use>
                    </svg> Adicionais
                </button>
                <button type="button" class="btn btn-sm btn-danger remove-item-btn" data-item-index="${index}" data-product-id="${item.product.id}">
                    <svg style="width: 18px; height: 18px;" class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-trash"></use>
                    </svg> Remover
                </button>
                </td>
        `;
        selectedItemsTbody.appendChild(tr);
        addTableItemListeners(tr);
    }

    function addTableItemListeners(tr) {
        const quantityInput = tr.querySelector('.quantity-input');
        quantityInput.addEventListener('change', (event) => {
            const newQuantity = parseInt(event.target.value, 10);
            const itemIndex = event.target.getAttribute('data-item-index');
            if (newQuantity <= 0) {
                quantityInput.value = 1
                return;
            }

            const selectedItem = selectedOrderItems[itemIndex];

            if (selectedItem) {
                selectedItem.quantity = newQuantity;
                updateOrderTotal();
            }
        })

    }
    // Delegação de eventos para a tabela (para remoção e edição de adicionais)
    selectedItemsTable.addEventListener('click', (event) => {
        const target = event.target;
        const itemIndex = target.closest('tr')?.getAttribute('data-item-index');
        const productId = target.closest('tr')?.getAttribute('data-product-id');
        if (target.classList.contains('remove-item-btn')) {
            selectedOrderItems.splice(itemIndex, 1);
            target.closest('tr').remove();
            updateOrderTotal();
            selectedItemsTbody.innerHTML = '';
            selectedOrderItems.forEach((item, index) => renderSelectedItem(item, index));
        } else if (target.classList.contains('edit-additional-btn')) {
            const selectedItem = selectedOrderItems[itemIndex];
            const product = products.find(prod => prod.id === parseInt(productId));
            openAddAdditionalModal(product, selectedItem, itemIndex);
        }

    });

    productsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-product-btn')) {
            const productCard = event.target.closest('.product-card');
            const product = JSON.parse(productCard.getAttribute('data-product'));

            selectedOrderItems.push({
                product: product,
                quantity: 1,
                additionals: []
            });
            const index = selectedOrderItems.length - 1;
            const item = selectedOrderItems[index];
            renderSelectedItem(item, index);
            updateOrderTotal();

            // Rolar para a tabela de itens do pedido
            selectedItemsTable.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    productFilterInput.addEventListener('input', (event) => {
        const filterText = event.target.value.toLowerCase();

        filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(filterText) ||
            (product.description ? product.description.toLowerCase().includes(filterText) : false)
        );

        productsContainer.innerHTML = renderCategoriesAndProducts(filteredProducts);
    });

    function openAddAdditionalModal(product, selectedItem, itemIndex) {
        const modal = document.createElement('div');
        modal.classList.add('modal', 'fade');
        modal.tabIndex = -1;
        const additionalQuantityBadge = product.additionalQuantity ?
            `<span class="badge bg-info mb-2">Máximo de adicionais: ${product.additionalQuantity}</span>` : '';

        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title">Adicionais para ${product.name}</h5>
                    <button type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close" onclick="closeModalAdditional()"></button>
                    </div>
                    <div class="modal-body">
                    ${additionalQuantityBadge}
                    <div class="additional-items">
                        ${product.productAdditionals.map(productAdditional => {
            const additional = productAdditional.additional;
            const isAdditionalSelected = selectedItem.additionals.some(add => add.additional.id === additional.id);
            const selectedQuantity = isAdditionalSelected ? selectedItem.additionals.find(add => add.additional.id === additional.id).quantity : 1;
            return `
                    <div class="form-check mb-2 d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <input type="checkbox" class="form-check-input additional-checkbox"
                                id="additional-${additional.id}"
                                data-additional='${JSON.stringify(additional)}' ${isAdditionalSelected ? 'checked' : ''} style="margin-right: 10px;"
                                ${product.additionalQuantity && selectedItem.additionals.filter(add => add.additional.id === additional.id).length >= product.additionalQuantity && !isAdditionalSelected ? 'disabled' : ''}
                                >

                            <label class="form-check-label" for="additional-${additional.id}">
                            ${additional.name} - R$ ${additional.price.toFixed(2)}
                            </label>
                        </div>
                        <input type="number" class="form-control quantity-additional-input"
                            id="quantity-${additional.id}" min="1" value="${selectedQuantity}" style="width: 70px; display: ${isAdditionalSelected ? 'inline-block' : 'none'};"
                            ${product.additionalQuantity && selectedItem.additionals.filter(add => add.additional.id === additional.id).length >= product.additionalQuantity && !isAdditionalSelected ? 'disabled' : ''}
                            >
                    </div>
                `
        }).join('')}
                    </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModalAdditional()">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="confirmAdditionals">Confirmar</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const modalInstance = new coreui.Modal(modal);
        modalInstance.show();

        const confirmAdditionalsButton = modal.querySelector('#confirmAdditionals');
        const quantityInputs = modal.querySelectorAll('.quantity-additional-input');
        const additionalCheckboxes = modal.querySelectorAll('.additional-checkbox');

        confirmAdditionalsButton.addEventListener('click', () => {
            const selectedAdditionals = [];
            additionalCheckboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    const additional = JSON.parse(checkbox.getAttribute('data-additional'));
                    const quantityInput = modal.querySelector(`#quantity-${additional.id}`);
                    const quantity = parseInt(quantityInput.value, 10);
                    selectedAdditionals.push({
                        additional: additional,
                        quantity: quantity,
                    });
                }
            })

            if (selectedAdditionals.length > product.additionalQuantity) {
                toast(`Quantidade máxima de adicionais: ${product.additionalQuantity}`, "Quantidade excedida", "warning");

                return false;
            }

            selectedItem.additionals = selectedAdditionals;
            const selectedItemElement = selectedItemsTbody.querySelector(`tr[data-item-index="${itemIndex}"]`);
            if (selectedItemElement) {
                selectedItemElement.querySelector('td:nth-child(5)').innerHTML = selectedAdditionals.map(add => `<div style="margin-bottom: 5px;"><span class="badge text-bg-primary">${add.additional.name}</span> x ${add.quantity} (R$ ${(add.additional.price * add.quantity).toFixed(2)})</div>`).join('');
                selectedItemElement.querySelector('td:nth-child(6)').textContent = `R$ ${((selectedItem.product.price * selectedItem.quantity) + (selectedItem.additionals || []).reduce((acc, add) => acc + (add.additional.price * add.quantity), 0)).toFixed(2)}`
            }
            updateOrderTotal();
            modalInstance.hide();
            modal.remove();
        });

        additionalCheckboxes.forEach((checkbox) => {
            const additional = JSON.parse(checkbox.getAttribute('data-additional'));
            checkbox.addEventListener('change', () => {
                const quantityInput = modal.querySelector(`#quantity-${additional.id}`);
                quantityInput.style.display = checkbox.checked ? 'inline-block' : 'none';
                const checkBox = modal.querySelector(`#additional-${additional.id}`)
                const quantityTotal = selectedItem.additionals.filter(add => add.additional.id === additional.id).length
                if (product.additionalQuantity && quantityTotal >= product.additionalQuantity && !checkBox.checked) {
                    quantityInput.disabled = true;
                    checkBox.disabled = true;
                } else {
                    quantityInput.disabled = false;
                    checkBox.disabled = false;
                }
            })
        });

        quantityInputs.forEach(input => {
            input.addEventListener('change', (event) => {
                if (parseInt(event.target.value, 10) <= 0) {
                    input.value = 1;
                }
            })
        })
    }
    window.closeModalAdditional = function () {
        const modal = document.querySelector('.modal');
        if (modal) {
            const modalInstance = coreui.Modal.getInstance(modal)
            modalInstance.hide();
            modal.remove();
        }
    };

    submitButton.addEventListener('click', async () => {
        const clientId = document.getElementById('client')?.value;
        const status = document.getElementById('status')?.value;
        const observations = document.getElementById('observations')?.value;

        if (!isEdit && !clientId) {
            toast("Selecione um cliente para o pedido", "Erro", "danger");
            return;
        }

        if (selectedOrderItems.length <= 0) {
            toast("Adicione produtos ao pedido", "Erro", "danger");
            return;
        }

        const orderItemsToSend = selectedOrderItems.map(item => {
            return {
                product: { id: item.product.id },
                quantity: item.quantity,
                price: item.product.price,
                orderItemAdditional: (item.additionals || []).map(add => {
                    return {
                        additional: { id: add.additional.id },
                        quantity: add.quantity,
                        price: add.additional.price,
                    }
                })
            }
        });

        const requestData = {
            user: { id: loggedUser.id },
            observations: observations,
            orderItems: orderItemsToSend,
            client: { id: clientId }
        };

        if (isEdit) {
            requestData.status = status;
        }

        // Desabilitar o botão e mostrar o spinner
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Salvando...
        `;

        try {
            console.log("REQUEST: ", `${HOST_REQUEST}/order`);
            console.log("REQUEST [DATA]: ", requestData);

            let response;
            if (isEdit) {
                response = await axios.put(`${HOST_REQUEST}/order/${order.id}`, requestData);
            } else {
                response = await axios.post(`${HOST_REQUEST}/order`, requestData);
            }

            if (response.status === (isEdit ? 200 : 201)) {
                toast(`Pedido ${isEdit ? 'atualizado' : 'criado'} com sucesso`, "Sucesso", "success");
                createTableOrders();
            } else {
                console.log(`Outra resposta: `, response.data.message);
            }
        } catch (error) {
            console.log(`Erro ao ${isEdit ? 'atualizar' : 'criar'} o pedido: `, error);
            toast(error.response ? error.response.data : error.message, "Cadastro inválido", "danger");
        } finally {
            // Reabilitar o botão e remover o spinner
            submitButton.disabled = false;
            submitButton.innerHTML = isEdit ? 'Atualizar Pedido' : 'Criar Pedido';
        }
    });
}