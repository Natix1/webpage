function updateVisitCount() {
    fetch('https://api.natixone.xyz/v1/increment_views')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const viewsElement = document.getElementById('page-views');
            if (viewsElement) {
                viewsElement.textContent = data || '0';
            }
        })
        .catch(error => {
            console.error('Failed to update view count:', error);
            const viewsElement = document.getElementById('page-views');
            if (viewsElement) {
                viewsElement.textContent = '?';
            }
        });
}

document.addEventListener("DOMContentLoaded", function() {
    updateVisitCount();


    const loadingScreen = document.getElementById('loading-screen');
    let loadingText = "Loading";
    const loadingInterval = setInterval(() => {
        if (loadingText.length < 10) {
            loadingText += ".";
        } else {
            loadingText = "Loading";
        }
        loadingScreen.innerHTML = loadingText;
    }, 1000);

    const hideLoadingScreen = () => {
        setTimeout(() => {
            loadingScreen.style.transition = 'opacity 0.5s';
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                loadingScreen.remove();
                clearInterval(loadingInterval);
            }, 500);
        }, 2000);
    };

    if (document.readyState === 'complete') {
        hideLoadingScreen();
    } else {
        window.addEventListener('load', hideLoadingScreen);
    }
});
