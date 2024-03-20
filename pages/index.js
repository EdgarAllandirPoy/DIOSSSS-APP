import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, PanResponder } from "react-native";
import { ModalTokens } from '../components/modal';
import Slider from "@react-native-community/slider";

export function Home() {
    const [qtde, defineQtde] = useState(1);
    const [telaModal, configTelaModal] = useState(false);
    const [thumbPosition, setThumbPosition] = useState(0);
    const [sliderColor, setSliderColor] = useState("#FFF"); // Cor pré-selecionada

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                const newPosition = gestureState.moveX - 27.5; // Ajuste para o meio do favicon
                const width = 320; // Largura do container do slider
                const newPositionPercentage = (newPosition / width) * 100; // Posição do favicon em porcentagem
                const newValue = Math.round((newPositionPercentage / 100) * 5) + 1; // Mapear a posição para o valor do slide
                if (newValue >= 1 && newValue <= 6) {
                    defineQtde(newValue);
                    setThumbPosition(newPositionPercentage);
                    // Altera a cor da linha do slider quando é movido
                    setSliderColor("#ff0000"); // Cor vermelha
                }
            }
        })
    ).current;

    function gerarToken() {
        configTelaModal(true);
    }

    function onValueChange(value) {
        defineQtde(value.toFixed(0));
        // Calcula a posição da imagem personalizada com base no valor do slide
        const position = (value - 1) / 5 * 100; // 1 é o mínimo e 6 é o máximo, então temos (valor - 1) / (máximo - mínimo) * 100
        setThumbPosition(position);
        // Define a cor pré-selecionada quando o slide é movido
        setSliderColor("#ff0000"); // Cor vermelha
    }

    return (
        <View style={ESTILO.container}>
            <Image source={require("../assets/logo.png")} style={ESTILO.logo} />
            <Text style={ESTILO.caracteres}>
                {qtde} letras
            </Text>
            <View style={ESTILO.sliderContainer}>
                <Slider
                    style={ESTILO.slider}
                    minimumValue={1}
                    maximumValue={6}
                    minimumTrackTintColor={sliderColor} // Cor pré-selecionada
                    maximumTrackTintColor="#fff"
                    thumbTintColor="transparent" // Tornando o controle deslizante transparente
                    value={qtde}
                    onValueChange={onValueChange}
                />
                {/* Posiciona dinamicamente a imagem personalizada com base na posição do slide */}
                <TouchableOpacity
                    style={[ESTILO.customThumbContainer, { left: `${thumbPosition}%` }]}
                    {...panResponder.panHandlers} // Passar os manipuladores de eventos de pan
                >
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={ESTILO.button} onPress={gerarToken}>
                <Text style={ESTILO.buttonText}>
                    Gerar...
                </Text>
            </TouchableOpacity>
            <Modal visible={telaModal} animationType="fade" transparent={true}>
                <ModalTokens fechar={() => configTelaModal(false)} />
            </Modal>
        </View>
    )
}

const ESTILO = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginBottom: 60
    },
    caracteres: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
    },
    sliderContainer: {
        width: "80%",
        position: 'relative', // para que a posição absoluta funcione corretamente
    },
    slider: {
        width: "100%",
        height: 50,
    },
    customThumbContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    customThumb: {
        width: 55, // Ajuste o tamanho conforme necessário
        height: 50, // Ajuste o tamanho conforme necessário
    },
    button: {
        backgroundColor: "#fff",
        width: "40%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: "#000"
    }
})