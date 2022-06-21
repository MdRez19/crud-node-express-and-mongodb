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

const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader'
        })
    })
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(response => {
            if (response === 'No quote to delete') {
                messageDiv.textContent = 'No Darth Vader quote to delete'
            } else {
                    window.location.reload()
            }
        })

})

