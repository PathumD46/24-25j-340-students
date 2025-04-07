import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  Fan,
  Lightbulb,
  Brain,
  Thermometer,
  Droplet,
} from 'lucide-react-native'; // Add new icons

export default function Control() {
  const [isAIMode, setIsAIMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fans, setFans] = useState(false);
  const [lights, setLights] = useState(false);
  const [temperature, setTemperature] = useState(false); // New state for temperature control
  const [humidity, setHumidity] = useState(false); // New state for humidity control

  const toggleAIMode = () => {
    setIsAIMode(!isAIMode);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Control Center</Text>
        <Text style={styles.subtitle}>Manage your cultivation environment</Text>
      </View>

      <View style={styles.content}>
        {/* Fans Control */}
        <TouchableOpacity
          style={[styles.card, isAIMode && styles.cardDisabled]}
          disabled={isAIMode}
        >
          <Fan size={32} color={isAIMode ? '#999' : '#22c55e'} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Fans</Text>
            <Text style={styles.cardSubtitle}>Control air circulation</Text>
          </View>
          <Switch
            value={fans}
            onValueChange={setFans}
            disabled={isAIMode}
            trackColor={{ false: '#ddd', true: '#86efac' }}
            thumbColor={fans ? '#22c55e' : '#f4f4f5'}
          />
        </TouchableOpacity>

        {/* Lights Control */}
        <TouchableOpacity
          style={[styles.card, isAIMode && styles.cardDisabled]}
          disabled={isAIMode}
        >
          <Lightbulb size={32} color={isAIMode ? '#999' : '#22c55e'} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Lights</Text>
            <Text style={styles.cardSubtitle}>Manage lighting system</Text>
          </View>
          <Switch
            value={lights}
            onValueChange={setLights}
            disabled={isAIMode}
            trackColor={{ false: '#ddd', true: '#86efac' }}
            thumbColor={lights ? '#22c55e' : '#f4f4f5'}
          />
        </TouchableOpacity>

        {/* Temperature Control */}
        <TouchableOpacity
          style={[styles.card, isAIMode && styles.cardDisabled]}
          disabled={isAIMode}
        >
          <Thermometer size={32} color={isAIMode ? '#999' : '#22c55e'} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Temperature</Text>
            <Text style={styles.cardSubtitle}>
              Control temperature settings
            </Text>
          </View>
          <Switch
            value={temperature}
            onValueChange={setTemperature}
            disabled={isAIMode}
            trackColor={{ false: '#ddd', true: '#86efac' }}
            thumbColor={temperature ? '#22c55e' : '#f4f4f5'}
          />
        </TouchableOpacity>

        {/* Humidity Control */}
        <TouchableOpacity
          style={[styles.card, isAIMode && styles.cardDisabled]}
          disabled={isAIMode}
        >
          <Droplet size={32} color={isAIMode ? '#999' : '#22c55e'} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Humidity</Text>
            <Text style={styles.cardSubtitle}>Manage humidity levels</Text>
          </View>
          <Switch
            value={humidity}
            onValueChange={setHumidity}
            disabled={isAIMode}
            trackColor={{ false: '#ddd', true: '#86efac' }}
            thumbColor={humidity ? '#22c55e' : '#f4f4f5'}
          />
        </TouchableOpacity>

        {/* AI Mode Control */}
        <TouchableOpacity style={styles.aiCard} onPress={toggleAIMode}>
          <Brain size={32} color={isAIMode ? '#fff' : '#22c55e'} />
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, isAIMode && styles.aiActiveText]}>
              AI-Powered Auto Mode
            </Text>
            <Text
              style={[styles.cardSubtitle, isAIMode && styles.aiActiveText]}
            >
              Let AI optimize your environment
            </Text>
          </View>
          <Switch
            value={isAIMode}
            onValueChange={toggleAIMode}
            trackColor={{ false: '#ddd', true: '#86efac' }}
            thumbColor={isAIMode ? '#fff' : '#f4f4f5'}
          />
        </TouchableOpacity>
      </View>

      {/* Modal for AI Mode */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Brain size={48} color="#22c55e" />
            <Text style={styles.modalTitle}>
              {isAIMode ? 'AI Mode Activated' : 'AI Mode Deactivated'}
            </Text>
            <Text style={styles.modalText}>
              {isAIMode
                ? 'The system will now automatically optimize your cultivation environment based on real-time data and AI analysis.'
                : 'Returning to manual control mode. You can now manually adjust your environment settings.'}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  content: {
    padding: 20,
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f4f4f5',
  },
  cardDisabled: {
    opacity: 0.5,
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#111',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
  aiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#22c55e',
    borderRadius: 16,
    marginTop: 20,
  },
  aiActiveText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '90%',
  },
  modalTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#111',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  modalButtonText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    fontSize: 16,
  },
});
