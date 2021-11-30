import RuleGeneric from '../components/RuleGeneric';
import ModalGeneric from '../components/ModalGeneric';
import ButtonAppBar from '../components/ButtonAppBar';
import Home from '../components/Home';
import { Button } from '@mui/material'
import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from 'react-router-dom'


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

  const APICallData2 = [
    {
      constraint_name: "What was the time of the last lightning strike?",
      constraint_parameter_integer: 30,
      constraint_operator: ">",
      constraint_parameter_boolean: null,
      user_input_integer: Date.now(),
      user_input_boolean: null,
      logic_group: "A|",
    },
    {
      constraint_name:
        "Will the flight path be a slant distance of greater than 10 nmi from any non-transparent part of the lightning generating thunderstorm?",
      constraint_parameter_integer: null,
      constraint_operator: "===",
      constraint_parameter_boolean: true,
      user_input_integer: null,
      user_input_boolean: false,
      logic_group: "A|,B&",
    },
    {
      constraint_name:
        "What is the minimum slant distance(nmi) of the lightning strike to the flight path?",
      constraint_parameter_integer: 10,
      constraint_operator: ">",
      constraint_parameter_boolean: null,
      user_input_integer: 10,
      user_input_boolean: null,
      logic_group: "A|,B&,C|",
    },
    {
      constraint_name:
        "Are all non-transparent parts of the cloud that produced the lightning at a slant distance of greater than 10 nmi from the flight path?",
      constraint_parameter_integer: null,
      constraint_operator: "===",
      constraint_parameter_boolean: true,
      user_input_integer: null,
      user_input_boolean: false,
      logic_group: "A|,B&,C|,D&",
    },
    {
      constraint_name:
        "Is there at least one working field mill at a horizontal distance of less than or equal to 5 nmi from lightning discharge?",
      constraint_parameter_integer: null,
      constraint_operator: "===",
      constraint_parameter_boolean: true,
      user_input_integer: null,
      user_input_boolean: false,
      logic_group: "A|,B&,C|,D&",
    },
    {
      constraint_name:
        "Are the absolute values of all bounded electric field measurements (readings taken from all devices within  a horizontal distance of less than or equal to 5 nmi from the flight path, and from devices within a horizontal distance of less than or equal to 5 nmi from the lightning discharge) registering at less than 1000 V/m for at least 15 minutes?",
      constraint_parameter_integer: null,
      constraint_operator: "===",
      constraint_parameter_boolean: true,
      user_input_integer: null,
      user_input_boolean: false,
      logic_group: "A|,B&,C|,D&",
    },
  ]

  describe('The RuleGeneric component', () => {
    const mockGet = jest.fn();
    mockGet.mockReturnValue(APICallData);
    const rule = 'smoke';
    //1
    test('the name of the rule populates onto the card', () => {

      act(() => {
        render(<RuleGeneric ruleName={rule} loading={false}/>);
        global.fetch = mockGet(`http://localhost:8080/rules/${rule}`)
      });

      const name = screen.getByText('Smoke')
      expect(name).toBeInTheDocument();
    });
    //2
    test('the rule is populated correctly when the application loads, rule should not be violated in it\'s initial state',() => {

      act(() => {
        render(<RuleGeneric ruleName={rule} loading={false}/>);
        global.fetch = mockGet(`http://localhost:8080/rules/${rule}`)
      });

      const status = screen.getByText('Cleared')
      expect(status).toBeInTheDocument();
    });

    test('there should be an image on the card', () => {
      act(() => {
        render(<RuleGeneric ruleName={rule} loading={false}/>)
        global.fetch = mockGet(`http://localhost:8080/rules/${rule}`)
      });
      const image = screen.getByAltText('LCCImg');
      expect(image).toBeInTheDocument();
    });
  });

  describe('The ModalGeneric component', () => {
    const openModal = true;
    const handleModal = jest.fn();
    const ruleName = "smoke";
    const rule = APICallData;
    const noProMode = false;
    const editProMode = true;
    const handleProMode = jest.fn();
    const handleDataSet = jest.fn();

    //3
    test("testing whether the constraints get loaded into the modal appropriately.", () => {

      act(() => {
        render(<ModalGeneric
          openModal={openModal}
          openProMode={noProMode}
          ruleName={ruleName}
          rule={rule}
          handleModal={handleModal}
          handleProMode={handleProMode}
          handleDataSet={handleDataSet}
          />);
      });

      const ruleContent = screen.getByTestId('constraint_name0')
      expect(ruleContent).toHaveTextContent('NoYesWill the flight path carry the vehicle through a non-transparent cumulus cloud attached a parent smoke plume?');
    });

  test('All the rules also have a toggle switch', () => {
    act(() => {
      render(<ModalGeneric
        openModal={openModal}
        openProMode={noProMode}
        ruleName={ruleName}
        rule={rule}
        handleModal={handleModal}
        handleProMode={handleProMode}
        handleDataSet={handleDataSet}
        />);
    });
    const switches = screen.getAllByRole('checkbox');
    expect(switches).toHaveLength(3);
  });

  //4
  test("Test the toggle switch that flips the form to edit mode.", () => {

    act(() => {
      render(<ModalGeneric
        openModal={openModal}
        openProMode={noProMode}
        ruleName={ruleName}
        rule={rule}
        handleModal={handleModal}
        handleProMode={handleProMode}
        handleDataSet={handleDataSet}
        />);
    });

    const modalSwitch = screen.getByTestId('proModeSwitch');
    fireEvent.click(modalSwitch);
    expect(handleProMode).toHaveBeenCalled();
  });
//5
// test("ensure that the edit mode is fully functional", () => {

//   act(() => {
//     render(<ModalGeneric
//       openModal={openModal}
//       openProMode={editProMode}
//       ruleName={ruleName}
//       rule={rule}
//       handleModal={handleModal}
//       handleProMode={handleProMode}
//       handleDataSet={handleDataSet}
//       />);
//   });

//   const logicGroup = screen.getAllByTestId('logicGroup')
//   expect(logicGroup).toHaveLength(2)
//   });
//6
  test("text boxes should appear when in edit mode", () => {
    act(() => {
      render(<ModalGeneric
        openModal={openModal}
        openProMode={editProMode}
        ruleName={ruleName}
        rule={rule}
        handleModal={handleModal}
        handleProMode={handleProMode}
        handleDataSet={handleDataSet}
        />);
    });

    let textBox = screen.getAllByRole('textbox')
    expect(textBox).toHaveLength(4)
  });

  test("Modal is able to populate rules requiring integer inputs with textboxes", () => {
    act(() => {
      render(<ModalGeneric
        openModal={openModal}
        openProMode={noProMode}
        ruleName='lightning'
        rule={APICallData2}
        handleModal={handleModal}
        handleProMode={handleProMode}
        handleDataSet={handleDataSet}
        />);
    })
    const textBox = screen.getAllByRole('textbox')
    expect(textBox).toHaveLength(8);
  });

});

describe('The Navbar at the top of the screen', () => {
  //7
  test('it should be on the page', () => {
    act(() => {
      render(<Router><ButtonAppBar /></Router>)
    })
      const appBar = screen.getByRole('banner');
      expect(appBar).toBeInTheDocument();
  });
  //8
  test('It should have a 4 buttons', () => {
    act(() => {
      render(<Router><ButtonAppBar/></Router>)
    })
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });
});

describe('Home.js', () => {
  //9
  test('A card container should be present to hold all LCC cards', () => {
    act(() => {
      render(<Home/>)
    })
    const cardBox = screen.getByTestId('card-container');
    expect(cardBox).toBeInTheDocument();
  });
});
