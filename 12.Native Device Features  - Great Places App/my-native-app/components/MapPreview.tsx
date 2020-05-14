import React from 'react'
import { View, Text,Image,StyleSheet, ViewStyle} from 'react-native'
import env from '../env';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    location?:{
        lat:number,
        lng:number,
    },
    style:ViewStyle,
    onPress:()=>void;
}


const MapPreview:React.FC<Props> = (props) => {

    let imagePreviewUrl;

    if(props.location){

        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
            props.location.lat
          },${
            props.location.lng
          }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
            props.location.lat
          },${props.location.lng}&key=${env.googleApiKey}`;

    }

    console.log(imagePreviewUrl)

    return (
        <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
            {
                props.location?
                <Image 
                    style={styles.mapImage}
                    source={{uri:imagePreviewUrl}}
                />
                :props.children
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    mapImage: {
      width: '100%',
      height: '100%',
      // width:100,
      // height:100,
      //backgroundColor:'red'
    }
  });

export default MapPreview
