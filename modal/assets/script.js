const modalButton = document.querySelector("#openModal");

// Create a confirmation modal instance
const confirmModal = new CustomModal({
  titleText: "Are you sure?",
  messageText:
    "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText: "Absolutely",
  cancelText: "No",
});

// Create a completion modal instance
const completionModal = new CustomModal({
  titleText: "Deleted Successfully",
  messageText: "The item has been deleted successfully.",
  confirmText: "Got it",
});

// Add event listener to the button to open the confirmation modal
modalButton.addEventListener("click", () => {
  confirmModal
    .open()
    .then(() => {
      // If confirmed, open the completion modal
      return completionModal.open();
    })
    .then((result) => {
      // Log the result of the completion modal
      console.log("User Deleted Item:", result);
    })
    .catch((result) => {
      // Log if the user clicked cancel
      console.log("User clicked Cancel:", result);
    });
});
