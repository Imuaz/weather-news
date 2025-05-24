import { hourHand, minuteHand, secondHand, digitalTime, digitalDate, clockNumbers } from './domRefs.js';

export function createClockNumbers() {
    for (let i = 1; i <= 12; i++) {
        const number = document.createElement('div');
        number.className = 'clock-number';
        number.textContent = i;

        const angle = (i * 30) - 90;
        const radians = (angle * Math.PI) / 180;
        const x = 80 * Math.cos(radians);
        const y = 80 * Math.sin(radians);

        number.style.left = `calc(50% + ${x}px - 12px)`;
        number.style.top = `calc(50% + ${y}px - 12px)`;

        clockNumbers.appendChild(number);
    }
}

export function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;
    const minuteDegrees = (minutes / 60) * 360;
    const secondDegrees = (seconds / 60) * 360;

    hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    digitalTime.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    digitalDate.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}