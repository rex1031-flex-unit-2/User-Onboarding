import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

export default function Form() {
 
    const initialFormState = {
        name: '',
        email: '',
        password: '',
        terms: ''
    }

    //State for Server Errors 
    const [serverError, setServerError] = useState("");
    //post state
    const [post, setPost] = useState([]);
    //state for form inputs 
    const [formState, setFormState]= useState(initialFormState);
    //state controls the submit button, form can not be submitted if the criteria of the input data is not met
    const [isButtonDisabled, setIsButtonDisabled]= useState(false);
    //state that manages errors, 
    const [errors, setErrors] = useState(initialFormState);

    //Schema for input data validation
    const formSchema = yup.object().shape({
        name: yup.string().required("Name must be at least one character"),
        email: yup.string().email("Must be a valid email address").required(),
        password: yup.string().required("Password is required"),
        terms: yup.boolean().oneOf([true], "Please agrees to the terms to continue")
    })

    //validates the key/value pairs
    const validateChange = (e) =>{
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then((valid)=>{
                setErrors({...errors, [e.target.name]: ""})
            })
            .catch((err)=>{
                console.log("error!", err);
                setErrors({...errors, [e.target.name]: err.errors[0]})
            })
    }

    //useEffect that enables the button if form inputs are valid
    useEffect(()=>{
        formSchema.isValid(formState).then((valid) =>{
            console.log("valid?:", valid);
            setIsButtonDisabled(!valid);
        })
    },[formState] )


    //onChange handler
    const inputChange = (e)=>{
        e.persist();
        const newFormData ={
            ...formState,
            [e.target.name]:
            e.target.type === "checkbox"? e.target.checked: e.target.value
        }
        validateChange(e);
        setFormState(newFormData);

    } 

    //onSubmit function
    const formSubmit = (e)=>{
        e.preventDefault();
        console.log('submit!')
        //POST request 
        axios
        .post("https://reqres.in/api/users", formState)
        .then((response) =>{
            setPost(response.data)
            setFormState(initialFormState);
            setServerError(null);
        })
        .catch((err) =>{
            setServerError("Server Error")
        })
    }

    return(
        <form onSubmit={formSubmit}>
            {serverError ? <p className="error">{serverError}</p> : null}
            <label>Name
                <input
                    type='text'
                    name='name'
                    data-cy='name'
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> :null}
            </label>

            <label>Email
                <input 
                    type='email'
                    name='email'
                    data-cy='email'
                    value={formState.email}
                    onChange={inputChange}
                />
                {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
            </label>

            <label>Password
                <input 
                    type='password'
                    name='password'
                    data-cy='password'
                    value={formState.password}
                    onChange={inputChange}
                />
                {errors.password.length > 4 ? (<p className="error">{errors.password}</p>) : null}
            </label>

            <label>Terms of Service
                <input 
                    type='checkbox'
                    name='terms'
                    data-cy='terms'
                    checked={formState.terms}
                    onChange={inputChange}
                />
            </label>

            <button data-cy='submit' disabled={isButtonDisabled} type='submit'>Submit</button>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </form>
    )
    
}