document.addEventListener('DOMContentLoaded', () => {
    const traits = Array.isArray(window.profileTraits) ? window.profileTraits : [];
    const canvas = document.getElementById('profileChart');

    if (canvas && traits.length > 0) {
        const context = canvas.getContext('2d');
        const palette = ['#8b5cf6', '#a855f7', '#d946ef', '#f472d0', '#f9a8ff'];
        let resizeFrame = null;

        const drawChart = () => {
            const ratio = window.devicePixelRatio || 1;
            const size = canvas.getBoundingClientRect().width || 520;

            canvas.width = size * ratio;
            canvas.height = size * ratio;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            context.clearRect(0, 0, size, size);

            const centerX = size / 2;
            const centerY = size / 2;
            const radius = size * 0.33;
            const levels = 5;
            const angleStep = (Math.PI * 2) / traits.length;
            const labelFontSize = Math.max(11, size * 0.029);

            const pointFor = (index, scale = 1) => {
                const angle = angleStep * index - Math.PI / 2;

                return {
                    x: centerX + Math.cos(angle) * radius * scale,
                    y: centerY + Math.sin(angle) * radius * scale,
                };
            };

            const halo = context.createRadialGradient(centerX, centerY, size * 0.04, centerX, centerY, size * 0.5);
            halo.addColorStop(0, 'rgba(217, 70, 239, 0.16)');
            halo.addColorStop(1, 'rgba(17, 7, 29, 0)');
            context.fillStyle = halo;
            context.beginPath();
            context.arc(centerX, centerY, size * 0.48, 0, Math.PI * 2);
            context.fill();

            context.strokeStyle = 'rgba(242, 221, 255, 0.13)';
            context.lineWidth = 1;

            for (let level = 1; level <= levels; level += 1) {
                context.beginPath();

                traits.forEach((_, index) => {
                    const point = pointFor(index, level / levels);

                    if (index === 0) {
                        context.moveTo(point.x, point.y);
                    } else {
                        context.lineTo(point.x, point.y);
                    }
                });

                context.closePath();
                context.stroke();
            }

            traits.forEach((trait, index) => {
                const point = pointFor(index);
                const labelPoint = pointFor(index, 1.17);

                context.beginPath();
                context.moveTo(centerX, centerY);
                context.lineTo(point.x, point.y);
                context.strokeStyle = 'rgba(242, 221, 255, 0.1)';
                context.stroke();

                context.fillStyle = palette[index] || '#f5d0fe';
                context.font = `700 ${labelFontSize}px Outfit`;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(trait.navigation_label, labelPoint.x, labelPoint.y);
            });

            context.beginPath();

            traits.forEach((trait, index) => {
                const point = pointFor(index, trait.score / 100);

                if (index === 0) {
                    context.moveTo(point.x, point.y);
                } else {
                    context.lineTo(point.x, point.y);
                }
            });

            context.closePath();

            const fillGradient = context.createLinearGradient(centerX, centerY - radius, centerX, centerY + radius);
            fillGradient.addColorStop(0, 'rgba(217, 70, 239, 0.34)');
            fillGradient.addColorStop(1, 'rgba(124, 58, 237, 0.12)');
            context.fillStyle = fillGradient;
            context.strokeStyle = '#f472d0';
            context.lineWidth = 2.2;
            context.shadowColor = 'rgba(217, 70, 239, 0.3)';
            context.shadowBlur = 18;
            context.fill();
            context.stroke();
            context.shadowBlur = 0;

            traits.forEach((trait, index) => {
                const point = pointFor(index, trait.score / 100);

                context.beginPath();
                context.arc(point.x, point.y, Math.max(4, size * 0.01), 0, Math.PI * 2);
                context.fillStyle = palette[index] || '#f5d0fe';
                context.fill();

                context.beginPath();
                context.arc(point.x, point.y, Math.max(2, size * 0.0045), 0, Math.PI * 2);
                context.fillStyle = '#ffffff';
                context.fill();
            });
        };

        drawChart();

        window.addEventListener('resize', () => {
            window.cancelAnimationFrame(resizeFrame);
            resizeFrame = window.requestAnimationFrame(drawChart);
        });
    }

    const panels = Array.from(document.querySelectorAll('[data-profile-panel]'));

    const setPanelState = (panel, isOpen, { instant = false } = {}) => {
        const trigger = panel.querySelector('[data-profile-trigger]');
        const content = panel.querySelector('[data-profile-content]');

        if (!content) {
            return;
        }

        panel.classList.toggle('is-open', isOpen);
        trigger?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

        if (instant) {
            content.hidden = !isOpen;
            content.style.height = isOpen ? 'auto' : '0px';
            content.style.opacity = isOpen ? '1' : '0';
            return;
        }

        content.style.overflow = 'clip';

        if (isOpen) {
            content.hidden = false;
            content.style.height = '0px';
            content.style.opacity = '0';

            window.requestAnimationFrame(() => {
                content.style.height = `${content.scrollHeight}px`;
                content.style.opacity = '1';
            });

            const onOpenEnd = (event) => {
                if (event.propertyName !== 'height') {
                    return;
                }

                content.style.height = 'auto';
                content.removeEventListener('transitionend', onOpenEnd);
            };

            content.addEventListener('transitionend', onOpenEnd);
            return;
        }

        const currentHeight = content.scrollHeight;
        content.style.height = `${currentHeight}px`;
        content.style.opacity = '1';

        window.requestAnimationFrame(() => {
            content.style.height = '0px';
            content.style.opacity = '0';
        });

        const onCloseEnd = (event) => {
            if (event.propertyName !== 'height') {
                return;
            }

            content.hidden = true;
            content.removeEventListener('transitionend', onCloseEnd);
        };

        content.addEventListener('transitionend', onCloseEnd);
    };

    panels.forEach((panel) => {
        setPanelState(panel, panel.classList.contains('is-open'), { instant: true });

        const trigger = panel.querySelector('[data-profile-trigger]');

        trigger?.addEventListener('click', () => {
            if (panel.classList.contains('is-open')) {
                return;
            }

            panels.forEach((currentPanel) => {
                setPanelState(currentPanel, currentPanel === panel);
            });
        });
    });
});
