// Create an array to store the page's readable content
let pageContent = [];

// Get all text-containing elements (you can add more if needed)
let elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, a');

// Collect all text content and store it in an array
elements.forEach((element, index) => {
    if (element.innerText.trim() && index < 30) {  // Ensure there's some text content
        let textContent = element.innerText.trim();
        pageContent.push(textContent);
    }
});

// Format the collected text as a JavaScript array in the prompt
let formattedArray = JSON.stringify(pageContent, null, 2); // Pretty-print the array
let singlePrompt = `Convert the values in the javascript array to Traditional Chinese. Please remove any detail explanation and output the pure array as the only result\n\n${formattedArray}`;

// Log the formatted prompt
console.log(singlePrompt);
console.log('Size: ', elements.length);

const API_URL = `http://127.0.0.1:5566/api/generate`;

const requestBody = {
    //model: "deepseek-r1:1.5b",  // Ensure you have this model installed in Ollama
    model: "deepseek-coder-v2:16b",
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
    let cleanedResponse = data.response.replace(/<think>.*<\/think>\s*/s, '');
    console.log(cleanedResponse);

    const translatedArray = JSON.parse(cleanedResponse);

    // Loop through each value of translatedArray and update the innerHTML of the corresponding element in elements
    translatedArray.forEach((translatedText, index) => {
        if (elements[index]) {
            elements[index].innerHTML = translatedText;
        }
    });

    //messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$
  } catch (error) {
    // Handle error
    console.error(error.message);
  } 