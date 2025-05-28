// 🚀 Dynamic Import Demo - Load modules on demand!
export class DynamicImportDemo {
    private container: HTMLElement;
    private loadedModules: Set<string> = new Set();

    constructor(container: HTMLElement) {
        this.container = container;
        this.render();
    }

    private render() {
        this.container.innerHTML = `
            <div class="card">
                <h3>🚀 Dynamic Imports & Code Splitting</h3>
                <p>Vite automatically code-splits dynamic imports!</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                    <button class="btn btn-primary" data-module="confetti">
                        🎉 Load Confetti
                    </button>
                    <button class="btn btn-secondary" data-module="animations">
                        ✨ Load Animations  
                    </button>
                    <button class="btn btn-primary" data-module="utils">
                        🛠️ Load Utils
                    </button>
                </div>
                
                <div id="dynamic-content" style="min-height: 100px; border: 2px dashed var(--color-border); border-radius: var(--border-radius-md); padding: 20px; text-align: center; margin-top: 20px;">
                    <p style="color: var(--color-text-muted);">Click a button to dynamically load a module! 📦</p>
                </div>
                
                <div id="loaded-modules" style="margin-top: 15px;">
                    <small style="color: var(--color-text-muted);">Loaded modules: <span id="module-list">none</span></small>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    private setupEventListeners() {
        const buttons = this.container.querySelectorAll('[data-module]');
        buttons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const moduleName = (e.target as HTMLElement).dataset.module!;
                await this.loadModule(moduleName);
            });
        });
    }

    private async loadModule(moduleName: string) {
        const contentDiv = this.container.querySelector('#dynamic-content') as HTMLElement;
        const button = this.container.querySelector(`[data-module="${moduleName}"]`) as HTMLButtonElement;
        
        // Show loading state
        button.textContent = '⏳ Loading...';
        button.disabled = true;
        
        try {
            switch (moduleName) {
                case 'confetti':
                    await this.loadConfetti(contentDiv);
                    break;
                case 'animations':
                    await this.loadAnimations(contentDiv);
                    break;
                case 'utils':
                    await this.loadUtils(contentDiv);
                    break;
            }
            
            this.loadedModules.add(moduleName);
            this.updateModuleList();
            
        } catch (error) {
            contentDiv.innerHTML = `<p style="color: var(--color-error);">❌ Failed to load ${moduleName}: ${error}</p>`;
        } finally {
            // Restore button
            const originalText = {
                'confetti': '🎉 Load Confetti',
                'animations': '✨ Load Animations', 
                'utils': '🛠️ Load Utils'
            };
            button.textContent = originalText[moduleName as keyof typeof originalText];
            button.disabled = false;
        }
    }

    private async loadConfetti(container: HTMLElement) {
        // Dynamic import - Vite will create a separate chunk for this!
        const { default: confetti } = await import('canvas-confetti');
        
        container.innerHTML = `
            <h4>🎉 Confetti Loaded!</h4>
            <p>This module was loaded dynamically and code-split by Vite!</p>
            <button class="btn btn-primary" id="fire-confetti">Fire Confetti! 🎊</button>
        `;
        
        container.querySelector('#fire-confetti')?.addEventListener('click', () => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        });
    }

    private async loadAnimations(container: HTMLElement) {
        // Simulate loading a custom animation module
        const animationModule = await import('./AnimationUtils');
        
        container.innerHTML = `
            <h4>✨ Animation Utils Loaded!</h4>
            <div id="animation-playground" style="background: var(--color-surface); padding: 20px; border-radius: var(--border-radius-md);">
                <div class="animation-box" style="width: 50px; height: 50px; background: var(--color-primary); border-radius: 50%; margin: 10px auto; transition: all 0.3s ease;"></div>
                <button class="btn btn-secondary" id="animate-box">Animate Box</button>
            </div>
        `;
        
        container.querySelector('#animate-box')?.addEventListener('click', () => {
            const box = container.querySelector('.animation-box') as HTMLElement;
            animationModule.animateElement(box);
        });
    }

    private async loadUtils(container: HTMLElement) {
        // Create a utils module inline
        const utils = {
            formatDate: (date: Date) => date.toLocaleDateString(),
            randomColor: () => `hsl(${Math.random() * 360}, 70%, 50%)`,
            generateId: () => Math.random().toString(36).substr(2, 9)
        };
        
        container.innerHTML = `
            <h4>🛠️ Utils Loaded!</h4>
            <div style="display: grid; gap: 10px;">
                <div>Current Date: <strong>${utils.formatDate(new Date())}</strong></div>
                <div>Random Color: <span id="color-display" style="padding: 5px 10px; border-radius: 4px;">Click to generate</span></div>
                <div>Random ID: <code id="id-display">${utils.generateId()}</code></div>
                <button class="btn btn-secondary" id="update-utils">Update All</button>
            </div>
        `;
        
        container.querySelector('#update-utils')?.addEventListener('click', () => {
            const colorDisplay = container.querySelector('#color-display') as HTMLElement;
            const idDisplay = container.querySelector('#id-display') as HTMLElement;
            
            const newColor = utils.randomColor();
            colorDisplay.style.backgroundColor = newColor;
            colorDisplay.style.color = 'white';
            colorDisplay.textContent = newColor;
            
            idDisplay.textContent = utils.generateId();
        });
    }

    private updateModuleList() {
        const moduleList = this.container.querySelector('#module-list') as HTMLElement;
        moduleList.textContent = Array.from(this.loadedModules).join(', ') || 'none';
    }
}
