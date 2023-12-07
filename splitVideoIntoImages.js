import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

function extractFrames(videoPath, outputFolder, frameRate = 8) {
    ffmpeg(videoPath)
        .on('end', function () {
            console.log('Frames extraction completed.');
        })
        .on('error', function (err) {
            console.error('Error: ' + err);
        })
        .output(`${outputFolder}/frame-%d.png`)
        .withFPS(frameRate)
        .run();
}

const videoPath = './video/cupdemo.mp4'; // Path to your video file
const outputFolder = './images'; // Folder where images will be saved


// Check if the directory exists, if not, create it
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}

extractFrames(videoPath, outputFolder);
