// store main element for later
const mapVis = d3.select('#map');
const timeVis = d3.select('#timeline');
let g = undefined;
let timeline = undefined;
let aggrData = undefined;
let stackedData = undefined;
const refLineWidth = 2;

// BG piture size 3174 × 2029
const originalWIDTH = 3174;
const originalHEIGHT = 2029;

const mapAltWidth = 800;
const mapAltHeight = 510;

// Mapping data to coordinates, color and flags
let xMap = undefined;
let yMap = undefined;
let colorMap = undefined;
let colorScale = undefined;
const flags = ['unknown','🇫🇷','🇬🇧','🇬🇧','🇬🇧','🇬🇧','🇬🇧'];

let xTime = undefined;
let yTime = undefined;
// tooltip for scatterplot
let tooltip = undefined;

// data saved here as soon as loaded
let positions = undefined;

// DOUBLECHECK THESE
//      bottom left corner of the map in coordinates:
const KirkwoodMinLong = 3.289923485967504;
//const KirkwoodMinLat = 50.13036907730674;
const KirkwoodMinLat = 50.10036907730674;
//      top right
const KirkwoodMaxLong =  5.609567799113737;
const KirkwoodMaxLat = 51.0505;

let Kirkwood = true;

// actual size of the map plot
const mapWidth = mapAltWidth;
const mapHeight = mapAltHeight;

// size of timeline
const timelineWidth = mapWidth;
const timelineTickSpacing = 20;
const timelineHeight = mapHeight / 3.5 + timelineTickSpacing;
const days = ["15 Jun","16 Jun","17 Jun","18 Jun","19 Jun","20 Jun", "21 Jun"];

// Program State:
let currentStep = 0;
let playInterval;
let playing = false;

// Load data and prepare the map
d3.csv('data/waterloo_data.csv', 
            function (d){
                d.step = +d.step;
                d.army = +d.army;
                d.latitude = +d.latitude;
                d.longitude = +d.longitude;
                d.men = +d.men;
                d.officers = +d.officers;
                return d})
    .then((data) => { // wait until loading has finished, then ...
        //const table = createTable(data.columns);
        //updateTableRows(table, data);
        //plot(data);
        //console.log(data);
        positions = data;
        setMap(data);
        plotTimeline(data);
        //plotMapStep(data, 0);
    })
    .catch((error) => {
        console.error('Error loading the data', error);
    });
  
