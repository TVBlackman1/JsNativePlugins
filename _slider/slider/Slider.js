
export class Slider {
    constructor() {
        console.log('OnCreate')
        this.$el = document.querySelector('.slider')
        this.$content = this.$el.querySelector('.slider-content')
        // console.log(this.$el)
        // this.id = null
        this.addScrollHandler()

    }

    addScrollHandler() {
        this.$content.addEventListener('mousewheel', (event) => {
            if (this.$content.doScroll)
                this.$content.doScroll(event.wheelDelta>0?"left":"right");
            else if ((event.wheelDelta || event.detail) > 0)
                this.$content.scrollLeft -= 10;
            else
                this.$content.scrollLeft += 10;

            return false;
        })
        // this.$content.addEventListener('scroll', function() {
        //     console.log("scroll")
        //     // document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
        // });
        // this.$content.addEventListener('click', function() {
        //     console.log("click")
        //     // document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
        // });
    }
}