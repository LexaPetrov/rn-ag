import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Image} from "react-native";
import Modal from 'react-native-modal';
import Profile from './Profile';

const CreateModal = props => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                <View>
                    <Image style={{width: 50, height: 50}} source={require('../img/icon2.png')}/>
                </View>
            </TouchableOpacity>
            <View>
                <Modal
                    backdropOpacity={0.3}
                    isVisible={modalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                    style={styles.contentView}
                    onBackButtonPress={() => setModalVisible(false)}

                >
                    <View style={styles.content}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.contentTitle}>—</Text>
                        </TouchableOpacity>
                        <Profile setModalVisible={setModalVisible} navigation={props.navigation} />
                    </View>
                </Modal>
            </View>
        </>

    )
}



const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 0,
        borderTopRightRadius: 17,
        borderTopLeftRadius: 17,
        height: '95%'
    },
    contentTitle: {
        fontSize: 50,
        textAlign: 'center',
        padding: 0,
        marginBottom: -20,
        marginTop: -20,
        color: '#ccc',
        textShadowRadius: 1,
        borderRadius: 20
    },
    contentView: {
        justifyContent: 'flex-end',
        margin: 0,
        flex: 1
    },
});


export default CreateModal