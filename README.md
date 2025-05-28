# Senere Netter - Webdev Playground 🎨

A comprehensive web development playground for experimenting with components, designs, and technologies for the Senere Netter website.

## 🚀 Features

- **Component Testing**: Build and test UI components in isolation
- **Live Theming**: Real-time theme switching and customization
- **Experiment Runner**: Framework for testing new web technologies
- **Design System**: Built-in design tokens and utility classes
- **TypeScript Support**: Full type safety for better development experience
- **Modern Tooling**: Vite, ESLint, Prettier, and more

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SENERENETTER/senere-netter-playground.git
cd senere-netter-playground

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your playground in action!

## 📁 Project Structure

```
src/
├── playground/
│   ├── components/          # Reusable UI components
│   ├── experiments/         # Web technology experiments
│   ├── ui/                  # Playground UI logic
│   └── playground.ts        # Main playground class
├── styles/
│   ├── global.css          # Global styles and CSS variables
│   └── components/         # Component-specific styles
└── main.ts                 # Application entry point
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript type checking

## 🎨 Design System

The playground includes a comprehensive design system with:

### CSS Custom Properties
- Color palette with dark/light theme support
- Consistent spacing scale
- Typography system
- Border radius and shadow utilities

### Utility Classes
- `.btn` family for buttons
- `.card` for content containers
- `.input` for form controls
- Responsive grid utilities

## 🧪 Adding Experiments

Create new experiments by extending the `ExperimentRunner`:

```typescript
import { ExperimentRunner } from './playground/experiments/ExperimentRunner';

const runner = new ExperimentRunner();

runner.register({
  name: 'my-experiment',
  description: 'Testing new CSS features',
  run: () => {
    // Your experiment code here
  },
  cleanup: () => {
    // Cleanup when stopping experiment
  }
});
```

## 🔧 Adding Components

Register new components in the `ComponentRegistry`:

```typescript
import { ComponentRegistry } from './playground/components/ComponentRegistry';

const registry = new ComponentRegistry();

registry.register('my-component', () => import('./components/MyComponent'));
```

## 🌙 Theme Customization

The playground supports automatic theme switching and manual customization:

- **Keyboard shortcut**: `Ctrl + T` to toggle theme
- **Auto detection**: Follows system preference
- **Live customization**: Use the color pickers and sliders

## 📱 Responsive Design

The playground is fully responsive with:
- Mobile-first approach
- Collapsible sidebar on small screens
- Touch-friendly interactions
- Adaptive typography

## 🚀 Deployment

### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

### Netlify
```bash
# Build command: npm run build
# Publish directory: dist
```

### Vercel
```bash
# Framework preset: Vite
# Build command: npm run build
# Output directory: dist
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Credits

Built with ❤️ for the Senere Netter project by **SENERENETTER**

---

**Happy experimenting!** 🚀✨