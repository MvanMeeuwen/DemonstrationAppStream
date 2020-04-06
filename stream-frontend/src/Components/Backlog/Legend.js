import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoAlbersUsa, min, max, scaleLinear, range } from "d3";
import useResizeObserver from "./useResizeObserver";

const Legend = ({ data, property }) => {
    const wrapperRef = useRef();
    const legendRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        const legend = select(legendRef.current)
        const minProp = min(data.features, feature => feature.properties[property]);
        const maxProp = max(data.features, feature => feature.properties[property]);
        
        const colorScale = scaleLinear()
            .domain([minProp, maxProp])
            .range(["#edf0f3", "#096dd9"]);
        
        const { width, height } =
            dimensions || wrapperRef.current.getBoundingClientRect();


        let diff = Math.abs(minProp - maxProp);
        let stepsize = diff / 10; 
        let colorRange = range(minProp, maxProp, stepsize)
        let colorLegend = []
        let bandwith = []
        for(let i = 0; i < colorRange.length; i ++ ) {
            let num  = colorRange[i]
            colorLegend.push(colorScale(num))
            if (i % 2 == 0 || i == colorRange.length){
                bandwith.push(Math.round(num).toString()) 
            } else {
                bandwith.push("")
            }
            
        }

      legend.append("g")
        .selectAll("rect")
        .data(colorLegend)
        .enter()
        .append("rect")
        .attr("fill", function(d, i){ return colorLegend[i]; })
        .attr("x", function(d, i){ return (i*30); })
        .attr("y", 0)
        .attr("width", 30)
        .attr("height", 10);

        legend.append("g")
             .selectAll("text")
             .data(bandwith)
             .enter()
             .append("text")
            .attr("font-size", "10px")
            .attr("font-family", "HelveticaNeue-Light, Helvetica, sans-serif")
            .attr("x", function(d, i){ return (i*30); })
            .attr("y", 20)
        .text(function(d){ return d; })
  





    }, [data, dimensions, property]);

    return (
        <div ref={wrapperRef} style={{ heigth: "30px" }}>
            <svg ref={legendRef} id="legend"></svg>
        </div>

    )



    



}


export default Legend;