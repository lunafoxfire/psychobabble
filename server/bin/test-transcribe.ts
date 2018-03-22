import './../config/config';
import * as speech from '@google-cloud/speech';

const client = new speech.SpeechClient();
const config = {
  encoding: 'LINEAR16',
  sampleRateHertz: 44100,
  languageCode: 'en-US'
};
const audio = {
  uri: 'gs://soft-skills-tester/testfile.wav'
}
const request = {
  config: config,
  audio: audio
}

console.log("Beginning transcription");
client.longRunningRecognize(request)
  .then((data) => {
    console.log("Operation recieved");
    const operation = data[0];
    return operation.promise();
  })
  .then((data) => {
    console.log("Response recieved");
    const response = data[0];
    const transcription = response.results
      .map(result => {
        console.log(result);
        return result.alternatives[0].transcript;
      })
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  })
  .catch((err) => {
    console.log("ERROR:");
    console.log(err);
  });
