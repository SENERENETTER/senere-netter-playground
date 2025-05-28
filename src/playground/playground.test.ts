// Define PlaygroundConfig locally if the module does not exist
export interface PlaygroundConfig {
    // Add properties as needed for your playground configuration
}

export class PlaygroundUI {
    private container: HTMLElement;
    private currentSection: string = 'welcome';
    config: PlaygroundConfig;

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
                            <li><a href="#button" data-section="button">Button</a></li>
                            <li><a href="#card" data-section="card">Card</a></li>
                            <li><a href="#modal" data-section="modal">Modal</a></li>
                        </ul>
                        
                        <h3>Experiments</h3>
                        <ul id="experiment-list">
                            <li><a href="#animations" data-section="animations">CSS Animations</a></li>
                            <li><a href="#interactions" data-section="interactions">JS Interactions</a></li>
                            <li><a href="#layouts" data-section="layouts">Layout Tests</a></li>
                        </ul>
                        
                        <h3>Tools</h3>
                        <ul>
                            <li><a href="#color-picker" data-section="color-picker">Color Picker</a></li>
                            <li><a href="#typography" data-section="typography">Typography</a></li>
                            <li><a href="#spacing" data-section="spacing">Spacing Guide</a></li>
                        </ul>
                        
                        <div style="margin-top: var(--spacing-xl); padding-top: var(--spacing-lg); border-top: 1px solid var(--color-border);">
                            <button class="btn btn-primary" data-section="welcome" style="width: 100%;">
                                🏠 Back to Home
                            </button>
                        </div>
                    </nav>
                </aside>
                
                <main class="playground-main">
                    <div id="playground-content">
                        ${this.getContentForSection('welcome')}
                    </div>
                </main>
                
                <footer class="playground-footer">
                    <p>&copy; 2025 Senere Netter Webdev Playground | Built with ❤️ for experimentation</p>
                </footer>
            </div>
        `;

        this.setupEventListeners();
        this.updateActiveNavItem();
    }

    private setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle?.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
        });

        // Navigation handling
        const navLinks = document.querySelectorAll('a[data-section], button[data-section]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = (e.target as HTMLElement).getAttribute('data-section');
                if (section) {
                    this.navigateToSection(section);
                }
            });
        });

        // Color pickers and tools (only if they exist)
        this.setupToolListeners();
    }

    private setupToolListeners() {
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

    private navigateToSection(section: string) {
        this.currentSection = section;
        const contentContainer = document.getElementById('playground-content');
        if (contentContainer) {
            contentContainer.innerHTML = this.getContentForSection(section);
            this.setupToolListeners(); // Re-setup listeners for new content
        }
        this.updateActiveNavItem();
        
        // Smooth scroll to top
        contentContainer?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    private updateActiveNavItem() {
        // Remove active class from all nav items
        document.querySelectorAll('a[data-section], button[data-section]').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current section
        const activeItem = document.querySelector(`[data-section="${this.currentSection}"]`);
        activeItem?.classList.add('active');
    }

    private getContentForSection(section: string): string {
        switch (section) {
            case 'welcome':
                return this.getWelcomeContent();
            case 'button':
                return this.getButtonContent();
            case 'card':
                return this.getCardContent();
            case 'modal':
                return this.getModalContent();
            case 'animations':
                return this.getAnimationsContent();
            case 'interactions':
                return this.getInteractionsContent();
            case 'layouts':
                return this.getLayoutsContent();
            case 'color-picker':
                return this.getColorPickerContent();
            case 'typography':
                return this.getTypographyContent();
            case 'spacing':
                return this.getSpacingContent();
            default:
                return this.getWelcomeContent();
        }
    }

    private getWelcomeContent(): string {
        return `
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
        `;
    }

    private getButtonContent(): string {
        return `
            <div class="card">
                <h2>Button Component 🔘</h2>
                <p>Test different button styles and interactions.</p>
                
