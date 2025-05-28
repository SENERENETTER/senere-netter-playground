// 🎨 Animation utilities for dynamic import demo
export function animateElement(element: HTMLElement) {
    // Add floating animation class
    element.style.animation = 'float 2s ease-in-out infinite';
    
    // Create floating effect with random movement
    setTimeout(() => {
        const randomX = (Math.random() - 0.5) * 100;
        const randomY = (Math.random() - 0.5) * 100;
        element.style.transform = `translate(${randomX}px, ${randomY}px) scale(1.2)`;
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.animation = '';
        }, 1000);
    }, 100);
}

export function createFloatingElement(container: HTMLElement) {
    const floater = document.createElement('div');
    floater.style.cssText = `
        width: 30px;
        height: 30px;
        background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
        border-radius: 50%;
        position: relative;
        animation: float 3s ease-in-out infinite;
        margin: 20px auto;
    `;
    
    container.appendChild(floater);
    return floater;
}

// Add CSS animation keyframes
if (!document.querySelector('#animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
}
