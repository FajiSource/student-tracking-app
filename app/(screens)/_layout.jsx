import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GuesOnly from '../../components/auth/GuesOnly'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import { UserProvider } from '../../context/UserContext'
import UserOnly from '../../components/auth/UserOnly'

const _layout = () => {
    return (
        <UserOnly>
            <StatusBar value="auto" hidden />
            <Stack >
                <Stack.Screen name='studentManagement' options={{
                    title: "Manage"
                }} />
                <Stack.Screen name='addStudent' options={{
                    title: "Add Student"
                }} />
                <Stack.Screen name='course' options={{
                    title: "Course"
                }} />
                 <Stack.Screen name='attendance/attendance' options={{
                    title: "Attendance"
                }} />
                 <Stack.Screen name='attendance/level' options={{
                    title: "Year Levels"
                }} />
                 <Stack.Screen name='attendance/blocks' options={{
                    title: "Sections"
                }} />
                 <Stack.Screen name='attendance/students' options={{
                    title: "Students"
                }} />
                 <Stack.Screen name='attendance/subjects' options={{
                    title: "Students"
                }} />
                 <Stack.Screen name='courses/subjects' options={{
                    title: "Subjects"
                }} />
                 <Stack.Screen name='courses/levels' options={{
                    title: "Year Levels"
                }} />
            </Stack>
        </UserOnly>
    )
}

export default _layout

const styles = StyleSheet.create({})