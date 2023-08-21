import { describe, expect, it } from 'vitest'
import { useStep } from './index';
describe('useStep', () => {
    it('should initialize with the first step', () => {
        const [currentStep] = useStep(3);
        expect(currentStep.value).toBe(1);
    });

    it('should allow navigating to the next step', () => {
        const [currentStep, { goToNextStep }] = useStep(3);
        goToNextStep();
        expect(currentStep.value).toBe(2);
    });

    it('should allow setting the step directly', () => {
        const [currentStep, { setStep }] = useStep(3);
        setStep(2);
        expect(currentStep.value).toBe(2);
    });

    it('should allow navigating to the previous step', () => {
        const [currentStep, { goToPrevStep, setStep }] = useStep(3);
        setStep(3);
        goToPrevStep();
        expect(currentStep.value).toBe(2);
    });

    it('should not allow navigating past the last step', () => {
        const [currentStep, { goToNextStep }] = useStep(3);
        goToNextStep();
        goToNextStep();
        goToNextStep();
        expect(currentStep.value).toBe(3);
        goToNextStep();
        expect(currentStep.value).toBe(3);
    });

    it('should not allow navigating before the first step', () => {
        const [currentStep, { goToPrevStep }] = useStep(3);
        goToPrevStep();
        expect(currentStep.value).toBe(1);
    });

    it('should allow resetting to the first step', () => {
        const [currentStep, { goToNextStep, reset }] = useStep(3);
        goToNextStep();
        goToNextStep();
        reset();
        expect(currentStep.value).toBe(1);
    });

    it('should throw an error if setting an invalid step', () => {
        const [currentStep, { setStep }] = useStep(3);
        expect(() => setStep(4)).toThrow('Step not valid');
    });

    it('should return true if it is the last step', () => {
        const [currentStep, { isEndStep, setStep }] = useStep(3);
        setStep(3);
        expect(isEndStep(currentStep.value)).toBe(true);
    });

    it('should return false if it is not the last step', () => {
        const [currentStep, { isEndStep, setStep }] = useStep(3);
        setStep(2);
        expect(isEndStep(currentStep.value)).toBe(false);
    });
});
