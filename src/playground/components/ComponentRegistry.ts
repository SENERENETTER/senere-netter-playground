export type ComponentFactory = () => Promise<{ default: any }>;

export class ComponentRegistry {
    private components = new Map<string, ComponentFactory>();

    register(name: string, factory: ComponentFactory) {
        this.components.set(name, factory);
    }

    async load(name: string) {
        const factory = this.components.get(name);
        if (!factory) {
            throw new Error(`Component "${name}" not found`);
        }
        
        const module = await factory();
        return module.default;
    }

    getRegisteredComponents(): string[] {
        return Array.from(this.components.keys());
    }
}