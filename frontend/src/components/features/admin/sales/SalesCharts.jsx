import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
} from "lucide-react";
import { adminApi } from "../../../../utils/adminApi";

const SalesCharts = () => {
  const [timePeriod, setTimePeriod] = useState("Today");
  const [categoriesSalesData, setCategoriesSalesData] = useState([]);
  const [totalCategoriesSales, setTotalCategoriesSales] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [metricsData, setMetricsData] = useState({
    totalRevenue: 0,
    netProfit: 0,
    totalOrders: 0,
  });
  const [loadingMetrics, setLoadingMetrics] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [loadingChart, setLoadingChart] = useState(false);
  const [topProducts, setTopProducts] = useState([]);
  const [loadingTopProducts, setLoadingTopProducts] = useState(false);

  // Fetch metrics, categories, and chart data based on time period
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMetrics(true);
        setLoadingCategories(true);
        setLoadingChart(true);
        setLoadingTopProducts(true);

        // Fetch metrics
        const metricsResponse = await adminApi.get(
          `/sales/metrics?period=${encodeURIComponent(timePeriod)}`
        );

        if (metricsResponse.success && metricsResponse.data) {
          setMetricsData({
            totalRevenue: metricsResponse.data.totalRevenue || 0,
            netProfit: metricsResponse.data.netProfit || 0,
            totalOrders: metricsResponse.data.totalOrders || 0,
          });
        }

        // Fetch categories
        const categoriesResponse = await adminApi.get(
          `/sales/categories?period=${encodeURIComponent(timePeriod)}`
        );

        if (categoriesResponse.success && categoriesResponse.data) {
          const categoriesData = categoriesResponse.data.categories || [];
          setCategoriesSalesData(categoriesData);
          setTotalCategoriesSales(categoriesResponse.data.totalSales || 0);
        } else {
          setCategoriesSalesData([]);
          setTotalCategoriesSales(0);
        }

        // Fetch chart data
        const chartResponse = await adminApi.get(
          `/sales/chart-data?period=${encodeURIComponent(timePeriod)}`
        );

        if (chartResponse.success && chartResponse.data) {
          setChartData(chartResponse.data.chartData || []);
        } else {
          setChartData([]);
        }

        // Fetch top products
        const topProductsResponse = await adminApi.get('/sales/top-products');

        if (topProductsResponse.success && topProductsResponse.data) {
          setTopProducts(topProductsResponse.data.products || []);
        } else {
          setTopProducts([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategoriesSalesData([]);
        setTotalCategoriesSales(0);
        setChartData([]);
        setTopProducts([]);
      } finally {
        setLoadingMetrics(false);
        setLoadingCategories(false);
        setLoadingChart(false);
        setLoadingTopProducts(false);
      }
    };

    fetchData();
  }, [timePeriod]);

  // Calculate max revenue for chart scaling
  const maxRevenue = chartData.length > 0
    ? Math.max(...chartData.map((d) => d.revenue), ...chartData.map((d) => d.profit)) || 1
    : 1;

  // Key metrics - dynamically populated from API
  const metrics = [
    {
      title: "Total Revenue",
      value: `Rs. ${metricsData.totalRevenue.toLocaleString("en-LK", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`,
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Net Profit",
      value: `Rs. ${metricsData.netProfit.toLocaleString("en-LK", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`,
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Total Orders",
      value: `${metricsData.totalOrders}`,
      icon: ShoppingBag,
      color: "from-purple-500 to-pink-600",
    },
  ];

  // Color palette for categories
  const colorPalette = [
    "from-red-500 to-orange-500",
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-orange-400",
    "from-indigo-500 to-blue-600",
    "from-pink-500 to-rose-500",
    "from-teal-500 to-green-600",
  ];

  // Calculate percentage for each category
  const categoriesWithPercentage =
    totalCategoriesSales > 0
      ? categoriesSalesData.map((cat, index) => ({
          ...cat,
          percentage:
            ((parseFloat(cat.total_sales) / totalCategoriesSales) * 100).toFixed(
              1
            ) || 0,
          color: colorPalette[index % colorPalette.length],
        }))
      : [];


  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Sales Analytics
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Comprehensive business performance overview
          </p>
        </div>
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="w-full sm:w-auto px-3 md:px-4 py-2 text-sm md:text-base bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
        >
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
          <option>Last 6 Months</option>
          <option>Last 12 Months</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden p-4 md:p-6"
          >
            <div
              className={`absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${metric.color} opacity-10 rounded-bl-full`}
            ></div>
            <div className="relative">
              <div
                className={`inline-flex p-2 md:p-3 bg-gradient-to-br ${metric.color} rounded-lg md:rounded-xl mb-3 md:mb-4`}
              >
                <metric.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <p className="text-xs md:text-sm text-gray-500 mb-1">
                {metric.title}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
                {metric.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue & Profit Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
            Revenue & Profit Trends ({timePeriod})
          </h3>

          {loadingChart ? (
            <div className="flex items-center justify-center h-48 md:h-64 lg:h-80">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            </div>
          ) : chartData.length > 0 ? (
            <>
              <div className="relative">
                {/* Y-axis labels */}
                <div className="flex gap-2">
                  <div className="w-16 flex flex-col justify-between text-right pr-2 text-xs md:text-sm text-gray-500">
                    <span>Rs.{Math.ceil(maxRevenue).toLocaleString("en-LK")}</span>
                    <span>Rs.{Math.ceil(maxRevenue * 0.75).toLocaleString("en-LK")}</span>
                    <span>Rs.{Math.ceil(maxRevenue * 0.5).toLocaleString("en-LK")}</span>
                    <span>Rs.{Math.ceil(maxRevenue * 0.25).toLocaleString("en-LK")}</span>
                    <span>Rs.0</span>
                  </div>

                  {/* Chart area */}
                  <div className="flex-1">
                    {/* Horizontal grid lines */}
                    <div className="relative h-48 md:h-64 lg:h-80 border-l-2 border-b-2 border-gray-300">
                      {[0, 0.25, 0.5, 0.75, 1].map((level, idx) => (
                        <div
                          key={idx}
                          className="absolute w-full border-t border-gray-200"
                          style={{ bottom: `${level * 100}%` }}
                        ></div>
                      ))}

                      {/* Bars */}
                      <div className="absolute inset-0 flex items-end justify-between gap-2 md:gap-3 px-1 md:px-2 overflow-x-auto">
                        {chartData.map((data, index) => (
                          <div
                            key={index}
                            className="flex-1 flex flex-col items-center justify-end gap-0 min-w-fit"
                          >
                            {/* Bar group container */}
                            <div className="flex items-end justify-center gap-1 md:gap-1.5">
                              {/* Revenue bar */}
                              <div className="relative group">
                                <div
                                  className="w-2 md:w-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:from-blue-600 hover:to-blue-500"
                                  style={{ height: `${(data.revenue / maxRevenue) * (window.innerHeight > 768 ? 280 : window.innerHeight > 640 ? 240 : 180)}px` }}
                                >
                                  <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    Revenue: Rs. {data.revenue.toLocaleString("en-LK")}
                                    <br />
                                    Profit: Rs. {data.profit.toLocaleString("en-LK")}
                                    <br />
                                    Orders: {data.orders}
                                  </div>
                                </div>
                              </div>

                              {/* Profit bar */}
                              <div className="relative group">
                                <div
                                  className="w-2 md:w-3 bg-gradient-to-t from-green-500 to-green-400 rounded-t transition-all hover:from-green-600 hover:to-green-500"
                                  style={{ height: `${(data.profit / maxRevenue) * (window.innerHeight > 768 ? 280 : window.innerHeight > 640 ? 240 : 180)}px` }}
                                >
                                  <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    Revenue: Rs. {data.revenue.toLocaleString("en-LK")}
                                    <br />
                                    Profit: Rs. {data.profit.toLocaleString("en-LK")}
                                    <br />
                                    Orders: {data.orders}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* X-axis label */}
                            <span className="text-xs md:text-sm text-gray-600 font-medium mt-2 text-center">
                              {data.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-400 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-green-400 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Profit</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-48 md:h-64 lg:h-80">
              <p className="text-gray-500">No data available for this period</p>
            </div>
          )}
        </motion.div>

        {/* Sales by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
            Sales by Category
          </h3>

          {loadingCategories ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            </div>
          ) : categoriesWithPercentage.length > 0 ? (
            <>
              <div className="space-y-4">
                {categoriesWithPercentage.map((cat, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {cat.name || `Category ${index + 1}`}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        Rs. {parseFloat(cat.total_sales || 0).toLocaleString("en-LK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 bg-gradient-to-r ${cat.color} rounded-full transition-all duration-500`}
                        style={{ width: `${cat.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Rs.{" "}
                      {parseFloat(cat.total_sales || 0).toLocaleString(
                        "en-LK",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Total Categories Sales</p>
                <p className="text-2xl font-bold text-gray-900">
                  Rs.{" "}
                  {parseFloat(totalCategoriesSales || 0).toLocaleString(
                    "en-LK",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No category sales data available</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Top Products */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {/* Top Performing Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
            Top Performing Products
          </h3>
          {loadingTopProducts ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            </div>
          ) : topProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-600">
                      Rank
                    </th>
                    <th className="text-left py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-600">
                      Product Name
                    </th>
                    <th className="text-center py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-600 hidden sm:table-cell">
                      Sold Qty
                    </th>
                    <th className="text-right py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-600 hidden md:table-cell">
                      Revenue
                    </th>
                    <th className="text-right py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-600">
                      Profit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-2 md:py-3">
                        <div
                          className={`w-6 h-6 md:w-8 md:h-8 rounded-lg ${
                            index === 0
                              ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                              : index === 1
                              ? "bg-gradient-to-br from-gray-300 to-gray-400"
                              : index === 2
                              ? "bg-gradient-to-br from-orange-400 to-orange-600"
                              : "bg-gradient-to-br from-blue-400 to-blue-600"
                          } flex items-center justify-center text-white font-bold text-xs md:text-sm`}
                        >
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900 truncate max-w-[120px] md:max-w-none">
                        {product.name}
                      </td>
                      <td className="text-center py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">
                        {product.sold_quantity}
                      </td>
                      <td className="text-right py-2 md:py-3 text-xs md:text-sm font-bold text-gray-900 hidden md:table-cell whitespace-nowrap">
                        Rs. {product.total_revenue.toLocaleString("en-LK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </td>
                      <td className="text-right py-2 md:py-3 text-xs md:text-sm font-bold text-green-600 whitespace-nowrap">
                        Rs. {product.total_profit.toLocaleString("en-LK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No product data available</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SalesCharts;
