import React from 'react'

export function Form() {
    return(
        <form>
            <label>Name
                <input
                    type='text'
                    name='name'
                />
            </label>

            <label>Email
                <input 
                    type='email'
                    name='email'
                />
            </label>

            <label>Password
                <input 
                    type='password'
                    name='password'
                />
            </label>

            <label>Terms of Service
                <input 
                    type='checkbox'
                    name='terms'
                />
            </label>

            <button>Submit</button>

        </form>
    )
}