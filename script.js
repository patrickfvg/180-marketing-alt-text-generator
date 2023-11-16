// script.js

let savedApiKey = '';

// Event listener for saving the API key
document.getElementById('saveApiKey').addEventListener('click', function() {
    savedApiKey = document.getElementById('apiKey').value;
    if (savedApiKey) {
        alert('API Key saved successfully');
    } else {
        alert('Please enter a valid API Key');
    }
});

// Event listener for generating alt text
document.getElementById('generateAltText').addEventListener('click', function() {
    var imageUrl = document.getElementById('imageUrl').value;
    if (imageUrl && savedApiKey) {
        generateAltText(imageUrl, savedApiKey);
    } else if (!savedApiKey) {
        alert('Please save the API key first.');
    } else {
        alert('Please enter an image URL.');
    }
});

// Function to generate alt text
function generateAltText(imageUrl, apiKey) {
    var promptText = `Please provide a detailed description for the image at the following URL: ${imageUrl}`;
    fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}` // Use the saved API key
        },
        body: JSON.stringify({
            prompt: promptText,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('altText').innerText = data.choices[0].text;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('altText').innerText = 'Error generating alt text';
    });
}
