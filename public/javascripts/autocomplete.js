const usernameInput = document.getElementById('nameInput');
const suggestions = document.getElementById('suggestions');

usernameInput.addEventListener('input', () => {
    const query = usernameInput.value;
    if (query.length > 0) {
        fetch(`/autocomplete?q=${query}`)
            .then(response => response.json())
            .then(data => {
                suggestions.innerHTML = '';
                suggestions.classList.add('show'); // Show the suggestions box
                data.forEach(name => {
                    const li = document.createElement('li');
                    li.textContent = name;
                    li.classList.add('suggestion-item');
                    li.addEventListener('click', () => {
                        usernameInput.value = name;
                        suggestions.innerHTML = '';
                        suggestions.classList.remove('show'); // Hide the suggestions box
                    });
                    suggestions.appendChild(li);
                });
            });
    } else {
        suggestions.innerHTML = '';
        suggestions.classList.remove('show'); // Hide the suggestions box if input is empty
    }
});

// Hide suggestions when clicking outside of the input
document.addEventListener('click', (event) => {
    if (!usernameInput.contains(event.target) && !suggestions.contains(event.target)) {
        suggestions.classList.remove('show');
    }
});