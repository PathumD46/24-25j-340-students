import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const metrics = [
  { name: 'Temperature', value: 24, color: '#ef4444', unit: '°C' },
  { name: 'Humidity', value: 85, color: '#3b82f6', unit: '%' },
  { name: 'Light Intensity', value: 450, color: '#eab308', unit: 'lux' },
  { name: 'CO2 Level', value: 800, color: '#84cc16', unit: 'ppm' },
  { name: 'Outside Temperature', value: 22, color: '#f97316', unit: '°C' },
  { name: 'Outside Humidity', value: 65, color: '#06b6d4', unit: '%' },
];

export default function Analytics() {
  const navigation: any = useNavigation();

  const [selectedMetric, setSelectedMetric] = useState<{
    name: string;
    value: number;
    color: string;
    unit: string;
  } | null>(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Dashboard</Text>
        <Text style={styles.subtitle}>Real-time cultivation metrics</Text>
      </View>

      <View style={styles.grid}>
        {metrics.map((metric) => (
          <TouchableOpacity
            key={metric.name}
            style={styles.card}
            onPress={() => navigation.navigate('analyticsHistory', { metric })}
          >
            <PieChart
              data={[
                {
                  name: metric.name,
                  population: metric.value,
                  color: metric.color,
                  legendFontColor: '#666',
                },
              ]}
              width={Dimensions.get('window').width / 2 - 30}
              height={100}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
              absolute
            />
            <Text style={styles.metricName}>{metric.name}</Text>
            <Text style={styles.metricValue}>
              {metric.value}
              {metric.unit}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#111',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  card: {
    width: Dimensions.get('window').width / 2 - 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f4f4f5',
  },
  metricName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#333',
    marginTop: 8,
  },
  metricValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#111',
    marginTop: 4,
  },
});
