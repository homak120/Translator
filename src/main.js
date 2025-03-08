// Create an array to store the page's readable content
let pageContent = [];

// Get all text-containing elements (you can add more if needed)
let elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, a');

// Collect all text content and store it in an array
elements.forEach(element => {
    if (element.innerText.trim()) {  // Ensure there's some text content
        let textContent = element.innerText.trim();
        pageContent.push(textContent);
    }
});

// Format the collected text as a JavaScript array in the prompt
let formattedArray = JSON.stringify(pageContent, null, 2); // Pretty-print the array
let singlePrompt = `Translate the following JavaScript array to Traditional Chinese:\n\n${formattedArray}`;

// Log the formatted prompt
console.log(singlePrompt);

const API_URL = `http://127.0.0.1:11434/api/generate`;

const requestBody = {
    model: "llama3.2:latest",  // Ensure you have this model installed in Ollama
    prompt: singlePrompt,
    stream: false
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };

  // Send POST request to API, get response and set the reponse as paragraph text
  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    // Get the API response text and update the message element

    console.log(data.response);
    //messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$
  } catch (error) {
    // Handle error
    console.error(error.message);
  } 