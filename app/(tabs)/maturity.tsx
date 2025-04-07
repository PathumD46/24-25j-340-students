import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Camera as CameraIcon, X } from 'lucide-react-native';
import { Trash, Eye } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Maturity() {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [show1Camera, setShow1Camera] = useState(false);
  const navigation: any = useNavigation();

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Camera Permission Required</Text>
          <Text style={styles.subtitle}>
            We need camera access to check maturity
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
                  'Maturity Detected',
                  'Mushroom is ready for harvest'
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

  if (show1Camera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShow1Camera(false)}
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
                setShow1Camera(false);
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Maturity Detection</Text>
        <Text style={styles.subtitle}>
          Check if your mushrooms are ready for harvest
        </Text>
      </View>

      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => setShowCamera(true)}
      >
        <CameraIcon size={32} color="#22c55e" />
        <Text style={styles.scanText}>Start Scanning</Text>
      </TouchableOpacity>
      <View style={styles.previousScans}>
        <Text style={styles.previousTitle}>Maturity History</Text>
        {[1, 2, 3].map((record) => (
          <TouchableOpacity
            key={record}
            style={styles.recordItem}
            onPress={() => console.log(`Update Growth Stage ${record}`)}
          >
            <Text style={styles.recordText}>Sample {record}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => setShow1Camera(true)}
              >
                <CameraIcon color="#22c55e" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => navigation.navigate('maturityDetails')}
              >
                <Eye color="#22c55e" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => console.log(`Delete Growth Stage ${record}`)}
              >
                <Trash color="#ef4444" size={24} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => console.log('Add new growth record')}
        >
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  button: {
    backgroundColor: '#22c55e',
    padding: 16,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    fontSize: 16,
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
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdf4',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    gap: 12,
  },
  scanText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#22c55e',
  },
  previousScans: {
    padding: 20,
  },
  previousTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#111',
    marginBottom: 12,
  },
  emptyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 12,
  },
  recordText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#111',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 12, // Space between buttons
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    gap: 4,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#e5e7eb',
    // backgroundColor: '#ef4444',
    borderRadius: 8,
    gap: 4,
  },
  actionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#111',
  },
  deleteText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#fff',
  },
  addButton: {
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
  },
});
