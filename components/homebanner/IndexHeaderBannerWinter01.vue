<template>
  <div class="header-banner">
    <div class="bannerBox">
      <img src="~/assets/img/banner/dongxue/bg1.webp"/>
      <img class="bg2" src="~/assets/img/banner/dongxue/bg2.webp"/>
      <img class="bg3" src="~/assets/img/banner/dongxue/bg3.webp"/>
      <!-- <img class="bg3.5" src="~/assets/img/banner/qiuxue/bg4.webp"/> -->
      <img class="bg4" src="~/assets/img/banner/dongxue/aa.webp"/>
      <img class="bg5" src="~/assets/img/banner/dongxue/bb.webp"/>
      <img class="cc" src="~/assets/img/banner/dongxue/cc.webp"/>
      <img class="girl_left" src="~/assets/img/banner/dongxue/girl1.webp"/>
      <img class="girl_right" src="~/assets/img/banner/dongxue/girl_right.webp"/>
      <img class="lu" src="~/assets/img/banner/dongxue/lu.webp"/>
      <img class="tree_right" src="~/assets/img/banner/dongxue/tree_right.webp"/>
      <img class="tree_left" src="~/assets/img/banner/dongxue/tree_left.webp"/>
      <img class="flow1" src="~/assets/img/banner/dongxue/flow1.webp"/>
      <img class="flow2" src="~/assets/img/banner/dongxue/flow2.webp"/>
    </div>
    <div class="header-banner__inner">
        <div class="logo-box">
            <img src="~/assets/img/homelogo.png" alt="">
        </div>
    </div>
  </div>
    
</template>

