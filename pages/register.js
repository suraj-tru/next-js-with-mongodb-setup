import { useState } from 'react';
import styles from '../styles/AddUser.module.css';

export default function AddUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName]  = useState('');
    const [email, setEmail]        = useState('');
    const [password, setPassword]  = useState('');
    const [error, setError]        = useState('');
    const [message, setMessage]    =useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!firstName || !email || !password  || !lastName) return setError('All fields are required');

        // user data
        let user = {
            first_name: firstName,
            last_name:lastName,
            email: email,
            password:password
        };
        // save the user data
        let response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(user),
        });
      // get the data
        let data = await response.json();
        if (data.success) {
            // reset the fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            return setError(data.message);
        }
    };

    return (
        <div>

            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {error ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}>{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    ) : null}
                    <div className={styles.formItem}>
                        <label>first Name</label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            placeholder="firstname"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            placeholder="lastname"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>email</label>
                         <input
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="email"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>password</label>
                         <input
                            type="text"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="password"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <button type="submit">Add User</button>
                    </div>
                </form>
            </div>
        </div>
    );
}