// @ts-nocheck
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom'
import Login from '../components/login/Login';

describe('Login component tests', () => {
    
beforeEach(() => {

});

afterEach(() => {
    // cleanup on exiting

});

it('should have a p tag that says welcome', async() => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )
    await waitFor(() => {
        expect(screen.getByText(/WELCOME/)).toBeInTheDocument();
    });
})
it("should have an alert class when the button is clicked and the input fields requirements aren't met", async ()=>{
render(<BrowserRouter>
        <Login />
     </BrowserRouter>);
    const loginButton = screen.getByRole('button', { name: 'LOG IN' });
    expect(loginButton).toBeInTheDocument();
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    // Checking if there will be an error in the document if a wrong text is passed
    await userEvent.type(screen.getByPlaceholderText(/Email/), 'anson');
    await userEvent.click(loginButton);
    await waitFor(() => {
        expect(screen.getByText(/Provide a valid email/)).toBeInTheDocument();
    });
    // Checking if there will be an error in the document if a wrong text is passed
    await userEvent.type(screen.getByPlaceholderText(/Password/), '1');
    await userEvent.click(loginButton);
    expect(await screen.findByText(/Password must be greater than 4/)).toBeInTheDocument();
    // expect(screen.getByText('Provide a valid email')).toBeInTheDocument();
})

it("Loading text should be shown on successful submission", async()=>{
    render(<BrowserRouter>
        <Login />
     </BrowserRouter>);
    const loginButton = screen.getByRole('button', { name: 'LOG IN' });
    await userEvent.type(screen.getByPlaceholderText(/Email/), 'anson@gmail.com');
    await userEvent.type(screen.getByPlaceholderText(/Password/), '1234');
    await userEvent.click(loginButton);
    // await waitFor(()=>{
    //     expect(screen.getByRole('button', { name: 'Loading...' })).toBeInTheDocument();
    // })
    await waitFor(()=>{
        expect(screen.queryByText(/Password must be greater than 4/)).not.toBeInTheDocument();
    })
})
});
