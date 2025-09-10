export const generateRealTimeData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now - i * 60 * 60 * 1000);
    data.push({
      time: time.getHours() + ':00',
      revenue: Math.floor(Math.random() * 5000) + 2000,
      users: Math.floor(Math.random() * 200) + 150,
      pageViews: Math.floor(Math.random() * 1000) + 500,
      conversion: (Math.random() * 5 + 2).toFixed(2)
    });
  }
  
  return data;
};