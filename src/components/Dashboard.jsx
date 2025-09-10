import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, DollarSign, Eye, Globe, Clock, Filter, Zap } from 'lucide-react';

import StatCard from './StatCard';
import CustomTooltip from './CustomTooltip';
import LoadingSpinner from './LoadingSpinner';
import useRealTimeData from '../hooks/useRealTimeData';
import { geoData, deviceData } from '../data/mockData';
import { formatNumber } from '../utils/formatters';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const { realTimeData, currentStats, isLoading } = useRealTimeData();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Real-time insights and performance metrics</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={formatNumber(currentStats.revenue?.current)}
            change={currentStats.revenue?.change}
            icon={DollarSign}
            color="bg-green-500"
          />
          <StatCard
            title="Active Users"
            value={formatNumber(currentStats.users?.current)}
            change={currentStats.users?.change}
            icon={Users}
            color="bg-blue-500"
          />
          <StatCard
            title="Page Views"
            value={formatNumber(currentStats.pageViews?.current)}
            change={currentStats.pageViews?.change}
            icon={Eye}
            color="bg-purple-500"
          />
          <StatCard
            title="Conversion Rate"
            value={currentStats.conversion?.current + '%'}
            change={currentStats.conversion?.change}
            icon={TrendingUp}
            color="bg-orange-500"
          />
        </div>

        {/* Main Chart */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <select 
                value={selectedMetric} 
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="revenue">Revenue</option>
                <option value="users">Users</option>
                <option value="pageViews">Page Views</option>
              </select>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Geographic Distribution */}
          <div className="chart-container">
            <div className="flex items-center mb-4">
              <Globe className="text-purple-500 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Top Countries</h3>
            </div>
            <div className="space-y-4">
              {geoData.map((item) => (
                <div key={item.country} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700 text-sm">{item.country}</span>
                  </div>
                  <span className="text-gray-900 font-medium">
                    {formatNumber(item.users)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="chart-container">
            <div className="flex items-center mb-4">
              <Zap className="text-blue-500 mr-2" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Device Types</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-2">
              {deviceData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name} {item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="chart-container">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'New user registration', time: '2 min ago', type: 'user' },
                { action: 'Purchase completed', time: '5 min ago', type: 'sale' },
                { action: 'Page view spike detected', time: '12 min ago', type: 'alert' },
                { action: 'New feature deployed', time: '1 hour ago', type: 'system' },
                { action: 'Weekly report generated', time: '2 hours ago', type: 'report' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      activity.type === 'user' ? 'bg-blue-500' :
                      activity.type === 'sale' ? 'bg-green-500' :
                      activity.type === 'alert' ? 'bg-orange-500' :
                      activity.type === 'system' ? 'bg-purple-500' : 'bg-gray-500'
                    }`} />
                    <span className="text-gray-700 text-sm">{activity.action}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;