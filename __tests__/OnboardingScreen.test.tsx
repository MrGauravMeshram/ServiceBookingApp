import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import OnboardingScreen from '../src/Screens/Auth/OnboardingScreen/OnboardingScreen';

describe('OnboardingScreen', () => {
  it('renders the first onboarding slide title', async () => {
    let component: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      component = ReactTestRenderer.create(<OnboardingScreen />);
    });

    expect(component!.root.findByProps({testID: 'onboarding-title'}).props.children).toBe('Find Food You Love');
  });
});
