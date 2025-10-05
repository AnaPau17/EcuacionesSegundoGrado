import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'react-native';

export default function HomeScreen() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [resultado, setResultado] = useState({x1:'', x2:''});

  // Función para calcular la ecuacion de segundo grado
  const segundoGrado = (a: number, b: number, c: number): { x1: string; x2: string } => {
    const valorDentroDeRaiz = (b * b) - (4 * a * c);
    if (valorDentroDeRaiz > 0) {
      const x1 = (-b + Math.sqrt(valorDentroDeRaiz)) / (2 * a);
      const x2 = (-b - Math.sqrt(valorDentroDeRaiz)) / (2 * a);
      return {x1: x1.toFixed(2), x2: x2.toFixed(2)}
    }
    else if (valorDentroDeRaiz === 0) {
      const x = -b / (2 * a);
      return {x1: x.toFixed(2), x2: x.toFixed(2)}
    }
    else {
      const real = (-b / (2 * a)).toFixed(2);
      const imaginario = (Math.sqrt(- valorDentroDeRaiz) / (2 * a)).toFixed(2);
      return {
        x1: `${real} + ${imaginario}i`,
        x2: `${real} - ${imaginario}i`
      };
    }
  };

  const handleInputChange = (key: 'a' | 'b' | 'c', value: string) => {
    if (key === 'a') setA(value);
    if (key === 'b') setB(value);
    if (key === 'c') setC(value);

    const aNum = key === 'a' ? parseFloat(value) : parseFloat(a);
    const bNum = key === 'b' ? parseFloat(value) : parseFloat(b);
    const cNum = key === 'c' ? parseFloat(value) : parseFloat(c);

  if (!isNaN(aNum) && !isNaN(bNum) && !isNaN(cNum) && aNum !== 0) {
    const resultadoCalculado = segundoGrado(aNum, bNum, cNum);
    setResultado(resultadoCalculado);
  } 
  else {
    setResultado({ x1: '', x2: '' });
  }
};

  // Función del botón Resolver
  const handleConvert = () => {
    if (a.trim() === '' || b.trim() === '' || c.trim() === '') {
      Alert.alert('Aviso', 'Por favor ingresa todos los valores (a, b, c)');
      return;
    }

    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);
    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      Alert.alert('Aviso', 'Por favor ingresa números');
      return;
    }
    if (aNum === 0) {
      Alert.alert('Aviso', 'No es una ecuación de segundo grado');
      return;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FFC5D3" />
      
      {/* Header */}
      <ThemedView style={styles.header}></ThemedView>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>Ecuaciones de Segundo Grado</ThemedText>
        <Image
          source={require('../../assets/images/imagen.png')} 
          style={{ width: 270, height: 100, marginVertical: 20, alignSelf: 'center' }}
          resizeMode="contain"
        />

        {/* valor de a */}
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>a:</ThemedText>
          <TextInput
            style={styles.input}
            value={a}
            onChangeText={(value) => handleInputChange('a', value)}
            keyboardType="numeric"
            placeholder='Ingresa el valor de a'
            placeholderTextColor="#999"
          />
        </ThemedView>

        {/* valor de b */}
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>b:</ThemedText>
          <TextInput
            style={styles.input}
            value={b}
            onChangeText={(value) => handleInputChange('b', value)}
            keyboardType="numeric"
            placeholder='Ingresa el valor de b'
            placeholderTextColor="#999"
          />
        </ThemedView>

        {/* valor de c */}
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>c:</ThemedText>
          <TextInput
            style={styles.input}
            value={c}
            onChangeText={(value) => handleInputChange('c', value)}
            keyboardType="numeric"
            placeholder='Ingresa el valor de c'
            placeholderTextColor="#999"
          />
        </ThemedView>

        {/* Convert Button */}
        <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
          <ThemedText style={styles.buttonText}>RESOLVER</ThemedText>
        </TouchableOpacity>

        {/* Mostrar resultado */}
        {/* Raiz 1 */}
        <ThemedView style={{ marginTop: 30 }}>
          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.respLabel}>Raíz 1:</ThemedText>
            <ThemedView style={styles.input}>
              <ThemedText style={{ fontSize: 18, color: '#333' }}>
                {resultado.x1 || ' '}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Raiz 2 */}
          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.respLabel}>Raíz 2:</ThemedText>
            <ThemedView style={styles.input}>
              <ThemedText style={{ fontSize: 18, color: '#333' }}>
                {resultado.x2 || ' '}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FDB4BF',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    padding: 20,
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    width: 'auto',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
    fontWeight: '500',
    width: 30,
    marginRight: 10,
  },
  respLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    marginRight: 10,
    minWidth: 70, // asegura que "Raíz 1" quepa completa
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#333',
    backgroundColor: 'transparent',
  },
  convertButton: {
    backgroundColor: '#FDB4BF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignSelf: 'center',
    minWidth: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
