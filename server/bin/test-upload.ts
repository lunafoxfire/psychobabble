import './../config/config';
import * as Storage from '@google-cloud/storage';
import * as request from 'request';
import { timestampToMMDDYYYY } from './../utility/unix-date';

const storage = new Storage();
const bucket = 'soft-skills-tester';
const file = storage.bucket(bucket).file('aaaaa.txt');

const expiration = new Date().getTime() + 300000; // 5 min expiration
const signOptions = {
  action: 'write',
  expires: expiration,
  contentType: "text/plain"
}

file.getSignedUrl(signOptions)
  .then((response) => {
    let url = response[0];

    request.put({
      url: url,
      body: "MOAR DATAAAAAAAAAAA",
      headers: {
        'Content-Type': 'text/plain'
      }
    }, (err, response, body) => {
      console.log("Body:");
      console.log(body);
      if (err) {
        console.log("&&&&&&&&&&&&&&&&&ERROR:");
        console.log(err.message);
      }
      else {
        file.download((err, fileContents) => {
          if (err) {
            console.log("@@@@@@@@@@@@@@@@@@@ERROR:");
            console.log(err.message);
          }
          else {
            console.log("Contents: ", fileContents.toString());
          }
        });
      }
    });
  })
  .catch((err) => {
    console.log("###################ERROR:")
    console.log(err.message);
  });
