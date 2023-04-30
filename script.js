const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API
let apiQuotes = []

// Show new Quote
function newQuote() {

    showLoadingSpinner();

    // Picking a random quote from apiQuotes array  
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if author exists and replacing with unknown
    if(!quote.author){
        authorText.innerText = 'Unknown';
    } else {
        authorText.innerText = quote.author
    }

    // Check quote length to determine styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }

    // Set quote. hide loader
    quoteText.innerText = quote.text;
    removeLoadingSpinner();
}

async function getQuote(){
    showLoadingSpinner();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = "https://type.fit/api/quotes";
    try{
        const response = await fetch( apiURL);
        apiQuotes = await response.json()
        newQuote();
    } 
    catch (error){
        getQuote();
        console.log('No Quote', error);
    }

}

// Tweet Quote

function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank')
}

// Event Listener

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
