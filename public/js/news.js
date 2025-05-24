import { newsContainer } from './domRefs.js';

export function updateNewsUI(articles) {
    newsContainer.innerHTML = '';

    if (!articles || articles.length === 0) {
        const noNews = document.createElement('div');
        noNews.className = 'col-span-full text-center text-white p-6';
        noNews.textContent = 'No news articles found for this location.';
        newsContainer.appendChild(noNews);
        return;
    }

    const displayArticles = articles.slice(0, 6);

    displayArticles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card glass rounded-xl overflow-hidden shadow-lg';

        const content = `
            <div class="p-5">
                <h3 class="text-white font-semibold text-lg mb-2">${article.title}</h3>
                <p class="text-white text-opacity-80 text-sm mb-4">${article.description || 'No description available'}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xs text-white text-opacity-70">${article.source?.name || 'Unknown Source'}</span>
                    <span class="text-xs text-white text-opacity-70">${new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
            </div>
        `;

        card.innerHTML = content;
        newsContainer.appendChild(card);
    });
}