<script setup>
let intervalId = null
onMounted(() => {
  let bannerDiv = document.querySelector(".bannerBox")
  createSnow()
  let tree_right = document.querySelector(".tree_right")
  let tree_left = document.querySelector(".tree_left")

  let duck = document.querySelector(".cc")
  let dog = document.querySelector(".lu")

  // let flow_left = document.querySelector(".flow_left")
  let flow1 = document.querySelector(".flow1")
  let flow2 = document.querySelector(".flow2")

  let girl_left = document.querySelector(".girl_left")
  let girl_right = document.querySelector(".girl_right")

  let aa = document.querySelector(".bg4")
  let bb = document.querySelector(".bg5")

  let bg2 = document.querySelector(".bg2")
  let bg3 = document.querySelector(".bg3")

  bannerDiv.addEventListener('mouseenter', onEnter);

  function onEnter(event) {
    let startX = event.clientX;
    let startY = event.clientY;

    bannerDiv.addEventListener('mousemove', onMouseMove);

    function onMouseMove(event) {
      let moveX = event.clientX - startX;
      let moveY = event.clientY - startY;

      // console.log("moveX", moveX)

      tree_right.style.transform = `translate(${moveX / 2.2}px,0)`
      tree_left.style.transform = `translate(${moveX / 5}px,0)`

      flow1.style.transform = `translate(${moveX / 3}px,0)`
      flow2.style.transform = `translate(${moveX / 6}px,0) `

      duck.style.transform = `translate(${moveX / 8}px,0)`
      dog.style.transform = `translate(${moveX / 8}px,0)`

      girl_left.style.transform = `translate(${moveX / 7}px,0)`
      girl_right.style.transform = `translate(${moveX / 7}px,0)`

      bg3.style.transform = `translate(${moveX / 12}px,0)`
      bg2.style.transform = `translate(${moveX / 12}px,0)`

      aa.style.transform = `translate(${moveX / 12}px,0)`
      bb.style.transform = `translate(${moveX / 12}px,0)`

    }
  }

  function clearSnow(){
      if(intervalId){
        clearInterval(intervalId)
      }
  }
  function createSnow(){
    let bannerDiv = document.querySelector(".bannerBox")
    let i = 0
    if(intervalId){
      clearInterval(intervalId)
    }

    intervalId =  setInterval(()=>{
      let snowItemDiv;
      for (let i=0;i<50;i++){
        snowItemDiv = document.createElement("div")
        bannerDiv.appendChild(snowItemDiv)
        snowItemDiv.classList.remove("snowItem")
        snowItemDiv.style.left = (Math.random() * window.innerWidth - 200) + "px"
        snowItemDiv.style.top =  -10 + "px"
        snowItemDiv.style.setProperty("--x",(10 + (Math.random() + 10)+"px"))
        snowItemDiv.style.setProperty("--i",i)
        let temp = (Math.random() * 5 +5) + "px"
        snowItemDiv.style.width= temp
        snowItemDiv.style.height= temp
        snowItemDiv.style.borderRadius = temp
        snowItemDiv.classList.add("snowItem")
        i++
        if(i%3==0){
          snowItemDiv.classList.add("animateItem")
        }else{
          snowItemDiv.classList.add("animateItem1")
        }
        snowItemDiv.addEventListener('animationend', ()=>{
          for(let j=0;j<bannerDiv.children.length;j++){
            let aa =  window.getComputedStyle(bannerDiv.children[j])
            if(aa.opacity == "0"){
              bannerDiv.removeChild(bannerDiv.children[j])
            }
          }
        });
      }

    },1500)
  }
  bannerDiv.addEventListener('mouseleave', onLeave);


  // 设置隐藏属性和改变可见属性的事件的名称
  var hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  document.addEventListener(visibilityChange, (event)=>{
    if (document[hidden]) {
      console.log('visibilityChange1111', document[hidden])
      clearSnow()
    } else {
      console.log('visibilityChange2221', document[hidden])
      createSnow()
    }
  })

  function onLeave(event) {
    console.log('mouseleave', event)

    tree_right.style.transition = "transform 0.5s";
    tree_right.style.transform = `translate(${0}px,0)`

    flow1.style.transition = "transform 0.5s";
    flow1.style.transform = `translate(${0}px,0)`

    flow2.style.transition = "transform 0.5s";
    flow2.style.transform = `translate(${0}px,0)`

    girl_left.style.transition = "transform 0.5s";
    girl_left.style.transform = `translate(${0}px,0)`

    girl_right.style.transition = "transform 0.5s";
    girl_right.style.transform = `translate(${0}px,0)`

    bg3.style.transition = "transform 0.5s";
    bg3.style.transform = `translate(${0}px,0)`

    bg2.style.transition = "transform 0.5s";
    bg2.style.transform = `translate(${0}px,0)`

    aa.style.transition = "transform 0.5s";
    aa.style.transform = `translate(${0}px,0)`

    bb.style.transition = "transform 0.5s";
    bb.style.transform = `translate(${0}px,0)`

    tree_left.style.transition = "transform 0.5s";
    tree_left.style.transform = `translate(${0}px,0)`

    duck.style.transition = "transform 0.5s";
    duck.style.transform = `translate(${0}px,0)`

    dog.style.transition = "transform 0.5s";
    dog.style.transform = `translate(${0}px,0)`
  }
})

</script>

<style scoped>
.header-banner {
  box-sizing: border-box;
  position: relative;
  /* z-index: 0; */
  /* display: flex; */
  /* -ms-flex-pack: center;
  justify-content: center;
  margin: 0 auto;
  left: 0;
  padding: 0;
  max-width: 2560px;
  min-height: 155px;
  background-color: #e3e5e7;
  background-position: center 0;
  background-size: cover;
  background-repeat: no-repeat; */
  height: 155px;
  width: 100%;
}
.header-banner .bannerBox {
  position: absolute;
  height: 155px;
  width: 100%;
  overflow: hidden;
}
.header-banner .bannerBox .bg2 {
  position: absolute;
  bottom: 0;
  left: 0;
}

