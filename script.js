// Função para abas de Sistemas
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = "block";
    activeTab.classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Função para abas de Vídeos
function openVideoTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content-video");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-btn-video");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = "block";
    activeTab.classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Fechamento automático do menu mobile ao clicar em um link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        const menuCheck = document.getElementById('menu-check');
        if (menuCheck) {
            menuCheck.checked = false;
        }
    });
});