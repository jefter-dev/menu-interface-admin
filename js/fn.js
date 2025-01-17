const HOST = "http://localhost:5500";
const HOST_MENU = "http://cardapioja.com";
const HOST_REQUEST = "http://localhost:8080";

// INCIALIZAR SESSÃO
const initializeInterfaceSession = () => {
    const loggedUser = getSessionUser();
    console.log("USER [SESSION]: ", loggedUser);

    if (loggedUser != null) {
        const element = document.getElementById("message-greeting-user");

        if (element) {
            element.innerHTML = `Seja bem-vindo ${loggedUser.name}!\n<a target="_blank" href="${HOST_MENU}/${loggedUser.username}">
                                    Sua url é: <span class="badge text-bg-primary">${HOST_MENU}/${loggedUser.username}
                                    <svg class="icon">
                                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-external-link"></use>
                                    </svg>
                                </span></a>
                                <img style="max-width: 300px; margin-top: 30px; border-radius: 0.375rem;" src="${loggedUser.image != null ? `${HOST_REQUEST}/uploads/user/${loggedUser.image}` : HOST + '/assets/img/no-icon.png'}" alt="${loggedUser.name || 'Sem nome'}" style="max-width: 100px; margin-top: 10px;" />`;
        }

        createMenuSidebar();
        createHeader();
        createFooter();
    } else {
        window.location.href = `${HOST}/login.html`;
    }

    return false;
}

function toast(mensagem, titulo, type = "", tempo = "agora") {
    const toastElement = document.getElementById('live-toast');
    const toastBody = toastElement.querySelector('.toast-body');
    const toastHeader = toastElement.querySelector('.toast-header');
    const toastStrong = toastHeader.querySelector('strong');
    const toastSmall = toastHeader.querySelector('small');
    const toastType = toastElement.querySelector('.toast-type');

    // 1. Remove todas as classes 'text-bg-*'
    toastType.classList.forEach(className => {
        if (className.startsWith('text-bg-')) {
            toastType.classList.remove(className);
        }
    });

    // 2. Adiciona a classe "text-bg-success"
    toastType.classList.add(`text-bg-${type}`);

    // Define o corpo da mensagem
    toastBody.innerHTML = mensagem;

    // Define o titulo
    toastStrong.textContent = titulo

    // Define o tempo da mensagem
    toastSmall.textContent = tempo

    // Inicializa e exibe o toast
    const toastCoreUI = coreui.Toast.getOrCreateInstance(toastElement);
    toastCoreUI.show();
}

