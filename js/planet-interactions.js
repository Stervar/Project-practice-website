document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('planet-modal').style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == document.getElementById('planet-modal')) {
        document.getElementById('planet-modal').style.display = 'none';
    }
};