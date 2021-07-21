import React, { Component } from "react";

export default class Login extends Component {

	constructor(props){
		super(props)
	  }

    render() {
        return (
            <React.Fragment>

			<div className="container-login100">
            	<div class="wrap-login100">
					<div class="login100-pic js-tilt" data-tilt>
						<img src="images/login.png" alt="IMG" />
					</div>
					
					<form class="validate-form login100-form ">
						<span class="login100-form-title">
							Member Login
						</span>
						<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
							<input class="input100" type="text" name="email" placeholder="Email" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-envelope" aria-hidden="true"></i>
							</span>
						</div>
						<div class="wrap-input100 validate-input" data-validate = "Password is required">
							<input class="input100" type="password" name="pass" placeholder="Password" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-lock" aria-hidden="true"></i>
							</span>
						</div>
						<div class="container-login100-form-btn">
							<button class="login100-form-btn" onClick={this.props.login}>
								Login
							</button>
						</div>
						<div class="text-center pt-2">
							<span class="txt1">
								Forgot
							</span>
							<a class="txt2 ml-2" href="#">
								Username / Password?
							</a>
						</div>
						<div class="text-center pt-5">
							<a class="txt2" href="#">
								Create your Account
								<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
							</a>
						</div>
					</form>
				</div>
			</div>

        </React.Fragment>
        );
    }
}