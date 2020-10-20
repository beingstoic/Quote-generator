// Get quote from API
const quoteText = document.getElementById('quote');
const quoteContainer = document.getElementById('quote-container');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden = true;
}

//hideLoading
function complete(){
    if(!loader.hidden){
        loader.hidden=true;
        quoteContainer.hidden=false;
    }
    
}
async function getQuote(){

    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
       const response = await fetch(proxyUrl + apiUrl);
       const data = await response.json();
       if(data.quoteAuthor === ''){
        authorText.innerText = 'Unknown';
       }
       else  authorText.innerText = data.quoteAuthor;

       //Reduce size for long quotes
       if(data.quoteText.length>120){
           quoteText.classList.add(long-quote);
       }
       else{
           quoteText.classList.remove('long-quote');
       }
       quoteText.innerText = data.quoteText;
    }catch(error){
        getQuote();
    }

    //stop Loader
    complete();
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twitterUrl,'_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On loAD
getQuote();