import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<form>
			<div class="mb-3">
				<label for="exampleInputEmail1" class="form-label">Email address</label>
				<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
				<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
			</div>
			<div class="mb-3">
				<label for="exampleInputPassword1" class="form-label">Password</label>
				<input type="password" class="form-control" id="exampleInputPassword1" />
			</div>
			<div class="mb-3 form-check">
				<input type="checkbox" class="form-check-input" id="exampleCheck1" />
				<label class="form-check-label" for="exampleCheck1">Check me out</label>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	);
};
//const { store, actions } = useContext(Context);

// return (
// 		<div className="container">
// 			<ul className="list-group">
// 				{store.demo.map((item, index) => {
// 					return (
// 						<li
// 							key={index}
// 							className="list-group-item d-flex justify-content-between"
// 							style={{ background: item.background }}>
// 							<Link to={"/single/" + index}>
// 								<span>Link to: {item.title}</span>
// 							</Link>
// 							{// Conditional render example
// 							Check to see if the background is orange, if so, display the message
// 							item.background === "orange" ? (
// 								<p style={{ color: item.initial }}>
// 									Check store/flux.js scroll to the actions to see the code
// 								</p>
// 							) : null}
// 							<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
// 								Change Color
// 							</button>
// 						</li>
// 					);
// 				})}
// 			</ul>
// 			<br />
// 			<Link to="/">
// 				<button className="btn btn-primary">Back home</button>
// 			</Link>
// 		</div>
// 		<form>
// 			<div className="mb-3">
// 				<label for="exampleInputEmail1" className="form-label">Email address</label>
// 				<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
// 				<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
// 			</div>
// 			<div className="mb-3">
// 				<label for="exampleInputPassword1" className="form-label">Password</label>
// 				<input type="password" className="form-control" id="exampleInputPassword1"/>
// 			</div>
// 			<button type="submit" className="btn btn-primary">Submit</button>
	//	</form>
//);
//};