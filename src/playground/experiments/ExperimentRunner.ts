export interface Experiment {
    name: string;
    description: string;
    run: () => void;
    cleanup?: () => void;
}

export class ExperimentRunner {
    private experiments = new Map<string, Experiment>();
    private activeExperiment: string | null = null;

    register(experiment: Experiment) {
        this.experiments.set(experiment.name, experiment);
    }

    async run(name: string) {
        if (this.activeExperiment) {
            await this.stop();
        }

        const experiment = this.experiments.get(name);
        if (!experiment) {
            throw new Error(`Experiment "${name}" not found`);
        }

        this.activeExperiment = name;
        experiment.run();
    }

    async stop() {
        if (!this.activeExperiment) return;

        const experiment = this.experiments.get(this.activeExperiment);
        if (experiment?.cleanup) {
            experiment.cleanup();
        }

        this.activeExperiment = null;
    }

    getExperiments(): Experiment[] {
        return Array.from(this.experiments.values());
    }
}