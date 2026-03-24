document.addEventListener('DOMContentLoaded', () => {
    const config = window.profileConfig ?? {};
    const traits = Array.isArray(config.traits) ? config.traits : [];
    const canvas = document.getElementById('profileChart');
    const canvasShell = document.querySelector('[data-profile-canvas-shell]');
    const root = document.querySelector('[data-profile-root]');
    const buttons = Array.from(document.querySelectorAll('[data-profile-trait-button]'));
    const activePanel = document.querySelector('[data-profile-active-panel]');

    if (!root || traits.length === 0) {
        return;
    }

    const characterBasePath = typeof config.characterBasePath === 'string'
        ? config.characterBasePath.replace(/\/$/, '')
        : '/resources/characters';

    const activeEyebrow = document.querySelector('[data-profile-active-eyebrow]');
    const activeLabel = document.querySelector('[data-profile-active-label]');
    const activeSummary = document.querySelector('[data-profile-active-summary]');
    const activeDescription = document.querySelector('[data-profile-active-description]');
    const activeScore = document.querySelector('[data-profile-active-score]');
    const activeLevel = document.querySelector('[data-profile-active-level]');
    const activeScale = document.querySelector('[data-profile-active-scale]');
    const activeLow = document.querySelector('[data-profile-active-low]');
    const activeHigh = document.querySelector('[data-profile-active-high]');
    const characterCard = document.querySelector('[data-profile-character-card]');
    const characterMedia = document.querySelector('[data-profile-character-media]');
    const characterImage = document.querySelector('[data-profile-character-image]');
    const characterName = document.querySelector('[data-profile-character-name]');
    const characterDescription = document.querySelector('[data-profile-character-description]');
    const palette = ['#8b5cf6', '#a855f7', '#d946ef', '#f472d0', '#f9a8ff'];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let activeKey = typeof config.activeTraitKey === 'string' && config.activeTraitKey
        ? config.activeTraitKey
        : traits[0].key;
    let previousActiveKey = activeKey;
    let hoveredKey = null;
    let gridProgress = 0;
    let polygonProgress = 0;
    let pointsProgress = 0;
    let focusProgress = 1;
    let resizeFrame = null;
    let geometry = null;
    let swapTimeout = null;
    let focusFrame = null;

    const getTraitIndex = (key) => traits.findIndex((trait) => trait.key === key);
    const getActiveTrait = () => traits[getTraitIndex(activeKey)] ?? traits[0];
    const easeOutCubic = (value) => 1 - ((1 - value) ** 3);

    const pointFor = (centerX, centerY, radius, angleStep, index, scale = 1) => {
        const angle = angleStep * index - Math.PI / 2;

        return {
            x: centerX + Math.cos(angle) * radius * scale,
            y: centerY + Math.sin(angle) * radius * scale,
        };
    };

    const drawChart = (timestamp = performance.now()) => {
        if (!canvas) {
            return;
        }

        const context = canvas.getContext('2d');
        const ratio = window.devicePixelRatio || 1;
        const size = canvas.getBoundingClientRect().width || 560;

        canvas.width = size * ratio;
        canvas.height = size * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.clearRect(0, 0, size, size);

        const centerX = size / 2;
        const centerY = size * 0.478;
        const radius = size * 0.286;
        const levels = 5;
        const angleStep = (Math.PI * 2) / traits.length;
        const labelFontSize = Math.max(11, size * 0.028);
        const easedGrid = easeOutCubic(gridProgress);
        const easedPolygon = easeOutCubic(polygonProgress);
        const easedPoints = easeOutCubic(pointsProgress);
        const activeIndex = Math.max(0, getTraitIndex(activeKey));
        const previousActiveIndex = Math.max(0, getTraitIndex(previousActiveKey));
        const hoveredIndex = Math.max(-1, getTraitIndex(hoveredKey));
        const easedFocus = easeOutCubic(focusProgress);
        const pulse = prefersReducedMotion ? 0 : ((Math.sin(timestamp / 260) + 1) / 2);
        const interactionPoints = [];

        geometry = { centerX, centerY, radius, angleStep, interactionPoints, size };

        const halo = context.createRadialGradient(centerX, centerY, size * 0.04, centerX, centerY, size * 0.5);
        halo.addColorStop(0, 'rgba(217, 70, 239, 0.18)');
        halo.addColorStop(1, 'rgba(17, 7, 29, 0)');
        context.fillStyle = halo;
        context.beginPath();
        context.arc(centerX, centerY, size * 0.46, 0, Math.PI * 2);
        context.fill();

        for (let level = 1; level <= levels; level += 1) {
            const revealStart = (level - 1) * 0.08;
            const ringReveal = Math.max(0, Math.min((easedGrid - revealStart) / 0.42, 1));

            if (ringReveal <= 0) {
                continue;
            }

            const ringRadius = radius * (level / levels);
            const ringPerimeter = ringRadius * 5.8;

            context.save();
            context.beginPath();

            traits.forEach((_, index) => {
                const point = pointFor(centerX, centerY, radius, angleStep, index, level / levels);

                if (index === 0) {
                    context.moveTo(point.x, point.y);
                } else {
                    context.lineTo(point.x, point.y);
                }
            });

            context.closePath();
            context.setLineDash([ringPerimeter, ringPerimeter]);
            context.lineDashOffset = ringPerimeter * (1 - ringReveal);
            context.strokeStyle = `rgba(242, 221, 255, ${0.06 + (0.12 * ringReveal)})`;
            context.lineWidth = 1;
            context.stroke();
            context.restore();
        }

        traits.forEach((trait, index) => {
            const edgePoint = pointFor(centerX, centerY, radius, angleStep, index, 1);
            const labelScale = index === 0 ? 1.135 : (index >= 3 ? 1.155 : 1.17);
            const labelPoint = pointFor(centerX, centerY, radius, angleStep, index, labelScale);
            const transitionEmphasis = index === activeIndex
                ? easedFocus
                : (index === previousActiveIndex && previousActiveIndex !== activeIndex ? 1 - easedFocus : 0);
            const hoverEmphasis = index === hoveredIndex ? 0.72 : 0;
            const emphasis = Math.max(transitionEmphasis, hoverEmphasis);
            const axisReveal = Math.max(0, Math.min((easedGrid - 0.2) / 0.65, 1));

            if (axisReveal > 0) {
                context.save();
                context.beginPath();
                context.moveTo(centerX, centerY);
                context.lineTo(edgePoint.x, edgePoint.y);
                context.setLineDash([radius, radius]);
                context.lineDashOffset = radius * (1 - axisReveal);
                context.strokeStyle = `rgba(244, 114, 255, ${(0.06 + (0.28 * emphasis)) * axisReveal})`;
                context.lineWidth = 1 + (1.05 * emphasis);
                context.stroke();
                context.restore();
            }

            context.fillStyle = emphasis > 0.25 ? '#fff3ff' : (palette[index] || '#f5d0fe');
            context.font = `${emphasis > 0.5 ? 800 : 700} ${labelFontSize + (size * 0.0032 * emphasis)}px Outfit`;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.globalAlpha = 0.45 + (0.55 * Math.max(axisReveal, emphasis));
            context.shadowColor = `rgba(244, 114, 255, ${0.08 + (0.22 * emphasis)})`;
            context.shadowBlur = 8 * emphasis;
            context.fillText(trait.navigation_label, labelPoint.x, labelPoint.y);
            context.shadowBlur = 0;
            context.globalAlpha = 1;
        });

        const activeEdgeStart = pointFor(centerX, centerY, radius, angleStep, activeIndex, 1);
        const activeEdgeEnd = pointFor(centerX, centerY, radius, angleStep, (activeIndex + 1) % traits.length, 1);
        context.save();
        context.beginPath();
        context.moveTo(activeEdgeStart.x, activeEdgeStart.y);
        context.lineTo(activeEdgeEnd.x, activeEdgeEnd.y);
        context.strokeStyle = `rgba(244, 114, 255, ${0.08 + (0.26 * easedFocus)})`;
        context.lineWidth = 1.2 + (1.2 * easedFocus);
        context.stroke();
        context.restore();

        context.beginPath();

        traits.forEach((trait, index) => {
            const scaledScore = Math.max(0, Math.min(100, trait.score)) / 100;
            const point = pointFor(centerX, centerY, radius, angleStep, index, scaledScore * easedPolygon);

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
        context.globalAlpha = easedPolygon;
        context.fillStyle = fillGradient;
        context.strokeStyle = '#f472d0';
        context.lineWidth = 2.2;
        context.shadowColor = 'rgba(217, 70, 239, 0.28)';
        context.shadowBlur = 18 + (8 * easedFocus);
        context.setLineDash([radius * 6, radius * 6]);
        context.lineDashOffset = (radius * 6) * (1 - easedPolygon);
        context.fill();
        context.stroke();
        context.setLineDash([]);
        context.shadowBlur = 0;
        context.globalAlpha = 1;

        traits.forEach((trait, index) => {
            const scaledScore = Math.max(0, Math.min(100, trait.score)) / 100;
            const pointReveal = Math.max(0, Math.min((easedPoints - (index * 0.08)) / 0.52, 1));
            const pointRevealEase = easeOutCubic(pointReveal);
            const point = pointFor(centerX, centerY, radius, angleStep, index, scaledScore * easedPolygon);
            const transitionEmphasis = index === activeIndex
                ? easedFocus
                : (index === previousActiveIndex && previousActiveIndex !== activeIndex ? 1 - easedFocus : 0);
            const hoverEmphasis = index === hoveredIndex ? 0.72 : 0;
            const emphasis = Math.max(transitionEmphasis, hoverEmphasis);
            const activePulse = (index === activeIndex ? pulse * 1.4 : 0);
            const pointRadius = (Math.max(4.3, size * 0.0095) * pointRevealEase) + (Math.max(2.8, size * 0.0048) * emphasis) + activePulse;

            interactionPoints.push({
                key: trait.key,
                x: point.x,
                y: point.y,
            });

            if (emphasis > 0.02 && pointReveal > 0.02) {
                context.beginPath();
                context.arc(point.x, point.y, pointRadius + 7 + (pulse * 3), 0, Math.PI * 2);
                context.fillStyle = `rgba(244, 114, 255, ${(0.08 + (0.16 * emphasis)) * pointRevealEase})`;
                context.fill();

                context.beginPath();
                context.arc(point.x, point.y, pointRadius + 3 + (pulse * 1.8), 0, Math.PI * 2);
                context.strokeStyle = `rgba(255, 232, 255, ${(0.2 + (0.34 * emphasis)) * pointRevealEase})`;
                context.lineWidth = 1.1 + emphasis;
                context.stroke();
            }

            context.beginPath();
            context.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
            context.fillStyle = palette[index] || '#f5d0fe';
            context.globalAlpha = pointRevealEase;
            context.fill();

            context.beginPath();
            context.arc(point.x, point.y, Math.max(1.9, size * 0.0042) * pointRevealEase, 0, Math.PI * 2);
            context.fillStyle = '#ffffff';
            context.fill();
            context.globalAlpha = 1;
        });
    };

    const animateChartIn = () => {
        const start = performance.now();
        const totalDuration = 1180;

        if (prefersReducedMotion) {
            gridProgress = 1;
            polygonProgress = 1;
            pointsProgress = 1;
            focusProgress = 1;
            canvasShell?.classList.add('is-ready');
            drawChart();
            return;
        }

        const tick = (now) => {
            const elapsed = now - start;
            const overallProgress = Math.min(elapsed / totalDuration, 1);
            gridProgress = Math.min(overallProgress / 0.44, 1);
            polygonProgress = Math.max(0, Math.min((overallProgress - 0.24) / 0.56, 1));
            pointsProgress = Math.max(0, Math.min((overallProgress - 0.56) / 0.34, 1));
            focusProgress = pointsProgress;
            drawChart(now);

            if (overallProgress < 1) {
                window.requestAnimationFrame(tick);
            } else {
                focusProgress = 1;
                canvasShell?.classList.add('is-ready');
            }
        };

        window.requestAnimationFrame(tick);
    };

    const animateTraitFocus = () => {
        if (prefersReducedMotion) {
            focusProgress = 1;
            previousActiveKey = activeKey;
            activePanel?.classList.remove('is-shifting');
            drawChart();
            return;
        }

        window.cancelAnimationFrame(focusFrame);
        canvasShell?.classList.add('is-shifting');
        activePanel?.classList.add('is-shifting');
        focusProgress = 0;
        const start = performance.now();
        const duration = 360;

        const tick = (now) => {
            const elapsed = now - start;
            focusProgress = Math.min(elapsed / duration, 1);
            drawChart(now);

            if (focusProgress < 1) {
                focusFrame = window.requestAnimationFrame(tick);
            } else {
                previousActiveKey = activeKey;
                canvasShell?.classList.remove('is-shifting');
                activePanel?.classList.remove('is-shifting');
            }
        };

        focusFrame = window.requestAnimationFrame(tick);
    };

    const updatePanels = (trait) => {
        if (!trait) {
            return;
        }

        activePanel?.classList.add('is-swapping');
        characterCard?.classList.remove('is-entering');
        window.clearTimeout(swapTimeout);

        swapTimeout = window.setTimeout(() => {
            if (activeEyebrow) {
                activeEyebrow.textContent = `${trait.ocean_letter} / ${trait.navigation_label}`;
            }

            if (activeLabel) {
                activeLabel.textContent = trait.label;
            }

            if (activeSummary) {
                activeSummary.textContent = trait.summary;
            }

            if (activeDescription) {
                activeDescription.textContent = trait.description;
            }

            if (activeScore) {
                activeScore.textContent = `${trait.score}/100`;
            }

            if (activeLevel) {
                activeLevel.textContent = `Nivel ${trait.level}`;
            }

            if (activeScale) {
                activeScale.style.width = `${trait.score}%`;
            }

            if (activeLow) {
                activeLow.textContent = trait.low_anchor;
            }

            if (activeHigh) {
                activeHigh.textContent = trait.high_anchor;
            }

            if (trait.character) {
                characterCard?.classList.remove('is-empty');

                if (characterMedia) {
                    characterMedia.hidden = false;
                }

                if (characterImage) {
                    characterImage.src = `${characterBasePath}/${trait.character.id}.jpg`;
                    characterImage.alt = trait.character.name;
                }

                if (characterName) {
                    characterName.textContent = trait.character.name;
                }

                if (characterDescription) {
                    characterDescription.textContent = trait.character.description;
                }
            } else {
                characterCard?.classList.add('is-empty');

                if (characterMedia) {
                    characterMedia.hidden = true;
                }

                if (characterImage) {
                    characterImage.removeAttribute('src');
                    characterImage.alt = '';
                }

                if (characterName) {
                    characterName.textContent = 'Equivalencia visual pendiente';
                }

                if (characterDescription) {
                    characterDescription.textContent = 'Todavia no hay personaje asociado para este nivel. La lectura psicologica sigue siendo valida y la equivalencia visual puede completarse desde el panel admin.';
                }
            }

            activePanel?.classList.remove('is-swapping');
            activePanel?.classList.add('is-entering');
            characterCard?.classList.add('is-entering');

            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    activePanel?.classList.remove('is-entering');
                    characterCard?.classList.remove('is-entering');
                });
            });
        }, 130);
    };

    const setActiveTrait = (key) => {
        const nextTrait = traits.find((trait) => trait.key === key);

        if (!nextTrait) {
            return;
        }

        if (nextTrait.key === activeKey) {
            return;
        }

        previousActiveKey = activeKey;
        activeKey = nextTrait.key;

        buttons.forEach((button) => {
            const isActive = button.dataset.profileTraitKey === activeKey;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        updatePanels(nextTrait);
        animateTraitFocus();
    };

    if (canvas) {
        const updateHoveredPoint = (event) => {
            if (!geometry?.interactionPoints?.length) {
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const threshold = Math.max(16, geometry.size * 0.03);
            let nextHoveredKey = null;
            let closestDistance = Infinity;

            geometry.interactionPoints.forEach((point) => {
                const distance = Math.hypot(x - point.x, y - point.y);

                if (distance < threshold && distance < closestDistance) {
                    closestDistance = distance;
                    nextHoveredKey = point.key;
                }
            });

            if (nextHoveredKey !== hoveredKey) {
                hoveredKey = nextHoveredKey;
                canvas.style.cursor = hoveredKey ? 'pointer' : 'default';
                drawChart();
            }
        };

        const setTraitFromCanvasPointer = (event) => {
            if (!geometry) {
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const dx = x - geometry.centerX;
            const dy = y - geometry.centerY;
            const distance = Math.sqrt((dx ** 2) + (dy ** 2));

            if (distance < geometry.radius * 0.2 || distance > geometry.radius * 1.25) {
                return;
            }

            let angle = Math.atan2(dy, dx) + (Math.PI / 2);

            if (angle < 0) {
                angle += Math.PI * 2;
            }

            const index = Math.round(angle / geometry.angleStep) % traits.length;
            const trait = traits[index];

            if (trait) {
                setActiveTrait(trait.key);
            }
        };

        canvas.addEventListener('mousemove', (event) => {
            updateHoveredPoint(event);
            setTraitFromCanvasPointer(event);
        });
        canvas.addEventListener('click', setTraitFromCanvasPointer);
        canvas.addEventListener('mouseleave', () => {
            hoveredKey = null;
            canvas.style.cursor = 'default';
            drawChart();
        });

        window.addEventListener('resize', () => {
            window.cancelAnimationFrame(resizeFrame);
            resizeFrame = window.requestAnimationFrame(() => drawChart());
        });
    }

    buttons.forEach((button) => {
        const key = button.dataset.profileTraitKey;

        button.addEventListener('click', () => {
            if (key) {
                setActiveTrait(key);
            }
        });

        button.addEventListener('mouseenter', () => {
            if (key) {
                setActiveTrait(key);
            }
        });

        button.addEventListener('focus', () => {
            if (key) {
                setActiveTrait(key);
            }
        });
    });

    updatePanels(getActiveTrait());
    animateChartIn();
});
