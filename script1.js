document.getElementById('submitBtn').addEventListener('click', function() {
    const formData = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    fetch('https://hook.eu2.make.com/71cxdb3iekkdyidbsli9np6hgql5m5or', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log('Dane wysłane:', data))
    .catch(error => console.error('Błąd:', error));
});
