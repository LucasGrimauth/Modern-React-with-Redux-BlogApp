import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	renderField(field){
		const { meta: { touched, error} } = field;
		const className = `form-group ${ touched && error ? 'has-danger' : '' }`;

		return(
			<div className={className}>
				<label className="text-primary">{field.label}</label>
				<input 
					className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">{ touched ?  error : '' }</div>
			</div>
		)
	}
	
	onSubmit(values){
		this.props.createPost(values, ()=> { this.props.history.push('') } );
	}

	render(){
		const { handleSubmit } = this.props;
		return(
			<div>
				<form className="well" onSubmit={handleSubmit(this.onSubmit.bind(this))} >
					<Field
						label="Title"
						name="title"
						component={this.renderField}
					/>
					<Field
						label="Categories"
						name="categories"
						component={this.renderField}
					/>
					<Field
						label="Content"
						name="content"
						component={this.renderField}
					/>
					<button type="submit" className="btn btn-primary">Submit</button>
					<Link to="/" className="btn btn-danger">Cancel</Link>
				</form>
			</div>
		);
	}
}

function validate(values){
	const errors = {};

	// Validation
	if(!values.title){
		errors.title = "Please, enter a title.";
	}
	if(!values.categories){
		errors.categories = "Please, enter some categories.";
	}
	if(!values.content){
		errors.content = "Please, write some content.";
	}

	// if erros is empty, submit
	// else, form is invalid

	return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})( 
	connect(null, { createPost })(PostsNew)
);