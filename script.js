document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;



    const ContactData = {
        email: email,
        name: `${firstName} ${lastName}`,
        phone: phone,
        emailOptIn: 1,
        mobileOptIn: 0,
        monitoringOptIn: 1,
        addTags: ["REGISTER","SPEKTAKTL"],
        standardDetails: {
            spektakt: "jasimalgosia",
           gender: "Male"
        }
        
    };

    

    SMApi.setAll(ContactData);
    SMApi.execute('contact').then((result) => {
        console.log(result);
        alert("Rejestracja zakończona sukcesem!");
    }).catch((error) => {
        console.error('Error:', error);
        alert("Wystąpił błąd podczas rejestracji.");
    });
        console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('ContactData:', ContactData);


    
});