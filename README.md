This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

To use it, please add a **base.js** file into /src/utils which looks like below:

```
import firebase from 'firebase/app'
import fb from 'firebase'
import Rebase from 're-base'

let app = firebase.initializeApp({
    apiKey: "AIzan0",
    authDomain: "epp.fp.com",
    databaseURL: "https://epp.fo.com",
    projectId: "epp",
    storageBucket: "",
    messagingSenderId: "90"
});

export let base = Rebase.createClass(app.database())
export const ref = firebase.database().ref()
export const auth = fb.auth
```

Obviously replace the app component above with the credentials from your firebase console. And stick to the same filename.

Note:
- An authorisation HOC takes control of the routing which needs authorised access.
- The logic for all of it is present in app.js
- Re-base has been used for saving the role against UID in the firebase db