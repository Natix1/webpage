function updateVisitCount(count) {
    const viewsElement = document.getElementById('page-views');
    if (viewsElement) {
        viewsElement.textContent = count || '0';
    }
}

function getVisitCount() {
    return fetch('https://api.natixone.xyz/visits/increment')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .catch(error => {
            console.error('Failed to update view count:', error);
            return '?';
        });
}

const visitCount = getVisitCount();
// we can fetch before the DOM is loaded

document.addEventListener("DOMContentLoaded", function() {
    visitCount.then(updateVisitCount);

    const loadingScreen = document.getElementById('loading-screen');
    const loadingBaseText = "Loading, please wait";
    
    function updateLoadingAnimation(text, dots) {
        return text + '.'.repeat(dots);
    }
    
    let dotCount = 0;
    const loadingInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        loadingScreen.innerHTML = updateLoadingAnimation(loadingBaseText, dotCount);
    }, 300);

    const hideLoadingScreen = () => {
        clearInterval(loadingInterval);
        loadingScreen.style.transition = 'opacity 0.3s';
        loadingScreen.style.opacity = '0';
        
        setTimeout(() => {
            loadingScreen.remove();
        }, 300);
    };

    setTimeout(() => {
        if (document.readyState === 'complete') {
            hideLoadingScreen();
        } else {
            window.addEventListener('load', hideLoadingScreen, { once: true });
        }
    }, 1000);
});
