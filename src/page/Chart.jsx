import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      donutSeries: [15, 20, 60, 120, 90],
      donutOptions: {
        chart: {
          width: 380,
          type: 'donut',
        },
        
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: 'gradient',
        },
        legend: {
          formatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
          },
        },
        title: {
          text: 'Cooking time for all ',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },

      areaSeries: [
        {
          name: 'Плов',
          data: [
            { x: 1996, y: 322 },
            { x: 1997, y: 324 },
            { x: 1998, y: 329 },
            { x: 1999, y: 342 },
            { x: 2000, y: 348 },
            { x: 2001, y: 334 },
            { x: 2002, y: 325 },
            { x: 2003, y: 316 },
            { x: 2004, y: 318 },
            { x: 2005, y: 330 },
            { x: 2006, y: 355 },
            { x: 2007, y: 366 },
            { x: 2008, y: 337 },
            { x: 2009, y: 352 },
            { x: 2010, y: 377 },
            { x: 2011, y: 383 },
            { x: 2012, y: 344 },
            { x: 2013, y: 366 },
            { x: 2014, y: 389 },
            { x: 2015, y: 334 },
          ],
        },
        {
          name: 'Паста',
          data: [
            { x: 1996, y: 162 },
            { x: 1997, y: 90 },
            { x: 1998, y: 50 },
            { x: 1999, y: 77 },
            { x: 2000, y: 35 },
            { x: 2001, y: -45 },
            { x: 2002, y: -88 },
            { x: 2003, y: -120 },
            { x: 2004, y: -156 },
            { x: 2005, y: -123 },
            { x: 2006, y: -88 },
            { x: 2007, y: -66 },
            { x: 2008, y: -45 },
            { x: 2009, y: -29 },
            { x: 2010, y: -45 },
            { x: 2011, y: -88 },
            { x: 2012, y: -132 },
            { x: 2013, y: -146 },
            { x: 2014, y: -169 },
            { x: 2015, y: -184 },
          ],
        },
      ],
      areaOptions: {
        chart: {
          type: 'area',
          height: 350,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Area with Negative Values',
          align: 'left',
          style: {
            fontSize: '14px',
          },
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          tickAmount: 4,
          floating: false,
          labels: {
            style: {
              colors: '#8e8da4',
            },
            offsetY: -7,
            offsetX: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        fill: {
          opacity: 0.5,
        },
        tooltip: {
          x: {
            format: 'yyyy',
          },
          fixed: {
            enabled: false,
            position: 'topRight',
          },
        },
        grid: {
          yaxis: {
            lines: {
              offsetX: -30,
            },
          },
          padding: {
            left: 20,
          },
        },
      },

      barSeries: [
        {
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        },
      ],
      barOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            'Пад Тай (Таиланд):',
            'Фондю (Швейцария):',
            'Карри (Индия):',
            'Таджин (Марокко):',
            'Суши (Япония):',
            'Пельмени (Россия):',
            'Гуляш (Венгрия):',
            'Паэлья (Испания):',
            'Паста Карбонара (Италия)',
            'Плов (Узбекистан) :',
          ],
        },
      },
    };
  }

  render() {
    return (
      <div className='container-custom'>
        <div id="chart">
          <h2>Donut Chart</h2>
          <ReactApexChart
            options={this.state.donutOptions}
            series={this.state.donutSeries}
            type="donut"
            width={380}
          />
        </div>
        <div id="chart">
          <h2>Area Chart</h2>
          <ReactApexChart
            options={this.state.areaOptions}
            series={this.state.areaSeries}
            type="area"
            height={350}
          />
        </div>
        <div id="chart">
          <h2>Most Popular Food</h2>
          <ReactApexChart
            options={this.state.barOptions}
            series={this.state.barSeries}
            type="bar"
            height={350}
          />
        </div>
      </div>
    );
  }
}

export default ApexChart;