.header-banner .bannerBox .bg3 {
  position: absolute;
  bottom: 0;
  left: 0;
}

.header-banner .bannerBox .bg4 {
  position: absolute;
  bottom: -10px;
  left: 0;
}

.header-banner .bannerBox .bg5 {
  position: absolute;
  bottom: 30px;
  left: -20px;
}

.header-banner .bannerBox .cc{
  position: absolute;
  left: 151px;
  top: 20px;
}

.header-banner .bannerBox .girl_left {
  position: absolute;
  bottom: 0px;
  left: 380px;
  z-index: 10;
}

.header-banner .bannerBox .girl_right {
  position: absolute;
  bottom: 0px;
  left: 245px;

}

.header-banner .bannerBox .lu{
  position: absolute;
  bottom: 30px;
  right: 255px;
}

.header-banner .bannerBox .tree_left {
  position: absolute;
  top: 0px;
  left: -400px;
  /* right: 0px; */
}

.header-banner .bannerBox .tree_right {
  position: absolute;
  top: 0px;
  right: -360px;
  /* right: 0px; */
}

.header-banner .bannerBox .squirrel {
  position: absolute;
  bottom: 0px;
  right: -180px;
}

.header-banner .bannerBox .flow_left {
  position: absolute;
  bottom: 0px;
  left: -350px !important;
}

.header-banner .bannerBox .flow1 {
  position: absolute;
  /* bottom: 0px; */
  /* right: -200px; */
  top: 20px;
  left: -200px;
  /* right: 0px; */
}

.header-banner .bannerBox .flow2 {
  position: absolute;
  bottom: 0px;
  right: 50px
  /* right: -400px; */
}

.header-banner .bannerBox .squirrel {
  position: absolute;
  bottom: 0px;
  right: -80px;
  z-index: 10;
}

.header-banner .bannerBox .leaf {
  position: absolute;
  top: -8px;
  left: 340px;
  z-index: 5;
  transform: rotate(40deg);
}
.snowItem {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #FFFFFF;
  border-radius: 10px;
  filter: blur(1px);
  z-index: 1000;
}

.animateItem{
   animation: snow 3s   linear calc(var(--i) * 0.02s) forwards;
}

.animateItem1{
  animation: snow1 3s   linear   calc(var(--i) * 0.02s) forwards;
}

.header-banner__inner {
    position: relative;
    width: 100%;
    max-width: 2078px;
    margin: 0 auto;
    display: flex;
    /* align-items: flex-end; */
}

.header-banner__inner img {
    position: absolute;
    height: 65px;
    width: auto;
    margin-top: 60px;
    margin-left: 50px;
    cursor: pointer;
}

@keyframes snow {
    0%{
      transform:  translateX(var(--x)) translateY(0px);
      opacity: 1;
    }
    25%{
      transform:  translateX(calc(var(--x) + 15px)) translateY(40px);
      opacity: 0.75;
    }
    50%{
      transform:  translateX(calc(var(--x) + 5px)) translateY(80px);
      opacity: 0.5;
    }
    75%{
      transform:  translateX(calc(var(--x) + 0px)) translateY(120px);
      opacity: 0.25;
    }
    100%{
      transform:  translateX(calc(var(--x) - 15px)) translateY(155px) ;
      opacity: 0;
    }
}


@keyframes snow1 {
  0%{
    transform:  translateX(var(--x)) translateY(0px);
    opacity: 1;
  }
  25%{
    transform:  translateX(calc(var(--x) - 15px)) translateY(40px);
    opacity: 0.75;
  }
  50%{
    transform:  translateX(calc(var(--x) - 5px)) translateY(80px);
    opacity: 0.5;
  }
  75%{
    transform:  translateX(calc(var(--x) + 0px)) translateY(120px);
    opacity: 0.25;
  }
  100%{
    transform:  translateX(calc(var(--x) + 15px)) translateY(155px) ;
    opacity: 0;
  }
}

</style>