const css = `
  .initLoader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 40vh;
    height: 40vh;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

document.head.appendChild(Object.assign(document.createElement('style'), {type: 'text/css', innerHTML: css}));
document.body.appendChild(Object.assign(document.createElement('div'), {className: 'initLoader'}));

window.addEventListener('load', () => document.getElementsByClassName('initLoader')[0].remove());
