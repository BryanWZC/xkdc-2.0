export default () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    function toggleDarkLightMode() {
        if (darkModeToggle.checked === true)
            localStorage.setItem('darkMode', 'true');
        else localStorage.setItem('darkMode', 'false');
        setDarkLightMode();
    }

    function setDarkLightMode() {
        if (localStorage.getItem('darkMode') === 'true') {
            darkModeToggle.checked = true;
            document.getElementsByTagName('BODY')[0].style.backgroundColor =
                '#1F1F1F';
            document.getElementById('heading').style.color = '#fff';
            document.getElementById('sub-heading').style.color = '#fff';
            document.getElementById('comic-title').style.color = '#fff';
            document.getElementById('date').style.color = '#fff';
            document.getElementById('view-icon').src = './assets/view-dark.svg';
            document.getElementById('view-count').style.color = '#fff';
            document.getElementById('transcript-title').style.color = '#fff';
            document.getElementById('transcript-desc').style.color = '#fff';
        } else {
            document.getElementsByTagName('BODY')[0].style.backgroundColor =
                '#FFFFF2';
            document.getElementById('heading').style.color = 'inherit';
            document.getElementById('sub-heading').style.color = 'inherit';
            document.getElementById('comic-title').style.color = 'inherit';
            document.getElementById('date').style.color = 'inherit';
            document.getElementById('view-icon').src = './assets/view.svg';
            document.getElementById('view-count').style.color = 'inherit';
            document.getElementById('transcript-title').style.color = 'inherit';
            document.getElementById('transcript-desc').style.color = 'inherit';
        }
    }

    darkModeToggle.onchange = toggleDarkLightMode;
    setDarkLightMode();
};
