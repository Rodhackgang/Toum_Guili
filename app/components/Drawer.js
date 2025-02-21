import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const Drawer = () => {
  const handleContact = (type) => {
    switch (type) {
      case 'whatsapp':
        Linking.openURL('https://wa.me/22677701726');
        break;
      case 'email':
        Linking.openURL('mailto:Rodhackgang@gmail.com');
        break;
      case 'phone':
        Linking.openURL('tel:+22677701726');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Menu de Contact</Text>

      {/* WhatsApp */}
      <TouchableOpacity onPress={() => handleContact('whatsapp')} style={styles.contactItem}>
        <Text style={[styles.contactText, { color: '#25D366' }]}>
          📱 WhatsApp: +226 77701726
        </Text>
      </TouchableOpacity>

      {/* Email */}
      <TouchableOpacity onPress={() => handleContact('email')} style={styles.contactItem}>
        <Text style={[styles.contactText, { color: '#0078D4' }]}>
          ✉️ Email: Rodhackgang@gmail.com
        </Text>
      </TouchableOpacity>

      {/* Téléphone */}
      <TouchableOpacity onPress={() => handleContact('phone')} style={styles.contactItem}>
        <Text style={[styles.contactText, { color: '#34b7f1' }]}>
          📞 Téléphone: +226 77701726
        </Text>
      </TouchableOpacity>

      {/* À propos */}
      <View style={styles.aboutItem}>
        <Text style={styles.aboutText}>
          📄 <Text style={styles.boldText}>À propos</Text>: Cette application vous aide à rester connecté facilement.
        </Text>
      </View>

      {/* Conditions d'utilisation */}
      <View style={styles.aboutItem}>
        <Text style={styles.aboutText}>
          ⚖️ <Text style={styles.boldText}>Conditions d'utilisation</Text>: Veuillez lire attentivement les conditions avant de continuer.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  contactItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  contactText: {
    fontSize: 18,
  },
  aboutItem: {
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 18,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Drawer;