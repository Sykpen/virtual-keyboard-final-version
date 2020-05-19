const key_Layout = [
  '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'back',
  'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '/',
  'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
  'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '↑', 'shift',
  'cntrl', 'win', 'alt', 'space', 'alt', 'win', '←', '↓', '→', 'cntrl',
];

const key_Layoutru = [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'back',
    'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
    'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
    'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'shift',
    'cntrl', 'win', 'alt', 'space', 'alt', 'win', '←', '↓', '→', 'cntrl',
];

const key_Code = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
];

let chosen_language = '';

let caps_pressed = localStorage.getItem('caps_pressed');

let pressed_key;

function create_keyboard_with_choseen_language(language) {
  if (language === 'en'){
    create_main(key_Layout)
  }
  else{
    create_main(key_Layoutru)
  }
}

function change_language() {
  if (chosen_language === 'ru'){
    create_keyboard_with_choseen_language(chosen_language)
    chosen_language = 'en';
    localStorage.setItem('chosen_language', 'ru')
  }
  else if(chosen_language = 'en'){
    create_keyboard_with_choseen_language(chosen_language)
    chosen_language = 'ru';
    localStorage.setItem('chosen_language', 'en')
  }
}

function create_main(arr) {
  document.body.innerText = '';

  const writing_area = document.createElement('textarea');
  writing_area.id = 'writingarea';
  writing_area.classList.add('writingarea');
  document.body.append(writing_area);

  writing_area.innerText = localStorage.getItem('textarea');

  const mainwrapper = document.createElement('div');
  mainwrapper.classList.add('mainback');
  document.body.append(mainwrapper);

  let back_for_language_change = document.createElement('div');
  back_for_language_change.classList.add('back_for_language_change');
  document.body.append(back_for_language_change);

  let text = document.createElement('p');
  text.classList.add('text');
  text.innerText = 'Для смены языка нажмите комбинацию ShiftLeft + ControlLeft, или нажмите на кнопку';
  back_for_language_change.append(text);

  let button = document.createElement('button');
  button.classList.add('button')
  button.innerText = 'Поменять язык';
  back_for_language_change.append(button);
  
  button.addEventListener('click', () => {
    change_language();
  });

  const row = document.createElement('div');
  row.id = 'row';
  row.classList.add('row');
  mainwrapper.append(row);

  let usiblearr = arr;

  let i = 0;
  usiblearr.forEach((key) => {
    const key_Element = document.createElement('div');
    key_Element.append(key);

    key_Element.classList.add(key_Code[i]);
    i += 1;
    key_Element.classList.add('cell');
    row.append(key_Element);

    // eslint-disable-next-line default-case
    switch (key) {
      case 'back':
        key_Element.classList.add('big');
        break;
      case 'tab':
        key_Element.classList.add('big');
        break;
      case 'caps':
        key_Element.classList.add('big');
        break;
      case 'enter':
        key_Element.classList.add('big');
        break;
      case 'shift':
        key_Element.classList.add('big');
        break;
      case 'space':
        key_Element.classList.add('space');
        break;
    }
  });

  row.addEventListener('mousedown', (event) => {
    mousedown_handler();

  });
  row.addEventListener('mouseup', (event) => {
    localStorage.setItem('textarea', writing_area.value)
    const target = event.target.closest('div');
    if (target.className === 'row') return;
    target.classList.remove('selected');
    writing_area.focus();
  });

  document.addEventListener('keydown', (event) => {
    localStorage.setItem('textarea', writing_area.value)
    writing_area.focus();
    const { code } = event;
    const code_class = document.querySelector(`.${code}`);
    code_class.classList.add('selected');

    writing_area.append(event.key);
  });

  document.addEventListener('keyup', (event) => {
    localStorage.setItem('textarea', writing_area.value)
    const { code } = event;
    const code_class = document.querySelector(`.${code}`);
    code_class.classList.remove('selected');
  });
}

function mousedown_handler() {
  let row = document.getElementById('row');
  let writing_area = document.getElementById('writingarea');

    const target = event.target.closest('div');
    pressed_key = target;
    if (target.className === 'row') return;

    target.classList.add('selected');

    if (target.innerText === 'back') {
      writing_area.value = writing_area.value.substring(0, writing_area.value.length - 1);
    } else if (target.innerText === 'space') {
      writing_area.value += ' ';
    } else if (target.innerText === 'enter') {
      writing_area.value += '\n';
    } else if (target.innerText === 'tab') {
      writing_area.value += '\t';
    } else if(target.innerText === 'caps') {
      if(caps_pressed === 'true') {
        caps_pressed = 'false';
        localStorage.setItem('caps_pressed', 'false');
        show_elements(caps_pressed);
        return;
      }
      else {
        caps_pressed = 'true';
        localStorage.setItem('caps_pressed', 'true');
        show_elements(caps_pressed);
        return;
      }
    } else {
      show_elements(caps_pressed);
    };
    
    function show_elements(caps_pressed) {
      if (caps_pressed === 'true'){
        if(target.innerText === 'caps'){
          writing_area.value += '';
          return;
        }
        writing_area.value += target.innerText.toUpperCase();
      }
      else {
        if(target.innerText === 'caps'){
          writing_area.value += '';
          return;
        }
        writing_area.value += target.innerText;
        return;
      }
    }

  row.addEventListener('mouseup', (event) => {
    localStorage.setItem('textarea', writing_area.value)
    const target = event.target.closest('div');
    if (pressed_key.className != target.className){
      pressed_key.classList.remove('selected');
    }
    if (target.className === 'row') return;
    target.classList.remove('selected');
    writing_area.focus();
  });
}


function two_keys_down( ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', function(event) {
    pressed.add(event.code);

    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();

    change_language();
  });

  document.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });

}

two_keys_down("ShiftLeft", "ControlLeft");

let language_from_local = localStorage.getItem('chosen_language');
create_keyboard_with_choseen_language(language_from_local);