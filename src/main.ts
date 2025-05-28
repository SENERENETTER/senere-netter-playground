import './styles/global.css';
import { createPlayground } from './playground/playground';

// Initialize the playground
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (app) {
        createPlayground(app);
    }
});