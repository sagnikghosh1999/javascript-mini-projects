class CustomModal {
  constructor({ titleText, messageText, confirmText, cancelText }) {
    // Initialize modal properties
    this.titleText = titleText;
    this.messageText = messageText;
    this.confirmText = confirmText;
    this.cancelText = cancelText;
  }

  createAndOpenModal(onConfirm, onCancel) {
    // Create modal element
    this.modalElem = document.createElement("div");
    this.modalElem.classList.add("modal");

    // Add 'open' class after a delay to trigger animation
    setTimeout(() => {
      this.modalElem.classList.add("open");
    }, 400);

    // Inset element to close modal
    const insetElem = document.createElement("div");
    insetElem.classList.add("inset");

    // Add event listener for inset element
    insetElem.addEventListener("click", () => {
      onCancel("cancelled");
      this.close();
    });

    // Append inset element to modal
    this.modalElem.appendChild(insetElem);

    // Create content container
    const modalContentElem = document.createElement("div");
    modalContentElem.classList.add("content");

    // Append content container to modal
    this.modalElem.appendChild(modalContentElem);

    // Heading
    const titleTextElem = document.createElement("h2");
    titleTextElem.textContent = this.titleText;
    titleTextElem.classList.add("titleText");

    // Append heading to content container
    modalContentElem.appendChild(titleTextElem);

    // Message
    const messageTextElem = document.createElement("p");
    messageTextElem.textContent = this.messageText;
    messageTextElem.classList.add("messageText");

    // Append message to content container
    modalContentElem.appendChild(messageTextElem);

    // Buttons
    // Cancel button
    if (this.cancelText) {
      const cancelButtontextElem = document.createElement("button");
      cancelButtontextElem.textContent = this.cancelText;
      cancelButtontextElem.classList.add("cancelButtonText");

      // Add event listener for cancel button
      cancelButtontextElem.addEventListener("click", () => {
        onCancel("cancelled");
        this.close();
      });

      // Append cancel button to content container
      modalContentElem.appendChild(cancelButtontextElem);
    }

    // Confirm button
    const confirmButtontextElem = document.createElement("button");
    confirmButtontextElem.textContent = this.confirmText;
    confirmButtontextElem.classList.add("confirmButtonText");

    // Append confirm button to content container
    modalContentElem.appendChild(confirmButtontextElem);

    // Add event listener for confirm button
    confirmButtontextElem.addEventListener("click", () => {
      onConfirm("confirmed");
      this.close();
    });

    // Append modal to body
    document.body.appendChild(this.modalElem);
  }

  open() {
    // Return a promise that resolves or rejects based on user action
    return new Promise((resolve, reject) => {
      this.createAndOpenModal(resolve, reject);
    });
  }

  close() {
    // Remove 'open' class to trigger closing animation
    this.modalElem.classList.remove("open");
    // Remove modal element from DOM after animation
    setTimeout(() => {
      this.modalElem.remove();
    }, 400);
  }
}
