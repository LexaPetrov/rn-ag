import React, { useEffect, useState } from 'react'
import WebView from 'react-native-webview'
import { ActivityIndicator, StyleSheet, View, StatusBar, Platform, ScrollView } from 'react-native'

const MapPoints = props => {
    let style = `
    * {
        margin: 0;
        padding: 0;
    }

    

    html, body {margin: 0; height: 100%; overflow: hidden}

    main.map-page {
        margin: 0;
        height: 100%;
        width: 100%;
    }

    header,
    div.col-md-12.col-sm-12.align-left,
    .ymaps-2-1-77-map-copyrights-promo,
    .ymaps-2-1-77-copyright__wrap,
    .leaflet-control-draw-measure,
    .leaflet-control-layers-toggle,
    div.leaflet-control-layers.leaflet-control,
    div.map-box.box-content,
    .map-edit-overlay,
    .ymaps-2-1-77-copyrights-pane,
    div.leaflet-bar.leaflet-control > a.leaflet-control-draw-measure,
    footer {
        display: none;
    }
    .map-edit-overlay {
        opacity: 0;
    }

    a.leaflet-control-zoom-in, a.leaflet-control-zoom-out {
        width: 50px !important;
        height: 50px !important;
    }

    .leaflet-container {
        -ms-touch-action: none; touch-action: none;
    }

`
// div.leaflet-control-attribution.leaflet-control,
// div.leaflet-bar.leaflet-control,
// div.leaflet-control-container,
// #globalmap {
//     height: 100%;
//     width: 100%;  
//     margin: 0;
//     position: absolute;
// }
// html, body {
//     overflow: hidden !important;
//     min-width: 100%;
//     height: 100% !important;
//     position: fixed; 
// }
    const injectedJavaScript = `
        let meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
        let style = document.createElement('style');
        style.innerHTML = '${style.replace(/\r?\n?\s/g, "")}';
        document.head.appendChild(style);
        setInterval(() => {
            document.getElementById('globalmap').style.height = window.innerHeight + 'px'
            document.getElementsByClassName('leaflet-yandex-layer')[0].style.height = window.innerHeight + 'px'
            document.getElementsByClassName('ymaps-2-1-77-map')[0].style.height = window.innerHeight + 'px'
            document.getElementsByClassName('ymaps-2-1-77-map')[1].style.height = window.innerHeight + 'px'
            document.getElementsByClassName('ymaps-2-1-77-map')[2].style.height = window.innerHeight + 'px'
            document.getElementsByClassName('ymaps-2-1-77-map')[3].style.height = window.innerHeight + 'px'
        }, 500)
        
        true;
    `
    function ActivityIndicatorLoadingView() {
        return (
            <ActivityIndicator
                color="#2cd978"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }
    let refWeb = null
    useEffect(() => {
        Platform.OS === 'ios' && StatusBar.setBarStyle('dark-content');
    })
    const [map_link, setLink] = useState(undefined)
    useEffect(() => {
        props.route.params !== undefined ? setLink(props.route.params.link) : null
    }, [props])
    return (
        <View style={styles.webview__wrapper}>
            <WebView 
            style={{flex:1, opacity:0.99}}
                // useWebKit
                // scrollEnabled={true}
                // originWhitelist={['*']}
                ref={webView => { refWeb = webView; }}
                source={{
                    uri: map_link !== undefined ? map_link : 'https://ag.orb.ru/map'
                }}
                onMessage={(event) => { }}
                injectedJavaScript={injectedJavaScript}
                renderLoading={ActivityIndicatorLoadingView}
                javaScriptEnabled={true}
                // scalesPageToFit={false}
                // bounces={false}
                // cacheEnabled={false}
                // overScrollMode='content'
                // showsVerticalScrollIndicator={false}
                onNavigationStateChange={(event) => {
                    // console.log('event url = ', event.url);
                    if (event.url !== 'https://ag.orb.ru/map' && !event.url.includes('map#create') && event.url.includes('points/id')) {
                        refWeb.stopLoading()
                        refWeb.goBack()
                        props.navigation.navigate('PointCard', { screen: 'PointCard', event, headerBackTitle: 'Назад' })
                    } else if (event.url.includes('form/point')) {
                        props.navigation.replace('PointCard', { screen: 'PointCard', event, headerBackTitle: 'Назад' })
                    }
                }}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('WebView error: ', nativeEvent);
                  }}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    webview__wrapper: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden'
    },

    ActivityIndicatorStyle: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    }
})


export default MapPoints