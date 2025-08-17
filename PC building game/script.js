const components = document.querySelectorAll('.component');
const motherboard = document.getElementById('motherboard');
const result = document.getElementById('result');

let placedComponents = {
  cpu: false,
  ram: false,
  psu: false
};

components.forEach(component => {
  component.addEventListener('dragstart', dragStart);
});

motherboard.addEventListener('dragover', dragOver);
motherboard.addEventListener('drop', drop);

function dragStart(e) {
  e.dataTransfer.setData('text', e.target.parentElement.dataset.component);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const componentType = e.dataTransfer.getData('text');

  if (!placedComponents[componentType]) {
    const componentImage = document.createElement('img');
    componentImage.src = `components/${componentType}.jpg`;  // Changed to .jpg
    componentImage.alt = componentType;
    componentImage.style.width = '100px';
    componentImage.style.position = 'absolute';

    // Positioning components dynamically on the motherboard
    switch (componentType) {
      case 'cpu':
        componentImage.style.top = '30%';
        componentImage.style.left = '40%';
        break;
      case 'ram':
        componentImage.style.top = '10%';
        componentImage.style.left = '70%';
        break;
      case 'psu':
        componentImage.style.top = '80%';
        componentImage.style.left = '10%';
        break;
    }

    motherboard.appendChild(componentImage);
    placedComponents[componentType] = true;
    document.querySelector(`[data-component="${componentType}"]`).style.display = 'none';
    checkWin();
  } else {
    result.textContent = "Component already placed!";
    result.style.color = "red";
  }
}

function checkWin() {
  const allComponentsPlaced = Object.values(placedComponents).every(placed => placed);
  if (allComponentsPlaced) {
    result.textContent = "Congratulations! You built the PC!";
    result.style.color = "green";
  }
}
