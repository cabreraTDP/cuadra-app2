import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
  function Chart(dataGraph){
      const options = {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            }
          },
        };

        console.log("data",dataGraph)
        const datos = dataGraph["data"]
        const filter = dataGraph["filter"]

        const Months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const Days = [ ...Array(31).keys() ].map( i => i+1);
        let labels = []

        if(filter==="all"){
            labels = Months
        }else{
            labels = Days
        }

        const data = {
          labels,
          datasets: [
            {
              label: 'Ingresos',
              data: datos["ingresos"],
              backgroundColor: 'rgba(53, 162, 235, 1)',
            },
            {
              label: 'Gastos',
              data: datos["gastos"],
              backgroundColor: 'rgba(255, 99, 132, 1)',
            },
          ],
        };
  
      return(
        <div class="graph-container" style={{"height":"50vh", "width":"80vw"}}>
            <Bar  options={options} data={data} />
        </div>
  
      )
  }
  
  
  export default Chart