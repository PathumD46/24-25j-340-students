import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { TriangleAlert } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit'; // Import charting library
import { Dimensions } from 'react-native'; // For responsive chart width

export default function AnalyticsHistory() {
  const navigation = useNavigation();
  const route = useRoute();
  const [temperatureData, setTemperatureData] = useState<
    { time: string; temperature: number }[]
  >([
    { time: '2025-03-15', temperature: 0 },
    { time: '2025-03-16', temperature: 0 },
    { time: '2025-03-17', temperature: 0 },
    { time: '2025-03-18', temperature: 0 },
    { time: '2025-03-19', temperature: 0 },
    { time: '2025-03-20', temperature: 0 },
  ]);

  useEffect(() => {
    // Example: Fetching or generating temperature history data
    const fetchTemperatureData = () => {
      // Replace with real data fetching logic
      setTemperatureData([
        { time: '2025-03-15', temperature: 22 },
        { time: '2025-03-16', temperature: 24 },
        { time: '2025-03-17', temperature: 21 },
        { time: '2025-03-18', temperature: 23 },
        { time: '2025-03-19', temperature: 25 },
        { time: '2025-03-20', temperature: 26 },
      ]);
    };

    fetchTemperatureData();
  }, []);

  const chartData = {
    labels: temperatureData.map((item) => item.time), // Time labels
    datasets: [
      {
        data: temperatureData.map((item) => item.temperature), // Temperature data
        strokeWidth: 2, // Line thickness
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.diseaseIdentified}>Temperature History</Text>

        {/* Temperature Line Chart */}
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 32} // Dynamic width based on screen size
          height={220} // Height of the chart
          chartConfig={{
            backgroundColor: '#f9fafb', // Match background color
            backgroundGradientFrom: '#f9fafb', // Match background gradient
            backgroundGradientTo: '#f9fafb', // Match background gradient
            decimalPlaces: 2, // Show 2 decimal places for temperature
            color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`, // Match green theme
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#f9fafb', // Match background color for dot stroke
            },
          }}
          bezier // Smooth line
          style={styles.chart}
        />
        {/* Logs Section */}
        <View style={{ marginTop: 16, width: '100%' }}>
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 18,
              marginBottom: 8,
            }}
          >
            Logs:
          </Text>
          {temperatureData.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: index % 2 === 0 ? '#f1f5f9' : '#e2e8f0',
                borderRadius: 8,
                marginBottom: 8,
              }}
            >
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14 }}>
                {item.time}
              </Text>
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14 }}>
                {item.temperature}°C
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // Light background color for the page
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 8,
  },
  backButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#22c55e', // White text on the back button
    marginLeft: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    overflow: 'scroll',
  },
  diseaseIdentified: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    color: '#ef4444',
  },
  chart: {
    marginVertical: 16,
    borderRadius: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22c55e', // Green color for save button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 8, // Space between buttons
  },
  buttonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff', // White text on the button
  },
});