                <h3>Button Variants</h3>
                <div style="display: flex; gap: var(--spacing-md); margin: var(--spacing-md) 0; flex-wrap: wrap;">
                    <button class="btn btn-primary">Primary Button</button>
                    <button class="btn btn-secondary">Secondary Button</button>
                    <button class="btn btn-primary" disabled>Disabled Button</button>
                </div>
                
                <h3>Button Sizes</h3>
                <div style="display: flex; gap: var(--spacing-md); margin: var(--spacing-md) 0; align-items: center; flex-wrap: wrap;">
                    <button class="btn btn-primary" style="font-size: 0.75rem; padding: var(--spacing-xs) var(--spacing-sm);">Small</button>
                    <button class="btn btn-primary">Medium (Default)</button>
                    <button class="btn btn-primary" style="font-size: 1.1rem; padding: var(--spacing-md) var(--spacing-lg);">Large</button>
                </div>
                
                <h3>Interactive Examples</h3>
                <div style="display: flex; gap: var(--spacing-md); margin: var(--spacing-md) 0; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="alert('Hello from Senere Netter!')">Click Me!</button>
                    <button class="btn btn-secondary" onclick="this.textContent = this.textContent === 'Toggle Me!' ? 'Toggled!' : 'Toggle Me!'">Toggle Me!</button>
                </div>
            </div>
        `;
    }

    private getCardContent(): string {
        return `
            <div class="card">
                <h2>Card Component 🃏</h2>
                <p>Flexible container component for grouping content.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-lg); margin-top: var(--spacing-lg);">
                <div class="card">
                    <h3>Basic Card</h3>
                    <p>This is a simple card with some content. Cards are perfect for organizing information.</p>
                </div>
                
                <div class="card" style="background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); color: white;">
                    <h3>Styled Card</h3>
                    <p>Cards can be customized with different backgrounds and styles.</p>
                    <button class="btn btn-secondary" style="margin-top: var(--spacing-md);">Action</button>
                </div>
                
                <div class="card" style="text-align: center;">
                    <h3>🎨 Centered Card</h3>
                    <p>Content can be aligned differently within cards.</p>
                    <div style="display: flex; gap: var(--spacing-sm); justify-content: center; margin-top: var(--spacing-md);">
                        <button class="btn btn-primary">Yes</button>
                        <button class="btn btn-secondary">No</button>
                    </div>
                </div>
            </div>
        `;
    }

    private getModalContent(): string {
        return `
            <div class="card">
                <h2>Modal Component 📱</h2>
                <p>Test modal dialogs and overlay components.</p>
                
                <div style="display: flex; gap: var(--spacing-md); margin: var(--spacing-lg) 0; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="window.playgroundModal1?.open()">Open Basic Modal</button>
                    <button class="btn btn-secondary" onclick="window.playgroundModal2?.open()">Open Styled Modal</button>
                </div>
            </div>
            
            <script>
                // Create modals when this content loads
                if (!window.playgroundModal1) {
                    window.playgroundModal1 = {
                        overlay: null,
                        open: function() {
                            this.overlay = document.createElement('div');
                            this.overlay.style.cssText = \`
                                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                                background: rgba(0, 0, 0, 0.5); display: flex;
                                align-items: center; justify-content: center; z-index: 1000;
                            \`;
                            
                            const modal = document.createElement('div');
                            modal.className = 'card';
                            modal.style.cssText = 'max-width: 400px; width: 90%;';
                            modal.innerHTML = \`
                                <h3>Basic Modal</h3>
                                <p>This is a simple modal dialog. You can add any content here!</p>
                                <button class="btn btn-secondary" onclick="window.playgroundModal1.close()">Close</button>
                            \`;
                            
                            this.overlay.appendChild(modal);
                            document.body.appendChild(this.overlay);
                            
                            this.overlay.addEventListener('click', (e) => {
                                if (e.target === this.overlay) this.close();
                            });
                        },
                        close: function() {
                            if (this.overlay) {
                                this.overlay.remove();
                                this.overlay = null;
                            }
                        }
                    };
                }
                
                if (!window.playgroundModal2) {
                    window.playgroundModal2 = {
                        overlay: null,
                        open: function() {
                            this.overlay = document.createElement('div');
                            this.overlay.style.cssText = \`
                                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                                background: rgba(0, 0, 0, 0.7); display: flex;
                                align-items: center; justify-content: center; z-index: 1000;
                            \`;
                            
                            const modal = document.createElement('div');
                            modal.className = 'card';
                            modal.style.cssText = \`
                                max-width: 500px; width: 90%;
                                background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                                color: white; text-align: center;
                            \`;
                            modal.innerHTML = \`
                                <h3>🎨 Styled Modal</h3>
                                <p>This modal has custom styling with gradients and effects!</p>
                                <div style="margin-top: var(--spacing-lg);">
                                    <button class="btn btn-secondary" onclick="window.playgroundModal2.close()">Close</button>
                                </div>
                            \`;
                            
                            this.overlay.appendChild(modal);
                            document.body.appendChild(this.overlay);
                            
                            this.overlay.addEventListener('click', (e) => {
                                if (e.target === this.overlay) this.close();
                            });
                        },
                        close: function() {
                            if (this.overlay) {
                                this.overlay.remove();
                                this.overlay = null;
                            }
                        }
                    };
                }
            </script>
        `;
    }

    private getAnimationsContent(): string {
        return `
            <div class="card">
                <h2>CSS Animations 🎬</h2>
                <p>Experiment with different animation effects and transitions.</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg); margin-top: var(--spacing-lg);">
                    <div class="animation-demo" style="text-align: center;">
                        <h4>Hover Effects</h4>
                        <div class="card" style="transition: all 0.3s ease; cursor: pointer;" 
                             onmouseenter="this.style.transform = 'scale(1.05) rotate(2deg)'"
                             onmouseleave="this.style.transform = ''">
                            <p>Hover me! 🎯</p>
                        </div>
                    </div>
                    
                    <div class="animation-demo" style="text-align: center;">
                        <h4>Pulse Animation</h4>
                        <div class="card" style="animation: pulse 2s infinite;" id="pulse-demo">
                            <p>Pulsing! 💓</p>
                        </div>
                    </div>
                    
                    <div class="animation-demo" style="text-align: center;">
                        <h4>Bounce on Click</h4>
                        <button class="btn btn-primary" 
                                onclick="this.style.animation = 'bounce 0.6s ease'; setTimeout(() => this.style.animation = '', 600)">
                            Bounce Me! 🏀
                        </button>
                    </div>
                </div>
            </div>
            
            <style>
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
                    40%, 43% { transform: translate3d(0,-15px,0); }
                    70% { transform: translate3d(0,-7px,0); }
                    90% { transform: translate3d(0,-2px,0); }
                }
            </style>
        `;
    }

    private getInteractionsContent(): string {
        return `
            <div class="card">
                <h2>JS Interactions ⚡</h2>
                <p>Test interactive JavaScript behaviors and event handling.</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg); margin-top: var(--spacing-lg);">
                    <div class="card">
                        <h4>Click Counter</h4>
                        <p>Clicks: <span id="click-count">0</span></p>
                        <button class="btn btn-primary" onclick="document.getElementById('click-count').textContent = parseInt(document.getElementById('click-count').textContent) + 1">
                            Click Me!
                        </button>
                    </div>
                    
                    <div class="card">
                        <h4>Color Changer</h4>
                        <div id="color-box" style="width: 100px; height: 100px; background: var(--color-primary); margin: var(--spacing-md) auto; border-radius: var(--border-radius-md); transition: all 0.3s ease;"></div>
                        <button class="btn btn-secondary" onclick="document.getElementById('color-box').style.background = \`hsl(\${Math.random() * 360}, 70%, 60%)\`">
                            Random Color
                        </button>
                    </div>
                    
                    <div class="card">
                        <h4>Text Input</h4>
                        <input type="text" class="input" placeholder="Type something..." oninput="document.getElementById('output').textContent = this.value">
                        <p style="margin-top: var(--spacing-sm);">Output: <span id="output">...</span></p>
                    </div>
                </div>
            </div>
        `;
    }

    private getLayoutsContent(): string {
        return `
            <div class="card">
                <h2>Layout Tests 📐</h2>
                <p>Experiment with different CSS layout systems.</p>
            </div>
            
            <div class="card" style="margin-top: var(--spacing-lg);">
                <h3>CSS Grid Layout</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: var(--spacing-md); margin-top: var(--spacing-md);">
                    <div style="background: var(--color-primary); color: white; padding: var(--spacing-md); border-radius: var(--border-radius-md); text-align: center;">1</div>
                    <div style="background: var(--color-secondary); color: white; padding: var(--spacing-md); border-radius: var(--border-radius-md); text-align: center;">2</div>
                    <div style="background: var(--color-success); color: white; padding: var(--spacing-md); border-radius: var(--border-radius-md); text-align: center;">3</div>
                    <div style="background: var(--color-warning); color: white; padding: var(--spacing-md); border-radius: var(--border-radius-md); text-align: center;">4</div>
                </div>
            </div>
            
            <div class="card" style="margin-top: var(--spacing-lg);">
                <h3>Flexbox Layout</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; gap: var(--spacing-md); margin-top: var(--spacing-md); flex-wrap: wrap;">
                    <div style="background: var(--color-surface); border: 2px solid var(--color-border); padding: var(--spacing-md); border-radius: var(--border-radius-md); flex: 1; min-width: 100px; text-align: center;">Flex Item 1</div>
                    <div style="background: var(--color-surface); border: 2px solid var(--color-border); padding: var(--spacing-md); border-radius: var(--border-radius-md); flex: 2; min-width: 100px; text-align: center;">Flex Item 2 (grows more)</div>
                    <div style="background: var(--color-surface); border: 2px solid var(--color-border); padding: var(--spacing-md); border-radius: var(--border-radius-md); flex: 1; min-width: 100px; text-align: center;">Flex Item 3</div>
                </div>
            </div>
        `;
    }

    private getColorPickerContent(): string {
        return `
            <div class="card">
                <h2>Color Picker Tool 🎨</h2>
                <p>Test and customize the color scheme of your playground.</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg); margin-top: var(--spacing-lg);">
                    <div>
                        <h4>Background Colors</h4>
                        <div style="margin-bottom: var(--spacing-md);">
                            <label for="main-bg">Main Background:</label>
                            <input type="color" id="main-bg" class="input" value="#ffffff" style="height: 50px;" oninput="document.documentElement.style.setProperty('--color-background', this.value)">
                        </div>
                        <div style="margin-bottom: var(--spacing-md);">
                            <label for="surface-bg">Surface Background:</label>
                            <input type="color" id="surface-bg" class="input" value="#f8fafc" style="height: 50px;" oninput="document.documentElement.style.setProperty('--color-surface', this.value)">
                        </div>
                    </div>
                    
                    <div>
                        <h4>Text Colors</h4>
                        <div style="margin-bottom: var(--spacing-md);">
                            <label for="main-text">Main Text:</label>
                            <input type="color" id="main-text" class="input" value="#1e293b" style="height: 50px;" oninput="document.documentElement.style.setProperty('--color-text', this.value)">
                        </div>
                        <div style="margin-bottom: var(--spacing-md);">
                            <label for="muted-text">Muted Text:</label>
                            <input type="color" id="muted-text" class="input" value="#64748b" style="height: 50px;" oninput="document.documentElement.style.setProperty('--color-text-muted', this.value)">
                        </div>
                    </div>
                    
                    <div>
                        <h4>Accent Colors</h4>
                        <div style="margin-bottom: var(--spacing-md);">
                            <label for="primary-color">Primary:</label>
                            <input type="color" id="primary-color" class="input" value="#2563eb" style="height: 50px;" oninput="document.documentElement.style.setProperty('--color-primary', this.value)">
                        </div>
                        <div style="margin-bottom: var(--spacing-md);">
                            <label for="secondary-color">Secondary:</label>
                            <input type="color" id="secondary-color" class="input" value="#64748b" style="height: 50px;" oninput="document.documentElement.style.setProperty('--color-secondary', this.value)">
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: var(--spacing-xl); text-align: center;">
                    <button class="btn btn-secondary" onclick="location.reload()">Reset to Defaults</button>
                </div>
            </div>
        `;
    }

    private getTypographyContent(): string {
        return `
            <div class="card">
                <h2>Typography System 📝</h2>
                <p>Test different text styles and typography scales.</p>
                
                <div style="margin-top: var(--spacing-xl);">
                    <h1>Heading 1 - Large Title</h1>
                    <h2>Heading 2 - Section Title</h2>
                    <h3>Heading 3 - Subsection</h3>
                    <h4>Heading 4 - Minor Heading</h4>
                    <h5>Heading 5 - Small Heading</h5>
                    <h6>Heading 6 - Tiny Heading</h6>
                    
                    <p style="font-size: 1.125rem; margin-top: var(--spacing-lg);">Large paragraph text for important content.</p>
                    <p>Regular paragraph text for general content and descriptions.</p>
                    <p style="font-size: 0.875rem;">Small text for captions and minor details.</p>
                    <p style="font-size: 0.75rem; color: var(--color-text-muted);">Extra small text for fine print.</p>
                    
                    <div style="margin-top: var(--spacing-xl);">
                        <p><strong>Bold text</strong> for emphasis</p>
                        <p><em>Italic text</em> for subtle emphasis</p>
                        <p><code style="background: var(--color-surface); padding: 2px 6px; border-radius: 4px; font-family: var(--font-family-mono);">Inline code</code> for technical terms</p>
                        <blockquote style="border-left: 4px solid var(--color-primary); padding-left: var(--spacing-md); margin: var(--spacing-lg) 0; font-style: italic;">
                            "This is a blockquote for highlighting important quotes or statements."
                        </blockquote>
                    </div>
                </div>
            </div>
        `;
    }

    private getSpacingContent(): string {
        return `
            <div class="card">
                <h2>Spacing Guide 📏</h2>
                <p>Visual guide to the spacing system used throughout the playground.</p>
                
                <div style="margin-top: var(--spacing-xl);">
                    <h3>Spacing Scale</h3>
                    <div style="display: flex; flex-direction: column; gap: var(--spacing-md); margin-top: var(--spacing-lg);">
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <div style="width: var(--spacing-xs); height: 20px; background: var(--color-primary);"></div>
                            <code>--spacing-xs: 0.25rem (4px)</code>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <div style="width: var(--spacing-sm); height: 20px; background: var(--color-primary);"></div>
                            <code>--spacing-sm: 0.5rem (8px)</code>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <div style="width: var(--spacing-md); height: 20px; background: var(--color-primary);"></div>
                            <code>--spacing-md: 1rem (16px)</code>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <div style="width: var(--spacing-lg); height: 20px; background: var(--color-primary);"></div>
                            <code>--spacing-lg: 1.5rem (24px)</code>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <div style="width: var(--spacing-xl); height: 20px; background: var(--color-primary);"></div>
                            <code>--spacing-xl: 2rem (32px)</code>
                        </div>
                        <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                            <div style="width: var(--spacing-2xl); height: 20px; background: var(--color-primary);"></div>
                            <code>--spacing-2xl: 3rem (48px)</code>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}