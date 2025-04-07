import { Tabs } from 'expo-router';
import { ChartBar as BarChart2, Gauge, Bug, Timer } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f4f4f5',
        },
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#71717a',
      }}
    >
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, size }) => (
            <BarChart2 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="control"
        options={{
          title: 'Control',
          tabBarIcon: ({ color, size }) => <Gauge size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="disease"
        options={{
          title: 'Disease',
          tabBarIcon: ({ color, size }) => <Bug size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="maturity"
        options={{
          title: 'Maturity',
          tabBarIcon: ({ color, size }) => <Timer size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
