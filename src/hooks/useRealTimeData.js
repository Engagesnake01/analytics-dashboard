import { useState, useEffect, useMemo } from 'react';
import { generateRealTimeData } from '../utils/dataGenerator';

const useRealTimeData = () => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial data load
    setRealTimeData(generateRealTimeData());
    setIsLoading(false);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeData(prev => {
        const newData = [...prev.slice(1)];
        const lastHour = parseInt(prev[prev.length - 1].time.split(':')[0]);
        const nextHour = (lastHour + 1) % 24;
        
        newData.push({
          time: nextHour + ':00',
          revenue: Math.floor(Math.random() * 5000) + 2000,
          users: Math.floor(Math.random() * 200) + 150,
          pageViews: Math.floor(Math.random() * 1000) + 500,
          conversion: (Math.random() * 5 + 2).toFixed(2)
        });
        
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate current stats
  const currentStats = useMemo(() => {
    if (!realTimeData.length) return {};
    
    const latest = realTimeData[realTimeData.length - 1];
    const previous = realTimeData[realTimeData.length - 2] || latest;
    
    return {
      revenue: {
        current: latest.revenue,
        change: ((latest.revenue - previous.revenue) / previous.revenue * 100).toFixed(1)
      },
      users: {
        current: latest.users,
        change: ((latest.users - previous.users) / previous.users * 100).toFixed(1)
      },
      pageViews: {
        current: latest.pageViews,
        change: ((latest.pageViews - previous.pageViews) / previous.pageViews * 100).toFixed(1)
      },
      conversion: {
        current: latest.conversion,
        change: ((latest.conversion - previous.conversion) / previous.conversion * 100).toFixed(1)
      }
    };
  }, [realTimeData]);

  return { realTimeData, currentStats, isLoading };
};

export default useRealTimeData;