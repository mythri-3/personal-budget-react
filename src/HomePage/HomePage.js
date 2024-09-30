import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';

const HomePage = () => {
    const [budget, setBudget] = useState({
        labels: [],
        datasets: [{
            label: 'My First Dataset',
            data: [],
            backgroundColor: []
        }]
    });

    useEffect(() => {
        getBudget();
        getChartUsingD3JS();
        getChart();
    }, []);

    const createDoughnut = () => {
        const ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
            type: 'doughnut',
            data: budget,
            options: {
                cutout: '40%',
                responsive: false,
                maintainAspectRatio: false,
            },
        });
    };

    // Fetch budget data from server and create the Chart.js doughnut chart
    function getBudget() {
        axios.get('http://localhost:3000/budget')
            .then(function (res) {
                console.log("Fetched Budget Data:", res.data); // Log the data
                for (var i = 0; i < res.data.myBudget.length; i++) {
                    budget.datasets[0].data[i] = res.data.myBudget[i].budget;
                    budget.datasets[0].backgroundColor[i] = res.data.myBudget[i].color;
                    budget.labels[i] = res.data.myBudget[i].title;
                }
                createDoughnut();
            })
            .catch(function (error) {
                console.error('Error fetching budget data:', error);
            });
    }

     // Function to create bar chart using D3.js
     function getChartUsingD3JS() {
        axios.get('http://localhost:3000/budget')
            .then(function (res) {
                const budgetData = res.data.myBudget;
                console.log("D3 Budget Data:", budgetData); // Log D3 Data

                const margin = { top: 50, right: 30, bottom: 40, left: 40 },
                    width = 800 - margin.left - margin.right,
                    height = 400 - margin.top - margin.bottom;

                const svg = d3.select('#chart')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`);

                const x = d3.scaleBand()
                    .range([0, width])
                    .padding(0.4)
                    .domain(budgetData.map(d => d.title));

                const y = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, d3.max(budgetData, d => d.budget)]);

                svg.selectAll('rect')
                    .data(budgetData)
                    .enter().append('rect')
                    .attr('x', d => x(d.title))
                    .attr('y', d => y(d.budget))
                    .attr('width', x.bandwidth())
                    .attr('height', d => height - y(d.budget))
                    .attr('fill', d => d.color);

                svg.append('g')
                    .attr('class', 'x-axis')
                    .attr('transform', `translate(0, ${height})`)
                    .call(d3.axisBottom(x));

                svg.append('g')
                    .attr('class', 'y-axis')
                    .call(d3.axisLeft(y));

                svg.selectAll('.label')
                    .data(budgetData)
                    .enter().append('text')
                    .attr('class', 'label')
                    .attr('x', d => x(d.title) + x.bandwidth() / 2)
                    .attr('y', d => y(d.budget) - 5)
                    .attr('text-anchor', 'middle')
                    .text(d => d.budget);

                svg.append('text')
                    .attr('x', width / 2)
                    .attr('y', -margin.top / 2)
                    .attr('text-anchor', 'middle')
                    .style('font-size', '20px')
                    .text('Budget by Category');
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
    }

    // Function to create a Pie Chart using Chart.js (Different data)
    function getChart() {
        axios.get('http://localhost:3000/chart')
            .then(function (res) {
                console.log("Pie Chart Data:", res.data.myBudget); // Log Pie Data

                const pieData = res.data.myBudget;
                const width = 200;
                const height = 200;
                const radius = Math.min(width, height) / 2;

                const svg = d3.select("#chart-container")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", `translate(${width / 2},${height / 2})`);

                const color = d3.scaleOrdinal()
                    .domain(pieData.map(d => d.title))
                    .range(pieData.map(d => d.color));

                const pie = d3.pie()
                    .value(d => d.budget);

                const path = d3.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);  // Set inner radius to 0 for a pie chart

                const arcs = svg.selectAll(".arc")
                    .data(pie(pieData))
                    .enter().append("g")
                    .attr("class", "arc");

                arcs.append("path")
                    .attr("d", path)
                    .attr("fill", d => color(d.data.title));

                arcs.append("text")
                    .attr("transform", d => `translate(${path.centroid(d)})`)
                    .attr("dy", "0.35em")
                    .text(d => d.data.title);
            })
            .catch(function (error) {
                console.error("Error loading data:", error);
            });
    }

    return (
        <main className="center" id="main">
            <div className="page-area">
            <article role="article">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article class="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article class="text-box">
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
    
            <article class="text-box">
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>
    
            <article class="text-box">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>
    
            <article class="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>
    
            <article class="text-box">
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>
            <article class="text-box">
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>
                <h1>Personal Budget - Canvas(Doughnut)</h1>
                <p>
                    <canvas id="myChart" width="800" height="300"></canvas>
                </p>
                <h1>Personal Budget - Chart(Bar Graph)</h1>
                <svg id="chart" width="500" height="500"></svg>
                <button onClick={getChart}>Change Data for D3JS chart</button>
                <h1>Chart using D3JS</h1>
                <svg id="chart-container" width="500" height="500"></svg>
            </div>
        </main>
    );
}

export default HomePage;
