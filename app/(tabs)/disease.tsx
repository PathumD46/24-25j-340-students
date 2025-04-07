import { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

import { Camera as CameraIcon, X } from 'lucide-react-native';

export default function Disease() {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [img, setImg] = useState('');
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView>(null);
  const sampleImg =
    'https://thumbs.dreamstime.com/b/single-white-mushroom-rounded-cap-short-stem-growing-weathered-log-natural-setting-single-white-348401462.jpg';
  const navigation: any = useNavigation();
  //   Handle permission request
  if (!permission) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Camera Permission Required</Text>
          <Text style={styles.subtitle}>
            We need camera access to detect diseases
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render the camera view
  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={cameraType} ref={cameraRef}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowCamera(false)}
          >
            <X color="#fff" size={24} />
          </TouchableOpacity>

          {/* Toggle Camera Button */}
          <TouchableOpacity
            style={[styles.closeButton, { top: 120 }]}
            onPress={() =>
              setCameraType((current: any) =>
                current === 'back' ? 'front' : 'back'
              )
            }
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Flip Camera</Text>
          </TouchableOpacity>

          {/* Camera Content */}
          <View style={styles.cameraContent}>
            <Text style={styles.cameraText}>
              Position the mushroom in frame
            </Text>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={async () => {
                if (cameraRef.current) {
                  const photo = await cameraRef.current.takePictureAsync();
                  setImg(photo?.uri || '');
                  setShowCamera(false);

                  navigation.navigate('diseaseDetails', {
                    imageUri: photo?.uri || '',
                    hideSaveBtn: false,
                  });
                }
              }}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }
  // Default view
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Disease Detection</Text>
        <Text style={styles.subtitle}>
          Scan your mushrooms for potential diseases
        </Text>
      </View>
      {/* Scan Button */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => setShowCamera(true)}
      >
        <CameraIcon size={32} color="#22c55e" />
        <Text style={styles.scanText}>Start Scanning</Text>
      </TouchableOpacity>
      {/* Previous Scans Section */}
      <View style={styles.previousScans}>
        <Text style={styles.previousTitle}>Previous Scans</Text>
        {/* <Text style={styles.emptyText}>No previous scans found</Text> */}
        {/* Previous Scans List */}
        <View style={styles.previousScansList}>
          <View style={styles.scanRow}>
            <Text style={styles.scanDate}>2023-10-01</Text>
            <Text style={styles.scanResulth}>Healthy</Text>
            <TouchableOpacity
              style={{
                padding: 8,
                backgroundColor: '#e5e7eb',
                borderRadius: 8,
              }}
              onPress={() =>
                navigation.navigate('diseaseDetails', {
                  imageUri: sampleImg,
                  hideSaveBtn: true,
                })
              }
            >
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 14,
                  color: '#111',
                }}
              >
                View
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.scanRow}>
            <Text style={styles.scanDate}>2023-09-28</Text>
            <Text style={styles.scanResultd}> Detected</Text>
            <TouchableOpacity
              style={{
                padding: 8,
                backgroundColor: '#e5e7eb',
                borderRadius: 8,
              }}
              onPress={() =>
                navigation.navigate('diseaseDetails', {
                  imageUri: sampleImg,
                  hideSaveBtn: true,
                })
              }
            >
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 14,
                  color: '#111',
                }}
              >
                View
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scanRow}>
            <Text style={styles.scanDate}>2023-09-25</Text>
            <Text style={styles.scanResulth}>Healthy</Text>
            <TouchableOpacity
              style={{
                padding: 8,
                backgroundColor: '#e5e7eb',
                borderRadius: 8,
              }}
              onPress={() =>
                navigation.navigate('diseaseDetails', {
                  imageUri: sampleImg,
                  hideSaveBtn: true,
                })
              }
            >
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 14,
                  color: '#111',
                }}
              >
                View
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scanRow}>
            <Text style={styles.scanDate}>2023-09-20</Text>
            <Text style={styles.scanResulth}>Healthy</Text>
            <TouchableOpacity
              style={{
                padding: 8,
                backgroundColor: '#e5e7eb',
                borderRadius: 8,
              }}
              onPress={() =>
                navigation.navigate('diseaseDetails', {
                  imageUri: sampleImg,
                  hideSaveBtn: true,
                })
              }
            >
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 14,
                  color: '#111',
                }}
              >
                View
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.scanRow}>
            <Text style={styles.scanDate}>2023-09-15</Text>
            <Text style={styles.scanResultd}>Detected</Text>
            <TouchableOpacity
              style={{
                padding: 8,
                backgroundColor: '#e5e7eb',
                borderRadius: 8,
              }}
              onPress={() =>
                navigation.navigate('diseaseDetails', {
                  imageUri: sampleImg,
                  hideSaveBtn: true,
                })
              }
            >
              <Text
                style={{
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 14,
                  color: '#111',
                }}
              >
                View
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  previousScansList: {
    paddingHorizontal: 20,
  },
  scanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  scanDate: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#111',
  },
  scanResulth: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#22c55e',
  },
  scanResultd: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#f87171',
  },
});
