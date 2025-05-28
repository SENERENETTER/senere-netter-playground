export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: string;
}

export class Button {
  private element: HTMLButtonElement;

  constructor(props: ButtonProps) {
    this.element = document.createElement('button');
    this.element.className = `btn btn-${props.variant || 'primary'} btn-${props.size || 'medium'}`;
    this.element.textContent = props.children;
    this.element.disabled = props.disabled || false;
    
    if (props.onClick) {
      this.element.addEventListener('click', props.onClick);
    }
  }

  render(): HTMLButtonElement {
    return this.element;
  }

  destroy() {
    this.element.remove();
  }
}

export default Button;