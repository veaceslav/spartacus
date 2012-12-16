(function() {

"use strict";

window.TR = {
  myVillages: []
};

window.TR.MAX_WIDTH = 1306;
window.TR.MAX_HEIGHT = 738;
window.TR.VILLAGE_W  = 128;
window.TR.VILLAGE_H = 128 ;

function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

function generateWH()
{
  return {
    width: randomFromInterval(0, window.TR.MAX_WIDTH),
    height: randomFromInterval(0,window.TR.MAX_HEIGHT)
  };
}

function checkConstraints(gen)
{
    for(var i=0;i<TR.myVillages.length;i++)
  {
      if((Math.abs(gen.width-TR.myVillages[i].width)< TR.VILLAGE_W)
	&& (Math.abs(gen.height-TR.myVillages[i].height)< TR.VILLAGE_H)){
	return false;
      }
  }  
  return true;
}
function getVillage()
{
  var generated;

  generated = generateWH();
  
  while(!checkConstraints(generated))
  {
    generated = generateWH();
  }
  
  window.TR.myVillages.push(generated);
  generated.id = window.TR.length-1;
  
  return generated;
  
}
  
window.TR.getVillage = getVillage;

}());
