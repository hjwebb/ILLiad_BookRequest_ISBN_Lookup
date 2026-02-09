
document.addEventListener('DOMContentLoaded', function () {
    const isbnInput = document.getElementById('ISSN');
    const searchButton = document.getElementById('isbnSearchBtn');
    const errorDiv = document.getElementById('isbnError');

    if (!isbnInput || !searchButton) {
        console.error('Required elements not found.');
        return;
    }

    // Clear all book-related fields
    function clearBookFields() {
        const fieldsToClear = ['LoanTitle', 'LoanAuthor', 'LoanPublisher', 'LoanPlace', 'LoanDate'];
        fieldsToClear.forEach(id => {
            const field = document.getElementById(id);
            if (field) field.value = '';
        });
    }

    // Trigger click on Enter key press
    isbnInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchButton.click();
        }
    });

const ebookMessageDiv = document.getElementById('ebookmessage');

// Check for pre-filled ISBN on page load
const initialIsbn = isbnInput.value.trim().replace(/-/g, '');
if (initialIsbn) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${initialIsbn}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.totalItems > 0) {
                const saleInfo = data.items[0].saleInfo;
                if (ebookMessageDiv) {
                    if (saleInfo && saleInfo.isEbook) {
                        ebookMessageDiv.textContent = 'This ISBN appears to be an eBook. All Interlibrary Loan book/media requests are presumed to be for physical materials. If only a digital format is wanted, please make a note on your request.';
                    } else {
                        ebookMessageDiv.textContent = '';
                    }
                }
            } else {
                if (ebookMessageDiv) ebookMessageDiv.textContent = '';
            }
        })
        .catch(error => {
            console.error('Error checking ebook status on load:', error);
            if (ebookMessageDiv) ebookMessageDiv.textContent = '';
        });
}

    searchButton.addEventListener('click', function () {
        let isbn = isbnInput.value.trim().replace(/-/g, '');

        // Clear previous error
        if (errorDiv) errorDiv.textContent = '';

        if (!isbn) {
            errorDiv.textContent = 'Please enter an ISBN.';
            clearBookFields();
            return;
        }

        const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
        console.log('Fetching from URL:', url);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })

		.then(data => {
			console.log('API response:', data);
			const ebookMessageDiv = document.getElementById('ebookmessage');

			if (data.totalItems > 0) {
				const book = data.items[0].volumeInfo;
				const saleInfo = data.items[0].saleInfo;
				const getById = id => document.getElementById(id);

				if (getById('LoanTitle')) getById('LoanTitle').value = book.title || '';
				if (getById('LoanAuthor')) getById('LoanAuthor').value = (book.authors || []).join(', ');
				if (getById('LoanPublisher')) getById('LoanPublisher').value = book.publisher || '';
				if (getById('LoanPlace')) getById('LoanPlace').value = book.publishedPlace || '';
				if (getById('LoanDate')) {
					const fullDate = book.publishedDate || '';
					const yearOnly = fullDate.substring(0, 4);
					getById('LoanDate').value = yearOnly;
				}

				// Insert ebook message
				if (ebookMessageDiv) {
					if (saleInfo && saleInfo.isEbook) {
						ebookMessageDiv.textContent = 'This ISBN appears to be an eBook. All Interlibrary Loan book/media requests are presumed to be for physical materials. If only a digital format is wanted, please make a note on your request.';
					} else {
						ebookMessageDiv.textContent = '';
					}
				}
			} else {
				clearBookFields();
				errorDiv.textContent = 'No book found with that ISBN. Try again or enter the request manually.';
				if (ebookMessageDiv) ebookMessageDiv.textContent = '';
			}
		})

            .catch(error => {
                console.error('Error fetching book data:', error);
                clearBookFields();
                errorDiv.textContent = 'Failed to fetch book data. Please try again or enter the request manually.';
            });
    });
});
