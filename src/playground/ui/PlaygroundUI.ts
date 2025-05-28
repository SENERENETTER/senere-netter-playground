import { PlaygroundConfig } from '../playground';

export class PlaygroundUI {
    private container: HTMLElement;
    private config: PlaygroundConfig;

    constructor(container: HTMLElement, config: PlaygroundConfig) {
        this.container = container;
        this.config = config;
    }

    render() {
        this.container.innerHTML = `
            <div class="playground">
                <header class="playground-header">
                    <div>
                        <h1>Senere Netter - Webdev Playground</h1>
                        <p>Experiment, prototype, and test web technologies</p>
                    </div>
                    <div>
                        <button class="btn btn-secondary" id="theme-toggle">
                            🌙 Toggle Theme
                        </button>
                    </div>
                </header>
                
                <aside class="playground-sidebar">
                    <nav>
                        <h3>Components</h3>
                        <ul id="component-list">
                            <li><a href="#button">Button</a></li>
                            <li><a href="#card">Card</a></li>
                            <li><a href="#modal">Modal</a></li>
                        </ul>
                        
                        <h3>Experiments</h3>
                        <ul id="experiment-list">
                            <li><a href="#animations">CSS Animations</a></li>
                            <li><a href="#interactions">JS Interactions</a></li>
                            <li><a href="#layouts">Layout Tests</a></li>
                        </ul>
                        
                        <h3>Tools</h3>
                        <ul>
                            <li><a href="#color-picker">Color Picker</a></li>
                            <li><a href="#typography">Typography</a></li>
                            <li><a href="#spacing">Spacing Guide</a></li>
                        </ul>
                    </nav>
                </aside>
                
                <main class="playground-main">
                    <div id="playground-content">
                        <div class="card">
                            <h2>Welcome to the Playground! 🎉</h2>
                            <p>This is your web development playground for the Senere Netter website. Here you can:</p>
                            <ul>
                                <li>Test new components and UI patterns</li>
                                <li>Experiment with different design approaches</li>
                                <li>Prototype features before implementing them</li>
                                <li>Try out new web technologies</li>
                            </ul>
                            
                            <div style="margin-top: var(--spacing-lg);">
                                <button class="btn btn-primary" onclick="this.style.transform = 'scale(0.95)'; setTimeout(() => this.style.transform = '', 100)">
                                    Click me to test! ✨
                                </button>
                                <button class="btn btn-secondary" style="margin-left: var(--spacing-sm);">
                                    Another button
                                </button>
                            </div>
                        </div>
                        
                        <div class="card" style="margin-top: var(--spacing-lg);">
                            <h3>Quick Tools</h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-md); margin-top: var(--spacing-md);">
                                <div>
                                    <label for="bg-color">Background Color:</label>
                                    <input type="color" id="bg-color" class="input" value="#ffffff" style="height: 40px;">
                                </div>
                                <div>
                                    <label for="text-color">Text Color:</label>
                                    <input type="color" id="text-color" class="input" value="#1e293b" style="height: 40px;">
                                </div>
                                <div>
                                    <label for="border-radius">Border Radius:</label>
                                    <input type="range" id="border-radius" class="input" min="0" max="50" value="12">
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                
                <footer class="playground-footer">
                    <p>&copy; 2025 Senere Netter Webdev Playground | Built with ❤️ for experimentation</p>
                </footer>
            </div>
        `;

        this.setupEventListeners();
    }

    private setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle?.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
        });

        // Color pickers
        const bgColorPicker = document.getElementById('bg-color') as HTMLInputElement;
        const textColorPicker = document.getElementById('text-color') as HTMLInputElement;
        const borderRadiusSlider = document.getElementById('border-radius') as HTMLInputElement;

        bgColorPicker?.addEventListener('input', (e) => {
            const color = (e.target as HTMLInputElement).value;
            document.documentElement.style.setProperty('--color-background', color);
        });

        textColorPicker?.addEventListener('input', (e) => {
            const color = (e.target as HTMLInputElement).value;
            document.documentElement.style.setProperty('--color-text', color);
        });

        borderRadiusSlider?.addEventListener('input', (e) => {
            const value = (e.target as HTMLInputElement).value;
            document.documentElement.style.setProperty('--border-radius-md', `${value}px`);
            document.documentElement.style.setProperty('--border-radius-lg', `${parseInt(value) + 4}px`);
        });
    }
}