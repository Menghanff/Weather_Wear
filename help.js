document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
    
    // Search functionality would go here
});


// search bar
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchInput = document.querySelector('.search-help input');
    const searchButton = document.querySelector('.search-help button');
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.id = 'search-results';
    document.querySelector('.help-hero').after(searchResultsContainer); // Insert after search box

    // Sample Help Articles Database
    const helpArticles = [
        {
            id: 1,
            title: "Changing Locations",
            content: "Learn how to update your location for accurate weather-based recommendations. Click the location icon in the top-right corner or manually enter a city name.",
            url: "#location-help",
            tags: ["location", "GPS", "city"],
            lastUpdated: "2023-05-15"
        },
        {
            id: 2,
            title: "Understanding Recommendations",
            content: "Our system analyzes temperature, humidity, wind speed, and precipitation to suggest appropriate outfits for the current conditions.",
            url: "#recommendations",
            tags: ["algorithm", "outfit", "weather"],
            lastUpdated: "2023-06-02"
        },
        {
            id: 3,
            title: "Saving Preferences",
            content: "Create an account to save your clothing preferences and get personalized suggestions based on your wardrobe.",
            url: "#preferences",
            tags: ["account", "settings", "customization"],
            lastUpdated: "2023-04-28"
        }
    ];

    // Search Functionality
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (!searchTerm) {
            showNotification("Please enter a search term");
            return;
        }

        showLoading(true);
        
        // Simulate network delay
        setTimeout(() => {
            const results = filterArticles(searchTerm);
            displayResults(results, searchTerm);
            addToSearchHistory(searchTerm);
            showLoading(false);
        }, 500);
    }

    // Article Filtering
    function filterArticles(term) {
        const searchTerm = term.toLowerCase();
        return helpArticles.filter(article => {
            return (
                article.title.toLowerCase().includes(searchTerm) ||
                article.content.toLowerCase().includes(searchTerm) ||
                article.tags.some(tag => tag.includes(searchTerm))
            );
        });
    }

    // Display Results
    function displayResults(results, term) {
        searchResultsContainer.innerHTML = '';
        
        if (results.length === 0) {
            searchResultsContainer.innerHTML = `
                <div class="no-results">
                    <h3>No results found for "${term}"</h3>
                    <p>Try these instead:</p>
                    <div class="suggestions">
                        ${getRandomSuggestions()}
                    </div>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(article => `
            <article class="help-article" data-id="${article.id}">
                <h3><a href="${article.url}">${article.title}</a></h3>
                <p class="article-meta">Last updated: ${article.lastUpdated}</p>
                <p>${highlightMatches(article.content, term)}</p>
                <div class="tags">
                    ${article.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </article>
        `).join('');

        searchResultsContainer.innerHTML = `
            <div class="results-header">
                <h2>Search Results for "${term}"</h2>
                <span class="results-count">${results.length} articles found</span>
            </div>
            <div class="results-grid">
                ${resultsHTML}
            </div>
        `;
    }

    // Helper Functions
    function highlightMatches(text, term) {
        if (!term) return text;
        const regex = new RegExp(term, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }

    function getRandomSuggestions() {
        const suggestions = ["location", "preferences", "weather", "account", "GPS"];
        return suggestions.slice(0, 3)
            .map(item => `<button class="suggestion-tag">${item}</button>`)
            .join('');
    }

    function showLoading(show) {
        if (show) {
            searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            searchButton.disabled = true;
        } else {
            searchButton.innerHTML = '<i class="fas fa-search"></i> Search';
            searchButton.disabled = false;
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'search-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    function addToSearchHistory(term) {
        // Implement localStorage logic here if needed
        console.log(`Search logged: ${term}`);
    }

    // Event Listeners
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    // Click handler for suggestion tags
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-tag')) {
            searchInput.value = e.target.textContent;
            performSearch();
        }
    });
});