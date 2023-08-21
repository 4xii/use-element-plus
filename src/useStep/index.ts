import { computed, Ref, ref, watch } from 'vue';

interface Helpers {
    /**
     * 走下一步
     */
    goToNextStep: () => void;
    /**
     * 走上一步
     */
    goToPrevStep: () => void;
    /**
     * 重制步数
     */
    reset: () => void;
    /**
     * 是否可以走下一步
     */
    canGoToNextStep: () => boolean;
    /**
     * 是否可以走上一步
     */
    canGoToPrevStep: () => boolean;
    /**
     * 直接设置步数
     */
    setStep: (step: number | ((currentStep: number) => number)) => void;
    /**
     * 是否到了最后一步
     */
    isEndStep: (step: number) => boolean;
}

const useStep = (maxStep: number): [Ref<number>, Helpers] => {
    const currentStep = ref(1);
    const canGoToNextStep = () => currentStep.value + 1 <= maxStep;

    const canGoToPrevStep = () => currentStep.value - 1 >= 1;

    const setStep = (step: ((currentStep: number) => number) | number) => {
        // Allow value to be a function so we have the same API
        const newStep = step instanceof Function ? step(currentStep.value) : step;

        if (newStep >= 1 && newStep <= maxStep) {
            currentStep.value = newStep;
            return;
        }

        throw new Error('Step not valid');
    };

    const goToNextStep = () => {
        if (canGoToNextStep()) {
            currentStep.value += 1;
        }
    };

    const goToPrevStep = () => {
        if (canGoToPrevStep()) {
            currentStep.value -= 1;
        }
    };

    const reset = () => {
        currentStep.value = 1;
    };

    const isEndStep = () => currentStep.value === maxStep;
    return [
        currentStep,
        {
            goToNextStep,
            goToPrevStep,
            canGoToNextStep,
            canGoToPrevStep,
            setStep,
            reset,
            isEndStep,
        },
    ];
}

export {useStep};
