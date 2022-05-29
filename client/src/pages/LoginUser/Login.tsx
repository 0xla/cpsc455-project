import React, {useState} from 'react';
import axios from "axios";

const Login = () => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    async function login(event: any) {
        event.preventDefault()
        axios.post("http://localhost:5000/api/users/login", {
            username: name,
            password: password
        }).then((res) => {
            console.log(res)
        }).catch( (err) => {
            console.log(err);

        })

    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    placeholder="Username"/>
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="text"
                    placeholder="Password"/>
                <input type="submit" value="Login"/>
            </form>
        </div>

    );

}


export default Login;