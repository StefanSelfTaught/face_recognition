import React, { Component } from 'react';

class SignIn extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		email: '',
		password: ''
	};

	onEmailChange = (e) => {
		this.setState({ email: e.target.value })
	}

	onPasswordChange = (e) => {
		this.setState({ password: e.target.value })
	}

	onSubmit = async () => {
	 const response = await fetch('http://localhost:5000/signin', {
			method: 'POST',
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			}),
			headers: {
      'Content-Type': 'application/json'
    	}
		})
		const result = await response.json();
		const user = await result;
		if(user.id){
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
							<legend className="f1 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">
									Email
								</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
									onChange={this.onEmailChange}
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
									onChange={this.onPasswordChange}
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Sign in"
								onClick={this.onSubmit}
							/>
						</div>
						<div className="lh-copy mt3">
							<p
								onClick={() => this.props.onRouteChange('register')}
								className="f6 link dim black db pointer"
							>
								Register
							</p>
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default SignIn;
