# Virtual Keyboard

#### You should to create a virtual keyboard like this:
![image](https://user-images.githubusercontent.com/71282670/172998570-1bb9ed6d-e172-4ebb-bb12-c0379c2954de.png)

### Functional requirements:
- design is at your discretion. 
- `index.html` file should be empty (all the necessary elements are generated with the usage of JS)
- pressing a key on a physical keyboard highlights the key on the virtual keyboard:
  ![image](https://user-images.githubusercontent.com/71282670/172998631-d0b76b28-a1ed-419e-bdea-502c471d466f.png)

  **There may be differences in keystrokes on different operating systems (Windows, macOS). To avoid mistakes, it's necessary to specify in which OS the virtual keyboard was created**
- if several buttons are pressed, all the pressed buttons are highlighted on the virtual keyboard (there're no exceptions for `Ctrl`, `Alt` and `Shift` as well)
  ![image](https://user-images.githubusercontent.com/71282670/172998661-f3883ca3-bf6e-4d57-a7df-f34beca2d181.png)
- the virtual keyboard is able to switch between two language layouts (English + any other language). 
    - assigning a keyboard shortcut for switching keyboard layout is up to you.
    - the buttons on the virtual keyboard display symbols of a selected language
    - the application saves a chosen language after the page is reloaded and displays the keyboard on that language
    - the keyboard shortcut for changing language should be indicated on the page so that it will be clear for a user how to switch keyboard layout
- keystrokes are animated
- clicks on the buttons with a mouse on the virtual keyboard and pressing keys on a physical keyboard should input symbols to the text area located on the page above the virtual keyboard.
    - pressing the `Up`, `Down`, `Left` or `Right` arrow key inputs an arrow symbol in the input field, or implements navigation on the text area.
    - pressing the `Enter` should move a text cursor to the next line
    - the `Tab` key creates a horizontal indent
    - pressing the rest of the function keys on a keyboard does not result in inputting symbols
    - the `Backspace` key removes character before the text cursor
    - the `Del` key removes character after the text cursor
    - the `Shift`, `Alt`, `Ctrl`, `Caps lock` and `Space` keys should work as on a real keyboard

### Technical requirements
- should work on the latest Chrome version
- usage of JQuery and other JS libraries is **not allowed**
- usage of Bootstrap and other UI libraries is **not allowed**
- usage of Angular/React/Vue and other frameworks is **not allowed**
- you can use CSS preprocessors
- [ESLint (eslint-config-airbnb-base)](https://eslint.org/) should be used
- the working application should be hosted on [GitHub Pages](https://pages.github.com/). It happens automatically on 'gh-pages' branch creation. Afterward, the page will be available at the address like https://your-github-account.github.io/name-of-your-repository

### Requirements for commits, pull request, repository
- the work should be done in your private repository
- source code should be committed to a separate branch
- the **master** branch should be empty (contain only files like README.md or .gitignore)
- commit messages should follow the [guideline](https://www.conventionalcommits.org/en)
- once the work is finished, create a pull request from a development branch to master
- the pull request name should contain **the task name**
- the pull request description should contain the following information:
    - link to the task
    - screenshot of your application (one would be enough)
    - link to your application
    - date of completion/deadline
    - your self-check with a preliminary evaluation that is based on the evaluation criteria from the task
