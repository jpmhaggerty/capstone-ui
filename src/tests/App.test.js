import App from '../App';
import RuleLightning from '../components/RuleLightning';
import Homepage from '../components/Homepage';
import RuleGeneric from '../components/RuleGeneric';
import ModalGeneric from '../components/ModalGeneric';
import { Button } from '@mui/material'
import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";

let modalData = {
  name: 'Lightning Rule',
  criteria:
  [{
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
    }]
  };

const allTheApiCalls = [
  {ligntning:
    {
      name: 'Lightning Rule',
      criteria:
    [
      {
          "id": 1,
          "constraint_name": "What is the slant distance to the lightning strike? (nmi)",
          "constraint_parameter_integer": 10,
          "constraint_parameter_boolean": null,
          "user_input_integer": null,
          "user_input_boolean": null
      },
      {
          "id": 2,
          "constraint_name": "What was the time of the last lightning strike?",
          "constraint_parameter_integer": 30,
          "constraint_parameter_boolean": null,
          "user_input_integer": null,
          "user_input_boolean": null
      },
      {
          "id": 3,
          "constraint_name": "Was the cloud that produced the lightning strike within 10 nmi?",
          "constraint_parameter_integer": null,
          "constraint_parameter_boolean": true,
          "user_input_integer": null,
          "user_input_boolean": null
      },
      {
          "id": 4,
          "constraint_name": "Is there at least one working field mill within 5 nmi of the lightning strike?",
          "constraint_parameter_integer": null,
          "constraint_parameter_boolean": true,
          "user_input_integer": null,
          "user_input_boolean": null
      },
      {
          "id": 5,
          "constraint_name": "Was the highest absolute value field mill measurement in 5 nmi of lightning strike for 15 minutes greater than or equal to 1000 V/m?",
          "constraint_parameter_integer": null,
          "constraint_parameter_boolean": true,
          "user_input_integer": null,
          "user_input_boolean": null
      }
    ]
    }
  },
  {cumulus:
    {
      name: 'Cumulus Cloud Rule',
      criteria:
    [
      {
          "id": 1,
          "constraint_name": "Is the cloud between 0 and 5 nmi where the cloud top is at an altitude where the temp is  colder than or equal  -10° C?",
          "constraint_parameter_integer": null,
          "constraint_parameter_boolean": false,
          "user_input_integer": null,
          "user_input_boolean": null
      },
      {
          "id": 2,
          "constraint_name": "Is there a cloud between 5 and 10 where the cloud top is at an altitude where the temp is  colder than or equal  -20° C?",
          "constraint_parameter_integer": null,
          "constraint_parameter_boolean": false,
          "user_input_integer": null,
          "user_input_boolean": null
      },
      {
          "id": 3,
          "constraint_name": "Will the  flight path be through the  cloud where the cloud has a top at an altitude where the temperature is colder than or equal to +5 °C and warmer than -5 °C?",
          "constraint_parameter_integer": null,
          "constraint_parameter_boolean": false,
          "user_input_integer": null,
          "user_input_boolean": null
      },
      {
          "id": 4,
          "constraint_name": "Is the cloud producing precipitation?",
          "constraint_parameter_integer": null,
          "constraint_parameter_boolean": false,
          "user_input_integer": null,
          "user_input_boolean": null
      },
      {
          "id": 5,
          "constraint_name": "Is the horizontal distance from the center of the cloud top to at least 1 working field mill less than 2 nmi?",
          "constraint_parameter_integer": null,
          "constraint_parameter_boolean": false,
          "user_input_integer": null,
          "user_input_boolean": null
      },
      {
          "id": 6,
          "constraint_name": "Are all electric field mill measurements at a horizontal distance of less than or equal to 5 nmi from the flight path, between -100 V/m and +500 V/m for at least 15 minutes?",
          "constraint_parameter_integer": null,
          "constraint_parameter_boolean": false,
          "user_input_integer": null,
          "user_input_boolean": null
      },
      {
          "id": 7,
          "constraint_name": "Will the flight path be through a cloud where the cloud has a top at an altitude where the temperature is colder than or equal to -5 °C?",
          "constraint_parameter_integer": null,
          "constraint_parameter_boolean": false,
          "user_input_integer": null,
          "user_input_boolean": null
      }
    ]
    }
  }
]

// describe('The app\'s homepage', () => {
//   test('The title of the app should be on the opening page', () => {
//     act(() => {
//       render(<Homepage />)
//       global.fetch = mockGet('http://localhost:3000/weatherApp');
//     });

//     const title = screen.getByRole('heading', {level:1});
//     expect(title).toBeInTheDocument();
//   });

//   test('should perform an api call to grab data for the different LCCs', () => {
//     act(() => {
//         render(<Homepage />)
//         global.fetch = mockGet('http://localhost:3000/weatherApp');
//     });
//     expect(mockGet.mock.calls.length).toBe(2);
//     expect(mockGet).toHaveBeenCalled()
//   });

// });

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

describe('The cards', () => {

  test('There should be as many cards as there are rules', () => {
    act( () => {
      render(<RuleGeneric criteria={allTheApiCalls}/>)
    });

    let cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(2);
  });

  test('The cards should display the names of the rules', () => {
    act( () => {
      render(<RuleGeneric criteria={allTheApiCalls}/>)
    })

    let title = screen.getByRole('heading', {level: 3})
    expect(title).toBeInTheDocument();
  });

  test('Cards should have a button', () => {
    act( () => {
      render(<RuleGeneric criteria={allTheApiCalls}/>);
    });

    let buttonText = screen.getByRole('button').innerHTML
    expect(buttonText).toContain('Change Rule Data');
  });

  test('Buttons should be clickable', () => {
    const onClick = jest.fn();
    const button = <Button size="small" onClick={onClick}> Change Rule Data </Button>
    act( () => {
      render(button);
    });

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('The different criteria modals', () => {

  let open = true;
  const setOpen = () => {
    if(open) {
      open = false;
    } else {
      opne = true;
    }
  };
  const handleModal = () => {
    setOpen();
  };
  const handleData = jest.fn()

  test('the modals should have questions from the backend database', () => {
    act(() => {
      render(<ModalGeneric handleData={handleData} open={open} handleModal={handleModal} ruleSet={modalData}/>)
    });

    const firstQuestion = screen.getByText('What is the slant distance to the lightning strike? (nmi)')
    expect(firstQuestion).toBeInTheDocument();
  });

  test('the form sliders should allow for changes', () => {
  });

  test('the form should patch data back to the database upon submission of modal form', () => {

  });

  test('the form should have a toggle that opens up admin mode to alter form components', () => {

  });
});