import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'

import { Styles } from '../../theme/Styles'

export class PostDetails extends Component {
    render() {
        const { route } = this.props
        const { post } = route.params
        return (
            <ScrollView>
                <View style={[Styles.container, { paddingHorizontal: 15 }]}>
                    <View style={[Styles.card, Styles.shadow]}>
                        {Object.keys(post).length > 0 && Object.keys(post).map((key, idx) => (
                            typeof post[key] !== "object" && !Array.isArray(post[key]) && post[key] !== null ?
                                <Text key={idx} style={Styles.colContent}>{`${key} : ${post[key]}`}</Text>
                                : Array.isArray(post[key]) && post[key].map((arr, ind) => (
                                    <Text key={ind} style={Styles.colContent}>{`${key} : ${arr}`}</Text>
                                ))
                        ))}
                    </View>
                </View>
            </ScrollView >
        )
    }
}

export default PostDetails