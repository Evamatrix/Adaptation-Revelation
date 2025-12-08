import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import Footer from "../src/components/footer"; // Update this path if needed
import { useRouter } from "expo-router";

const Screenwriters: React.FC = () => {
  return (
    <SafeAreaView style={styles.screenwriters}>
      <View style={styles.view}>
        <View style={[styles.child, styles.childLayout]} />
        <View style={[styles.item, styles.itemBorder]} />
        <View style={[styles.inner, styles.childBorder]} />
        <Text style={[styles.didYouDo, styles.textTypo]}>Did you do hw 3?</Text>
        <View style={[styles.rectangleView, styles.rectangleViewBorder]} />
        <View style={[styles.screenwritersChild, styles.rectangleViewBorder]} />
        <Text style={[styles.yaIllDm, styles.textTypo]}>Ya I’ll dm you</Text>
        <Text style={[styles.am, styles.amTypo]}>10:05 am</Text>
        <Text style={[styles.screenwritersAm, styles.amTypo]}>11:47 am</Text>
        <Text style={[styles.am2, styles.amTypo]}>10:35 am</Text>
        <Text style={[styles.sendMessage, styles.amTypo]}>Send message</Text>
        <Text style={[styles.sendMessage, styles.amTypo]}>Send message</Text>
        <Text style={[styles.am3, styles.amTypo]}>10:11 am</Text>
        <View style={[styles.child2, styles.itemBorder]} />
        <Text style={[styles.text, styles.textTypo]}>+</Text>
        <View style={styles.groupPressable}>
          <View style={[styles.groupWrapper, styles.groupPosition]}>
            <View style={[styles.groupWrapper, styles.groupPosition]}>
              <View style={[styles.groupWrapper, styles.groupPosition]}>
                <View style={[styles.groupWrapper, styles.groupPosition]}>
                  <View style={[styles.groupChild, styles.groupPosition]} />
                  <Text style={[styles.back, styles.backFlexBox]}>Back</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Text style={[styles.evelynH, styles.backFlexBox]}>Evelyn H.</Text>
        <Text style={[styles.generalChat, styles.todayTypo]}>General Chat</Text>
        <Text style={styles.screenWriters}>screen writers</Text>
        <Text style={[styles.today, styles.todayTypo]}>Today</Text>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenwriters: {
    backgroundColor: "#fff",
    flex: 1,
  },
  homePosition: {
    bottom: "32.48%",
    top: "26.5%",
    width: "10.91%",
    height: "41.03%",
    position: "absolute",
  },
  iconPosition: {
    color: "#1e1e1e",
    bottom: "8.33%",
    top: "8.33%",
    height: "83.33%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  childLayout: {
    height: 77,
    width: 171,
  },
  itemBorder: {
    height: 57,
    top: 756,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    position: "absolute",
  },
  childBorder: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  textTypo: {
    textAlign: "left",
    fontFamily: "Inter-Regular",
    position: "absolute",
  },
  rectangleViewBorder: {
    backgroundColor: "#597aa4",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    borderRadius: 20,
    position: "absolute",
  },
  amTypo: {
    color: "#5c5c5c",
    textAlign: "left",
    fontFamily: "Inter-Regular",
  },
  groupPosition: {
    right: 0,
    width: 110,
    position: "absolute",
  },
  backFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: "#000",
  },
  todayTypo: {
    fontSize: 24,
    position: "absolute",
  },
  view: {
    height: 956,
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#fff",
    flex: 1,
  },
  child: {
    top: 270,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    left: 44,
    position: "absolute",
  },
  item: {
    left: 34,
    borderRadius: 101,
    width: 306,
    backgroundColor: "#d9d9d9",
  },
  inner: {
    top: 476,
    width: 189,
    height: 63,
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    left: 44,
    position: "absolute",
  },
  didYouDo: {
    top: 496,
    color: "#000",
    textAlign: "left",
    fontSize: 20,
    left: 58,
  },
  rectangleView: {
    top: 369,
    left: 233,
    height: 77,
    width: 171,
  },
  screenwritersChild: {
    top: 572,
    left: 198,
    width: 206,
    height: 66,
  },
  yaIllDm: {
    top: 594,
    left: 234,
    color: "#000",
    textAlign: "left",
    fontSize: 20,
  },
  am: {
    top: 354,
    fontSize: 12,
    color: "#5c5c5c",
    position: "absolute",
    left: 44,
  },
  screenwritersAm: {
    top: 644,
    left: 354,
    fontSize: 12,
    color: "#5c5c5c",
    position: "absolute",
  },
  am2: {
    top: 544,
    fontSize: 12,
    color: "#5c5c5c",
    position: "absolute",
    left: 44,
  },
  sendMessage: {
    top: 773,
    fontSize: 20,
    color: "#5c5c5c",
    left: 58,
    position: "absolute",
  },
  am3: {
    top: 452,
    left: 355,
    fontSize: 12,
    color: "#5c5c5c",
    position: "absolute",
  },
  child2: {
    left: 352,
    borderRadius: 100,
    backgroundColor: "#4b75b3",
    width: 57,
  },
  text: {
    top: 753,
    left: 365,
    fontSize: 48,
    color: "#fff",
  },
  groupPressable: {
    top: -3,
    right: 330,
    height: 38,
    width: 110,
    position: "absolute",
  },
  groupWrapper: {
    top: 0,
    height: 38,
  },
  groupChild: {
    top: 3,
    backgroundColor: "#fffafa",
    height: 33,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  back: {
    left: 24,
    fontSize: 30,
    width: 85,
    fontFamily: "Koulen-Regular",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    top: 0,
    height: 38,
    position: "absolute",
  },
  ellipseIcon: {
    top: 870,
    left: 272,
    width: 28,
    height: 24,
    color: "#ff5d5d",
    position: "absolute",
  },
  evelynH: {
    top: 450,
    left: 27,
    width: 137,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontFamily: "Inter-Regular",
    fontSize: 20,
    position: "absolute",
  },
  generalChat: {
    top: 85,
    left: 57,
    width: 315,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: "#000",
    fontFamily: "Koulen-Regular",
  },
  screenWriters: {
    top: 59,
    left: 94,
    fontSize: 40,
    lineHeight: 30,
    textAlign: "center",
    fontFamily: "Koulen-Regular",
    color: "#000",
    position: "absolute",
  },
  today: {
    top: 155,
    left: 179,
    color: "#5c5c5c",
    textAlign: "left",
    fontFamily: "Inter-Regular",
  },
});

export default Screenwriters;
