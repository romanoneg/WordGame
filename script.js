// Global variable to hold the model
let model = null;

const wordList = ["exercise", "court", "defeat", "admire","dead", "attraction", 
  "hospital","generation", "tempt", "museum", "flower","garlic", "notorious", 
  "foster","comfortable", "character", "cookie", "innocent","height", "valid", "virtue", 
  "sunrise","construct","potential", "large","sweep", "sunshine", "resource","bite", "money", 
  "sentence","grief","minute", "similar", "reality","grind", "purpose","delicate","suntan", 
  "financial", "rage","confession","implication","shorts", "moral","strange", "spell","mayor",
  "demonstrator","oil", "cat", "beautiful", "princess"
];


console.log("Starting")

// Load the model when the page loads
use.load().then(loadedModel => {
  model = loadedModel;
  console.log("finished loading");
  $("#result").text("0.00"); // Clear loading indicator
  $("#calculateButton").prop("disabled", false); // Enable the button
});
// The calculateDissimilarity function with the core logic
async function calculateDissimilarity() {
  if (!model) {
    console.error("Model not yet loaded");
    return;
  }

  $("#result").text("Calculating... BeepBoop");

  const sentences = [
    $("#word1").val(), 
    $("#word2").val(),
    $("#word3").val(),
    $("#word4").val(),
    $("#word5").val()
  ];


  model.embed(sentences).then(embeddings => {
    console.log("here");
    // Calculate average dissimilarity
    const similarities = [];
    for (let i = 0; i < embeddings.shape[0]; i++) {
      for (let j = i + 1; j < embeddings.shape[0]; j++) {
        const similarity = cosineSimilarity(embeddings.slice([i, 0], [1, -1]), embeddings.slice([j, 0], [1, -1]));
        similarities.push(similarity);
      }
    }

    const dissimilarity = similarities.length > 0 ?
                          (1 - (sum(similarities) / similarities.length)) / 0.8 :
                          0;

    $("#result").text((dissimilarity * 100).toFixed(2) + "% dissimilar!");

  }); 
}

function challengeMe() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  const randomWord = wordList[randomIndex];
  document.getElementById("word5").value = randomWord;
  document.getElementById("word5").readOnly = true;
}

// Helper function to calculate cosine similarity between TensorFlow.js tensors
function cosineSimilarity(tensor1, tensor2) {
  const dotProduct = tensor1.dot(tensor2.transpose());
  const mag1 = tensor1.norm();
  const mag2 = tensor2.norm();
  return dotProduct.div(mag1.mul(mag2)).dataSync()[0];
}

function sum(array) {
  return array.reduce((a, b) => a + b, 0);
}
