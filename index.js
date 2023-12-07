// use GPT-4 to analyze the images

import OpenAI from "openai";
import 'dotenv/config'
import fs from 'fs';
import path from 'path';

// Directory containing images
const imagesDirectory = './images';

// Function to encode the image to base64
function encodeImageToBase64(imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer.toString('base64');
}

// Function to map over all images and convert them to base64
function convertImagesToBase64(directory) {
    const base64Images = [];
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        if (file.startsWith('frame-') && file.endsWith('.png')) {
            const imagePath = path.join(directory, file);
            const base64Image = encodeImageToBase64(imagePath);
            base64Images.push(base64Image);
        }
    });

    return base64Images;
}

// Usage
const base64EncodedImages = convertImagesToBase64(imagesDirectory);
// console.log(base64EncodedImages); // This will log an array of base64 encoded strings for each image.

const imageUrls = base64EncodedImages.map(base64Image =>
({
    type: "image_url",
    image_url: {
        url: `data:image/png;base64,${base64Image}`
    }
})
)

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function main() {
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "There is a coin placed under the first red bull can. There are 3 red bull cans in total. The cans are shuffled. Based on the movements, guess which can has the coin underneath it at the end. Hint: there are 3 moves made in total. Do not say that you do not know the answer. The images are in order. List what you think could have happened in each of the 3 steps." },
                    ...imageUrls,
                ],
            },
        ],
        max_tokens: 4096
    });
    console.log(response.choices[0]);
}
main();