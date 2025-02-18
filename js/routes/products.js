async function createTableProducts() {
    const loggedUser = getSessionUser();
    const container = document.querySelector('.body');

    // Placeholder da tabela (mantido como está)
    container.innerHTML = `
        <div class="container mt-4 mg-bottom-20">
            <table class="table table-hover border mb-0" id="productsTable">
                <thead class="fw-semibold text-nowrap">
                    <tr class="align-middle">
                        <th class="bg-body-secondary">Id</th>
                        <th class="bg-body-secondary">Nome</th>
                        <th class="bg-body-secondary text-center">Preço</th>
                        <th class="bg-body-secondary text-center">Adicionais</th>
                        <th class="bg-body-secondary text-center">Desconto</th>
                        <th class="bg-body-secondary text-center">Categorias</th>
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
        const productsResponse = await axios.get(`${HOST_REQUEST}/user/${loggedUser.id}/products`);
        const products = productsResponse.data;

        const tableHTML = `
            <div class="container mt-4 mg-bottom-20">
                ${createButtonAddProduct()}
                <table class="table table-hover border mb-0" id="productsTable">
                    <thead class="fw-semibold text-nowrap">
                        <tr class="align-middle">
                            <th class="bg-body-secondary text-center">
                                <svg class="icon">
                                    <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-box"></use>
                                </svg>
                            </th>
                            <th class="bg-body-secondary">Id</th>
                            <th class="bg-body-secondary">Nome</th>
                            <th class="bg-body-secondary text-center">Preço</th>
                            <th class="bg-body-secondary text-center">Adicionais</th>
                            <th class="bg-body-secondary text-center">Desconto</th>
                            <th class="bg-body-secondary text-center">Categorias</th>
                            <th class="bg-body-secondary"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${products.map(product => {
            const precoDiscount = product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : null;
            return `
                                <tr class="align-middle">
                                    <td class="text-center">
                                        <div class="avatar avatar-md">
                                            <img class="avatar-img" src="${product.image ? `${HOST_REQUEST}/uploads/product/${product.id}/${product.image}` : HOST + '/assets/img/no-icon.png'}" alt="${product.name || 'Sem nome'}">
                                            <span class="avatar-status bg-success"></span>
                                        </div>
                                    </td>
                                    <td><b>${product.id || '-'}</b></td>
                                    <td>
                                        <div class="text-nowrap">${product.name || '-'}</div>
                                        <div class="small text-body-secondary text-nowrap">
                                            ${product.description || ''}
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        ${product.discount ? `<del><small>R$ ${product.price.toFixed(2)}</small></del> R$ <b>${precoDiscount}</b>` : `R$ ${product.price.toFixed(2)}`}
                                    </td>
                                    <td class="text-center">
                                        ${formatAdditionalsDetails(product)}
                                    </td>
                                    <td class="text-center">${product.discount ? `${product.discount}%` : '-'}</td>
                                    <td class="text-center">
                                        ${formatCategoriesDetails(product)}
                                    </td>
                                    <td>
                                        <div class="dropdown">
                                            <button class="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                <svg class="icon">
                                                    <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-options"></use>
                                                </svg>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-end">
                                                <a class="dropdown-item edit-product-btn" href="javascript:;" data-product='${JSON.stringify(product)}'>Editar</a>
                                                <a class="dropdown-item text-danger delete-product-btn" href="javascript:;" data-product-id='${product.id}'>Deletar</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
        container.innerHTML = tableHTML;

        const table = document.getElementById('productsTable');
        table.addEventListener('click', handleTableClickProduct);

    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
        container.innerHTML = `<p class="text-danger">Erro ao carregar os produtos.</p>`;
    }
}

function formatCategoriesDetails(product) {
    if (!product.categories || product.categories.length === 0) {
        return '-';
    }
    return product.categories.map(category => `<span class="badge bg-secondary">${category.name}</span>`).join(' ');
}

function formatAdditionalsDetails(product) {
    if (!product.productAdditionals || product.productAdditionals.length === 0) return '<div>-</div>';

    return `
        <details>
            <summary>Ver adicionais</summary>
            <table class="table table-bordered table-sm">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    ${product.productAdditionals.map(pa => `
                        <tr>
                            <td><span class="badge badge text-bg-primary">${pa.additional.name || '-'}</span></td>
                            <td>R$ ${pa.additional.price ? pa.additional.price.toFixed(2) : '0.00'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </details>
    `;
}

function handleTableClickProduct(event) {
    const target = event.target;

    if (target.classList.contains('edit-product-btn')) {
        const product = JSON.parse(target.dataset.product);
        createFormProduct(product);
    } else if (target.classList.contains('delete-product-btn')) {
        const productId = target.dataset.productId;
        deleteProduct(productId);
    }
}

async function deleteProduct(productId) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
        try {
            const response = await axios.delete(`${HOST_REQUEST}/product/${productId}`);

            if (response.status === 204) {
                toast("Produto deletado com sucesso!", "Sucesso", "success");
                createTableProducts();
            }
        } catch (error) {
            console.error('Erro ao deletar o produto:', error);
            toast(error.response ? error.response.data : error.message, "Falha ao deletar", "danger");
        }
    }
}

async function handleCheckboxChange(event) {
    const checkbox = event.target;
    const productId = checkbox.dataset.productId;
    const additionalId = checkbox.dataset.additionalId;
    const isChecked = checkbox.checked;

    try {
        if (isChecked) {
            // Adicionar adicional ao produto
            const response = await axios.post(`${HOST_REQUEST}/product/${productId}/additional/${additionalId}`);
            if (response.status === 201) toast("Adicional adicionado com sucesso!", "Sucesso", "success")

        } else {
            // Remover adicional do produto
            const response = await axios.delete(`${HOST_REQUEST}/product/${productId}/additional/${additionalId}`);
            if (response.status === 204) toast("Adicional removido com sucesso!", "Sucesso", "success")
        }
        // Recarrega a tabela de produtos para atualizar a UI
        createTableProducts();

    } catch (error) {
        console.error('Erro ao atualizar adicional do produto:', error);
        toast(error.response ? error.response.data : error.message, "Falha ao atualizar adicional", "danger");
    }
}

function createButtonAddProduct() {
    return `<div class="d-grid d-md-flex justify-content-md-end" style="margin-bottom: 10px;">
                <button onclick="createFormProduct()" class="btn btn-primary" type="button">
                    <svg style="width: 18px; height: 18px;" class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-plus"></use>
                    </svg> Adicionar Produto</button>
            </div>`;
}

async function createFormProduct(product) {
    const loggedUser = getSessionUser();
    const isEdit = !!product;

    try {
        const [additionalsResponse, categoriesResponse] = await Promise.all([
            axios.get(`${HOST_REQUEST}/user/${loggedUser.id}/additionals`),
            axios.get(`${HOST_REQUEST}/user/${loggedUser.id}/categories`)
        ]);

        const additionals = additionalsResponse.data;
        const categories = categoriesResponse.data;

        const formHTML = `
            <div class="container mt-4">
                <form class="card mb-3" id="productForm" action="/submit" method="POST" enctype="multipart/form-data">
                    <div class="card-header">${isEdit ? 'Editar Produto' : 'Cadastrar Produto'}</div>
                    <div class="card-body">
                        <div class="row g-3">
                            <fieldset class="row mb-3">
                                <legend>Informações do Produto</legend>
                                <div class="col-md-6 mb-3">
                                    <label for="name" class="form-label">Nome <span class="badge text-bg-info">Produto</span></label>
                                    <input type="text" id="name" name="name" class="form-control" required>
                                </div>
                                    <div class="col-md-6 mb-3">
                                    <label for="price" class="form-label">Preço</label>
                                    <input type="number" id="price" name="price" class="form-control" step="0.01" required>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                    <label for="additionalQuantity" class="form-label">Quantidade de adicionais permitidas</label>
                                    <input type="number" id="additionalQuantity" name="additionalQuantity" class="form-control" required value="1" min="1">
                                    </div>
                                     <div class="col-md-6 mb-3">
                                        <label for="discount" class="form-label">Desconto (%)</label>
                                        <input type="number" id="discount" name="discount" class="form-control" step="1" min="0" max="100">
                                    </div>
                                <div class="col-md-6 mb-3">
                                    <label for="image" class="form-label">Imagem</label>
                                    <input type="file" id="image" name="image" class="form-control">
                                        ${isEdit && product.image ? `<img src="${HOST_REQUEST}/uploads/product/${product.id}/${product.image}" alt="Imagem do produto" style="max-width: 100px; margin-top: 10px;" />` : ''}
                                </div>
                                <div class="col-md-12 mb-3">
                                    <label for="description" class="form-label">Descrição</label>
                                    <textarea id="description" name="description" class="form-control" rows="3" maxlength="255" placeholder="Escreva a descrição do produto."></textarea>
                                </div>
                                <div class="col-6 mb-3">
                                    <legend>Categorias</legend>
                                    ${categories.map(category => {
            const checked = isEdit && product.categories?.some(pc => pc.id === category.id) ? 'checked' : '';
            return `
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="${category.id}" id="category-${category.id}" name="categories" ${checked}>
                                                <label class="form-check-label" for="category-${category.id}">
                                                    <span class="badge text-bg-secondary">${category.name}</span>
                                                </label>
                                            </div>
                                        `;
        }).join('')}
                                </div>
                                <div class="col-6 mb-3">
                                    <legend>Adicionais</legend>
                                    ${additionals.map(additional => {
            const checked = isEdit && product.productAdditionals?.some(pa => pa.additional.id === additional.id) ? 'checked' : '';
            return `
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="${additional.id}" id="additional-${additional.id}" name="additionals" ${checked}>
                                                <label class="form-check-label" for="additional-${additional.id}">
                                                    <span class="badge text-bg-primary">${additional.name}</span>
                                                </label>
                                            </div>
                                        `;
        }).join('')}
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div class="card-footer d-grid gap-2 d-md-flex justify-content-md-end">
                        <button onclick="createTableProducts()" type="button" class="btn btn-secondary">Voltar</button>
                        <button type="submit" class="btn btn-primary">
                            <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" id="spinner"></span>
                            ${isEdit ? "Atualizar Produto" : "Salvar Produto"}
                        </button>
                    </div>
                </form>
            </div>
        `;

        const container = document.querySelector('.body');
        container.innerHTML = formHTML;

        const form = document.getElementById('productForm');
        const submitButton = form.querySelector('button[type="submit"]');
        const spinner = form.querySelector('#spinner');


        if (product) {
            form.querySelector('#name').value = product.name || '';
            form.querySelector('#price').value = product.price || '';
            form.querySelector('#additionalQuantity').value = product.additionalQuantity || '1';
            form.querySelector('#description').value = product.description || ''; // Preencher a descrição ao editar
            form.querySelector('#discount').value = product.discount || '';
        }

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Mostra o spinner e desabilita o botão
            submitButton.disabled = true;
            spinner.classList.remove('d-none');

            const formData = new FormData(form);
            const selectedCategories = Array.from(formData.getAll('categories')).map(id => ({ id: parseInt(id) }));
            const selectedAdditionals = Array.from(formData.getAll('additionals')).map(id => ({ additional: { id: parseInt(id) } }));


            const productToSend = {
                name: formData.get('name'),
                price: parseFloat(formData.get('price')),
                additionalQuantity: parseInt(formData.get('additionalQuantity')),
                description: formData.get('description'),
                discount: parseInt(formData.get('discount') ? formData.get('discount') : 0.00), // Adiciona o desconto
                user: {
                    id: loggedUser.id
                },
                categories: selectedCategories,
                productAdditionals: selectedAdditionals
            };


            let url = `${HOST_REQUEST}/product`;
            let method = 'post';
            let productId = null;

            if (isEdit) {
                url = `${HOST_REQUEST}/product/${product.id}`;
                method = 'put';
                productToSend.id = product.id;
                productId = product.id
            }

            try {
                console.log("productToSend: ", productToSend)

                const response = await axios({
                    url: url,
                    method: method,
                    data: productToSend,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    responseType: 'json' // Garantir que a resposta seja tratada como JSON
                });

                if (response.status === (isEdit ? 200 : 201)) {
                    productId = isEdit ? product.id : response.data.id;

                    if (formData.get('image')?.size > 0) {
                        await uploadImage(formData.get('image'), productId, submitButton, spinner);
                    }

                    toast(`Produto ${isEdit ? 'atualizado' : 'criado'} com sucesso!`, "Sucesso", "success");
                    createTableProducts();
                }


            } catch (error) {
                console.error(`Erro ao ${isEdit ? 'atualizar' : 'criar'} o produto: `, error);
                toast(error.response ? error.response.data : error.message, "Cadastro inválido", "danger");
            }
            finally {
                // Esconde o spinner e reabilita o botão
                submitButton.disabled = false;
                spinner.classList.add('d-none');
            }
        });

        async function uploadImage(file, productId, submitButton, spinner) {
            const formData = new FormData();
            formData.append('image', file);

            // Mostra o spinner e desabilita o botão
            submitButton.disabled = true;
            spinner.classList.remove('d-none');

            try {
                const response = await axios.post(`${HOST_REQUEST}/product/${productId}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast("Imagem do produto atualizada com sucesso!", "Sucesso", "success");
                return response.data.imageUrl;
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
                console.error('Erro ao enviar a imagem:', error);
                toast(errorMessage, "Falha ao enviar imagem", "danger");
                return null;
            } finally {
                // Esconde o spinner e reabilita o botão
                submitButton.disabled = false;
                spinner.classList.add('d-none');
            }
        }

    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast(error.response ? error.response.data : error.message, "Falha ao carregar dados", "danger");
    }
}

createTableProducts();