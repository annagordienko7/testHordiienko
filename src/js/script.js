document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const token = '6703276062:AAEvOUocAmzuio-gcLzh7_-WSz2wls_zXNg'; // токен
    const chatId = '-4138785287'; // ID группы

       const firstName = document.getElementById('first-name').value;
       const phone = document.getElementById('phone').value;
       const email = document.getElementById('email').value;
   

       const message = `
           Запись с сайта:
   
           Имя Фамилия: ${firstName}
           Номер телефона: ${phone}
           Email: ${email}
       `;
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Message sent successfully');
        } else {
            console.error('Failed to send message:', data.description);
        }
    })
    .catch(error => console.error('Error:', error));
});