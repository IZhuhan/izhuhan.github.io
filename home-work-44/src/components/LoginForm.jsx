import React, {useState} from 'react'

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  }

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  }

  const handleNameBlur = () => {
    if (userName.length < 4) {
      setUserNameError("Min length 4");
    } else if (userName.length > 6){
      setUserNameError("Max length 6");
    } else {
      setUserNameError("");
    }
  }

  const isFormValid = userName.length > 4 && password.length > 4 && userNameError.length === 0;

  return (
    <form onSubmit={handleSubmitForm}>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          required
          onChange={handleNameChange}
          onBlur={handleNameBlur}
        />
        {userNameError && <p>{userNameError}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" disabled={!isFormValid}>Submit</button>
    </form>
  )
}
export default LoginForm
