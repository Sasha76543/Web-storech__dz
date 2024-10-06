let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

// Функція для збереження закладок в localStorage
function saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Функція для оновлення списку закладок на сторінці
function updateBookmarkList() {
    const bookmarkList = document.getElementById('bookmark-list');
    bookmarkList.innerHTML = '';  // Очищення поточного списку

    bookmarks.forEach((bookmark, index) => {
        const li = document.createElement('li');
        li.className = 'bookmark-item';

        const a = document.createElement('a');
        a.href = bookmark.url;
        a.textContent = bookmark.name;
        a.target = '_blank';

        const editButton = document.createElement('button');
        editButton.textContent = 'Редагувати';
        editButton.onclick = () => editBookmark(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Видалити';
        deleteButton.onclick = () => deleteBookmark(index);

        li.appendChild(a);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        bookmarkList.appendChild(li);
    });
}

// Додавання нової закладки
document.getElementById('bookmark-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('bookmark-name').value;
    const url = document.getElementById('bookmark-url').value;

    bookmarks.push({ name, url });
    saveBookmarks();
    updateBookmarkList();

    // Очищення форми
    document.getElementById('bookmark-name').value = '';
    document.getElementById('bookmark-url').value = '';
});

// Редагування закладки
function editBookmark(index) {
    const newName = prompt('Введіть нову назву:', bookmarks[index].name);
    const newUrl = prompt('Введіть новий URL:', bookmarks[index].url);

    if (newName && newUrl) {
        bookmarks[index] = { name: newName, url: newUrl };
        saveBookmarks();
        updateBookmarkList();
    }
}

// Видалення закладки
function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    saveBookmarks();
    updateBookmarkList();
}

// Початкове завантаження списку закладок
updateBookmarkList();