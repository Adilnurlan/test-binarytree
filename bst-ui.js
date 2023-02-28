const HIGHLIGHT_CLASS = 'node__element--highlight';
const HIGHLIGHT_TIME = 300;
let highlightTimer = null;

const highlightNode = ({ value }) => {
  const nodeElement = document.querySelector(`[data-node-id="${value}"]`);
  if (highlightTimer !== null) {
    clearTimeout(highlightTimer);
    nodeElement.classList.remove(HIGHLIGHT_CLASS);
    highlightTimer = null;
    return;
  }
  nodeElement.classList.add(HIGHLIGHT_CLASS);
  document.querySelectorAll('button').forEach((btn) => {
    btn.setAttribute('disabled', true);
  });
  return new Promise((resolve) => {
    highlightTimer = setTimeout(() => {
      nodeElement.classList.remove(HIGHLIGHT_CLASS);
      document.querySelectorAll('button').forEach((btn) => {
        btn.removeAttribute('disabled');
      });
      highlightTimer = null;
      resolve();
    }, HIGHLIGHT_TIME);
  });
};

function getRundomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initiateHandlers = (tree, render) => {
  const resetBtn = document.querySelector('#resetBtn');
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      const randomNumber = getRundomNumber(-100, 100);
      const node = tree.insert(randomNumber);
      render(tree.root);
      highlightNode(node);
    }
  });
  resetBtn.addEventListener('click', () => {
    highlightNode(tree.root).then(() => {
      tree.root = null;
      render(tree.root);
    });
  });
};

const root = document.documentElement;
root.style.setProperty('--animation-timing', `${HIGHLIGHT_TIME / 1000}s`);

export default initiateHandlers;
