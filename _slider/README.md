#####for integration slider in project:

1. Create div element with following structure:
   ```html
   <div class="slider">
       <ul>
           <li style="background-image: url('./images/1.jpg')">
               <div class="li1">
                   <h3>Buy potato?</h3>
                   <button>Exactly!</button>
               </div>
           </li>
           <li style="background-image: url('./images/2.jpg')">hello world 2</li>
           <li style="background-image: url('./images/3.jpg')">hello world 3</li>
           <li style="background-image: url('./images/4.jpg')">hello world 4</li>
           <li style="background-image: url('./images/5.jpg')">hello world 5</li>
       </ul>
   </div>
   ```
   You can use any class of main div. "slider" is example.
   

2. Let`s create an object with settings for the slider. You can see all property here:
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
3. Now we can create Slider.
    ```javascript
    const slider = new Slider(settings)
    ```
4. We can add listeners to end of scroll animation. For example, if we have div
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
   

