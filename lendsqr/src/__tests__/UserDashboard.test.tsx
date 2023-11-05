// @ts-nocheck
import { render, screen, waitFor } from '@testing-library/react';
import Users from '../components/dashboard/users/Users';

import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';

describe('User Dashboard component tests', () => {

it('should have a p tag that says users', async() => {
    render(
        <BrowserRouter><Users /></BrowserRouter>
    )
    const subTitle = screen.getAllByText(/users/i);
    expect(subTitle[0]).toBeInTheDocument();
})
it('should have a loading text display', async() => {
    render(<BrowserRouter><Users /></BrowserRouter>);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
})
it('should a filter tag on the table header', async() => {
    render(<BrowserRouter><Users /></BrowserRouter>);
    await waitFor(() => {
        expect(screen.getByTestId("filter")).toBeInTheDocument();
    })
})
});
