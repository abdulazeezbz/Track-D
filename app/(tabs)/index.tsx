import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useEffect, useState } from "react";
import { Dimensions, Image, Keyboard, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [profileM, setProfileM] = useState(false);
  const [profileP, setProfileP] = useState(false);
  const [isEditable, setIsEditable] = useState(false); 
  const [text, setText] = useState("Default text");

  const [chatBox, setChatBox] = useState(false);

  const handlePress = () => {
    if (isEditable) {
      console.log("Saved:", text);
      // here you could call API or save to DB
    }
    setIsEditable(!isEditable);
  };

  // --- Custom Panel State ---
  const [buttonPanel, setButtonPanel] = useState(false); 
  const [keyboardHeight, setKeyboardHeight] = useState(300); 

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (event) => {
      setKeyboardHeight(event.endCoordinates.height); 
    });

    return () => {
      showSub.remove();
    };
  }, []);

  // --- Toggle Button Panel ---
  const toggleButtonPanel = () => {
    if (buttonPanel) {
      setButtonPanel(false);
    } else {
      Keyboard.dismiss(); // hide keyboard before showing panel
      setButtonPanel(true);
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle={"dark-content"} />

      {/* Header */}
      <View style={styles.headHome}>
        <TouchableOpacity style={styles.btnPD}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headtitle}>Contacts</Text>
        <TouchableOpacity style={styles.btnPD} onPress={() => setProfileM(true)}>
          <SimpleLineIcons name="options-vertical" size={17} color="black" />
        </TouchableOpacity>
      </View>

      {/* Searchbox */}
      <View style={styles.searchbox}>
        <Feather style={styles.searchIcon} name="search" size={17} color="black" />
        <TextInput autoCapitalize="words" style={styles.searchInput} placeholder='Search Contacts'/>
      </View>

      {/* Contacts Counter + Sort */}
      <View style={styles.flex}>
        <Text style={styles.fontBold}>50 Contacts Available</Text>
        <View style={[styles.flex, styles.flexB]}>
          <FontAwesome  name="sort-alpha-asc" size={17} color="black" />
          <Ionicons name="options-sharp" size={17} color="black" />
        </View>
      </View>

      {/* Chat List */}
      <ScrollView style={styles.chatHist}>
        {[
          { name: "ABZ", img: "https://abzdevs.vercel.app/images/abz.jpg" },
          { name: "AbdulAzeez", img: "https://abzdevs.vercel.app/images/abz.jpg" },
          { name: "Abdullahi", img: "https://picsum.photos/200" },
          { name: "Sani", img: "https://picsum.photos/id/64/200/300" },
          { name: "Kabiru", img: "https://picsum.photos/id/87/200/300" },
          { name: "Jibrin", img: "https://picsum.photos/id/84/200/300" },
          { name: "Saminu", img: "https://picsum.photos/id/2/200/300" },
          { name: "Abubakar", img: "https://picsum.photos/id/30/200/300" },
          { name: "Saleh", img: "https://picsum.photos/id/36/200/300" },
          { name: "Abdullahi", img: "https://picsum.photos/id/20/200/300" },
        ].map((user, idx) => (
          <TouchableOpacity onPress={()=>{ setChatBox(true) }} key={idx} style={styles.chatList}>
            <Image style={styles.userChatIcon} source={{uri:user.img}}/>
            <View>
              <Text style={styles.userChatName}>{user.name}</Text>
              <Text style={styles.userChatmsg}>this is the last Message</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* CHAT PAGE */}
      <Modal animationType={"fade"} onRequestClose={()=>{
        setButtonPanel(false); 
        setChatBox(false)
        }
        } visible={chatBox}>
        <View style={styles.profilePG}>
          {/* Header */}
          <View style={styles.headHome}>
            <View style={styles.chatHead}>
              <TouchableOpacity onPress={()=> { 
                setButtonPanel(false) 
                setChatBox(false)
                }} style={styles.btnPD}>
                <Feather name="chevron-left" size={24} color="black" />
              </TouchableOpacity>
              <Image style={[styles.userChatIcon, styles.chatPersPic]} source={{ uri: "https://abzdevs.vercel.app/images/abz.jpg" }}/>
              <Text style={[styles.headtitle, styles.chatPersName]}>User name</Text>
            </View>
            <View style={styles.chatHead}>
              <TouchableOpacity>
                <MaterialIcons name="video-call" size={18} color="black" style={styles.chatHeadIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="phone" size={18} color="black" style={styles.chatHeadIcon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <SimpleLineIcons name="options-vertical" size={18} color="black" style={[styles.chatHeadIcon, styles.listOut]} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.ChatsList}>
            <View style={[styles.chatMsg]}><Text style={styles.msg}>Hello Dear</Text></View>
            <View style={[styles.chatMsg, styles.ChatMsgMine]}><Text style={styles.msg}>How are you!</Text></View>


              <View style={[styles.chatMsg]}><Text style={styles.msg}>Hello Dear</Text></View>
            <View style={[styles.chatMsg, styles.ChatMsgMine]}><Text style={styles.msg}>How are you!</Text></View>

              <View style={[styles.chatMsg]}><Text style={styles.msg}>Hello Dear</Text></View>
            <View style={[styles.chatMsg, styles.ChatMsgMine]}><Text style={styles.msg}>How are you!</Text></View>
            <View style={[styles.chatMsg,]}><Text style={styles.msg}>
              <MaterialCommunityIcons name="waveform" size={32} color="black" />
              <MaterialCommunityIcons name="waveform" size={32} color="black" />
              <MaterialCommunityIcons name="waveform" size={32} color="black" />
              <MaterialCommunityIcons name="waveform" size={32} color="black" />
              </Text></View>
            <View style={[styles.chatMsg, styles.ChatMsgMine]}><Text style={styles.msg}>How are you!</Text></View>

              <View style={[styles.chatMsg]}><Text style={styles.msg}>Hello Dear</Text></View>
            <View style={[styles.chatMsg, styles.ChatMsgMine]}><Text style={styles.msg}>How are you!</Text></View>

              <View style={[styles.chatMsg]}><Text style={styles.msg}>Hello Dear</Text></View>
            <View style={[styles.chatMsg, styles.ChatMsgMine]}><Text style={styles.msg}>How are you!</Text></View>
          </ScrollView>

          {/* Chat input above panel */}
          <View style={[styles.searchbox, styles.ChatText, { bottom: buttonPanel ? keyboardHeight : 3 }]}>
            <View style={styles.ChatBInput}>
              <TouchableOpacity>
                <MaterialIcons style={[styles.searchIcon, styles.chatIcons]} name="keyboard-voice" size={24} color="black" />
              </TouchableOpacity>
              <TextInput onFocus={()=> setButtonPanel(false) } style={[styles.searchInput, styles.chatInput]} placeholder='Start a conversation'/>
              <TouchableOpacity onPress={toggleButtonPanel}>
                <Entypo style={[styles.searchIcon, styles.chatIcons]} name="attachment" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <FontAwesome style={styles.SendChatIcon} name="location-arrow" size={23} color="white" />
          </View>

          {/* Custom Panel */}
          {buttonPanel && (
            <View style={[styles.buttonPanel, { height: keyboardHeight }]}>
              <View style={styles.btnbtnholder}>
                <Ionicons name="albums-outline" style={[styles.SendChatIcon, styles.newBtnIcons]} size={23} color="white" />
                <Text style={styles.btnbtnholdTt}>Album</Text>
              </View>

              <View style={styles.btnbtnholder}>
                <Feather name="camera" style={[styles.SendChatIcon, styles.newBtnIcons]} size={23} color="white" />
                <Text style={styles.btnbtnholdTt}>Camera</Text>
              </View>

              <View style={styles.btnbtnholder}>
                <Entypo name="location-pin" style={[styles.SendChatIcon, styles.newBtnIcons]} size={23} color="white" />
                <Text style={styles.btnbtnholdTt}>Location</Text>
              </View>

              <View style={styles.btnbtnholder}>
                <AntDesign name="mail" style={[styles.SendChatIcon, styles.newBtnIcons]} size={23} color="white" />
                <Text style={styles.btnbtnholdTt}>Red Packet</Text>
              </View>

              <View style={styles.btnbtnholder}>
                <Feather name="gift" style={[styles.SendChatIcon, styles.newBtnIcons]} size={23} color="white" />
                <Text style={styles.btnbtnholdTt}>Gift</Text>
              </View>

              <View style={styles.btnbtnholder}>
                <MaterialIcons name="compare-arrows" style={[styles.SendChatIcon, styles.newBtnIcons]} size={23} color="white" />
                <Text style={styles.btnbtnholdTt}>Transfer</Text>
              </View>

              <View style={styles.btnbtnholder}>
                <MaterialIcons name="keyboard-voice" style={[styles.SendChatIcon, styles.newBtnIcons]} size={23} color="white" />
                <Text style={styles.btnbtnholdTt}>Voice input</Text>
              </View>

              <View style={styles.btnbtnholder}>
                <MaterialIcons name="favorite-outline" style={[styles.SendChatIcon, styles.newBtnIcons]} size={23} color="white" />
                <Text style={styles.btnbtnholdTt}>Favourite</Text>
              </View>

              <View style={styles.btnbtnholder}>
                <AntDesign name="idcard" style={[styles.SendChatIcon, styles.newBtnIcons]} size={23} color="white" />
                <Text style={styles.btnbtnholdTt}>Contact Card</Text>
              </View>

              <View style={styles.btnbtnholder}>
                <AntDesign name="file1" style={[styles.SendChatIcon, styles.newBtnIcons]} size={23} color="white" />
                <Text style={styles.btnbtnholdTt}>file</Text>
              </View>

              <View style={styles.btnbtnholder}>
                <FontAwesome name="music" style={[styles.SendChatIcon, styles.newBtnIcons]} size={23} color="white" />
                <Text style={styles.btnbtnholdTt}>Music</Text>
              </View>

              <View style={styles.btnbtnholder}>
                <FontAwesome name="book" style={[styles.SendChatIcon, styles.newBtnIcons]} size={23} color="white" />
                <Text style={styles.btnbtnholdTt}>Document</Text>
              </View>
              
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Container:{ flex:1, padding:10 },
  headHome:{ flexDirection: "row", padding:10, paddingTop: 40, justifyContent:"space-between", alignItems:"center" },
  headtitle:{ fontSize:18 },
  searchbox:{ flexDirection:"row", gap:6, padding:2, borderRadius:10, marginTop:10, alignItems:"center", backgroundColor: "rgba(40, 35, 102, 0.1)" },
  searchIcon:{ color: "rgba(0,0,0,0.5)", marginLeft:10 },
  searchInput:{ width:280 },
  flex:{ flexDirection: "row", padding:10, justifyContent:"space-between", alignItems:"center" },
  flexB:{ gap:10 },
  fontBold:{ fontWeight:"bold" },
  chatHist:{ paddingBottom:100, marginBottom:35 },
  chatList:{ flexDirection:"row", padding:10, marginTop:5, gap:10, backgroundColor: "rgba(40, 35, 102, 0.01)", borderRadius:10 },
  userChatIcon:{ width:45, height:45, borderRadius:50 },
  userChatName:{ fontWeight:"bold", fontSize: 14 },
  userChatmsg:{ color:"rgba(0,0,0,0.6)" },

  profilePG:{ flex:1 },

  // Chat Page
  chatHead:{ flexDirection:"row", alignItems:"center"  },
  chatPersName:{ fontWeight:"500", fontSize:14 },
  chatPersPic:{ width:30, height:30, marginRight:10, marginLeft:-7 },
  chatHeadIcon:{ padding:6, borderRadius:50, marginLeft:5, marginRight:5, borderWidth:1, borderColor:"rgba(0,0,0,0.4)" },
  listOut:{ borderWidth:0 },
  chatMsg:{ backgroundColor: "rgba(235, 204, 102, 1)", padding: 10, borderTopLeftRadius:0, borderTopRightRadius:25, borderBottomRightRadius:25, borderBottomLeftRadius:25, alignSelf: "flex-start", maxWidth: width * 0.7, margin:10 },
  msg:{ fontSize: 16, flexShrink: 1 },  
  ChatMsgMine:{ alignSelf: "flex-end", borderTopLeftRadius:25, borderTopRightRadius:0, borderBottomRightRadius:25, borderBottomLeftRadius:25 },
  ChatsList:{ marginBottom:60 },

  ChatText:{ position:"absolute", width:"98%", backgroundColor:"transparent", marginLeft:3, justifyContent:"space-around" },

  ChatBInput:{ backgroundColor:"rgba(0, 0, 0, 0.13)", padding:7, borderRadius:40, flexDirection:"row", justifyContent:"space-between", alignItems:"center" },
  chatInput:{ width:"70%", marginLeft:-20, marginRight:-20 },
  SendChatIcon:{ padding:15, borderRadius:50, textAlign:"center", alignSelf:"center", justifyContent:"center", flexDirection:"row", backgroundColor: "black" },
  chatIcons:{ marginLeft:10, marginRight:10, color:"black" },

  btnPD:{ paddingHorizontal:20 },

  buttonPanel: { 
    width: "100%", 
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
    justifyContent: "center", 
    alignItems: "center" ,
    flexDirection:"row",
    gap:20,
    flexWrap:"wrap"
  },
  newBtnIcons:{
    backgroundColor:"rgba(0,0,0,0.1)",
    color: "black",
    width:55,
    marginLeft:7,
    marginRight:7,
    padding:15,
  },

  btnbtnholder:{
    alignItems:"center"
  },

  btnbtnholdTt:{
    fontSize:12,
    paddingTop:3,
    color:"rgba(0,0,0,0.7)",
  }


});
