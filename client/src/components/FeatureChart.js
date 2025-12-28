import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';

import styled from 'styled-components';
import { theme } from '../styles';
const { fonts } = theme;

const properties = [
  'acousticness',
  'danceability',
  'energy',
  'instrumentalness',
  'liveness',
  'speechiness',
  'valence',
];

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;

  #chart {
    margin: 0 auto;
    margin-top: -30px;
  }
`;

const FeatureChart = props => {
  const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const createDataset = features => {
      const dataset = {};
      properties.forEach(prop => {
        dataset[prop] = features.length
          ? avg(features.map(feat => feat && feat[prop]))
          : features[prop];
      });
      return dataset;
    };

    const createChart = dataset => {
      const { type } = props;
      const ctx = canvasRef.current;
      
      if (!ctx) return;

      // Destroy existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const labels = Object.keys(dataset);
      const data = Object.values(dataset);

      chartRef.current = new Chart(ctx, {
        type: type || 'bar',
        data: {
          labels,
          datasets: [
            {
              label: '',
              data,
              backgroundColor: type === 'radar' 
                ? 'rgba(98, 177, 246, 0.3)'
                : [
                    'rgba(98, 177, 246, 0.7)',
                    'rgba(40, 144, 195, 0.7)',
                    'rgba(98, 177, 246, 0.7)',
                    'rgba(40, 144, 195, 0.7)',
                    'rgba(98, 177, 246, 0.7)',
                    'rgba(40, 144, 195, 0.7)',
                    'rgba(98, 177, 246, 0.7)',
                  ],
              borderColor: type === 'radar'
                ? 'rgba(98, 177, 246, 1)'
                : [
                    'rgba(98, 177, 246, 1)',
                    'rgba(40, 144, 195, 1)',
                    'rgba(98, 177, 246, 1)',
                    'rgba(40, 144, 195, 1)',
                    'rgba(98, 177, 246, 1)',
                    'rgba(40, 144, 195, 1)',
                    'rgba(98, 177, 246, 1)',
                  ],
              borderWidth: 2,
              pointBackgroundColor: 'rgba(255, 255, 255, 1)',
              pointBorderColor: 'rgba(98, 177, 246, 1)',
              pointRadius: type === 'radar' ? 4 : 0,
            },
          ],
        },
        options: {
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          title: {
            display: true,
            text: `Audio Features`,
            fontSize: 18,
            fontFamily: `${fonts.primary}`,
            fontColor: '#ffffff',
            padding: 30,
          },
          legend: {
            display: false,
          },
          scales: type === 'radar' ? {
            r: {
              beginAtZero: true,
              max: 1,
              ticks: {
                stepSize: 0.2,
                display: false,
                backdropColor: 'transparent',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
              },
              pointLabels: {
                color: '#9B9B9B',
                font: {
                  size: 12,
                  family: fonts.primary,
                },
              },
              angleLines: {
                color: 'rgba(255, 255, 255, 0.1)',
              },
            },
          } : {
            y: {
              beginAtZero: true,
              max: 1,
              ticks: {
                stepSize: 0.2,
                fontColor: '#9B9B9B',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
                drawBorder: false,
              },
            },
            x: {
              ticks: {
                fontColor: '#9B9B9B',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
                drawBorder: false,
              },
            },
          },
        },
      });
    };

    const parseData = () => {
      const { features } = props;
      if (!features) return;
      const dataset = createDataset(features);
      createChart(dataset);
    };

    parseData();

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [props.features, props.type]);

  return (
    <Container>
      <canvas ref={canvasRef} width="400" height="400" />
    </Container>
  );
};

FeatureChart.propTypes = {
  features: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  type: PropTypes.string,
};

export default FeatureChart;
