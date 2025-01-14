const dragItems = document.querySelectorAll(".drag-item");
const dragList = document.querySelector(".drag-list");

let draggedItem = null;

dragItems.forEach((item) => {
  item.addEventListener("dragstart", () => {
    draggedItem = item;
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
    item.style.display = "flex";
    draggedItem = null;
  });
});

dragList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(dragList, e.clientY);
  if (afterElement == null) {
    dragList.appendChild(draggedItem);
  } else {
    dragList.insertBefore(draggedItem, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".drag-item:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
