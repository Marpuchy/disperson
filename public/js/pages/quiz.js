document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('[data-quiz-root]');

    if (!root) {
        return;
    }

    const intro = root.querySelector('[data-quiz-intro]');
    const stage = root.querySelector('[data-quiz-stage]');
    const startButton = root.querySelector('[data-quiz-start]');
    const steps = Array.from(root.querySelectorAll('[data-quiz-step]'));
    const prevButton = root.querySelector('[data-quiz-prev]');
    const nextButton = root.querySelector('[data-quiz-next]');
    const submitButton = root.querySelector('[data-quiz-submit]');
    const progressBar = root.querySelector('[data-quiz-progress]');
    const currentStepLabel = root.querySelector('[data-quiz-current-step]');
    const answers = Array.from(root.querySelectorAll('.answer-scale__option'));

    let currentStep = 0;
    let hasStarted = false;

    if (steps.length === 0) {
        return;
    }

    const syncSelectionState = () => {
        answers.forEach((option) => {
            const input = option.querySelector('input');
            option.classList.toggle('is-selected', Boolean(input?.checked));
        });
    };

    const render = () => {
        steps.forEach((step, index) => {
            const isActive = index === currentStep;

            step.classList.toggle('is-active', isActive);
            step.hidden = !isActive;
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
    };

    const startExperience = () => {
        if (hasStarted) {
            return;
        }

        hasStarted = true;

        if (intro) {
            intro.classList.add('is-collapsing');
        }

        if (stage) {
            stage.hidden = false;

            window.requestAnimationFrame(() => {
                stage.classList.add('is-active');
            });
        }

        window.setTimeout(() => {
            if (intro) {
                intro.hidden = true;
            }
        }, 300);

        render();
    };

    answers.forEach((option) => {
        const input = option.querySelector('input');

        input?.addEventListener('change', syncSelectionState);
    });

    startButton?.addEventListener('click', startExperience);

    prevButton?.addEventListener('click', () => {
        if (!hasStarted || currentStep === 0) {
            return;
        }

        currentStep -= 1;
        render();
    });

    nextButton?.addEventListener('click', () => {
        if (!hasStarted || currentStep >= steps.length - 1) {
            return;
        }

        currentStep += 1;
        render();
    });

    document.addEventListener('keydown', (event) => {
        if (!hasStarted) {
            return;
        }

        const target = event.target;
        const isTypingField = target instanceof HTMLElement
            && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);

        if (isTypingField) {
            return;
        }

        if (event.key === 'ArrowRight' && currentStep < steps.length - 1) {
            currentStep += 1;
            render();
        }

        if (event.key === 'ArrowLeft' && currentStep > 0) {
            currentStep -= 1;
            render();
        }
    });

    syncSelectionState();
});