// plotting timeline
function plotTimeline(data) {
    // Aggregate data:
    aggrData = d3.nest()
            .key(d => +d.step)
            .key(d => +d.army)
            .sortKeys((a, b) => d3.ascending(+a, +b))
            .rollup(function(d) { 
                return d3.sum(d, function(g) {return 1;} );
    }).entries(data);
    console.log(aggrData, "aggr");

    let keys = [0, 1, 2, 3, 4, 5];
    stackedData = d3.stack()
    .keys(keys)
    .value(function(d, key){
        if (!("values" in d) || !(key in d.values))
            return 0;
        return d.values[key].value;
    })
    (aggrData)
    console.log(stackedData, "---");
    // Set up plot

    timeline = timeVis.append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 "+timelineWidth+" "+timelineHeight)
        .attr("class", "svg-timeline");

    // Legend
    timeline.append("circle").attr("cx",timelineWidth - 125).attr("cy",13).attr("r", 4).attr("stroke", "#222222").style("fill", '#f6d13a')
    timeline.append("circle").attr("cx",timelineWidth - 125).attr("cy",28).attr("r", 4).attr("stroke", "#222222").style("fill", '#ff8122')
    timeline.append("circle").attr("cx",timelineWidth - 125).attr("cy",43).attr("r", 4).attr("stroke", "#222222").style("fill", '#c62717')
    timeline.append("circle").attr("cx",timelineWidth - 125).attr("cy",58).attr("r", 4).attr("stroke", "#222222").style("fill", 'red')
    timeline.append("circle").attr("cx",timelineWidth - 125).attr("cy",73).attr("r", 4).attr("stroke", "#222222").style("fill", '#512929')
    timeline.append("circle").attr("cx",timelineWidth - 125).attr("cy",98).attr("r", 4).attr("stroke", "#222222").style("fill", '#6f8ddd')
    timeline.append("text").attr("x", timelineWidth - 110).attr("y", 13).text("Dutch & Belgian").style("font-size", "19px").attr("alignment-baseline","middle")
    timeline.append("text").attr("x", timelineWidth - 110).attr("y", 28).text("Brunswik").style("font-size", "19px").attr("alignment-baseline","middle")
    timeline.append("text").attr("x", timelineWidth - 110).attr("y", 43).text("Hannoverian").style("font-size", "19px").attr("alignment-baseline","middle")
    timeline.append("text").attr("x", timelineWidth - 110).attr("y", 58).text("British").style("font-size", "19px").attr("alignment-baseline","middle")
    timeline.append("text").attr("x", timelineWidth - 110).attr("y", 73).text("Prussian").style("font-size", "19px").attr("alignment-baseline","middle")
    timeline.append("text").attr("x", timelineWidth - 110).attr("y", 98).text("French").style("font-size", "19px").attr("alignment-baseline","middle")

    // X
    let x = d3.scaleLinear()
      .domain([0, 168])
      .range([ 0, timelineWidth ]);
    xTime = x;

    timeline.append("g")
      .attr("transform", "translate(0," + String(-20+timelineHeight) + ")")
      .call(d3.axisBottom(x).ticks(168))
      .selectAll(".tick")
      .each(function(_, i){
        d3.select(this).selectAll(".tick text").remove();
        if(i%24 !== 0) {
           // d3.select(this).selectAll(".tick line").remove();
           d3.select(this).selectAll(".tick line").attr("visibility", "hidden");
        }
        if (i!==12) {
            d3.select(this).selectAll(".tick text").remove();
        }
      });
    // Setting Labels the quick way
    for (let i=0; i < 7; i++){
        timeline.append("text")
            .attr("x", timelineWidth/14 * (1 + 2*i) - 15)
            .attr("y", timelineHeight - timelineTickSpacing/2 + 3)
            .text(days[i])
            .style("font-size", "19px")
            .attr("alignment-baseline","middle")
    }

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 360])
      .range([ timelineHeight-timelineTickSpacing, 0 ]);
    yTime = y;

    // Add the area
    timeline
    .selectAll(".areas")
    .data(stackedData)
    .join("path")
        .attr("fill", function(d) {
            return colorScale(d.key+1);
        })
        .attr("d", d3.area()
            .x(function(d, i) { return x(i);})
            .y0(function(d) {return y(d[0]);})
            .y1(function(d) {return y(d[1]);})
        )
        .attr("opacity", 1)
        .attr("stroke", 0);
    /////set ref line;
    timeline
        .append("line")
        .attr("class", "referenceLine")
        .attr("x1", xTime(0))
        .attr("x2", xTime(0))
        .attr("y1", yTime(Math.max(stackedData[5][0][1]+ 5, 100)))
        .attr("y2", 146 - refLineWidth/2)
        .attr("stroke", "black") // #DEB887  darkgray
        .attr("stroke-width", refLineWidth)
        .attr("stroke-linecap", "round")
        .attr("opacity", 0.67)
        .attr("width", "100");

    timeline.on("mousedown", function() {
        let destination = Math.round(xTime.invert(d3.mouse(this)[0]));
        if (destination > 168) destination = 168;
        if (destination < 0) destination = 0;
        if (destination == currentStep) return;
        console.log(destination);
        const duration = 168 / Math.abs(currentStep - destination) * 1;
        play(destination, duration, duration + 6);
    });
}

function moveReferenceLine(step=currentStep, delay = undefined, duration = undefined,) {
    const curActivity = Math.max(stackedData[5][step][1]+ 5, 100);
    timeline.selectAll(".referenceLine")
        .transition()
        .ease(d3.easeLinear)
        .duration(duration) 
        .delay(delay)
        .attr("x1", xTime(step))
        .attr("x2", xTime(step))
        .attr("y1", yTime(curActivity))
        .attr("y2", 146 - refLineWidth/2)
}

