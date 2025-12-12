import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import ClubCardMinimal from "../src/components/InfoCard/ClubCardMinimal";
import Screen from "../src/components/Screen";
import Colors from "../src/constants/colors";
import { getFont, useAppFonts } from "../src/constants/fonts";
import { useClubs } from "../src/context/ClubContext";
import { useFriends } from "../src/context/FriendsContext";

export default function Clubs() {
  const { friends } = useFriends();
  const router = useRouter();
  const fontsLoaded = useAppFonts();
  const { allClubs, setClubData } = useClubs();

  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  if (!fontsLoaded) return null;

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    Object.values(allClubs).forEach(club =>
      (club.tags || []).forEach(t => tagSet.add(t))
    );
    return Array.from(tagSet);
  }, [allClubs]);

  const filteredClubs = Object.entries(allClubs)
    .filter(([name]) => name.toLowerCase().includes(search.toLowerCase()))
    .filter(([_, club]) => {
      if (selectedFilters.length === 0) return true;
      const lowerTags = (club.tags || []).map(t => t.toLowerCase());
      return selectedFilters.some(f => lowerTags.includes(f.toLowerCase()));
    });

  return (
    <Screen>
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* Search + Filter */}
      <View style={{ flexDirection: "row", marginHorizontal: 16, marginTop: 70, marginBottom: 10 }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: Colors.text,
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontFamily: getFont("mono"),
            fontSize: 14,
            color: Colors.text,
            backgroundColor: Colors.primary,
          }}
          placeholder="Search clubs..."
          placeholderTextColor={Colors.placeholder}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={{
            marginLeft: 8,
            backgroundColor: Colors.secondary,
            borderRadius: 6,
            paddingHorizontal: 12,
            justifyContent: "center",
          }}
          onPress={() => setFilterVisible(true)}
        >
          <Text style={{ fontFamily: getFont("mono"), fontSize: 14, color: Colors.text }}>
            FILTER
          </Text>
        </TouchableOpacity>
      </View>

      {/* Club List */}
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {filteredClubs.map(([name, club], index) => (
          <ClubCardMinimal
            key={index}
            club={{
                name,
                description: club.description ?? "",
                members: club.members ?? 0,
                tags: club.tags ?? [],
                joined: club.joined ?? false,
            }}
            index={index}
            toggleJoinClub={() =>
                setClubData(name, {
                joined: !club.joined,
                members: (club.members || 0) + (club.joined ? -1 : 1),
                })
            }
            friends={friends}
            />

        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal visible={filterVisible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
          <View style={{ backgroundColor: Colors.backgroundSecondary, borderRadius: 12, padding: 20, width: "80%" }}>
            <Text style={{ fontFamily: getFont("heading"), fontSize: 18, marginBottom: 8 }}>Filter Clubs</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {availableTags.map((tag, i) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    backgroundColor: selectedFilters.includes(tag) ? Colors.tertiary : Colors.secondary,
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    margin: 4,
                  }}
                  onPress={() =>
                    setSelectedFilters(prev =>
                      prev.includes(tag) ? prev.filter(f => f !== tag) : [...prev, tag]
                    )
                  }
                >
                  <Text style={{ fontFamily: getFont("mono"), fontSize: 12, color: Colors.text }}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={{ marginTop: 12, backgroundColor: Colors.primary, borderRadius: 6, padding: 8, alignItems: "center" }}
              onPress={() => {
                setSelectedFilters([]);
                setFilterVisible(false);
              }}
            >
              <Text style={{ fontFamily: getFont("mono"), fontSize: 14, color: Colors.text }}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 8, backgroundColor: Colors.tertiary, borderRadius: 6, padding: 8, alignItems: "center" }}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={{ fontFamily: getFont("mono"), fontSize: 14, color: Colors.text }}>DONE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    </Screen>
  );
}
