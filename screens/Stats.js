import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function Stats() {
  return (
    <View>
      <Text>Chart</Text>
      <BarChart
        data={{
          labels: [
            "Morning Services",
            "Evening Training Classes",
            "Dawn Prayers",
            "Evening Bible Classes",
            "Evening Prayers",
            "Others",
          ],
          datasets: [
            {
              data: [15, 300, 215, 14, 141, 57],
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={800}
        yAxisInterval={1} // optional, defaults to 1
        verticalLabelRotation={35}
        chartConfig={{
          backgroundColor: "#24acf2",
          backgroundGradientFrom: "#24acf2",
          backgroundGradientTo: "#24acf2",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        // withHorizontalLabels={false}
        fromZero={true}
        showValuesOnTopOfBars={true}
        withInnerLines={false}
        withCustomBarColorFromData={true}
        // showBarTops={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
