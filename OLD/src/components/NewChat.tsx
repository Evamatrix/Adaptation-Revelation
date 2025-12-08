import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import Footer from "../components/footer"; // Update path if needed

const NewChat: React.FC = () => {
  return (
    <SafeAreaView style={styles.newChat}>
      <View style={styles.view}>
        <View style={[styles.child, styles.childLayout]} />
        <View style={[styles.item, styles.itemPosition]} />
        <View style={[styles.inner, styles.childBorder]} />
        <View style={[styles.rectangleView, styles.newChatChildBorder]} />
        <View style={[styles.newChatChild, styles.newChatChildBorder]} />
        <Text style={[styles.evelynH, styles.backFlexBox]}>EVELYN H.</Text>
        <Text style={[styles.am, styles.amTypo]}>10:05 am</Text>
        <Text style={[styles.newChatAm, styles.amTypo]}>11:47 am</Text>
        <Text style={[styles.am2, styles.amTypo]}>10:35 am</Text>
        <Text style={[styles.sendMessage, styles.makeTypo]}>Send message</Text>
        <Text style={[styles.sendMessage, styles.makeTypo]}>Send message</Text>
        <Text style={[styles.wsMakeA, styles.makeTypo]}>
          WS make a network 4 it ik lots who would join
        </Text>
        <Text style={[styles.today, styles.amTypo]}>Today</Text>
        <Text style={[styles.am3, styles.amTypo]}>10:11 am</Text>
        <View style={[styles.child2, styles.itemPosition]} />
        <Text style={[styles.text, styles.amTypo]}>+</Text>
        <Text style={[styles.illMakeOne, styles.makeTypo]}>I’ll make one!</Text>
        <View style={styles.groupView}>
          <View style={[styles.groupWrapper, styles.groupPosition]}>
            <View style={[styles.groupWrapper, styles.groupPosition]}>
              <View style={[styles.groupWrapper, styles.groupPosition]}>
                <View style={[styles.groupWrapper, styles.groupPosition]}>
                  <View style={[styles.groupChild, styles.groupPosition]} />
                  <Text style={[styles.back, styles.backPosition]}>Back</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  newChat: {
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
  itemPosition: {
    height: 57,
    top: 757,
    position: "absolute",
  },
  childBorder: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  newChatChildBorder: {
    backgroundColor: "#597aa4",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    borderRadius: 20,
    position: "absolute",
  },
  backFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: "Koulen-Regular",
    color: "#000",
    position: "absolute",
  },
  amTypo: {
    textAlign: "left",
    fontFamily: "Inter-Regular",
    position: "absolute",
  },
  makeTypo: {
    fontSize: 20,
    textAlign: "left",
    fontFamily: "Inter-Regular",
    position: "absolute",
  },
  groupPosition: {
    right: 0,
    width: 110,
    position: "absolute",
  },
  backPosition: {
    top: 0,
    height: 38,
  },
  view: {
    height: 956,
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#fff",
    flex: 1,
  },
  child: {
    top: 267,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    left: 50,
    position: "absolute",
  },
  item: {
    left: 40,
    borderRadius: 101,
    width: 306,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    backgroundColor: "#d9d9d9",
  },
  inner: {
    top: 477,
    width: 236,
    backgroundColor: "#d9d9d9",
    borderColor: "#000",
    borderStyle: "solid",
    borderRadius: 20,
    left: 50,
    position: "absolute",
    height: 117,
  },
  rectangleView: {
    top: 370,
    left: 239,
    height: 77,
    width: 171,
  },
  newChatChild: {
    top: 635,
    left: 248,
    width: 162,
    height: 54,
  },
  evelynH: {
    top: 109,
    left: 76,
    fontSize: 50,
    width: 315,
    height: 56,
  },
  am: {
    top: 355,
    color: "#5c5c5c",
    fontSize: 12,
    fontFamily: "Inter-Regular",
    left: 53,
  },
  newChatAm: {
    top: 695,
    left: 360,
    color: "#5c5c5c",
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  am2: {
    top: 605,
    color: "#5c5c5c",
    fontSize: 12,
    fontFamily: "Inter-Regular",
    left: 53,
  },
  sendMessage: {
    top: 774,
    left: 64,
    fontSize: 20,
    color: "#5c5c5c",
  },
  wsMakeA: {
    top: 497,
    width: 208,
    height: 84,
    left: 64,
    fontSize: 20,
    color: "#000",
  },
  today: {
    top: 198,
    left: 186,
    fontSize: 24,
    color: "#5c5c5c",
  },
  am3: {
    top: 453,
    left: 361,
    color: "#5c5c5c",
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  child2: {
    left: 358,
    borderRadius: 100,
    backgroundColor: "#4b75b3",
    width: 57,
  },
  text: {
    top: 754,
    left: 371,
    fontSize: 48,
    color: "#fff",
  },
  illMakeOne: {
    top: 650,
    left: 272,
    color: "#000",
  },
  groupView: {
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
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontFamily: "Koulen-Regular",
    color: "#000",
    position: "absolute",
  },
});

export default NewChat;
