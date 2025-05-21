import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GuesOnly from '../../components/auth/GuesOnly'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import { UserProvider } from '../../context/UserContext'

const _layout = () => {
    return (
        <GuesOnly>
           
                <StatusBar value="auto" />
                <Stack screenOptions={{ headerShown: false, animation: "none" }} />
           
        </GuesOnly>
    )
}

export default _layout

const styles = StyleSheet.create({})