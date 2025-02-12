import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { Container, Button } from 'react-bootstrap';
import { SteppedForm, useFormStepper } from '.';
import { Input } from '..';
import { render, act } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

Enzyme.configure({ adapter: new Adapter() });

const FormContentComponent = () => {
  const stepper = useFormStepper();
  return (
    <Container>
      <Input field="data.name" placeholder="Name" />

      <p>STEP: {stepper.current}</p>
      <Button onClick={() => stepper.gotoStep(3)} variant="outline-info">
        Go to
      </Button>
      <Button onClick={stepper.goBack} variant="outline-info">
        Back
      </Button>
      <Button onClick={stepper.gotoNext} variant="outline-info">
        Next Step
      </Button>
      <Button type="submit">Save</Button>
    </Container>
  );
};

const Component = () => {
  return (
    <SteppedForm
      steps={[
        { route: 'building-id', title: 'Building ID', completed: false, canGoToStep: true },
        { route: 'tenancy', title: 'Tenancy', completed: false, canGoToStep: true },
        { route: 'valuation', title: 'Valuation', completed: false, canGoToStep: true },
        { route: 'parcel', title: 'Parcel', completed: false, canGoToStep: true },
        { route: 'review', title: 'Review', completed: false, canGoToStep: true },
      ]}
      initialValues={{
        activeStep: 0,
        data: { name: 'Quartech HQ' },
        activeTab: 0,
      }}
      persistable
      persistProps={{
        name: 'testForm',
        secret: 'secret',
        persistCallback: console.log,
      }}
      onSubmit={console.log}
    >
      <FormContentComponent />
    </SteppedForm>
  );
};

describe('SteppedForm', () => {
  it('component renders correctly', () => {
    const { container } = render(<Component />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('back on step 0 doesnt throw an error', () => {
    const { getByText } = render(<Component />);
    const backButton = getByText('Back');
    act(() => {
      fireEvent.click(backButton);
    });
    const currentStep = getByText('STEP: 0');
    expect(currentStep).toBeInTheDocument();
  });
  it('goes to the next page', async () => {
    const { getByText, findByText } = render(<Component />);
    const nextButton = getByText('Next Step');
    await act(async () => {
      fireEvent.click(nextButton);
      const currentStep = await findByText('STEP: 1');
      expect(currentStep).toBeInTheDocument();
    });
  });
  it('does not change page if next and back are clicked', async () => {
    const { findByText, getByText } = render(<Component />);
    const nextButton = getByText('Next Step');
    const backButton = getByText('Back');
    fireEvent.click(nextButton);
    await findByText('STEP: 1');
    fireEvent.click(backButton);
    await findByText('STEP: 0');
    const currentStep = getByText('STEP: 0');
    expect(currentStep).toBeInTheDocument();
  });
  it('jumps to a step', async () => {
    const { getByText, findByText } = render(<Component />);
    const jumpTo = getByText('Go to');
    await act(async () => {
      fireEvent.click(jumpTo);
      let currentStep = await findByText('STEP: 3');
      expect(currentStep).toBeInTheDocument();
    });
  });
});
