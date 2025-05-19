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
    const searchInput = document.querySelector('.search-help input');
    const searchButton = document.querySelector('.search-help button');
    
    // Sample help articles data - replace with your actual content
    const helpArticles = [
        {
            title: "Changing Locations",
            content: "Learn how to update your location for accurate weather-based recommendations",
            url: "help/locations.html",
            tags: ["location", "GPS", "city"]
        },
        {
            title: "Understanding Recommendations",
            content: "How our system determines the best outfits for different weather conditions",
            url: "help/recommendations.html",
            tags: ["algorithm", "outfit", "weather"]
        },
        {
            title: "Saving Preferences",
            content: "How to save your clothing preferences for personalized suggestions",
            url: "help/preferences.html",
            tags: ["account", "settings", "customization"]
        }
    ];

    // Perform search function
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            alert('Please enter a search term');
            return;
        }

        // Filter matching articles
        const results = helpArticles.filter(article => {
            return (
                article.title.toLowerCase().includes(searchTerm) ||
                article.content.toLowerCase().includes(searchTerm) ||
                article.tags.some(tag => tag.includes(searchTerm))
            );
        });

        displayResults(results);
    }

    // Display results function
    function displayResults(results) {
        // Create results container if it doesn't exist
        let resultsContainer = document.querySelector('.search-results');
        
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
            document.querySelector('.help-container').appendChild(resultsContainer);
        }

        // Clear previous results
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>No articles found for "${searchInput.value}"</p>
                    <p>Try different keywords like "location" or "preferences"</p>
                </div>
            `;
            return;
        }

        // Add results to page
        resultsContainer.innerHTML = `
            <h3>Search Results for "${searchInput.value}"</h3>
            <div class="results-grid">
                ${results.map(article => `
                    <article class="help-article">
                        <h4><a href="${article.url}">${article.title}</a></h4>
                        <p>${article.content}</p>
                        <div class="tags">
                            ${article.tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                    </article>
                `).join('')}
            </div>
        `;
    }

    // Event listeners
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});