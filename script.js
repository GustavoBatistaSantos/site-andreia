// Função para alternar entre as abas de Sistemas do Corpo Humano
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Esconde todos os conteúdos das abas
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Remove a classe "active" de todos os botões das abas
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Mostra a aba clicada e adiciona a classe active ao botão correspondente
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = "block";
    activeTab.classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Fechamento suave do menu ao clicar em links (opcional para mobile)
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // O scroll-behavior: smooth no CSS já cuida do deslize
    });
});