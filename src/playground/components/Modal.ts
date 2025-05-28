export interface ModalProps {
  title: string;
  content: string | HTMLElement;
  isOpen?: boolean;
  onClose?: () => void;
}

export class Modal {
  private overlay: HTMLDivElement;
  private modal: HTMLDivElement;
  private props: ModalProps;

  constructor(props: ModalProps) {
    this.props = props;
    this.createModal();
    
    if (props.isOpen) {
      this.open();
    }
  }

  private createModal() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    `;

    // Create modal
    this.modal = document.createElement('div');
    this.modal.className = 'card';
    this.modal.style.cssText = `
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
    `;

    // Add title
    const title = document.createElement('h2');
    title.textContent = this.props.title;
    title.style.marginBottom = 'var(--spacing-md)';
    this.modal.appendChild(title);

    // Add content
    if (typeof this.props.content === 'string') {
      const content = document.createElement('div');
      content.innerHTML = this.props.content;
      this.modal.appendChild(content);
    } else {
      this.modal.appendChild(this.props.content);
    }

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'btn btn-secondary';
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = 'var(--spacing-md)';
    closeButton.addEventListener('click', () => this.close());
    this.modal.appendChild(closeButton);

    this.overlay.appendChild(this.modal);

    // Close on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });
  }

  open() {
    document.body.appendChild(this.overlay);
    this.overlay.style.display = 'flex';
  }

  close() {
    this.overlay.style.display = 'none';
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  destroy() {
    this.overlay.remove();
  }
}

export default Modal;