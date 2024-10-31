// src/screens/SettingsScreen.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ApHeader from "@/src/components/header";

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4">
      <ApHeader title="Settings" />

      {/* Personal Information Section */}
      <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white rounded-md mb-2 shadow-md">
        <Text className="text-lg">Personal Information</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      {/* Notifications Toggle */}
      <View className="flex-row justify-between items-center p-4 bg-white rounded-md mb-2 shadow-md">
        <Text className="text-lg">Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: "#767577", true: "#34D399" }}
          thumbColor={notificationsEnabled ? "#34D399" : "#f4f3f4"}
        />
      </View>

      {/* Change Password */}
      <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white rounded-md mb-2 shadow-md">
        <Text className="text-lg">Change Password</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      {/* Log Out Button */}
      <TouchableOpacity className="flex-row justify-center items-center p-4 bg-red-600 rounded-md mt-6 shadow-md">
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text className="text-lg text-white font-semibold ml-2">Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingsScreen;
