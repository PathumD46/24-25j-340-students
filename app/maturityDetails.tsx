import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Camera as CameraIcon, X } from 'lucide-react-native';
import { TriangleAlert } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit'; // Import chart library

export default function MaturityDetails() {
  const [showCamera, setShowCamera] = useState(false);

  const [maturityHistory, setMaturityHistory] = useState([
    { date: '2025-03-01', stage: 0 },
    { date: '2025-03-05', stage: 25 },
    { date: '2025-03-10', stage: 50 },
    // Add more history records here
  ]);

  const route = useRoute();
  const navigation = useNavigation();
  // const { mushroomId } = route.params; // Assuming mushroomId is passed as a parameter

  // Mock data for maturity chart
  const data = {
    labels: maturityHistory.map((record) => record.date),
    datasets: [
      {
        data: maturityHistory.map((record) => record.stage),
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
      },
    ],
  };

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowCamera(false)}
          >
            <X color="#fff" size={24} />
          </TouchableOpacity>
          <View style={styles.cameraContent}>
            <Text style={styles.cameraText}>
              Position the mushroom in frame
            </Text>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={() => {
                setShowCamera(false);
                Alert.alert(
                  'Growth Stage Confirmation',
                  'Mushroom has grown 50%. Do you want to save this record?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Save',
                      onPress: () => console.log('Growth stage saved'),
                    },
                  ]
                );
              }}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.container}>
        {/* Back Button at Top Left */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {/* Maturity Stage History Chart */}
        <Text style={styles.diseaseName}>Growth History</Text>
        <LineChart
          data={data}
          width={320} // Set the chart width
          height={220} // Set the chart height
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: '#f9fafb',
            backgroundGradientFrom: '#f9fafb',
            backgroundGradientTo: '#f9fafb',
            decimalPlaces: 0, // Hide decimal places
            color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#22c55e',
            },
          }}
          bezier
        />

        {/* Date and Stage Details */}
        <Text style={styles.dateText}>
          Last Updated: {maturityHistory[maturityHistory.length - 1].date}
        </Text>

        {/* Previous Record/Follow-Up Button */}
        <Text style={styles.solutionsTitle}>Previous Growth Records</Text>
        {maturityHistory.map((record, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recordItem}
            onPress={() =>
              console.log(`View details for Growth Stage ${index + 1}`)
            }
          >
            <Text style={styles.recordText}>Growth Stage {index + 1}</Text>
            <Text style={styles.dateText}>{record.date}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowCamera(true)}
        >
          <CameraIcon color="#fff" size={24} />
          <Text style={styles.addButtonText}>Add New Record</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => {
            Alert.alert(
              'Warning',
              'Are you sure you want to reset the growth history?',
              [
                { text: 'Cancel' },
                {
                  text: 'Reset',
                  onPress: () => console.log('Growth history reset'),
                },
              ]
            );
          }}
        >
          <TriangleAlert color="#fff" size={24} />
          <Text style={styles.buttonText}>Reset Growth</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#f9fafb', // Light background color for the page
    padding: 16,
    width: '100%',
  },
  content: {
    alignItems: 'center', // Centering the content horizontally
    justifyContent: 'flex-start', // Aligning items to the start vertically
    paddingVertical: 24,
    overflow: 'scroll',
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
  diseaseIdentified: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    color: '#ef4444',
  },
  image: {
    width: '80%',
    height: 250,
    marginBottom: 16,
    borderRadius: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    alignSelf: 'center',
  },
  diseaseName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 28,
    marginBottom: 12,
    textAlign: 'center',
    color: '#111',
  },
  dateText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#888', // Slightly lighter color for the date
  },
  solutionsTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20, // Increased size for clarity
    marginBottom: 8,
    marginTop: 20, // Added space between sections
    color: '#111',
  },
  solutionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    marginBottom: 8,
    color: '#555', // Slightly lighter color for readability
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
  recordItem: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  recordText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#111',
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    padding: 16,
    backgroundColor: '#22c55e',
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  buttonDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 16,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  cameraContent: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    padding: 20,
  },
  cameraText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'center',
    marginBottom: 30,
    padding: 5,
  },
  captureInner: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
});
