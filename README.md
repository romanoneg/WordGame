# The Dissimilarity WordGame

Fun project that checks if you can come up with words that are as dissimilar as possible. (Implementation details at the bottom.)

Play it at [https://romanoneg.github.io/WordGame/](https://romanoneg.github.io/WordGame/)

<img width="540" alt="image" src="https://github.com/romanoneg/WordGame/assets/43445765/0605d39d-31d5-4069-9988-a417f3a67196">

<br>

## Implementation:

### Code:

Uses tensorflow.js to load tensorflow's [Universal-Sentence-Encoder](https://github.com/tensorflow/tfjs-models/tree/master/universal-sentence-encoder) in order to create vector representations of each word (or multiple words) entered in the text boxes. 

The library is imported with the following in `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder"></script>
```

The model is then loaded in `script.js`:
```js
use.load().then(loadedModel => {
  model = loadedModel;
};
```

And inference is done with:
```js
// sentences is a vector of strings to be embedded
model.embed(sentences).then(embeddings => {
  // calculating scores with embeddings
};
```

---

### Score Calculation
These $n$ vectors are then used calculate the final score: $$\text{GameScore} = \frac{1 - \mu_{\text{sim}}}{\text{normalization factor}}$$ where $\mu$ is the average of all the pairwise cosine-similarities between vectors calculated as:
$$\mu_{\text{sim}} = {n \choose 2}^{-1} \sum_{i=0}^{n} \sum_{j=i+1}^{n} \text{cosine-similarity} (v_{i}, v_{j})$$
Where $v_{i}$ denotes the i-th word embedding vector and the $\text{normalization factor} = 0.8$ and is hand-chosen to make the scores roughly go from $0$ to $100$.


