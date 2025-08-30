import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useEffect, useState } from "react";
import { Switch,Dimensions, Image, TouchableWithoutFeedback, ImageBackground, Keyboard, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [profileM, setProfileM] = useState(false);
  const [profileP, setProfileP] = useState(false);
  const [BlockM, setBlockM] = useState(false);
  const [VideoCall, setVideoCall] = useState(false); 
  const [isEditable, setIsEditable] = useState(false); 
  const [AnotherProfile, setAnotherProfile] = useState(false); 
  const [face, setFace] = useState(true)

    const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


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






{/* Options Modal */}
<Modal
  visible={profileM}
  animationType="fade"
  transparent
  onRequestClose={() => setProfileM(false)}
  onDismiss={() => setProfileM(false)}
>
  <TouchableWithoutFeedback onPress={() => setProfileM(false)}>
    <View style={styles.overlay}>
      <View style={styles.profileMCWrapper}>
        <TouchableOpacity
          onPress={() => {
            setProfileP(true);
            setProfileM(false);
          }}
          style={styles.profileMC}
        >
          <Text>My Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>
</Modal>


{/* Profile Modal */}
<Modal
  visible={profileP}
  animationType="slide"
  onRequestClose={() => {
    setProfileP(false)
    setIsEditable(false)
  }}
  onDismiss={() => {setProfileP(false)
    setIsEditable(false)
  }}
>
  <View style={styles.profilePG}>
    
    {/* Header */}
    <View style={styles.headHome}>
      <TouchableOpacity onPress={() => {setProfileP(false)
        setIsEditable(false)
      }} style={styles.btnPD}>
        <Feather name="chevron-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.headtitle}>My profile</Text>

      <TouchableOpacity onPress={handlePress} style={[styles.btnPD, styles.btnT]}>
        <Text>{isEditable ? "Save" : "Edit"}</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.hr} />

    {/* Profile Info */}
    <View style={styles.profile}>
      <Image
        style={[styles.userChatIcon, styles.profPic]}
        source={{ uri: "https://abzdevs.vercel.app/images/abz.jpg" }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Text style={styles.fontProfName}>AbdulAzeez Sani</Text>
          <Text style={styles.spn}>(219)555-948-9474</Text>
        </View>
        {isEditable && (
          <TouchableOpacity style={{ marginLeft: 8 }}>
            <Entypo name="pencil" size={18} color="black" style={styles.spn} />
          </TouchableOpacity>
        )}
      </View>
    </View>

    <View style={styles.hr} />

    {/* Bio */}
    <View style={styles.info}>
      <View>
        <Text>Hello Im AbdoulAzeez Abz!</Text>
        <Text style={styles.spn}>August 5 2025</Text>
      </View>
      {isEditable && (
        <TouchableOpacity>
          <Entypo name="pencil" size={19} color="black" style={[styles.searchbox, styles.spn]} />
        </TouchableOpacity>
      )}
    </View>

    <View style={styles.hr} />

    {/* Country */}
    <View style={[styles.info, styles.country]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome5
          name="globe-africa"
          size={17}
          color="black"
          style={styles.searchIcon}
        />
        <Text> Country</Text>
        {isEditable && (
          <TouchableOpacity>
            <Entypo name="pencil" size={18} color="black" style={[styles.searchbox, styles.spn]} />
          </TouchableOpacity>
        )}
      </View>
      <Image
        style={[styles.userChatIcon, styles.couun]}
        source={{
          uri: "https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/nigeria-flag-round-circle-icon.png",
        }}
      />
    </View>

    <View style={styles.hr} />

    {/* Email + Website */}
    <View style={styles.info}>
      <View>
        <View style={[styles.searchbox, styles.normalInput]}>
          <Fontisto name="email" size={14} color="black" style={styles.searchIcon} />
          <TextInput editable={false} value="trackd10@gmail.com" style={styles.searchInput} />
        </View>
        <View style={[styles.searchbox, styles.normalInput]}>
          <Entypo name="network" size={17} color="black" style={styles.searchIcon} />
          <TextInput editable={false} value="www.trackd.live" style={styles.searchInput} />
        </View>
      </View>
      {isEditable && (
        <TouchableOpacity>
          <Entypo name="pencil" size={18} color="black" style={[styles.searchbox, styles.spn]} />
        </TouchableOpacity>
      )}
    </View>

  </View>
</Modal>











{/* Profile Modal */}
<Modal
  visible={AnotherProfile}
  animationType="slide"
  onRequestClose={() => {
    setAnotherProfile(false)
  }}
  onDismiss={() => {setAnotherProfile(false)
  }}
>
  <ScrollView style={styles.profilePG}>
    
    {/* Header */}
    <View style={styles.headHome}>
      <TouchableOpacity onPress={() => {setAnotherProfile(false)
      }} style={styles.btnPD}>
        <Feather name="chevron-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.headtitle}>Profile</Text>

      <TouchableOpacity style={[styles.btnPD, styles.btnT]}>
        <SimpleLineIcons name="options-vertical" size={17} color="black" />
      </TouchableOpacity>
    </View>

    <View style={styles.hr} />

    {/* Profile Info */}
    <View style={styles.profile}>
      <Image
        style={[styles.userChatIcon, styles.profPic]}
        source={{ uri: "https://abzdevs.vercel.app/images/abz.jpg" }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Text style={styles.fontProfName}>AbdulAzeez Sani</Text>
          <Text style={styles.spn}>(219)555-948-9474</Text>
        </View>
        {isEditable && (
          <TouchableOpacity style={{ marginLeft: 8 }}>
            <Entypo name="pencil" size={18} color="black" style={styles.spn} />
          </TouchableOpacity>
        )}
      </View>
    </View>

    <View style={styles.hr} />

    {/* Bio */}
    <View style={styles.info}>
      <View>
        <Text>Hello Im AbdoulAzeez Abz</Text>
        <Text style={styles.spn}>August 5 2025</Text>
      </View>
      {isEditable && (
        <TouchableOpacity>
          <Entypo name="pencil" size={19} color="black" style={[styles.searchbox, styles.spn]} />
        </TouchableOpacity>
      )}
    </View>

    <View style={styles.hr} />

    {/* Country */}
    <View style={[styles.info, styles.country]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome5
          name="globe-africa"
          size={17}
          color="black"
          style={styles.searchIcon}
        />
        <Text> Mute notification</Text>
        {isEditable && (
          <TouchableOpacity>
            <Entypo name="pencil" size={18} color="black" style={[styles.searchbox, styles.spn]} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.label}>{isEnabled ? "Enabled" : "Disabled"}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#f5dd4b" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

    </View>

        {/* Country */}
    <View style={[styles.info, styles.country, {marginTop:5}]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome5
          name="globe-africa"
          size={17}
          color="black"
          style={styles.searchIcon}
        />
        <Text> Country</Text>
        {isEditable && (
          <TouchableOpacity>
            <Entypo name="pencil" size={18} color="black" style={[styles.searchbox, styles.spn]} />
          </TouchableOpacity>
        )}
      </View>
      <Image
        style={[styles.userChatIcon, styles.couun]}
        source={{
          uri: "https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/nigeria-flag-round-circle-icon.png",
        }}
      />

    </View>


    

    <View style={styles.hr} />

    {/* Email + Website */}
    <View style={styles.info}>
      <View>
        <View style={[styles.searchbox, styles.normalInput]}>
          <Fontisto name="email" size={14} color="black" style={styles.searchIcon} />
          <TextInput editable={false} value="trackd10@gmail.com" style={styles.searchInput} />
        </View>
        <View style={[styles.searchbox, styles.normalInput]}>
          <Entypo name="network" size={17} color="black" style={styles.searchIcon} />
          <TextInput editable={false} value="www.trackd.live" style={styles.searchInput} />
        </View>
      </View>
      {isEditable && (
        <TouchableOpacity>
          <Entypo name="pencil" size={18} color="black" style={[styles.searchbox, styles.spn]} />
        </TouchableOpacity>
      )}
    </View>

    <View style={styles.hr}></View>

   <View style={styles.mnnn}>
  {/* Block Contact */}
  <TouchableOpacity onPress={() => setBlockM(true)} style={styles.optionBtn}>
    {/* <MaterialCommunityIcons name="cancel" size={18} color="red" /> */}
    <Text style={styles.mntt}> Block Contact</Text>
  </TouchableOpacity>

  {/* Report Contact */}
  <TouchableOpacity onPress={() => setBlockM(true)} style={styles.optionBtn}>
    {/* <AntDesign name="dislike2" size={18} color="red" /> */}
    <Text style={styles.mntt}> Report Contact</Text>
  </TouchableOpacity>
</View>


     

  </ScrollView>
</Modal>




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
              
              
               <TouchableOpacity onPress={()=> setAnotherProfile(true)}>
                              
              <Image style={[styles.userChatIcon, styles.chatPersPic]} source={{ uri: "https://abzdevs.vercel.app/images/abz.jpg" }}/>
              </TouchableOpacity>
               <TouchableOpacity onPress={()=> setAnotherProfile(true)}>
                       <Text style={[styles.headtitle, styles.chatPersName]}>User name</Text>
           </TouchableOpacity>
            </View>
            <View style={styles.chatHead}>
              <TouchableOpacity onPress={()=> setVideoCall(true) }>
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




      {/* Block PAGE */}
<Modal
visible={BlockM}
animationType='slide'
onRequestClose={()=> setBlockM(false) }
transparent={true}>
  <View style={styles.overlayy}>
    <View style={styles.contt}>
      <Text style={[styles.fontBold, styles.heee]}>
        Block and Report This User?
      </Text>

      <View style={styles.flxx}>
        <TouchableOpacity onPress={()=> setBlockM(false) }>
          <Text style={styles.btnnn}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> setBlockM(false) }>
          <Text style={[styles.btnnn, styles.active]}>Yes, Block</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>













      {/* VIDEO CALL PAGE */}
      <Modal animationType='fade' onRequestClose={()=> setVideoCall(false)} visible={VideoCall}>
        <View style={styles.videoCall}>
          <ImageBackground style={styles.videoBG} 
          source={
              face
      ? require("../../assets/images/street.jpg")
      : require("../../assets/images/facetime.jpg")
          }
          >
            <View style={styles.topVideo}>
              <View>

                <Text style={styles.usName}>AbdulAzeez Bello</Text>
                <Text style={[styles.usName, styles.ustime]}>02:34:3s</Text>
              </View>
              <View>
              <Image style={styles.imageUs} 
              source={require("../../assets/images/user.jpg")} />
              </View>
            </View>



            <View style={styles.transBox}>
             <View> 
              <Text style={[styles.textMini, styles.fontBold]}>Transcript </Text>
              <Text style={styles.textMini}>Hello </Text>
              <Text style={styles.textMini}>How are u </Text>
              <Text style={styles.textMini}>im Fine </Text>
               </View>
               
                 <View><Image
        style={[styles.couun, styles.transs]}
        source={{
          uri: "https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/nigeria-flag-round-circle-icon.png",
        }}
      /></View>


            </View>




            <View style={styles.callActions}>
              <TouchableOpacity>
                <Entypo name="light-up" style={[styles.SendChatIcon, styles.btnActions]}  size={23} color="white" />
                <Text  style={styles.cent}>Effects</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <FontAwesome name="microphone-slash" style={[styles.SendChatIcon, styles.btnActions]}  size={23} color="white" />
                <Text  style={styles.cent}>Mute</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{
                if (face) {
                  setFace(false)
                }else{
                  setFace(true)
                }
              }}>
                <Ionicons name="camera-reverse-sharp" style={[styles.SendChatIcon, styles.btnActions]}  size={23} color="white" />
                <Text style={styles.cent}>Flip</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{
                setVideoCall(false)
              }}>
                <AntDesign name="close" style={[styles.SendChatIcon, styles.btnActions, styles.dangerBTN]}  size={23} color="white" />
                <Text style={styles.cent}>End</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
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

  profilePG:{ flex:1, marginBottom:10, },

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
  profileMCWrapper: {
  backgroundColor: "white",
  borderRadius: 10,
  padding: 20,
  position:"absolute",
  top:0,
  right:10
},
  hr:{ height:1, marginVertical:20, width:"100%", backgroundColor:"rgba(243, 189, 39, 1)" },

  fontProfName:{ fontSize:20, color:"rgba(0,0,0)", marginTop:10, fontWeight:"500" }, spn:{ color:"rgba(0,0,0, 0.6)" },
  profile:{ justifyContent:"center", alignItems:"center" }, profPic:{ width:100, height:100, marginTop:20 },
  info:{ paddingHorizontal:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center" },
country:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center" }, couun:{ width:30, height:30 }, normalInput:{ backgroundColor:"transparent", borderWidth:1, borderColor:"rgba(0,0,0, 0.4)", borderRadius:7 },
  btnT:{ backgroundColor:"rgba(235, 204, 102, 1)", height:30, borderRadius:10, justifyContent:"center", alignItems:"center", },

  overlay:{ flex: 1, justifyContent: 'center', alignItems: 'center' },

  
  profileMC:{ backgroundColor:"rgba(235, 204, 102, 1)", height:30, borderRadius:10, width:80, justifyContent:"center", alignItems:"center", position:"absolute", right:25, top:28, },
  btnbtnholder:{
    alignItems:"center"
  },

  btnbtnholdTt:{
    fontSize:12,
    paddingTop:3,
    color:"rgba(0,0,0,0.7)",
  },

  videoCall:{
    flex:1,
    width:"100%",
    backgroundColor:"rgba(235, 204, 102, 1)",
  },

  videoBG:{
    width:"100%",
    height:"100%"
  },

  topVideo:{
    flexDirection:"row",
    justifyContent:"space-around",
    padding:20,
    alignItems:"center",
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
    backgroundColor:"rgba(235, 204, 102, 0.1)"
  },
  imageUs:{
    width:90,
    height:90,
    borderRadius:10,
    borderWidth:2,
    borderColor:"white"
  },
  usName:{
    fontSize:18,
    paddingTop:10,
    color:"white"
  },

  ustime:{
    fontSize:12,
    padding:0,
    marginTop:-10
  },


  label: {
    fontSize: 10,
    // marginBottom: 10,
  },


  transBox:{
    position:"absolute",
    left:20,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"flex-start",
    padding:5,
    bottom:"20%",
    height:100,
    width:150,
    borderRadius:10,
    backgroundColor:"rgba(235, 204, 102, 1)"
  },

  transs:{
    width:20,
    height:20,
  },

  textMini:{
    fontSize:12,
  },

  callActions:{
    width:"100%",
    height:"18%",
    flexDirection:"row",
    justifyContent:"space-around",
    position:"absolute",
    bottom:0,
    backgroundColor:"rgba(0, 0, 0, 0.66)",
    alignItems:"center",
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    // textAlign:"center"
    // alignContent:"center"
  },

  btnActions:{
    color:"white",
    backgroundColor:"rgba(255, 255, 255, 0.28)"
    // padding:30
  },

  dangerBTN:{
    backgroundColor:"red"
  },

  cent:{
    textAlign:"center",
    color:"white",
    fontSize:11,
    marginTop:4
  },
  overlayy:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.2)",
  },

  contt:{
    width:"100%",
    height:"20%",
    backgroundColor:"white",
    position:"absolute",
    bottom:0,
    boxShadow:"2px",
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    padding:20
  },
  heee:{
    color:"rgba(235, 204, 102, 1)",
    textAlign:"center",
    fontSize:17
  },

  flxx:{
    flexDirection:"row",
    justifyContent:"space-around",
    padding:20,
  },

  btnnn:{
    padding:10,
    backgroundColor:"transparent",
    width:150,
    textAlign:"center",
    borderWidth:2,
    borderRadius:20,
    margin:3,
  },

  active:{
    color:"white",
    backgroundColor:"black"
  },
  mnnn:{
    gap:10
  },
  mntt:{
    color:"red",
    fontWeight:"600",
    paddingLeft:20,
    gap:20
  }


});
