// Get HTML elements
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const saveBtn = document.getElementById("saveBtn");
const contactList = document.getElementById("contactList");
const searchInput = document.getElementById("search");

// Load contacts from Local Storage
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Keeps track of the contact being edited
let editIndex = null;

// Save contacts to Local Storage
function saveToStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Display contacts
function displayContacts(list = contacts) {
  contactList.innerHTML = "";

  if (list.length === 0) {
    contactList.innerHTML = `
      <p class="text-center text-gray-500">
        No contacts found.
      </p>
    `;
    return;
  }

  list.forEach((contact, index) => {
    contactList.innerHTML += `
      <div class="border rounded-lg p-3 shadow bg-white flex justify-between items-center">

        <div>
          <h3 class="font-bold text-lg">${contact.name}</h3>
          <p class="text-gray-600">${contact.phone}</p>
        </div>

        <div class="flex gap-2">

          <button
            onclick="editContact(${index})"
            class="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded">
            Edit
          </button>

          <button
            onclick="deleteContact(${index})"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
            Delete
          </button>

        </div>

      </div>
    `;
  });
}

// Save or Update Contact
saveBtn.addEventListener("click", () => {

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (name === "" || phone === "") {
    alert("Please enter both name and phone number.");
    return;
  }

  if (editIndex === null) {
    contacts.push({
      name: name,
      phone: phone
    });
  } else {
    contacts[editIndex] = {
      name: name,
      phone: phone
    };

    editIndex = null;
    saveBtn.textContent = "Save Contact";
  }

  saveToStorage();

  nameInput.value = "";
  phoneInput.value = "";

  displayContacts();
});

// Edit Contact
function editContact(index) {

  nameInput.value = contacts[index].name;
  phoneInput.value = contacts[index].phone;

  editIndex = index;

  saveBtn.textContent = "Update Contact";
}

// Delete Contact
function deleteContact(index) {

  if (confirm("Delete this contact?")) {

    contacts.splice(index, 1);

    saveToStorage();

    displayContacts();
  }
}

// Search Contacts
searchInput.addEventListener("input", () => {

  const searchText = searchInput.value.toLowerCase();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText)
  );

  displayContacts(filteredContacts);
});

// Display saved contacts when page opens
displayContacts();