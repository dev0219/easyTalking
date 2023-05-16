// src/utils/translate.js
import axios from "axios";
export async function translateMessage(text, sourceLanguage, targetLanguage) {
console.log(sourceLanguage)
let translate_Str = ''
const prompt = `Translate this into ${targetLanguage === "es" ? "Spanish" : "English"}: "${text}"`;
const apiKey = "";
const model = "text-davinci-003";
const temperature = 0.3;
const maxTokens = 100;
const topP = 1;
const frequencyPenalty = 0;
const presencePenalty = 0;

const url = "https://api.openai.com/v1/engines/" + model + "/completions";

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
};

const data = {
  prompt: prompt,
  temperature: temperature,
  max_tokens: maxTokens,
  top_p: topP,
  frequency_penalty: frequencyPenalty,
  presence_penalty: presencePenalty
};

await axios.post(url, data, { headers })
  .then(response => {
    translate_Str = response.data.choices[0].text.trim();     
  })
  .catch(error => {
    console.error(error);
  });

  return translate_Str;
}
