import React from 'react';
import { observer } from 'mobx-react';
import UserStores from './stores/UserStores';
import LoginForm from './LoginForm';

import SubmitButton from './SubmitButton';
import './App.css';

class App extends React.Component {

    async componentDidMount() {

        try {

            let res = await fetch('/isLoggedIn', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'content-Type': 'application/json'
                }
            });

            let result = await res.json();

            if (result && result.success) {
                UserStores.loading = false;
                UserStores.isLoggedIn = true;
                UserStores.username = result.username;
            }

            else {
                UserStores.loading = false;
                UserStores.isLoggedIn = false;
            }
        }

        catch (e) {
            UserStores.loading = false;
            UserStores.isLoggedIn = false;

        }

    }

    asyncdoLogout() {

        try {

            let res = await fetch('/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                }
            });

            let result = await res.json();

            if (result && result.success) {
                UserStores.isLoggedIn = false;
                UserStores.username = '';

            }

        }

        catch (e) {
            console.log(e)
        }

    }
    // creating render logic 
    render() {

        if (UserStores.loading) {
            return (
                <div className="app">
                    <div className='container'>
                        Loding, please wait..
                </div>
                </div>
            );
        }

        else {

            if (UserStore.isLoggedIn) {

                return (
                    <div className="app">
                        <div className='container'>
                            Welcome {userStore.username}

                            <SubmitButton
                                text={'log out'}
                                disabled={false}
                                onClick={() => this.doLogout()}
                            />

                        </div>
                    </div>
                );
            }

            return (
                <div className="app">
                    <div className='container'>
                        <SubmitButton
                            text={'log out'}
                            disabled={false}
                            onClick={() => this.doLogout()}
                        />
                        <LoginForm />
                    </div>
                </div>
            );
        }
    }
}



export default observer(App);

