function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    console.log(sampleNames);
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    console.log(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  console.log(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");
    console.log(resultArray);
    // Use `.html("") to clear any existing metadata
    PANEL.html("");
  // PANEL.append("h6").text(result.location);
  // });
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}
// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    let sampleArray = data.samples;
    console.log(sampleArray[0]);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let sampleNum = d3.select(this);
    console.log(sampleNum);
    //  5. Create a variable that holds the first sample in the array.
    let firstSample = sample[0];
    console.log(firstSample);

    console.log(samples.id);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = sampleArray.map(function(id) {
      return sampleArray.id});
    var otu_labels = sampleArray.map(function(labels) {
      return sampleArray.otu_labels});
    var sample_values = sampleArray.map(function(values) {
      return sampleArray.sample_values});

    console.log(otu_ids);
    console.log(otu_labels);
    console.log(sample_values);   
    

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = {}

    // 8. Create the trace for the bar chart. 
    var traceBar = {
      x: sample_values.slice(0,10).map(otu_labels => `${otu_labels}`).reverse(),
      y: yticks,
      text: otu_labels.slice(0,10).map(otu_labels => `${otu_labels}`).reverse(),
      type: 'bar',
      orientation: 'h'
    }

    var barData = [traceBar];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
      
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // 1. Create the trace for the bubble chart.
    var bubbleData = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: size,
        sizeref: 2.0*Math.max(...size) / (desired_maximum_marker_size**2),
        sizemode: 'area'
      }
  };

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 600
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    let metaArray = data.metadata;
    console.log(metaArray);
    // Create a variable that holds the first sample in the array.
    let metaArrayOne = metaArray[0]
    console.log(metaArrayOne)
    // 2. Create a variable that holds the first sample in the metadata array.


    // 3. Create a variable that holds the washing frequency.
   
    let washFreq = metadata.wfreq
    
    // 4. Create the trace for the gauge chart.
    var traceGauge = {
      domain: {x: [0,1], y:[0,1]},
      value: metaArrayOne.wfreq,
      title: {text: "Belly Button Washing Frequency  Scrubs per Week"},
      type: 'indicator',
      mode: 'gauge+number'
    }
    var gaugeData = [traceGauge];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600,
      height: 500,
      margin: {t: 0, b: 0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
};