// Função para formatar a data no formato desejado
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatDateComplete(dateString) {
    const date = new Date(dateString);

    // Obter os componentes da data e hora
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Retornar a data no formato desejado
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const saveSessionUser = (user) => {
    return localStorage.setItem('session-user', JSON.stringify(user));
}

const getSessionUser = () => {
    const user = localStorage.getItem('session-user');
    // console.log("USER: ", user); // DEBUG
    if (user != null) {
        return JSON.parse(localStorage.getItem('session-user'));
    }

    return null;
}

const clearSession = () => {
    return localStorage.clear();
}

function createMenuSidebar() {
    const loggedUser = getSessionUser();

    const menuSidebarHTML = `
    <div class="sidebar-header border-bottom">
            <div class="sidebar-brand sidebar-menu">
                <img src="${HOST}/assets/img/logo-cardapio-ja-horizontal.png" width="50" alt="Cardápio já">
                <label>CARDÁPIO JÁ</label>
                <svg class="sidebar-brand-narrow" width="32" height="32" alt="CoreUI Logo">
                    <use xlink:href="assets/brand/coreui.svg#signet"></use>
                </svg>
            </div>
            <button class="btn-close d-lg-none" type="button" data-coreui-dismiss="offcanvas" data-coreui-theme="dark"
                aria-label="Close"
                onclick="coreui.Sidebar.getInstance(document.querySelector('sidebar')).toggle()"></button>
        </div>
        <ul class="sidebar-nav" data-coreui="navigation" data-simplebar>
            <li class="nav-item"><a class="nav-link" href="index.html">
                    <svg class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-speedometer"></use>
                    </svg> Dashboard<span class="badge badge-sm bg-info ms-auto">NOVO</span></a></li>
            <li class="nav-title">Cadastros</li>
            ${loggedUser.admin == true ?
            `<li class="nav-item"><a class="nav-link" href="users.html">
                    <svg class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-group"></use>
                    </svg> Usuários<span class="badge badge-sm bg-warning ms-auto">ADMIN</span></a></li>` : ""}
            <li class="nav-item"><a class="nav-link" href="clients.html">
                    <svg class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-group"></use>
                    </svg> Clientes</a></li>
            <li class="nav-item">
                <a class="nav-link" href="products.html">
                    <svg class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-notes"></use>
                    </svg> Produtos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="additionals.html">
                    <svg class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-list-rich"></use>
                    </svg> Adicionais</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="categories.html">
                    <svg class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-list-numbered"></use>
                    </svg> Categorias</a>
            </li>

            <li class="nav-title">Relatórios</li>
            <li class="nav-group"><a class="nav-link nav-group-toggle" href="#">
                    <svg class="nav-icon">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-list"></use>
                    </svg> Pedidos</a>
                <ul class="nav-group-items compact">
                    <li class="nav-item">
                        <a class="nav-link" href="orders.html">
                        <span class="nav-icon">
                            <span class="nav-icon-bullet"></span>
                        </span>Todos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="orders.html?filter=PENDING">
                        <span class="nav-icon">
                            <span class="nav-icon-bullet text-bg-warning"></span>
                        </span>Pendente</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="orders.html?filter=PROCESSING">
                        <span class="nav-icon">
                            <span class="nav-icon-bullet text-bg-info"></span>
                        </span>Processando</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="orders.html?filter=COMPLETED">
                        <span class="nav-icon">
                            <span class="nav-icon-bullet text-bg-success"></span>
                        </span>Completo</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="orders.html?filter=CANCELLED">
                        <span class="nav-icon">
                            <span class="nav-icon-bullet text-bg-danger"></span>
                        </span>Cancelado</a>
                    </li>
                </ul>
            </li>

            <li class="nav-title">Sair</li>
            <li onclick="logout()" class="nav-item">
                <a class="nav-link" href="javascript:;">
                    <svg class="icon me-2">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-account-logout"></use>
                    </svg> Logout</a>
            </li>
        </ul>
        <div class="sidebar-footer border-top d-none d-md-flex">
            <button class="sidebar-toggler" type="button" data-coreui-toggle="unfoldable"></button>
        </div>`;

    const container = document.querySelector('.sidebar');
    return container.innerHTML = menuSidebarHTML;
}

function createHeader() {
    const loggedUser = getSessionUser();

    const headerHTML = `
    <div class="container-fluid border-bottom px-4">
        <button class="header-toggler" type="button"
            onclick="coreui.Sidebar.getInstance(document.querySelector('#sidebar')).toggle()"
            style="margin-inline-start: -14px;">
            <svg class="icon icon-lg">
                <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-menu"></use>
            </svg>
        </button>
        <ul class="header-nav d-none d-lg-flex">
        <li class="nav-item"><a class="nav-link" href="${HOST_MENU}/${loggedUser.username}" target="_blank">Cardápio</a></li>
        <li class="nav-item"><a class="nav-link edit-user-btn" href="javascript:;" data-user='${JSON.stringify(loggedUser)}'>Perfil</a></li>
        </ul>
        <ul class="header-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="#">
                    <svg class="icon icon-lg">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-bell"></use>
                    </svg></a></li>
            <li class="nav-item"><a class="nav-link" href="#">
                    <svg class="icon icon-lg">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-list-rich"></use>
                    </svg></a></li>
            <li class="nav-item"><a class="nav-link" href="#">
                    <svg class="icon icon-lg">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-envelope-open"></use>
                    </svg></a></li>
        </ul>
        <ul class="header-nav">
            <li class="nav-item py-1">
                <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <li class="nav-item dropdown">
                <button class="btn btn-link nav-link py-2 px-2 d-flex align-items-center" type="button"
                    aria-expanded="false" data-coreui-toggle="dropdown">
                    <svg class="icon icon-lg theme-icon-active">
                        <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-contrast"></use>
                    </svg>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" style="--cui-dropdown-min-width: 8rem;">
                    <li>
                        <button class="dropdown-item d-flex align-items-center" type="button"
                            data-coreui-theme-value="light">
                            <svg class="icon icon-lg me-3">
                                <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-sun"></use>
                            </svg>Light
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item d-flex align-items-center" type="button"
                            data-coreui-theme-value="dark">
                            <svg class="icon icon-lg me-3">
                                <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-moon"></use>
                            </svg>Dark
                        </button>
                    </li>
                    <li>
                        <button class="dropdown-item d-flex align-items-center active" type="button"
                            data-coreui-theme-value="auto">
                            <svg class="icon icon-lg me-3">
                                <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-contrast">
                                </use>
                            </svg>Auto
                        </button>
                    </li>
                </ul>
            </li>
            <li class="nav-item py-1">
                <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <li class="nav-item dropdown">
                <a id="edit-user" class="nav-link py-0 pe-0" data-coreui-toggle="dropdown" href="#"
                    role="button" aria-haspopup="true" aria-expanded="false">
                    <div class="avatar avatar-md"><img class="avatar-img" src="${loggedUser.image != null ? `${HOST_REQUEST}/uploads/user/${loggedUser.image}` : HOST + '/assets/img/no-icon.png'}" alt="${loggedUser.name || 'Sem nome'}">
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-end pt-0">
                    <div class="dropdown-header bg-body-tertiary text-body-secondary fw-semibold my-2">
                        <div class="fw-semibold">Acesso</div>
                    </div>
                    <a class="dropdown-item edit-user-btn" href="javascript:;" data-user='${JSON.stringify(loggedUser)}'>
                        <svg class="icon me-2">
                            <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-user"></use>
                        </svg> Perfil
                    </a>
                    <a class="dropdown-item" href="#">
                        <svg class="icon me-2">
                            <use xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-settings"></use>
                        </svg> Configurações <span class="badge badge-sm bg-primary ms-2">1</span>
                        <div class="dropdown-divider"></div><a onclick="logout()" class="dropdown-item" href="javascritp:;">
                        <svg class="icon me-2">
                            <use
                                xlink:href="node_modules/@coreui/icons/sprites/free.svg#cil-account-logout">
                            </use>
                        </svg> Logout
                    </a>
                </div>
            </li>
        </ul>
    </div>
    <div class="container-fluid px-4">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb my-0">
                <li class="breadcrumb-item active"><span>Home</span>
                </li>
            </ol>
        </nav>
    </div>`;

    const container = document.querySelector('.header');
    container.innerHTML = headerHTML;

    const header = document.querySelector('header.header');

    document.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0);
        }
    });

    // Seleciona todos os elementos com a classe .edit-user-btn
    const linkEditUsersHTML = document.querySelectorAll('.edit-user-btn');

    // Itera sobre todos os elementos encontrados
    linkEditUsersHTML.forEach(linkEditUserHTML => {
        linkEditUserHTML.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('edit-user-btn')) {
                const user = JSON.parse(target.dataset.user);
                createFormUser(user);
            }
        });
    });

    return false;
}

