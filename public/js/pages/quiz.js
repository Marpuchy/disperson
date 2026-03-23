document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('[data-quiz-root]');

    if (!root) {
        return;
    }

    const steps = Array.from(root.querySelectorAll('[data-quiz-step]'));
    const prevButton = root.querySelector('[data-quiz-prev]');
    const nextButton = root.querySelector('[data-quiz-next]');
    const submitButton = root.querySelector('[data-quiz-submit]');
    const progressBar = root.querySelector('[data-quiz-progress]');
    const currentStepLabel = root.querySelector('[data-quiz-current-step]');
    const answers = Array.from(root.querySelectorAll('.answer-scale__option'));

    let currentStep = 0;
    let firstRender = true;

    if (steps.length === 0) {
        return;
    }

    const syncSelectionState = () => {
        answers.forEach((option) => {
            const input = option.querySelector('input');
            option.classList.toggle('is-selected', Boolean(input?.checked));
        });
    };

    const render = ({ shouldScroll = false } = {}) => {
        steps.forEach((step, index) => {
            const isActive = index === currentStep;

            step.classList.remove('is-active');
            step.hidden = !isActive;

            if (isActive) {
                window.requestAnimationFrame(() => {
                    step.classList.add('is-active');
                });
            }
        });

        const progress = ((currentStep + 1) / steps.length) * 100;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        if (currentStepLabel) {
            currentStepLabel.textContent = String(currentStep + 1);
        }

        if (prevButton) {
            prevButton.disabled = currentStep === 0;
        }

        const isLastStep = currentStep === steps.length - 1;

        if (nextButton) {
            nextButton.hidden = isLastStep;
        }

        if (submitButton) {
            submitButton.hidden = !isLastStep;
        }

        if (shouldScroll && !firstRender) {
            const bounds = root.getBoundingClientRect();
            const isOutOfFocus = bounds.top < 72 || bounds.top > (window.innerHeight * 0.35);

            if (isOutOfFocus) {
                root.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }

        firstRender = false;
    };

    answers.forEach((option) => {
        const input = option.querySelector('input');

        input?.addEventListener('change', syncSelectionState);
    });

    prevButton?.addEventListener('click', () => {
        if (currentStep === 0) {
            return;
        }

        currentStep -= 1;
        render({ shouldScroll: true });
    });

    nextButton?.addEventListener('click', () => {
        if (currentStep >= steps.length - 1) {
            return;
        }

        currentStep += 1;
        render({ shouldScroll: true });
    });

    document.addEventListener('keydown', (event) => {
        const target = event.target;
        const isTypingField = target instanceof HTMLElement
            && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);

        if (isTypingField) {
            return;
        }

        if (event.key === 'ArrowRight' && currentStep < steps.length - 1) {
            currentStep += 1;
            render({ shouldScroll: true });
        }

        if (event.key === 'ArrowLeft' && currentStep > 0) {
            currentStep -= 1;
            render({ shouldScroll: true });
        }
    });

    syncSelectionState();
    render();
});
