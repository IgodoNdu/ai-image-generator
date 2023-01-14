//handle onSubmit event trigger
function onSubmit(e) {
    e.preventDefault();
    //clear the message and the image after submitting
    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';
    
    //get data from the  form
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    //quick validation of user input
    if(prompt === '') {
        alert('Please add some descriptive text');
        return;
    }

    //console.log(promp, size);

    //function to handle image requests
    generateImageRequest(prompt, size);
}

//handling request for image
async function generateImageRequest(prompt, size) {
    try {
        showSpinner();
        //make the request
        const response = await fetch('/openai/genimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt, size
            })
        });
        //check for not 'OK' response
        if(!response.ok) {
            removeSpinner();
            throw new Error('That image could not be generated');
        }

        //if response is 'OK' then get the data
        const data = await response.json();
        //console.log(data);
        const imageUrl = data.data;
        document.querySelector('#image').src = imageUrl;
        //remove the spinner after getting the data
        removeSpinner();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

//function handling when spinner shows/not to show
function showSpinner() {
    //add a class of show (on the div with class of spinner) to activate/show the spinner
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

//add event listener to the form
document.querySelector('#image-form').addEventListener('submit', onSubmit);