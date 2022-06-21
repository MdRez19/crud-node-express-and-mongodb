// main.js
const update = document.querySelector('#update-button');

update.addEventListener('click', _ => {
    // Send PUT Request here
    fetch('/quotes', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.'
        })
    })
        .then(response => {
            if(response.ok) return response.json()
        })
        .then(response => {
            window.location.reload(true)
        })
})