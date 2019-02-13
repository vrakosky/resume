var ctx = document.getElementById("cs");
var data = {
  labels: "UNIX/Shell, HTML5/CSS3, jQuery/PhP, MySQL, MongoDB, Python, Spark via Datacamp, AngularJS+SpringBoot, OSI via Cisco, TCP/IP, Image Processing, AI using Keras, Docker, Android, Swift for iOS, C/C++/C#, Java".split(","),
  datasets: [{
    label: "Ability",
    backgroundColor: "rgba(179,181,198,0.2)",
    borderColor: "#3385FF",
    pointBackgroundColor: "#3385FF",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#3385FF",
    pointHoverBorderColor: "#3385FF",
    data: [80, 60, 95, 85, 50, 80, 89, 89, 75, 60, 70, 75, 80, 92, 70, 60, 92]
  }]
};
var myRadarChart = new Chart(ctx, {
  type: 'radar',
  data: data,
  options: {
    scale: {
      responsive: true,
      ticks: {
        min: 0,
        max: 100
      },
      lineArc: false,
      pointLabels: {
        fontSize: 14
      },
    },
    legend: {
      display: false
    },
  }
});