

  const slides=document.querySelectorAll(".slider-item");
const sliderTrack=document.querySelector(".slider-track");
const slidePages=document.querySelector(".slide-pages");
const btnPrev=document.querySelector(".left-arrow")
const btnNext=document.querySelector(".right-arrow")
let copyItem_right=document.createElement("div");
let copyItem_left=document.createElement("div");
let speedAnimation=10;
let isAnimated=false;
copyItem_left.classList.add("slider-item__copy");
copyItem_right.classList.add("slider-item__copy");
copyItem_left.innerHTML=slides[slides.length-1].innerHTML;
copyItem_right.innerHTML=slides[0].innerHTML;
const handlers=[];
const pages=[];
let activeSlide=0;
let width=0;
let count =0;




/*sliderTrack.prepend(slides[slides.length-1]);
sliderTrack.append(slides[0]);*/

const init =()=>{
  
  console.log("resize");
  width=document.querySelector(".slider-container").offsetWidth;

copyItem_left.style.left=-width+"px";
copyItem_left.style.width=width+"px";

copyItem_right.style.width=width+"px";
copyItem_right.style.right=-width+"px";

  sliderTrack.prepend(copyItem_left);
  sliderTrack.append(copyItem_right);
  sliderTrack.style.width=width*slides.length+"px";
  slides.forEach((element,index) => {
    element.style.width=width+"px";
    element.style.height="auto";
  
    
  });
  sliderTrack.style.left= -width*count+"px";
  }
  const computePages=()=>{
    slidePages.innerHTML="";
    slides.forEach((element,index) => {
      console.log(index);
      if((index)===count){
        slidePages.innerHTML+=`<label id="page_${index}" class="page-label page-label-active"></label>`
activeSlide=index;
      }
     else {slidePages.innerHTML+=`<label id="page_${index}" class="page-label"></label>`}


    

    });
    document.querySelectorAll(".page-label").forEach(elem=>{
      elem.addEventListener("click",(event)=>{if(!isAnimated)slidePage(event)})
      pages.push(elem);
  });

    
  }
  function slidePage(event)
  {
  
    let id=event.target.id;
let clickedPage=id.slice(5);
let currentPage=count;

if(clickedPage>count)
{
  count=clickedPage;
  rollLeft(currentPage).then(widthCount=>{sliderTrack.style.left= widthCount+"px";
isAnimated=false;
});
}
else
{
  count=clickedPage;
  rollRight(currentPage).then(widthCount=>{sliderTrack.style.left= widthCount+"px";
 isAnimated=false;
});
}


    setActivePage(id)
  }
  function setActivePage(id)
  {
    document.querySelector(".page-label-active").classList.remove("page-label-active");
    document.getElementById(id).classList.add("page-label-active");

  }

  btnPrev.addEventListener("click",(event)=>{
    if(isAnimated==false)
    {
      let currentPage=count;
      count--
  if(count<0)
  {
    console.log(count);
    count=slides.length-1;
  }
  setActivePage("page_"+count);
  rollRight(currentPage).then(widthCount=>{sliderTrack.style.left=widthCount+"px"
  isAnimated=false;
  });
    }
  


  })
  
  btnNext.addEventListener("click",(event)=>{
    if(isAnimated==false)
    {
      let currentPage=count;
      console.log(currentPage);
      count++
      if(count>=slides.length)
      {
        count=0;
      }
  
      setActivePage("page_"+count);
      rollLeft(currentPage).then(widthCount=>{sliderTrack.style.left= widthCount+"px"
      isAnimated=false;
    });
  
    }

   
      })

  function rollRight(currentPage){
  isAnimated=true;
    return new Promise((resolve,reject)=> {
     let difference=Math.abs(currentPage-count);
     if(count===slides.length-1)
     {
       difference=1;
     }
      console.log(difference);
      let widthCount=-width*count;
      let progress =width;
      let counter=0;
      let slideInterval= setInterval(()=>{
         let left=Number(sliderTrack.style.left.slice(0, -2))
         left+=15;
         progress-=15;
         sliderTrack.style.left= left+"px";
         if(progress<=0) {
counter++;
           progress=width;
         }
         if(difference==counter)
         {
          window.clearInterval(slideInterval);
          resolve(widthCount);
         }

       },speedAnimation)
 
    })
   

  }
  function rollLeft(currentPage){
isAnimated=true;
    return new Promise((resolve,reject)=>{
     let difference=Math.abs(currentPage-count);
     if(count===0)
     {
      difference=1;
     }
    console.log(difference);
      let widthCount=-width*count;
      let progress=width;
let counter=0;
      let slideInterval= setInterval(()=>{
        let left=Number(sliderTrack.style.left.slice(0, -2))
        left-=15;
        progress-=15;
        
        sliderTrack.style.left= left+"px";
        if(progress<=0) {
          counter++
          progress=width;
        }
        if(difference==counter)
        {
          window.clearInterval(slideInterval);
          resolve(widthCount);
        }
        /*console.log(sliderTrack.style.left);*/
      },speedAnimation)
   

    })


  
  }
  window.addEventListener("resize",init);
  init();
  computePages();

