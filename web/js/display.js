

const createRow  = (container, participantName, samples) =>{
    const row = document.createElement("div");
    row.classList.add("row");

    container.appendChild(row);


    const rowLabel = document.createElement("div");
    rowLabel.innerHTML = participantName;
    rowLabel.classList.add("rowLabel");
    row.appendChild(rowLabel);


    for (let sample of samples){
        const {id,label} = sample;
        

        const sampleContainer = document.createElement("div");
        sampleContainer.id = "sample_" + id;
        sampleContainer.classList.add("sampleContainer");

        const sampleLabel = document.createElement("div");
        sampleLabel.innerHTML = label;
        sampleContainer.appendChild(sampleLabel);


        const img=document.createElement('img');
        img.setAttribute("loading","lazy");
        img.src=constants.IMG_DIR+'/'+id+'.png';
        img.classList.add("thumb");
        sampleContainer.appendChild(img);
        row.appendChild(sampleContainer);
    }
}

const toggleInput = () =>
{
    if(inputContainer.style.display == "none"){
        inputContainer.style.display = "block";
        SketchPad.triggerUpdate();
    }else{
        inputContainer.style.display = "none";
        chart.hideDynamicPoint();
    }
}

const handleClick = (sample,doScroll=true) =>{
   if(sample==null){
      [...document.querySelectorAll('.emphasize')].
         forEach((e)=>e.classList.remove('emphasize'));
      return;
   }
   const el=document.getElementById(
      "sample_"+sample.id
   );
   if(el.classList.contains("emphasize")){
      el.classList.remove("emphasize");
      chart.selectSample(null);
      return;
   }
   [...document.querySelectorAll('.emphasize')].
      forEach((e)=>e.classList.remove('emphasize'));
   el.classList.add("emphasize");
   if(doScroll){
      el.scrollIntoView({
         behavior:'auto',
         block:'center'
      });
   }
   chart.selectSample(sample);
}
