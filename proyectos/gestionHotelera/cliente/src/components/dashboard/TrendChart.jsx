import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper } from '@mui/material';
import Chart from 'chart.js/auto';

function TrendChart({ data, title, type = 'line', labelKey, valueKey }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    // Destruir gráfico anterior si existe
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    const labels = data.map(item => item[labelKey]);
    const values = data.map(item => parseFloat(item[valueKey]) || 0);

    chartInstance.current = new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: values,
          backgroundColor: type === 'bar' 
            ? 'rgba(211, 167, 85, 0.7)'
            : 'rgba(211, 167, 85, 0.2)',
          borderColor: 'rgb(211, 167, 85)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            cornerRadius: 8,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                if (valueKey.includes('Facturado') || valueKey.includes('total')) {
                  return `${label}: $${value.toLocaleString('es-CR', { minimumFractionDigits: 2 })}`;
                }
                return `${label}: ${value}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                if (valueKey.includes('Facturado') || valueKey.includes('total')) {
                  return '$' + value.toLocaleString('es-CR');
                }
                return value;
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title, type, labelKey, valueKey]);

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="textSecondary">No hay datos disponibles</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#333' }}>
        {title}
      </Typography>
      <Box sx={{ height: '300px', position: 'relative' }}>
        <canvas ref={chartRef}></canvas>
      </Box>
    </Paper>
  );
}

TrendChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['line', 'bar']),
  labelKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired
};

export default TrendChart;