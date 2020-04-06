import {Auth} from 'aws-amplify';

const signOut = () => {
    Auth.signOut()
        .catch(err => console.log('error signing out: ', err))
}


export { signOut }