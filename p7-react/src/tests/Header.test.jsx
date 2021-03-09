import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const { render, screen, within } = require('@testing-library/react');

function setupTest() {
  render(<App />);
}

describe('Header', () => {
  it('should load the header', () => {
    setupTest();
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('should have button change between signup and login on click', () => {
    setupTest();
    const header = screen.getByTestId('header');
    const { getByText } = within(header);
    const button = getByText(/sign up/i);
    userEvent.click(button);
    expect(button.textContent.toLowerCase()).toEqual('log in');
  });



  // it('should change buttons when logged in', () => {
  //   setupTest();
  //   const loggedInButtons = screen.getByTestId('test-logged-in-buttons');
  //   expect(loggedInButtons.textContent.toLowerCase()).toEqual('sign up');
  //   screen.getByTestId('test-form-login');
  //   userEvent.click(button);
  //   expect(button.textContent.toLowerCase()).toEqual('log in');
  //   screen.getByTestId('test-form-signup');
  // });
});