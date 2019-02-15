import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class App extends React.Component {
    state = {
        hasCameraPermission: null,
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    render() {
        const { hasCameraPermission } = this.state;

        const styles = StyleSheet.create({
            top: {
                flex: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                justifyContent: 'center'
            },
            topText: {
                color: 'white',
                fontSize: 18,
                textAlign: 'center'
            },
            middle: {
                flex: 1,
                justifyContent: 'center'
            },
            redBar: {
                width: "100%",
                borderColor: 'red',
                borderWidth: 1,
                alignSelf: 'center'
            },
            bottom: {
                flex: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                justifyContent: 'flex-end'
            },
            bottomText: {
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
                marginBottom: 10
            }
        });

        if (hasCameraPermission === null) {
            return <Text>Requisitando permissão para camera</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>Sem acesso a camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={StyleSheet.absoluteFill}
                    >
                        <View style={styles.top}>
                            <Text style={styles.topText}>Aponte a câmera para o código de barras</Text>
                        </View>
                        <View style={styles.middle}>
                            <View style={styles.redBar} />
                        </View>
                        <View style={styles.bottom}>
                            <Text style={styles.bottomText}>by @max-willian</Text>
                        </View>
                    </BarCodeScanner>
                </View>
            );
        }
    }

    _handleBarCodeRead = ({ type, data }) => {
        alert(`Tipo de código ${type}, código ${data}`);
    }
}