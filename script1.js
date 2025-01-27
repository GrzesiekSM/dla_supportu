document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('ie9m');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Blokuje przeładowanie strony po wysłaniu formularza

      // 1. Pobieramy wszystkie wartości z formularza
      const formData = new FormData(form);
      const dataToSend = {};
      formData.forEach((value, key) => {
        dataToSend[key] = value;
      });

      // 2. Wysyłamy dane na endpoint Make
      fetch('https://hook.eu2.make.com/71cxdb3iekkdyidbsli9np6hgql5m5or', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      })
      .then(response => {
        // Obsługa błędów HTTP
        if (!response.ok) {
          throw new Error('Błąd sieci lub błąd przy wysyłaniu danych do Make');
        }
        // Niektóre webhooki Make nie zwracają JSON – wówczas `.json()` może się nie powieść
        return response.json().catch(() => ({}));
      })
      .then(result => {
        console.log('Odpowiedź z Make:', result);
        alert('Formularz został pomyślnie wysłany!');
        // Tu możesz np. wyczyścić formularz, przekierować użytkownika itp.
      })
      .catch(error => {
        console.error('Wystąpił błąd:', error);
        alert('Błąd przy wysyłaniu danych. Spróbuj ponownie.');
      });
    });
  }
});
