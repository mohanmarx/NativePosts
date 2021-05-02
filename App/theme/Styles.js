import * as React from "react"
import { StyleSheet } from 'react-native'

export const Styles = StyleSheet.create({
    mt40: {
        marginTop: 40
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
   
    shadow: {
        shadowOffset: { height: 2 },
        shadowOpacity: 0.2,
        elevation: 5,
        shadowColor: '#D7D7D7'
    },
    card: {
        backgroundColor: "#fff",
        width: "100%",
        marginVertical: 15,
        borderRadius: 10,
        padding: 15,
        flexShrink: 1
    },   
    colContent: {
        fontSize: 13,
        lineHeight: 28,
        textTransform:"capitalize"
    },
})