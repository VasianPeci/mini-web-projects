<script>
    import * as d3 from "d3";

    let {margin, data, xProperty, yProperty, colorProperty, colorMap} = $props();

    let chartWidth = $state(400);
    let chartHeight = 400;

    let innerChartWidth = $derived(chartWidth - margin.left - margin.right);
    let innerChartHeight = $derived(chartHeight - margin.top - margin.bottom);
    
    let xScale = $derived(d3.scaleLinear().domain(d3.extent(data, row => row[xProperty])).range([0, innerChartWidth]));
    let yScale = $derived(d3.scaleLinear().domain(d3.extent(data, row => row[yProperty])).range([innerChartHeight, 0]));
    let colorScale = $derived(d3.scaleOrdinal().domain(Object.keys(colorMap)).range(Object.values(colorMap)));

    
    let xTicks = $derived(xScale.ticks());
    let yTicks = $derived(yScale.ticks());

</script>

<div class="property">
    <label>
    x property
        <select bind:value={xProperty}>
            <option value="weight">Weight</option>
            <option value="length">Length</option>
        </select>
    </label>
</div>

<div bind:clientWidth={chartWidth} class="plot">
  <svg width={chartWidth} height={chartHeight}>
    <g style="transform: translate({margin.left}px, {margin.top}px);">
      <g style="transform: translate(0, {innerChartHeight}px);">
        <line stroke="black" stroke-width="4px" x1="0" x2={innerChartWidth} y1="0" y2="0" />
        {#each xTicks as tick}
          <text x={xScale(tick)} y={25}>{tick}</text>
        {/each}
        <text x={innerChartWidth/2} y={50}>{xProperty}</text>
      </g>
      <g>
        <line stroke="black" stroke-width="4px" x1="0" x2="0" y1={innerChartHeight} y2="0" />
        {#each yTicks as tick}
          <text y={yScale(tick)} x={-35}>{tick}</text>
        {/each}
        <text style="transform: translate(-65px, {innerChartHeight/2}px) rotate(-90deg);">{yProperty}</text>
      </g>
      {#each data as row}
        <circle fill={colorScale(row[colorProperty])} r="8px" cx={xScale(row[xProperty])} cy={yScale(row[yProperty])} />
      {/each}
    </g>
  </svg>
</div>

<style>
  :global(body) {
    background-color: rgb(52, 50, 50);
    color: white;
  }

  svg {
    background-color: white;
  }

  text {
    dominant-baseline: middle;
    text-anchor: middle;
  }

  circle {
    transition: all 500ms ease;
  }

  .plot {
    margin-bottom: 60px;
  }

  .property {
    margin-bottom: 10px;
    font-size: 2rem;
    margin-left: 10px;
  }

  .property select {
    font-size: 1.5rem;
  }
</style>