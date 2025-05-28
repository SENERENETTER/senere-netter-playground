export class Counter {
    private count = 0;
    private element: HTMLElement;

    constructor(container: HTMLElement) {
        this.element = this.createElement();
        container.appendChild(this.element);
        this.render();
    }

    private createElement(): HTMLElement {
        const div = document.createElement('div');
        div.className = 'counter-component';
        div.innerHTML = `
            <div class="card" style="text-align: center; max-width: 300px; margin: 20px auto;">
                <h3>🎯 Vite HMR Counter</h3>
                <div class="counter-display" style="font-size: 3rem; font-weight: bold; color: var(--color-primary); margin: 20px 0;">
                    ${this.count}
                </div>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button class="btn btn-primary decrement">➖ Decrease</button>
                    <button class="btn btn-secondary reset">🔄 Reset</button>
                    <button class="btn btn-primary increment">➕ Increase</button>
                </div>
                <p style="margin-top: 15px; font-size: 0.9rem; color: var(--color-text-muted);">
                    Try editing this file while the counter is running!
                </p>
            </div>
        `;

        // Add event listeners
        div.querySelector('.increment')?.addEventListener('click', () => this.increment());
        div.querySelector('.decrement')?.addEventListener('click', () => this.decrement());
        div.querySelector('.reset')?.addEventListener('click', () => this.reset());

        return div;
    }

    private increment() {
        this.count++;
        this.render();
        this.addAnimation('increment');
    }

    private decrement() {
        this.count--;
        this.render();
        this.addAnimation('decrement');
    }

    private reset() {
        this.count = 0;
        this.render();
        this.addAnimation('reset');
    }

    private render() {
        const display = this.element.querySelector('.counter-display');
        if (display) {
            display.textContent = this.count.toString();
            
            // Fun color changes based on count
            if (this.count > 10) {
                (display as HTMLElement).style.color = 'var(--color-success)';
            } else if (this.count < 0) {
                (display as HTMLElement).style.color = 'var(--color-error)';
            } else {
                (display as HTMLElement).style.color = 'var(--color-primary)';
            }
        }
    }

    private addAnimation(type: 'increment' | 'decrement' | 'reset') {
        const display = this.element.querySelector('.counter-display') as HTMLElement;
        if (display) {
            display.style.transform = type === 'reset' ? 'scale(1.3) rotate(360deg)' : 'scale(1.2)';
            display.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                display.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // HMR API for preserving state during development
    static preserveState(newClass: typeof Counter, oldInstance: Counter): Counter {
        // This would preserve the counter value during HMR updates
        const newInstance = Object.create(newClass.prototype);
        newInstance.count = oldInstance.count;
        return newInstance;
    }
}
