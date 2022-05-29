import React, {useState} from 'react';
import axios from "axios";

const Register = () => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(event: any) {
        event.preventDefault()
        axios.post("http://localhost:5000/api/users/register", {
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
            <h1>Register</h1>
            <form onSubmit={registerUser}>
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
                <input type="submit" value="Register"/>
            </form>
        </div>

    );

}


export default Register;