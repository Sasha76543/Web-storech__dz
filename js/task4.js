
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function updateContactList() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.className = 'contact-item';

        const contactInfo = document.createElement('div');
        contactInfo.textContent = `${contact.firstName} ${contact.lastName} - Телефон: ${contact.phone}, Електронна пошта: ${contact.email}`;

        const editButton = document.createElement('button');
        editButton.textContent = 'Редагувати';
        editButton.onclick = () => editContact(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Видалити';
        deleteButton.onclick = () => deleteContact(index);

        li.appendChild(contactInfo);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        contactList.appendChild(li);
    });
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    contacts.push({ firstName, lastName, phone, email });
    saveContacts();
    updateContactList();

    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
});

function editContact(index) {
    const contact = contacts[index];

    const newFirstName = prompt("Введіть нове ім'я:", contact.firstName);
    const newLastName = prompt("Введіть нове прізвище:", contact.lastName);
    const newPhone = prompt('Введіть новий телефон:', contact.phone);
    const newEmail = prompt('Введіть нову електронну адресу:', contact.email);

    if (newFirstName && newLastName && newPhone && newEmail) {
        contacts[index] = {
            firstName: newFirstName,
            lastName: newLastName,
            phone: newPhone,
            email: newEmail,
        };
        saveContacts();
        updateContactList();
    }
}

function deleteContact(index) {
    contacts.splice(index, 1);
    saveContacts();
    updateContactList();
}

updateContactList();