// setting map and needed transformations here
function setMap(data) {

    // setup x 
    let maxLongitude;
    let minLongitude;
    if (Kirkwood){
        maxLongitude = KirkwoodMaxLong;
        minLongitude = KirkwoodMinLong;
    }
    else {
        maxLongitude = d3.max(data, function(d) { return +d.longitude;} );
        minLongitude = d3.min(data, function(d) { return +d.longitude;} );
    }   

    let xScale = d3.scaleLinear()
        .domain([minLongitude,maxLongitude])
        .range([0,mapWidth]);
    xMap = function(d) { return xScale(d.longitude);}

    // setup y
    if (Kirkwood){
        maxLatitude = KirkwoodMaxLat;
        minLatitude = KirkwoodMinLat
    }
    else {
        maxLatitude = d3.max(data, function(d) { return +d.latitude;} );
        minLatitude = d3.min(data, function(d) { return +d.latitude;} );
    }

    let yScale = d3.scaleLinear()
        .domain([minLatitude,maxLatitude])
        .range([mapHeight,0]);
    yMap = function(d) { return yScale(d.latitude);}

    // setup color mapping
    colorScale = d3.scaleOrdinal()
        .domain([1, 2, 3, 4, 5, 6])
        .range(['#6f8ddd','#512929','red','#c62717','#ff8122','#f6d13a']);
    colorMap = function(d) {return colorScale(d.army);}

    // setup tooltip
    tooltip = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);

    // plot Map
    let SVGMAP = mapVis
        .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 "+mapWidth+" "+String(mapHeight))
            .attr("class", "svg-map");

    g = SVGMAP.append("g")
            .attr("cursor", "grab");

    g.append("svg:image")
        .attr('xlink:href', 'data/Part_of_Belgium_engraved_by_J._Kirkwood.jpg')
        .attr('width', mapWidth)
    .attr('height', mapHeight);

    SVGMAP.call(d3.zoom()
            .extent([[0, 0], [mapWidth, mapHeight]])
            .scaleExtent([1, 8])
            .on("zoom", function() {
                g.attr("transform", d3.event.transform);
              }));
            

    
}

function plotMapStep(step, delay = 100, duration = 1000, data = positions) {
    g.selectAll('circle')
        .data(data.filter(function(d){return +d.step == +step}),(d)=> d.unitid)
        .join(
            (enter) => {
                // TODO add cool TRANSITION!
                const circles_enter = enter.append('circle');
                circles_enter
                    .attr("cx", xMap)
                    .attr("cy", yMap)
                    .on("mouseover", function(d) {		
                        tooltip.transition()		
                            .duration(200)		
                            .style("opacity", .9);		
                        tooltip.html("Allignment: "+ flags[+d.army] + "<br/>Unit: " + d.name + "<br/>Id: " + d.unitid )	
                            .style("left", (d3.event.pageX) + "px")		
                            .style("top", (d3.event.pageY - 28) + "px");	
                    })
                    .on("mouseout", function(d) {		
                        tooltip.transition()		
                            .duration(500)		
                            .style("opacity", 0)})
                    .transition()
                    .duration(duration) 
                    .delay(delay)
                    .attr('r',2)
                    .attr('opacity',0.85)
                    .attr("fill", colorMap)
                    .attr("stroke", "#222222");
                return circles_enter;
            },
            (update) => {
                return update
                .transition()
                // TODO: PUT CONDITION ON EASE (play/normal)
                .ease(d3.easeLinear)
                .duration(duration) // duration of the animation
                .delay(delay) // delay animation start
                .attr("cx", xMap)
                .attr("cy", yMap);},
            (exit) => {
                return exit.transition()
                            .duration(duration) 
                            .delay(delay)
                            .remove();
            }
        );
    moveReferenceLine(currentStep, delay, duration);
}
function stepTime(dir){
    currentStep += dir;
    if (currentStep > 168) currentStep = 168;
    if (currentStep < 0) currentStep = 0;
    plotMapStep(currentStep);
}

function play(finish = 169, duration = 265, interval = 270){
    if (playing == false) {
        const direction = finish > currentStep ? 1 : -1;
        console.log("playing")
        playing = true;
        document.getElementById("btnPlay").classList.add("active_btn");
        document.getElementById("btnPlay").innerHTML = "Stop";
        playInterval = setInterval(() => {
                        currentStep += direction;
                        if (currentStep !== finish + direction) plotMapStep(currentStep, 0, duration)
                        else {
                            clearInterval(playInterval);
                            document.getElementById("btnPlay").classList.remove("active_btn")
                            document.getElementById("btnPlay").innerHTML = "Play";
                            playing = false;
                        }
                    }, interval);
    }
    else {
        console.log("stopped")
        clearInterval(playInterval);
        document.getElementById("btnPlay").classList.remove("active_btn")
        document.getElementById("btnPlay").innerHTML = "Play";
        playing = false;
    }
}

document.getElementById("btnNext").addEventListener("click",()=>{stepTime(1)});
document.getElementById("btnPrev").addEventListener("click",()=>{stepTime(-1)});
document.getElementById("btnPlay").addEventListener("click",()=>{play()});

