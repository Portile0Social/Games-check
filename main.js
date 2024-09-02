
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
        if (event.altKey && event.code === 'Backquote') {
            event.preventDefault();
            window.location.href = 'index.html';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    let itemsPerPage = 6;
    let currentFilter = 'All';
    let isChangelogOpen = false;

    function loadResults() {
        const query = document.getElementById('search-bar').value.toLowerCase();
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item =>
                    (currentFilter === 'All' || item.category === currentFilter) &&
                    item.title.toLowerCase().includes(query)
                );
                displayResults(filteredData);
            });
    }

    function displayResults(data) {
        const results = document.getElementById('results');
        results.innerHTML = '';

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        data.slice(start, end).forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${item.icon}" alt="Icon" class="card-icon">
                <h3>${item.title}</h3>
                <p class="card-description">${item.description}</p>
            `;
            card.addEventListener('click', () => {
                window.location.href = item.url;
            });
            results.appendChild(card);
        });

        displayPagination(data.length);
    }

    function displayPagination(totalItems) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            if (i === currentPage) {
                btn.style.backgroundColor = '#2F6E5F';
            }
            btn.addEventListener('click', function() {
                currentPage = i;
                loadResults();
            });
            pagination.appendChild(btn);
        }
    }

    document.getElementById('search-bar').addEventListener('input', loadResults);
    document.getElementById('changelog-btn').addEventListener('click', function(event) {
        const contextMenu = document.getElementById('context-menu');
        if (isChangelogOpen) {
            contextMenu.style.display = 'none';
            isChangelogOpen = false;
        } else {
            fetch('.changelog')
                .then(response => response.text())
                .then(data => {
                    contextMenu.innerHTML = parseChangelog(data);
                    contextMenu.style.display = 'block';
                    contextMenu.style.left = `${event.clientX}px`;
                    contextMenu.style.top = `${event.clientY}px`;
                    isChangelogOpen = true;
                });

            document.addEventListener('click', function() {
                contextMenu.style.display = 'none';
                isChangelogOpen = false;
            }, { once: true });
        }
    });

    function parseChangelog(data) {
        return data.split('$').map(section => {
            return section.split('\n').map(line => {
                if (line.startsWith('-')) {
                    return `<div class="context-header">${line.slice(1).toUpperCase()}</div>`;
                } else if (line.startsWith('>')) {
                    return `<div class="context-entry">${line.slice(1)}</div>`;
                } else {
                    return '';
                }
            }).join('');
        }).join('<hr style="border: none; margin: 10px 0;">');
    }


    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            currentFilter = this.getAttribute('data-filter');
            currentPage = 1;
            loadResults();
        });
    });

    loadResults();
});
