


const utils = {};


utils.styles={
   car:{color:'gray',text:'🚗'},
   fish:{color:'red',text:'🐠'},
   house:{color:'yellow',text:'🏠'},
   tree:{color:'green',text:'🌳'},
   bicycle:{color:'cyan',text:'🚲'},
   guitar:{color:'blue',text:'🎸'},
   pencil:{color:'magenta',text:'✏️'},
   clock:{color:'lightgray',text:'🕒'},
};

utils.styles["?"]={color: 'lightblue', text: '🤔'}

utils.formatPercent=(n)=>{
   return (n*100).toFixed(2)+"%";
}

utils.distance=(p1,p2)=>{
   return Math.sqrt(
      (p1[0]-p2[0])**2+
      (p1[1]-p2[1])**2
   );
}

utils.getNearest=(loc,points,k=1)=>{
   const obj=points.map((val,ind)=>{
      return {ind,val}
   });
   const sorted=obj.sort((a,b)=>{
      return utils.distance(loc,a.val)-
         utils.distance(loc,b.val)
   });
   const indices=sorted.map((obj)=>obj.ind);
   return indices.slice(0,k);
}

utils.invLerp=(a,b,v)=>{
   return (v-a)/(b-a);
}

utils.normalizePoints=(points,minMax)=>{
   let min,max;
   const dimensions=points[0].length;
   if(minMax){
      min=minMax.min;
      max=minMax.max;
   }else{
      min=[...points[0]];
      max=[...points[0]];
      for(let i=1;i<points.length;i++){
         for(let j=0;j<dimensions;j++){
            min[j]=Math.min(min[j],points[i][j]);
            max[j]=Math.max(max[j],points[i][j]);
         }
      }
   }
   for(let i=0;i<points.length;i++){
      for(let j=0;j<dimensions;j++){
         points[i][j]=
            utils.invLerp(min[j],max[j],points[i][j]);
      }
   }
   return {min,max};
}


utils.groupBy  = (objArray,key ) => {
    const groups = {};
    for (let obj of objArray){
        const val = obj[key];
        if(groups[val] == null){
            groups[val] = [];
        }
        groups[val].push(obj);
    }
    return groups;
}

utils.printProgressWithTimeEstimation = (id, totalItems, startTime, lastUpdateTime) => {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
    const itemsPerSecond = id / elapsedTime;
    const remainingItems = totalItems - id;
    const estimatedTimeSeconds = remainingItems / itemsPerSecond;
    const estimatedTimeFormatted = utils.formatTime(estimatedTimeSeconds);

    // Update progress and estimated time every 1 second
    if (currentTime - lastUpdateTime >= 1000) {
        utils.printProgress(id, totalItems, estimatedTimeFormatted);
        lastUpdateTime = currentTime;
    }

    return lastUpdateTime;
}

utils.printProgress = (count, max, estimatedTime) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    
    const percent = utils.formartPercent(
        count/max
    );

    process.stdout.write(
        count + "/" + max + " (" + percent + 
        ") Estimated Time: " + estimatedTime);
}


utils.formartPercent = (n) =>{
    return ( n * 100).toFixed(2) + "%";
}

utils.formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const remainingMilliseconds = Math.floor((seconds % 1) * 1000);

    let formattedTime = '';

    if (hours > 0) {
        formattedTime += `${hours} hr `;
    }

    if (minutes > 0) {
        formattedTime += `${minutes} min `;
    }

    if (remainingSeconds > 0) {
        formattedTime += `${remainingSeconds} sec `;
    }

    formattedTime += `${remainingMilliseconds} ms`;

    return formattedTime.trim();
}





if (typeof module !== 'undefined'){
    module.exports = utils;
}