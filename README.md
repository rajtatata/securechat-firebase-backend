# Secure Chat Firebase Backend

This is the repo of firebase backend of [SecureChat](https://github.com/rajtatata/securechat)

## Installation

- Go to [firebase console]("https://console.firebase.google.com") and create a new project or use an existing one
- Go to Project Settings (click on settings icon <img src="https://ionicons.com/ionicons/svg/md-settings.svg" width=20 height=20></img> next to Project Overview)
- On the General Tab save the Web API Key
    - This will be needed to configure the mobile app
- Go to Service Accounts tab
    - On Firebase Admin SDK click Generate new private key
    - Open the downloaded file and copy everything inside and paste it to `/functions/ServiceAccountKey.json` file 
- Create a Realtime Database
    - Navigate to Database on the left sidebar
    - Scroll down to Realtime Database and click on Create Database (start in locked mode)
- Save the database url
    - Copy the database url link, it should look something like `https://[project-name].firebaseio.com/`
    - Paste this url at `/functions/index.js` file at `databaseURL`
    - This will also be needed to configure the mobile app later
- Allow reading on the database
    - Navigate to rules and make `read` = `true` and click Publish
```js 
{
    "rules": {
        ".read": true,
        ".write": false
    }
}
```
- Now we just need to deploy this repo to firebase cloud functions
```bash
npm install -g firebase-tools # install firebase-tools if you haven't
firebase init 
# follow the instructions, 
# choose firebase cloud functions, 
# choose your newly created existing project, 
# press enter on everything else
firebase depoy # after init has finished just deploy to cloud functions in the end
```
- Keep track of the firebase functions urls
    - There should be 4:
        - `https://[some-location-project-name].cloudfunctions.net/getUserId`
        - `https://[some-location-project-name].cloudfunctions.net/sendMessage`
        - `https://[some-location-project-name].cloudfunctions.net/deleteMessage`
        - `https://[some-location-project-name].cloudfunctions.net/getRandomAvatar`
    - Keep track of the base url `https://[some-location-project-name].cloudfunctions.net`
        - You will need it when configuring the mobile app later