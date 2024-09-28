import React from'react';


function HomePage() {
  return (
    <div className="container center">
    
    <div className="page-area" id="main body"> 
        
        <section class="text-box">
            <h1>Stay on track</h1>
            <p>
                Do you know where you are spending your money? If you really stop to track it down,
                you would get surprised! Proper budget management depends on real data... and this
                app will help you with that!
            </p>
        </section>

        <section class="text-box">
            <h1>Alerts</h1>
            <p>
                What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
            </p>
        </section>

        <section class="text-box">
            <h1>Results</h1>
            <p>
                People who stick to a financial plan, budgeting every expense, get out of debt faster!
                Also, they to live happier lives... since they expend without guilt or fear... 
                because they know it is all good and accounted for.
            </p>
        </section>

        <section class="text-box">
            <h1>Free</h1>
            <p>
                This app is free!!! And you are the only one holding your data!
            </p>
        </section>

        <section class="text-box">
            <h1>Stay on track</h1>
            <p>
                Do you know where you are spending your money? If you really stop to track it down,
                you would get surprised! Proper budget management depends on real data... and this
                app will help you with that!
            </p>
        </section>

        <section class="text-box">
            <h1>Alerts</h1>
            <p>
                What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
            </p>
        </section>

        <section class="text-box">
            <h1>Results</h1>
            <p>
                People who stick to a financial plan, budgeting every expense, get out of debt faster!
                Also, they to live happier lives... since they expend without guilt or fear... 
                because they know it is all good and accounted for.
            </p>
        </section>

        <section class="text-box">
            <h1>Free</h1>
            <p>
                This app is free!!! And you are the only one holding your data!
                
            </p>
        </section>   
            
            <h1>Personal Budget - Canvas(Doughnut) </h1>
            <canvas id="myChart" width="500" height="300"></canvas>
            <h1>Personal Budget - Chart(Bar Graph)</h1>
            <h2>Budget by Category</h2>
            <svg id="chart" width="500" height="500"></svg>
            <button onclick="getChart()">Change Data for D3JS chart</button>
            <h1>Chart using D3JS</h1>
            <svg id="chart-container" width="400" height="400"></svg>
    </div>

</div>
  );
}


export default HomePage;
