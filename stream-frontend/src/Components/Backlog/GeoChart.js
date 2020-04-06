import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoAlbersUsa, min, max, scaleLinear } from "d3";
import useResizeObserver from "./useResizeObserver";
import { useHistory } from "react-router-dom";

/**
 * Component that renders a map the US.
 */


function GeoChart({ data, property }) {
  const history = useHistory();
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const minProp = min(data.features, feature => feature.properties[property]);
    const maxProp = max(data.features, feature => feature.properties[property]);
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["#c4dcf5", "#096dd9"]);

    // use resized dimensions
    // but fall back to getBoundingClientRect, if no dimensions yet.
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // projects geo-coordinates on a 2D plane
    const projection = geoAlbersUsa()
      .fitSize([width, height], selectedCountry || data)
      .precision(100);

    // takes geojson data,
    // transforms that into the d attribute of a path element
    const pathGenerator = geoPath().projection(projection);
    // render each country
    svg
      .selectAll(".country")
      .data(data.features)
      .join("path")
      .on("click", feature => {
        let url = '/state_info' + '?state=' + feature.properties.NAME.toString()
        history.push(url);
      })
      .attr("class", "country")
      .on("mouseenter", feature =>{
        svg.selectAll(".tooltip")
        .data([feature.properties.NAME])
        .join("text")
        .attr("class", "tooltip")
        .text(feature.properties.NAME)
        .attr("x", 10)
        .attr("y", 10)
        .transition()
        .attr('opacity', 1);
      })
      .transition()
      .attr("fill", feature => colorScale(feature.properties[property]))
      .attr("d", feature => pathGenerator(feature));

      
  }, [data, dimensions, property, selectedCountry]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef} id="graph"></svg>
    </div>
  );
}

export default GeoChart;