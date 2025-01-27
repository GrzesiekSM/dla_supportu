document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('ie9m');
  if (form) {
    form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Zatrzymuje domyślną wysyłkę i przeładowanie

      // 1. Pobierz wszystkie wartości z formularza
      const formData = new FormData(form);

      // 2. Wyślij dane do adresu z atrybutu action (SALESmanago) 
      //    w formacie takim jak typowy submit (multipart/form-data).
      try {
        const actionUrl = form.getAttribute('action'); 
        const response1 = await fetch(actionUrl, {
          method: 'POST',
          body: formData // tutaj przekazujemy FormData bez nagłówka Content-Type
        });
        if (!response1.ok) {
          throw new Error('Błąd przy wysyłaniu do SALESmanago: ' + response1.status);
        }
        console.log('Odpowiedź z SALESmanago:', await response1.text());
      } catch (error) {
        console.error('Błąd wysyłki do SALESmanago:', error);
        alert('Błąd przy wysyłaniu do SALESmanago.');
        return; // Możesz zakończyć działanie, jeśli chcesz
      }

      // 3. Wyślij dane do Make w formacie JSON
      //    Najpierw zamieniamy formData -> zwykły obiekt:
      const dataToSend = {};
      formData.forEach((value, key) => {
        dataToSend[key] = value;
      });

      try {
        const response2 = await fetch('https://hook.eu2.make.com/71cxdb3iekkdyidbsli9np6hgql5m5or', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        });
        if (!response2.ok) {
          throw new Error('Błąd przy wysyłaniu do Make: ' + response2.status);
        }
        // Nie zawsze Make zwraca JSON, więc można wywołać .text():
        const makeResult = await response2.text();
        console.log('Odpowiedź z Make:', makeResult);
      } catch (error) {
        console.error('Błąd wysyłki do Make:', error);
        alert('Błąd przy wysyłaniu do Make.');
        return;
      }

      // 4. Jeśli wszystko się udało:
      alert('Dane wysłano poprawnie do SALESmanago i Make!');
    });
  }
});
