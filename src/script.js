function updateVisitCount() {
    fetch('https://api.natixone.xyz/contactpage/views/getplusincrement')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Get the response as plain text
        })
        .then(data => {
            // Update the span with the new visit count
            const viewsElement = document.getElementById('page-views');
            if (viewsElement) {
                viewsElement.textContent = data; // Set the span's text to the returned visit count
            } else {
                console.error("Element with class 'views' not found.");
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
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