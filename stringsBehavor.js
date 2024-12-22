// My User Input Validation JavaScript file
// Author: Michael Reynolds
// Date: 12/19/2024

// This function checks if a word is real using a dictionary API
async function isRealWord(word) {
    try {
        // Use the Free Dictionary API to check if the word exists
        let response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word);
        return response.ok;
    } catch (error) {
        return false;
    }
}

// This function checks if a word is a palindrome
async function checkWord() {
    // Get the word from the input box
    let word = document.getElementById('wordInput').value;
    
    // Make everything lowercase and remove spaces
    word = word.toLowerCase();
    word = word.replace(/[^a-z0-9]/g, '');
    
    // Make sure they typed something
    if(word === '') {
        document.getElementById('result').innerHTML = 'Please type something!';
        document.getElementById('result').style.color = 'red';
        return;
    }
    
    // Check if it's a real word first
    if(!(await isRealWord(word))) {
        document.getElementById('result').innerHTML = 
            '❌ "' + document.getElementById('wordInput').value + '" is not a real English word ❌';
        document.getElementById('result').style.color = 'red';
        return;
    }
    
    // Make the word backwards
    let backwards = '';
    for(let i = word.length - 1; i >= 0; i--) {
        backwards = backwards + word[i];
    }
    
    // Check if it's the same forwards and backwards
    if(word === backwards) {
        // It's a palindrome!
        document.getElementById('result').innerHTML = 
            '✨ Yes! "' + document.getElementById('wordInput').value + '" is a palindrome! ✨';
        document.getElementById('result').style.color = 'green';
    } else {
        // Not a palindrome
        document.getElementById('result').innerHTML = 
            '❌ Sorry, "' + document.getElementById('wordInput').value + '" is not a palindrome ❌';
        document.getElementById('result').style.color = 'red';
    }
}

// This function clears everything to try again
function tryAgain() {
    // Clear the input box
    document.getElementById('wordInput').value = '';
    // Clear the result
    document.getElementById('result').innerHTML = '';
    // Put the cursor back in the input box
    document.getElementById('wordInput').focus();
}

// This makes the Enter key work too
document.getElementById('wordInput').addEventListener('keyup', function(event) {
    if(event.key === 'Enter') {
        checkWord();
    }
});

// Function to validate all inputs when form is submitted
function validateInputs(event) {
    // Prevent form from submitting normally
    event.preventDefault();
    
    // Get all input values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const zipCode = document.getElementById('zipCode').value;
    const warningDiv = document.getElementById('warningMessage');
    const secretDiv = document.getElementById('secretMessage');

    // Reset any previous messages
    warningDiv.textContent = '';
    secretDiv.style.display = 'none';

    // Combine first and last name with a space
    const fullName = firstName.trim() + " " + lastName.trim();

    // Check if full name is too long (more than 20 characters)
    if (fullName.length > 20) {
        warningDiv.textContent = '⚠️ Full name must not exceed 20 characters!';
        return false;
    }

    // Check if zip code is exactly 5 digits
    if (!/^\d{5}$/.test(zipCode)) {
        warningDiv.textContent = '⚠️ Zip code must be exactly 5 digits!';
        return false;
    }

    // If we get here, all validations passed!
    // Show success message
    secretDiv.style.display = 'block';
    secretDiv.innerHTML = `
        <h3>🎉 Congratulations ${firstName}!</h3>
        <p>You've unlocked the secret message:</p>
        <p style="font-size: 1.2em; color: white;">
            "The best way to predict the future is to create it! 🚀"
        </p>
    `;
    return false;
}