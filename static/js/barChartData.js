// function buildCharts() {
    d3.json("samples.json").then((data) => {
        let sampleArray = data.samples;
        console.log(sampleArray);
    
        let otu_ids = sampleArray.id;
        let otu_labels = sampleArray.otu_labels;
        let sample_values = sampleArray.sample_values;

        var traceBar = {
            x: otu_labels,
            
            y: sample_values,
            type: 'bar',
            orientation: 'h'
        }

        var barData = [traceBar];

        var layout = {
            title: "Top 10 Bacteria Cultures Found"
        };
        
        Plotly.newPlot("bar",barData, layout)
    
    })
// }

 