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

  const APICallDataViolation = [
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
      user_input_boolean: false,
      logic_group: "A|",
    }
  ];

  describe('The RuleGeneric component', () => {
    const mockGet = jest.fn();
    mockGet.mockReturnValue(APICallData);
    const mockGetViolation = jest.fn();
    mockGetViolation.mockReturnValue(APICallDataViolation);
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
    //3
    // test('the rule is populated correctly when the application loads, rule should show violated if constraints are not met', async () => {

    //   await act(() => {
    //     render(<RuleGeneric ruleName={rule} loading={false}/>);
    //     global.fetch = mockGetViolation(`http://localhost:8080/rules/${rule}`)
    //   });

    //   const status = screen.getByText('Violated')
    //   expect(status).toBeInTheDocument();
    // });
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

    //4
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

  //5
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


//6
test("ensure that the edit mode is fully functional", () => {

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

  const logicGroup = screen.getAllByTestId('logicGroup')
  expect(logicGroup).toHaveLength(2)
  });

  test("the text boxes should be fillable when in edit mode", () => {
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

    let textBox = screen.getByTestId('constraint_rule0')
    fireEvent.type(textBox, 'changing the rule')
    expect(textBox, "changing the rule")).toBe(true)
  });

});
