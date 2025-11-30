import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import Footer from "../components/footer"; // Adjust the import path if needed

const Evelyn: React.FC = () => {
  return (
    <SafeAreaView style={styles.evelyn}>
      <View style={styles.view}>
        <View style={[styles.child, styles.childBorder]} />
        <Text style={[styles.clubs, styles.textTypo]}>6 clubs</Text>
        <Text style={[styles.evelynH, styles.backFlexBox]}>evelyn h.</Text>
        <View style={styles.item} />
        <View style={[styles.inner, styles.innerLayout]} />
        <View style={[styles.rectangleView, styles.innerLayout]} />
        <View style={[styles.evelynChild, styles.innerLayout]} />
        <Text style={[styles.mutualFriends, styles.textTypo]}>3 mutual friends</Text>
        <Text style={[styles.interests, styles.textTypo]}>6 interests</Text>
        <View style={[styles.rectanglePressable, styles.childLayout]} />
        <Text style={[styles.text, styles.textTypo]}>+</Text>
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
  evelyn: {
    backgroundColor: "#fff",
    flex: 1,
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
  backFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: "#000",
    fontFamily: "Koulen-Regular",
    position: "absolute",
  },
  innerLayout: {
    height: 36,
    width: 35,
    left: 76,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    position: "absolute",
    backgroundColor: "#fff",
  },
  childLayout: {
    borderRadius: 20,
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
    top: 245,
    left: 34,
    width: 386,
    height: 407,
    borderRadius: 20,
    position: "absolute",
    backgroundColor: "#fff",
  },
  clubs: {
    top: 534,
    width: 73,
    color: "#5c5c5c",
    fontSize: 20,
    left: 123,
    textAlign: "left",
    fontFamily: "Inter-Regular",
  },
  evelynH: {
    left: -10,
    fontSize: 50,
    width: 335,
    height: 56,
    top: 283,
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: "#000",
    fontFamily: "Koulen-Regular",
  },
  item: {
    left: 272,
    backgroundColor: "#5c5c5c",
    width: 126,
    height: 126,
    borderRadius: 100,
    top: 283,
    position: "absolute",
  },
  inner: {
    top: 416,
  },
  rectangleView: {
    top: 473,
  },
  evelynChild: {
    top: 528,
  },
  mutualFriends: {
    top: 422,
    width: 164,
    color: "#5c5c5c",
    fontSize: 20,
    left: 123,
    textAlign: "left",
    fontFamily: "Inter-Regular",
  },
  interests: {
    top: 479,
    width: 107,
    color: "#5c5c5c",
    fontSize: 20,
    left: 123,
    textAlign: "left",
    fontFamily: "Inter-Regular",
  },
  rectanglePressable: {
    top: 572,
    left: 196,
    backgroundColor: "#4b75b3",
    width: 67,
    height: 67,
  },
  text: {
    top: 574,
    left: 215,
    fontSize: 48,
    color: "#fff",
    width: 38,
    height: 69,
    textAlign: "left",
    fontFamily: "Inter-Regular",
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
    color: "#000",
    fontFamily: "Koulen-Regular",
    position: "absolute",
  },
});

export default Evelyn;
