Recreating the recent Google Gemini Demo using OpenAI's GPT-4V model.

## Setup

- First step is to split your video up into images using the script splitVideoIntoImages.js
- Second step is to run index.js. This will convert all the images stored in /images into base64 format and send them to the OpenAI GPT-4V model.
- Be sure to add your open ai api key in an .env file.

## Results

- The results are frequently inconsistent, however I've noticed that if you give it how many steps there are and to list what happens in each step the accuracy is much higher.

## Improvements

- better prompt engineering
