const nameInput = document.getElementById('name');
const addressInput = document.getElementById('address');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const addEntryBtn = document.getElementById('add-entry-btn');
const saveEntryBtn = document.getElementById('save-entry-btn');
const tableBody = document.querySelector('#table tbody');

// Address book array
let addressBook = JSON.parse(localStorage.getItem('addressBook')) || [];
let editingEntryIndex = null;

function displayAddressBook(entries = addressBook) {
  tableBody.innerHTML = '';

  entries.forEach(function (entry, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.address}</td>
      <td>${entry.phone}</td>
      <td>${entry.email}</td>
      <td>
        <button onclick="editEntry(${index})"><i class="fas fa-edit"></i> Edit</button>
        <button onclick="deleteEntry('${entry.email}')"><i class="fas fa-trash-alt"></i> Delete</button>
      </td>
    `;
    row.dataset.entryId = index;
    tableBody.appendChild(row);
  });
}

// Add a new entry to the address book
function addEntry() {
  const name = nameInput.value.trim();
  const address = addressInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (name === '' || address === '' || phone === '' || email === '') {
    alert('Please fill in all fields');
    return;
  }

  const newEntry = {
    name,
    address,
    phone,
    email,
  };

  if (editingEntryIndex !== null) {
    addressBook[editingEntryIndex] = newEntry;
    editingEntryIndex = null;
    addEntryBtn.style.display = 'block';
    saveEntryBtn.style.display = 'none';
  } else {
    addressBook.push(newEntry);
  }

  displayAddressBook();
  clearInputFields();
  saveAddressBookToLocalStorage();
}

// Function to clear the input fields after an entry is added
function clearInputFields() {
  nameInput.value = '';
  addressInput.value = '';
  phoneInput.value = '';
  emailInput.value = '';
}

// Function to delete an entry from the address book
function deleteEntry(email) {
  const entryIndex = addressBook.findIndex((entry) => entry.email === email);

  if (entryIndex !== -1) {
    addressBook.splice(entryIndex, 1);
    displayAddressBook();
    saveAddressBookToLocalStorage();
  }
}

// Function to edit an entry in the address book
function editEntry(entryIndex) {
  const entry = addressBook[entryIndex];

  nameInput.value = entry.name;
  addressInput.value = entry.address;
  phoneInput.value = entry.phone;
  emailInput.value = entry.email;

  editingEntryIndex = entryIndex;
  addEntryBtn.style.display = 'none';
  saveEntryBtn.style.display = 'block';
}

// Search Functionality
function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === '') {
    displayAddressBook();
    return;
  }

  const filteredEntries = addressBook.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchTerm) ||
      entry.address.toLowerCase().includes(searchTerm) ||
      entry.phone.toLowerCase().includes(searchTerm) ||
      entry.email.toLowerCase().includes(searchTerm)
  );

  displayAddressBook(filteredEntries);
}

// Input field for search
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', handleSearch);

addEntryBtn.addEventListener('click', addEntry);

saveEntryBtn.addEventListener('click', addEntry);

// Save the address book data to local storage to store the content so that content does not erase on reload
function saveAddressBookToLocalStorage() {
  localStorage.setItem('addressBook', JSON.stringify(addressBook));
}

// Initial display of the address book
displayAddressBook();
