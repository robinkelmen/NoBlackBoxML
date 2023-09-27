


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

utils.distance=(p1,p2)=>{
   return Math.sqrt(
      (p1[0]-p2[0])**2+
      (p1[1]-p2[1])**2
   );
}


utils.getNearest=(loc,points)=>{
   let minDist=Number.MAX_SAFE_INTEGER;
   let nearestIndex=0;

   for(let i=0;i<points.length;i++){
      const point=points[i];
      const d=utils.distance(loc,point);

      if(d<minDist){
         minDist=d;
         nearestIndex=i;
      }
   }
   return nearestIndex;
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