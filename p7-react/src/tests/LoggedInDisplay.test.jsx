import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App'
import LoggedInDisplay from '../components/LoggedInDisplay/LoggedInDisplay'

const { render, screen, within } = require('@testing-library/react');

function setupTest() {
  render(<App />);
  render(<LoggedInDisplay />);
}

// it('should show articles when logging in', () => {
//   setupTest();
//   const header = screen.getByTestId('header');
//   const { getByText } = within(header);
//   const button = getByText(/sign up/i);
//   userEvent.click(button);
//   expect(button.textContent.toLowerCase()).toEqual('log in');
// });

it('should change between forms and logged in elements on click', () => {
  setupTest();
  const loggedInDisplay = screen.getByTestId('test-logged-in-display');
  // const { getByText } = within(loggedInDisplay);
  const button = screen.getByTestId('test-login-status-button');

  const articles = screen.getByTestId('test-article-display');
  userEvent.click(button);
  const profile = screen.getByTestId('test-profile-display');

});
