import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  GraduationCap,
  Presentation,
  Scale,
  FileSearch,
  Check,
} from "lucide-react-native";
import { useTheme } from "@/components/ThemeProvider";
import SvgStudent from "../assets/svg/student.svg";
import SvgTeacher from "../assets/svg/teacher.svg";
import SvgVidicon from "../assets/svg/vidicon-fill.svg";

interface UserTypeOptionProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
  selected?: boolean;
}

const UserTypeOption = ({
  icon,
  title,
  description,
  onPress,
  selected = false,
}: UserTypeOptionProps) => {
  const { colors } = useTheme();

  const renderIcon = () => {
    switch (icon) {
      case "graduation-cap":
        return <SvgStudent width={24} height={24} />;
      case "presentation":
        return <SvgTeacher width={24} height={24} />;
      case "scale":
        return <SvgVidicon width={24} height={24} />;
      case "file-search":
        return <FileSearch size={24} color={colors.text} />;
      default:
        return <GraduationCap size={24} color={colors.text} />;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground },
        selected && { borderColor: colors.primary, borderWidth: 2 },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: colors.background }]}
      >
        {renderIcon()}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
      {selected && (
        <View
          style={[styles.checkContainer, { backgroundColor: colors.primary }]}
        >
          <Check size={16} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    position: "relative",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserTypeOption;
