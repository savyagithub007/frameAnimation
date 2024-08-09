const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d")

        const frames = {
            currentIndex: 0,
            maxIndex: 382
        }

        let imagesLoaded = 0;
        const  images = [];

    function preloadImages() {
    for (var i = 0; i <= frames.maxIndex; i++) {
        const imageUrl = `./frames/frame${i.toString().padStart(4, "0")}.png`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imagesLoaded++
            if(imagesLoaded === frames.maxIndex){
                loadImage(frames.currentIndex)
                startAnimation();
            }
        }
        images.push(img);
    }
}


    function loadImage(index){
        if(index>=0 && index<=frames.maxIndex){
            const img = images[index];
            canvas.width = window.Width;
            canvas.height = window.innerHeight;

            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height;
            const scale = Math.max(scaleX, scaleY)

            const newWidth = img.width * scale;
            const newHeight = img.height * scale;

            const offsetX = (canas.width - newWidth) / 2;
            const offsetY = (canas.height - newHeight) / 2;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.imageSmoothingEnabled = "true"
            context.imageSmoothingQuality = "high"
            context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
            frames.currentIndex = index;
        }
    }


    function startAnimation() {
        var tl = gsap.timline({
            scrollTrigger: {
                trigger: ".parent",
                start: "top top",
                scrub: 2,
                markers: ture
            }
        })

        tl.to(frames, {
            currentIndex: frames.maxIndex,
            onUpdate: function() {
                loadImage(Math.floor(frames.currentIndex))
            }
        })

    }

preloadImages();