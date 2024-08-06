import { View, Text,Image } from 'react-native'
import React from 'react'

const Obstacle = () => {
  return (
    <View>
     <Image source={require('../../assets/images/Game/obstacle.png')} style={{
        height:70,
        width:70,
        resizeMode:'contain'
     }}/>
    </View>
  )
}

export default Obstacle