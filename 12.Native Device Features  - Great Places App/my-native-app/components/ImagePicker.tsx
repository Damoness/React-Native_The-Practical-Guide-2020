import React, { useState } from "react";
import { View, Text, StyleSheet, Image ,Button} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";


type Props ={
    onImageTaken:(uri:string)=>void
}

const ImgPicker:React.FC<Props> = (props) => {

  const [pickedImage, setPickedImage] = useState<string | null>(null);

  let takeImageHandler = async () => {

    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    console.log(permissionResult);

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing:true,
        aspect:[16,9],
        quality:0.5,
    });

    console.log(pickerResult);

    if(!pickerResult.cancelled){
        setPickedImage(pickerResult.uri);
        props.onImageTaken(pickerResult.uri);
    }

  };

  return (
      <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            {pickedImage ? (
                <Image source={{ uri: pickedImage }} style={styles.image} />
            ) : (
                <Text>No image picked yet</Text>
            )}
        </View>

        <Button
            title="Take Image"
            onPress={takeImageHandler}
        />

      </View>

  );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
      },
  imagePreview: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: 16 / 9,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;
