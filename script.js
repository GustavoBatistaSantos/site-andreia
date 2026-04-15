// Função para alternar entre as abas de Sistemas do Corpo Humano (Atividades)
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Esconde todos os conteúdos das abas de ATIVIDADES
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Remove a classe "active" de todos os botões das abas de ATIVIDADES
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Mostra a aba clicada e ativa o botão
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = "block";
    activeTab.classList.add("active");
    evt.currentTarget.classList.add("active");
}

// NOVA FUNÇÃO: Para alternar entre as abas de VÍDEOS
function openVideoTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Esconde todos os conteúdos das abas de VÍDEO
    tabcontent = document.getElementsByClassName("tab-content-video");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Remove a classe "active" de todos os botões de VÍDEO
    tablinks = document.getElementsByClassName("tab-btn-video");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Mostra a aba de vídeo clicada e ativa o botão
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = "block";
    activeTab.classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Fechamento suave do menu ao clicar em links e fechamento do checkbox mobile
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Desmarca o checkbox do menu hambúrguer para fechá-lo no mobile
        const menuCheck = document.getElementById('menu-check');
        if (menuCheck) {
            menuCheck.checked = false;
        }
    });
});