// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom'
import Login from '../components/login/Login';

describe('Login component tests', () => {

let container = null;
beforeEach(() => {
container = document.createElement("div");
document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

  it('finds qualified insurrance policies', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
            );
        })
    expect(screen.getByText(/WELCOME/)).toBeInTheDocument();
});
