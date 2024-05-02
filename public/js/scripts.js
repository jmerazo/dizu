function fetchDataAndRenderChart() {
    // Suponiendo que obtienes tus datos así
    fetch('/api/report/documentxdependencies')
        .then(response => response.json())
        .then(data => {
            // Supongamos que data es un array de objetos { nombre_unidad_adtiva_destino: 'A', cantidad: 10 }
            const labels = data.map(item => item.nombre_unidad_adtiva_destino);
            const dataValues = data.map(item => item.cantidad);

            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'PQRSD radicadas por área',
                        data: dataValues,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
    .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndRenderChart();
    console.log('i am here logout')
    document.getElementById('logoutButton').addEventListener('click', function() {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => {
            console.log('response', response)
            if (response.redirected) {
                window.location.href = response.url;
            }
        })
        .catch(error => console.error('Error:', error));
    });
});