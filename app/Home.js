import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Animated, ScrollView, Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Styles from '../common/Styles';
import Colors from '../constants/Colors';
import MyHeader from '../components/MyHeader';
import { FadeIn, useAnimatedRef } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Drawer from "../app/components/Drawer";
import Contextmenu from "../app/components/Contextmenu";


const jobData = [
    {
        id: '1',
        title: 'Designer UX',
        company: 'Google',
        location: 'New York',
        experience: '3 ans d\'exp.',
        type: 'Temps plein',
        education: 'Bac+ et supérieur',
        salary: '50K FCFA/mois',
        description: 'Les Designers UX sont la synthèse du design et du développement. Ils contribuent à la création de produits innovants.',
        color: '#4C46E9',
        publishedDate: 'Publié il y a 2 jours'
    },
    {
        id: '2',
        title: 'Chef de Projet',
        company: 'Airbnb',
        location: 'Sydney',
        experience: '1 à 6 ans d\'exp.',
        type: 'Temps partiel',
        education: 'Niveau Bac et inférieur',
        salary: '25K FCFA/mois',
        description: 'Les chefs de projet supervisent les projets de l\'initiation à la finalisation, en veillant à leur livraison dans les délais.',
        color: '#E93C3C',
        publishedDate: 'Publié il y a 5 jours'
    },
    {
        id: '3',
        title: 'Graphiste',
        company: 'Spotify',
        location: 'Télétravail',
        experience: 'Plus de 5 ans d\'exp.',
        type: 'Stage',
        education: 'Sans niveau',
        salary: 'Gratuit',
        description: 'Les graphistes créent des visuels pour communiquer des messages pour des marques et des clients.',
        color: '#FFC400',
        publishedDate: 'Publié il y a 1 semaine'
    }

];

export default function Home({ route, navigation }) {
    const viewRef = useAnimatedRef(null);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [bottomSheetHeight, setBottomSheetHeight] = useState(new Animated.Value(0));
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    
    const openBottomSheet = (detail) => {
        setSelectedDetail(detail);
        setIsBottomSheetVisible(true);
        Animated.spring(bottomSheetHeight, {
            toValue: 300,
            useNativeDriver: true
        }).start();
    };

    const closeBottomSheet = () => {
        Animated.spring(bottomSheetHeight, {
            toValue: 0,
            useNativeDriver: true
        }).start(() => setIsBottomSheetVisible(false));
    };

    return (
        <Animated.View
            ref={viewRef}
            entering={FadeIn.duration(800)}
            style={[Styles.container, { backgroundColor: Colors.background }]}
        >
               <MyHeader
                menu
                onPressMenu={() => setShowDrawer(!showDrawer)}
                title={route.name}
                right="more-vertical"
                onRightPress={() => setShowMenu(true)}
            />

            {/* Modal pour le Contextmenu */}
            <Modal
                visible={showMenu}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowMenu(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Contextmenu
                            visible={showMenu}
                            onClose={() => setShowMenu(false)}
                        />
                        <TouchableOpacity onPress={() => setShowMenu(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal pour le Drawer */}
            <Modal
                visible={showDrawer}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowDrawer(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Drawer
                            visible={showDrawer}
                            onClose={() => setShowDrawer(false)}
                        />
                        <TouchableOpacity onPress={() => setShowDrawer(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <FlatList
                data={jobData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Animatable.View animation="fadeInUp" duration={800} style={[styles.card, { backgroundColor: item.color }]}>
                        <TouchableOpacity style={styles.viewButtonContainer}>
                            <View style={styles.viewButton}>
                                <Text style={styles.viewText}>En savoir plus↗</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.jobTitle}>{item.title}</Text>
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.jobDescription}>{item.description}</Text>
                        <View style={styles.detailsRow}>
                            <TouchableOpacity onPress={() => openBottomSheet({ type: 'location', value: item.location })} style={styles.iconText}>
                                <Ionicons name="location" size={20} color="white" />
                                <Text style={styles.tag}>{item.location}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openBottomSheet({ type: 'experience', value: item.experience })} style={styles.iconText}>
                                <Ionicons name="briefcase" size={20} color="white" />
                                <Text style={styles.tag}>{item.experience}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openBottomSheet({ type: 'type', value: item.type })} style={styles.iconText}>
                                <Ionicons name={getJobTypeIcon(item.type)} size={20} color="white" />
                                <Text style={styles.tag}>{item.type}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.education}>Niveau: {item.education}</Text>
                        <Text style={styles.salary}>{item.salary === 'Gratuit' ? 'Gratuit' : `${item.salary} FCFA/mo`}</Text>
                        <Text style={styles.publishedDate}>📅 {item.publishedDate}</Text>
                        <View style={styles.buttonRow}>

                            <TouchableOpacity style={styles.applyButton}>
                                <Text style={styles.applyText}>Postuler</Text>
                            </TouchableOpacity>
                        </View>

                    </Animatable.View>

                )}
            />
            {isBottomSheetVisible && (
                <Animated.View style={[styles.bottomSheet, { height: bottomSheetHeight }]}>
                    <View style={{ padding: 20 }}>
                        {selectedDetail ? (
                            <>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                    {selectedDetail.type === 'location' ? 'Location' : selectedDetail.type === 'experience' ? 'Experience' : 'Type'}
                                </Text>
                                <Text>{selectedDetail.value}</Text>
                            </>
                        ) : (
                            <Text>No details selected</Text>
                        )}
                        <TouchableOpacity onPress={closeBottomSheet} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </Animated.View>

    );

    function getJobTypeIcon(type) {
        switch (type) {
            case 'Temps plein':
                return 'time';
            case 'Temps partiel':
                return 'partly-sunny';
            case 'Stage':
                return 'school';
            default:
                return 'help';
        }
    }

    function handleLocationClick(location) {
        console.log(`Location clicked: ${location}`);
    }

    function handleExperienceClick(experience) {
        console.log(`Experience clicked: ${experience}`);
    }
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        padding: 20,
        margin: 10,
        overflow: 'hidden',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        width: 190
    },
    company: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
    },
    jobDescription: {
        fontSize: 14,
        color: 'white',
        marginBottom: 10,
        fontStyle: 'italic',
    },
    detailsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailsRows: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 2,
    },
    iconText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        padding: 5
    },
    iconTexts: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 0,
        marginBottom: 2,
        marginTop: 2,
        backgroundColor: 'rgba(124, 62, 224, 0.79)',
        borderTopRightRadius: 45,
        borderBottomLeftRadius: 45,
        padding: 10
    },
    tag: {
        marginLeft: 5,
        fontSize: 14,
        color: 'white',
    },
    tags: {
        marginLeft: 5,
        fontSize: 16,
        color: 'white',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    education: {
        fontSize: 14,
        color: 'white',
        marginBottom: 5,
    },
    salary: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    viewButtonContainer: {
        borderWidth: 10,
        borderColor: '#EEEEEE',
        borderTopRightRadius: 45,
        borderBottomLeftRadius: 40,
        marginRight: -17,
        position: 'absolute',
        top: -12,
        right: 0,
    },
    viewButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        borderBottomLeftRadius: 40,
        padding: 25,
    },
    applyButton: {
        backgroundColor: '#28A745',
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
    },
    viewText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    applyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    publishedDate: {
        fontSize: 16,
        color: 'white',
        marginTop: 5,
        fontStyle: 'italic'
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#E93C3C',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
