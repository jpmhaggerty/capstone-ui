import RuleGeneric from '../components/RuleGeneric';
import ModalGeneric from '../components/ModalGeneric';
import { Button } from '@mui/material'
import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";


const APICallData = [
    //1
    {
      id: 1,
      constraint_name:
        "Will the flight path carry the vehicle through a non-transparent cumulus cloud attached a parent smoke plume?",
      constraint_parameter_integer: null,
      constraint_operator: "===",
      constraint_parameter_boolean: false,
      user_input_integer: null,
      user_input_boolean: true,
      logic_group: "A|",
    },
    //2
    {
      id: 2,
      constraint_name:
        "Will the flight path carry the vehicle through a non-transparent cumulus cloud that has been detached from a smoke plume within the last 60 minutes?",
      constraint_parameter_integer: null,
      constraint_operator: "===",
      constraint_parameter_boolean: false,
      user_input_integer: null,
      user_input_boolean: true,
      logic_group: "A|",
    }
  ];

  describe('The RuleGeneric component', () => {
    const mockGet = jest.fn();
    mockGet.mockReturnValue(APICallData);

    test('the getAPIData function', () => {
      const rule = 'smoke';

      act(() => {
        render(<RuleGeneric ruleName={rule} loading={false}/>);
        global.fetch = mockGet(`http://localhost:8080/rules/${rule}`)
      });

      const name = screen.getByText('Smoke')
      expect(name).toBeInTheDocument();
    })
  });

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

// describe('The cards', () => {

//   test('There should be as many cards as there are rules', () => {
//     act( () => {
//       render(<RuleGeneric criteria={allTheApiCalls}/>)
//     });

//     let cards = screen.getAllByTestId('card');
//     expect(cards.length).toBe(2);
//   });

//   test('The cards should display the names of the rules', () => {
//     act( () => {
//       render(<RuleGeneric criteria={allTheApiCalls}/>)
//     })

//     let title = screen.getByRole('heading', {level: 3})
//     expect(title).toBeInTheDocument();
//   });

//   test('Cards should have a button', () => {
//     act( () => {
//       render(<RuleGeneric criteria={allTheApiCalls}/>);
//     });

//     let buttonText = screen.getByRole('button').innerHTML
//     expect(buttonText).toContain('Change Rule Data');
//   });

//   test('Buttons should be clickable', () => {
//     const onClick = jest.fn();
//     const button = <Button size="small" onClick={onClick}> Change Rule Data </Button>
//     act( () => {
//       render(button);
//     });

//     fireEvent.click(screen.getByRole('button'));
//     expect(onClick).toHaveBeenCalledTimes(1);
//   });
// });

// describe('The different criteria modals', () => {

//   let open = true;
//   const setOpen = () => {
//     if(open) {
//       open = false;
//     } else {
//       opne = true;
//     }
//   };
//   const handleModal = () => {
//     setOpen();
//   };
//   const handleData = jest.fn()

//   test('the modals should have questions from the backend database', () => {
//     act(() => {
//       render(<ModalGeneric handleData={handleData} open={open} handleModal={handleModal} ruleSet={modalData}/>)
//     });

//     const firstQuestion = screen.getByText('What is the slant distance to the lightning strike? (nmi)')
//     expect(firstQuestion).toBeInTheDocument();
//   });

//   test('the form sliders should allow for changes', () => {
//   });

//   test('the form should patch data back to the database upon submission of modal form', () => {

//   });

//   test('the form should have a toggle that opens up admin mode to alter form components', () => {

//   });
// });