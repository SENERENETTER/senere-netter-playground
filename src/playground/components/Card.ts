export interface CardProps {
  title?: string;
  children: string | HTMLElement;
  className?: string;
}

export class Card {
  private element: HTMLDivElement;

  constructor(props: CardProps) {
    this.element = document.createElement('div');
    this.element.className = `card ${props.className || ''}`;
    
    if (props.title) {
      const title = document.createElement('h3');
      title.textContent = props.title;
      title.style.marginBottom = 'var(--spacing-md)';
      this.element.appendChild(title);
    }

    if (typeof props.children === 'string') {
      const content = document.createElement('div');
      content.innerHTML = props.children;
      this.element.appendChild(content);
    } else {
      this.element.appendChild(props.children);
    }
  }

  render(): HTMLDivElement {
    return this.element;
  }

  destroy() {
    this.element.remove();
  }
}

export default Card;