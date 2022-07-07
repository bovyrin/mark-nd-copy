javascript:(() => {
  const appInfo = [
    '[Active] Mark & Copy v1.0.1',
    'Author: Sergey Bovyrin (@bovyrin)',
    'License: MIT',
    'Hotkeys:',
    '- To mark: Alt+\`',
    '- To copy marks: Alt+c',
    '- To clean marks: Alt+l'
  ];
  console.info(appInfo.join('\n\t'));

  document.addEventListener('keydown', e => {
    const selection = document.getSelection();

    const triggeredMark = e =>
      selection.type === 'Range' && e.altKey && e.code == 'Backquote';
    const triggeredCopy = e => e.altKey && e.code == 'KeyC';
    const triggeredClean = e => e.altKey && e.code == 'KeyL';

    const mark = sel => {
      document.designMode = 'on';
      document.execCommand('foreColor', false, '#F3F2F1');
      document.execCommand('hiliteColor', false, '#037584');
      document.designMode = 'off';
    };

    const copy = () => {
      const content = [...document.querySelectorAll('font')].reduce(
        (xs, x) => {
          xs += x.textContent + '\n';
          return xs;
        },
        ''
      );
      navigator.clipboard.writeText(content);
    };

    const clean = () => {
      document.querySelectorAll('font').forEach(x => {
        try {
          x.removeAttribute('style');
          x.removeAttribute('color');
          x.parentElement.innerHTML =
            x.parentElement.innerHTML.replace(x.outerHTML, x.innerHTML);
        } catch (e) { }
      });
    };

    switch (true) {
      case triggeredMark(e):
        mark(selection);
        break;
      case triggeredCopy(e):
        copy();
        break;
      case triggeredClean(e):
        clean();
        break;
    }
  });
})();
