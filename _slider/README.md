#####for integration slider in project:

1. Let`s create an object with settings for the slider. You can see all property here:
    ```javascript
    const settings = {
        selector: '.slider',          // selector in html code.
        animationName: 'easy-easy',   // name for animation of scroll. You can see 
                                      // fill list below.
        animationDuration: 300,       // animation duration in ms.
        autoScroll: true,             // should to use auto scroll.
        autoScrollDelay: 2400,        // delay for auto scroll, if it is on.
    }
    ```
2. Now we can create Slider.
    ```javascript
    const slider = new Slider(settings)
    ```
3. We can add listeners to end of scroll animation. For example, if we have div
element with class 'effected':
   ```html
   <div class="effected"></div>
   ```
   then we can change property of it on end of scroll animation in the following way:
    ```javascript
    const $effected = document.querySelector('.effected')
    
    slider.subscribeOnScrollEnd((index) => {
        console.log(index)
        $effected.style.backgroundImage = slider.$getCurrentContent.style.backgroundImage
    })
    ```
   Now on every scroll function will invoke and print index of current content element and
   background-color of 'div.effected' will copy background-color of current content in the
   slider.
   

