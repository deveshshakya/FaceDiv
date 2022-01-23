import {useState} from "react";

const SignIn = ({loadUser, onRouteChange}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onSubmitSignIn = async () => {
    if (!email || !password) {
      return alert("Field must not be empty.");
    }
    try {
      let response = await fetch('http://localhost:8081/api/v1/signIn', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({email, password})
      })

      if (response.status === 404) {
        alert('Wrong credentials.')
      }
      if (response.status === 200) {
        response = await response.json()
        if (response._id) {
          loadUser(response);
          onRouteChange('home');
        }
      } else {
        alert('Something went wrong.')
      }
    } catch (err) {
      alert("Something went wrong, try after some time.");
    }
  }

  return (<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
    <main className="pa3 black-80">
      <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input
              className="pa2 input-reset ba b--black bg-transparent hover-black w-100"
              type="email"
              name="email-address"
              id="email-address"
              onChange={onEmailChange}
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input
              className="b pa2 input-reset ba b--black bg-transparent hover-black w-100"
              type="password"
              name="password"
              id="password"
              onChange={onPasswordChange}
            />
          </div>
        </fieldset>
        <div className="">
          <input
            onClick={onSubmitSignIn}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
            type="submit"
            value="Sign In"
          />
        </div>
        <div className="lh-copy mt3">
          <p onClick={() => onRouteChange('register')}
             className="f5 link dim black db grow pointer">Register</p>
        </div>
      </div>
    </main>
  </article>);
}

export default SignIn;