const menuTriggers = $('.menu-trigger');
[...menuTriggers].map((trigger) => {
  trigger.addEventListener('click', ({ target }) => {
    const menuWrapper = target.closest('.menu-wrapper');
    menuWrapper.classList.toggle('expanded');
  });
});

$(document).ready(function(){
  $('#three_stripes_btn').click(function(event){
      $('.sidebar').toggleClass('closed');
      $('.content').toggleClass('moved');
      $('.menu-wrapper').toggleClass('expanded');
  })
})

const COLORS = {
  borderColor: '#f2f6fc',
  blue: '#6b5bef',
  purple: '#c062d4',
  yellow: '#acc236'
};

let ctx = document.querySelector('#ProjectActivityChart').getContext('2d');
let PAChart= new Chart(ctx, {
    type:'line',
    data:{
      labels:['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets:[{
        label: 'My First dataset',
        borderColor: COLORS.borderColor,
        backgroundColor: 'rgb(196,88,80,0.7)',
        tension:0.5,
        fill: true,
        data: [],
        pointRadius:[0,7,7,7,7,7,0],
        
        pointBackgroundColor: 'gray',
      }, {
        label: 'My Second dataset',
        borderColor: COLORS.borderColor,
        backgroundColor: COLORS.blue,
        fill: true,
        tension:0.5,
        data: [],
        pointRadius: 1,
        pointBackgroundColor: 'white',
      }],
    },
    options:{
      responsive: true,
      tooltips: {
        mode: 'index',
      },
      hover: {
        mode: 'index'
      },
      scales: {
        y: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
})


let ctxx = document.querySelector('#ManagersActivityChart').getContext('2d');
let MAChart= new Chart(ctxx, {
    type:'bar',
    data:{
      labels: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','20','21','22','23', '24','25','26','27','28', '29', '30'],
      datasets: [{
        label: 'My First Dataset',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.9)',
        hoverBackgroundColor:'rgba(222, 22, 52,1)',
        borderWidth: 1
      }]
    },

    options: {
      plugins: {
        legend: {
          display: false
        }
      },

      scales: {
        y: {
          beginAtZero: true,
          display: false,
          gridLines: {
            display: false
          }
        },
        x: {
          gridLines: {
            display: false
          }
        }
      }

    },
})

let ctxxx = document.querySelector('#VisitsChart').getContext('2d');
ctxxx.canvas.parentNode.style.height = '394px';
let VisitChart= new Chart(ctxxx, {
  type:'doughnut',
  data: {
    labels: ["Views", "Users", "Purchases"],
    datasets: [
        {
            label: "Visits",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
            data: [],
        }
    ]
  },
  options: {
    title: {
        display: true,
        text: 'Visits'
    },
    maintainAspectRatio:false,
}
})

$.ajax("./data.json").done(function(responce){
    PAChart.data.datasets[0].data = responce.PAChart1;
    PAChart.data.datasets[1].data = responce.PAChart2;
    PAChart.update();
    MAChart.data.datasets[0].data = responce.MAData;
    MAChart.update();
    VisitChart.data.datasets[0].data = responce.VisitsData;
    VisitChart.update();
});