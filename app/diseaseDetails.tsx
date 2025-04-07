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

export default function DiseaseDetails() {
  const route = useRoute();
  const { imageUri, hideSaveBtn } = route.params as {
    imageUri: string;
    hideSaveBtn: boolean | undefined;
  }; // Access the imageUri
  const navigation: any = useNavigation();

  // Sample disease data for illustration
  const diseaseData = {
    name: 'Mushroom Blight',
    symptoms: [
      'Yellowing of the mushroom caps',
      'Softening or decay of the mushrooms',
      'Black or brown spots on the surface',
    ],
    solutions: [
      'Remove infected mushrooms to prevent spreading',
      'Adjust humidity levels',
      'Ensure proper air circulation',
    ],
  };

  // Get the current date in a readable format
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const currentDate = new Date();
    setDate(currentDate.toLocaleDateString()); // Formats the date as MM/DD/YYYY (or locale-based)
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Disease Identified Text with Icon */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <TriangleAlert size={24} color="#ef4444" style={{ marginRight: 8 }} />
          <Text style={styles.diseaseIdentified}>Disease Identified</Text>
        </View>

        {/* Display Image */}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        {/* Disease Name */}
        <Text style={styles.diseaseName}>{diseaseData.name}</Text>

        {/* Display the current date */}
        <Text style={styles.dateText}>Date: {date}</Text>

        {/* Symptoms Section */}
        <Text style={styles.solutionsTitle}>Symptoms:</Text>
        {diseaseData.symptoms.map((symptom, index) => (
          <Text key={index} style={styles.solutionText}>
            {symptom}
          </Text>
        ))}

        {/* Solutions Section */}
        <Text style={styles.solutionsTitle}>Solutions:</Text>
        {diseaseData.solutions.map((solution, index) => (
          <Text key={index} style={styles.solutionText}>
            {solution}
          </Text>
        ))}
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        {/* Cancel Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ef4444' }]} // Red color for cancel
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        {hideSaveBtn !== true && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert('Saved Successfully');
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        )}
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
});
