import App from '../App';
import RuleLightning from '../components/RuleLightning';
import Homepage from '../components/Homepage';
import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";

let apiCallData = [
    {
        constraint_id: 1,
        constraint_name: 'What was the lightning strike Slant Distance from the flight path?',
        constraint_condition_integer: 10,
        constraint_condition_boolean: null,
        user_input_integer: null,
        user_input_boolean: null
    },
    {
        constraint_id: 2,
        constraint_name: 'What was the time of the last strike?',
        constraint_condition_integer: 30,
        constraint_condition_boolean: null,
        user_input_integer: null,
        user_input_boolean: null
    },
    {
        constraint_id: 3,
        constraint_name: 'Was a cloud produced within 10nmi of the flight path?',
        constraint_condition_integer: null,
        constraint_condition_boolean: false,
        user_input_integer: null,
        user_input_boolean: null
    }
];

let mockGet = jest.fn((url) => Promise.resolve(apiCallData))

describe('The app\'s homepage', () => {
  test('The title of the app should be on the opening page', () => {
    act(() => {
      render(<Homepage />)
      global.fetch = mockGet('http://localhost:3000/weatherApp');
    });

    const title = screen.getByRole('heading', {level:1});
    expect(title).toBeInTheDocument();
  });

  test('should perform an api call to grab data for the different LCCs', () => {
    act(() => {
        render(<Homepage />)
        global.fetch = mockGet('http://localhost:3000/weatherApp');
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    const cards = screen.getAllByRole('combobox')
  });

});

// describe('The card component', () => {

//     test('should render with the name of the rule as the card title', () => {
//         act(() => {
//             render(<RuleLightning lightningCriteria={apiCallData}/>);
//         });

//         const cardTitle = screen.getHTML('Lightning');
//         expect(cardTitle).toBeInTheDocument();
//     })

//     test('should have a button that opens a modal', () => {
//         const grabEvents = () => {
//             const mockHomePageState = [{title: 'Christmas Party', purpose: 'Spread some holiday cheer', date: '2021-12-20'}];
//             return mockHomePageState;
//         }
//         act(() => {
//             render(<Homepage />)
//             let events = grabEvents();
//         })

//         const event = screen.getByText('Christmas Party')
//         expect(event).toBeInTheDocument();
//     })
// })

// describe('The card modals', () => {

//   test('a form should populate upon opening the modal', () => {

//   });

//   test('the form should contain questions grabbed from the backend for the rule', () => {

//   });

//   test('the form should have the sliders initially set to the neutral position', {

//   });

//   test('the form sliders should allow for changes', () => {

//   });

//   test('the form should patch data back to the database upon submission of modal form', () => {

//   });

//   test('the form should have a toggle that opens up admin mode to alter form components', () => {

//   });

// });