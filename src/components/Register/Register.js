import React, { Component } from 'react';

class Register extends Component {

	constructor(props){
		super(props)
	}

	state = {
		name: '',
		email: '',
		password: ''
	}

	onNameChage = (e) => {
		this.setState({ name: e.target.value })
	}

	onEmailChage = (e) => {
		this.setState({ email: e.target.value })
	} 

	onPasswordChage = (e) => {
		this.setState({ password: e.target.value })
	} 

	onRegister = async () => {
		const response = await fetch('http://localhost:5000/register', {
			method: 'POST',
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			}),
			headers: {
      	'Content-Type': 'application/json'
    	}
		})
		const result = await response.json();
		const user = await result;
		if(user){
			this.props.loadUser(user)
			this.props.onRouteChange('home')
		} 
	} 

	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="name">
									Name
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="text"
									name="name"
									id="name"
									onChange={this.onNameChage}
								/>
							</div>
							<div className="mt3">
								<label
									className="db fw6 lh-copy f6"
									htmlFor="email-address"
								>
									Email
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
									onChange={this.onEmailChage}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">
									Password
								</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
									onChange={this.onPasswordChage}
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Register"
								onClick={this.onRegister}
							/>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default Register;