function createFooter() {
    const currentYear = new Date().getFullYear(); // Obtém o ano atual

    const footerHTML = `
            <div><a href="https://jefterdev.com">Cadápio digital</a> &copy; ${currentYear}
                Turma P2 de POO.</div>
            <div class="ms-auto">Distribuído por&nbsp;<a href="https://jefterdev.com">JEFTER DEV</a></div>

            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="live-toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <span class="toast-type rounded me-2 badge">  </span>
                        <strong class="me-auto"></strong>
                        <small></small>
                        <button type="button" class="btn-close" data-coreui-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                    </div>
                </div>
            </div>
    `;

    const container = document.querySelector('.footer');
    return container.innerHTML = footerHTML;
}

// Função para formatar o endereço como tabela
function formatAddressDetails(address) {
    if (!address) return '<div>-</div>';

    return `
        <details>
            <summary>Ver endereço</summary>
            <table class="table table-bordered table-sm">
                <tbody>
                    <tr>
                        <th>Rua</th>
                        <td>${address.street || '-'}</td>
                    </tr>
                    <tr>
                        <th>Número</th>
                        <td>${address.number || '-'}</td>
                    </tr>
                    <tr>
                        <th>Cidade</th>
                        <td>${address.city || '-'}</td>
                    </tr>
                    <tr>
                        <th>CEP</th>
                        <td>${address.postalCode || '-'}</td>
                    </tr>
                    <tr>
                        <th>Ponto de Ref.</th>
                        <td>${address.referencePoint || 'Não Informado'}</td>
                    </tr>
                </tbody>
            </table>
        </details>
    `;
}

async function logout() {
    try {
        clearSession();
        toast("Logout realizado com sucesso!<br><b>Redirecionando...</b>", "Login válido", "danger");

        setTimeout(() => {
            window.location.href = HOST + "/login.html";
        }, 2000);
    } catch (error) {
        // Erro de requisição (problema com a conexão, etc.)
        console.error("Erro ao realizar logout:", error);
        toast(error.response ? error.response.data : error.message, "Logout inválido", "danger");
    }
}

// Função para obter o valor do parâmetro 'filter' da URL
function getFilterFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('filter');
}