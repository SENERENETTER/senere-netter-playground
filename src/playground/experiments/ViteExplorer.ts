// 🎨 CSS-in-JS with Vite
export function createStyled(tag: string, styles: string) {
    const element = document.createElement(tag);
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    
    // Use CSS-in-JS approach
    const className = `styled-${Math.random().toString(36).substr(2, 9)}`;
    element.className = className;
    
    // Add styles to the document
    const style = document.createElement('style');
    style.textContent = `.${className} { ${styles} }`;
    document.head.appendChild(style);
    
    return element;
}

// 🌈 Dynamic CSS Custom Properties
export function createThemeExplorer(container: HTMLElement) {
    const explorer = createStyled('div', `
        background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        padding: 20px;
        border-radius: var(--border-radius-lg);
        color: white;
        margin: 20px 0;
        text-align: center;
        transition: all 0.3s ease;
    `);
    
    explorer.innerHTML = `
        <h3>🌈 Live CSS Variable Explorer</h3>
        <p>Vite watches CSS changes in real-time!</p>
        <div style="margin-top: 15px;">
            <button class="theme-btn" data-theme="sunset">🌅 Sunset</button>
            <button class="theme-btn" data-theme="ocean">🌊 Ocean</button>
            <button class="theme-btn" data-theme="forest">🌲 Forest</button>
            <button class="theme-btn" data-theme="galaxy">🌌 Galaxy</button>
        </div>
    `;
    
    // Add button styles
    const buttons = explorer.querySelectorAll('.theme-btn');
    buttons.forEach(btn => {
        (btn as HTMLElement).style.cssText = `
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 8px 16px;
            margin: 5px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        
        btn.addEventListener('click', (e) => {
            const theme = (e.target as HTMLElement).dataset.theme;
            applyTheme(theme!, explorer);
        });
    });
    
    container.appendChild(explorer);
    return explorer;
}

function applyTheme(theme: string, element: HTMLElement) {
    const themes = {
        sunset: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
        ocean: 'linear-gradient(135deg, #667eea, #764ba2)',
        forest: 'linear-gradient(135deg, #11998e, #38ef7d)',
        galaxy: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)'
    };
    
    element.style.background = themes[theme as keyof typeof themes];
    element.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}
