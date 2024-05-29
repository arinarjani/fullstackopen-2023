import { useState } from 'react'

const Login = ( { handleLogin } ) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const login = ( event ) => {
        event.preventDefault()
        handleLogin( { username, password } )

        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={login}>
            <div>
            <label htmlFor="username">
                username:
            </label>
            <input 
                type="text" 
                name="username" 
                value={username}
                onChange={ (e) => setUsername(e.target.value) }
            />
            </div>
            <div>
            <label htmlFor="password">
                password:
            </label>
            <input 
                type="password" 
                name="password"
                value={password} 
                onChange={ (e) => setPassword(e.target.value) }
            />
            </div>
            <button type="submit">log-in</button>
        </form>
    )
}

export default Login