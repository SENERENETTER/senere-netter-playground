import { ComponentRegistry } from './components/ComponentRegistry';
import { ExperimentRunner } from './experiments/ExperimentRunner';
import { PlaygroundUI } from './ui/PlaygroundUI';

export interface PlaygroundConfig {
    theme: 'light' | 'dark' | 'auto';
    enableExperiments: boolean;
    enableComponents: boolean;
    enableLiveEdit: boolean;
}

export class Playground {
    private config: PlaygroundConfig;
    private componentRegistry: ComponentRegistry;
    private experimentRunner: ExperimentRunner;
    private ui: PlaygroundUI;

    constructor(container: HTMLElement, config: Partial<PlaygroundConfig> = {}) {
        this.config = {
            theme: 'auto',
            enableExperiments: true,
            enableComponents: true,
            enableLiveEdit: true,
            ...config
        };

        this.componentRegistry = new ComponentRegistry();
        this.experimentRunner = new ExperimentRunner();
        this.ui = new PlaygroundUI(container, this.config);

        this.initialize();
    }

    private initialize() {
        this.setupTheme();
        this.registerDefaultComponents();
        this.setupEventListeners();
        this.render();
    }

    private setupTheme() {
        const theme = this.config.theme === 'auto' 
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : this.config.theme;
        
        document.documentElement.setAttribute('data-theme', theme);
    }

    private registerDefaultComponents() {
        // Register default playground components
        this.componentRegistry.register('button', () => import('./components/Button'));
        this.componentRegistry.register('card', () => import('./components/Card'));
        this.componentRegistry.register('modal', () => import('./components/Modal'));
    }

    private setupEventListeners() {
        // Theme toggle
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 't') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    private toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
    }

    private render() {
        this.ui.render();
    }
}

export function createPlayground(container: HTMLElement, config?: Partial<PlaygroundConfig>): Playground {
    return new Playground(container, config);
}