import React, { useEffect } from 'react'
import WebView from 'react-native-webview'
import { ActivityIndicator, StyleSheet, Linking, View, Text, StatusBar, Platform } from 'react-native'

const MapPoints = props => {
    let style = `
    * {
        margin: 0;
        padding: 0;
    }

    body {
        overflow: hidden;
    }

    main.map-page {
        margin: 0;
        height: 100%;
        width: 100%;
    }

    #globalmap {
        height: 100%;
        width: 100%;  
        margin: 0;
        position: absolute;
    }

    header,
    div.col-md-12.col-sm-12.align-left,
    .ymaps-2-1-77-map-copyrights-promo,
    .ymaps-2-1-77-copyright__wrap,
    div.leaflet-control-attribution.leaflet-control,
    div.leaflet-bar.leaflet-control,
    .ymaps-2-1-77-copyrights-pane,
    div.leaflet-control-container,
    div.map-box.box-content,
    footer {
        display: none;
    }
`
    const injectedJavaScript = `
        let meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
        let style = document.createElement('style');
        style.innerHTML = '${style.replace(/\r?\n?\s/g, "")}';
        document.head.appendChild(style);
        setInterval(() => {
            document.getElementById('globalmap').style.height = '1500px'
            document.getElementsByClassName('leaflet-yandex-layer')[0].style.height = '1500px'
            document.getElementsByClassName('ymaps-2-1-77-map')[0].style.height = '1500px'
            document.getElementsByClassName('ymaps-2-1-77-map')[1].style.height = '1500px'
            document.getElementsByClassName('ymaps-2-1-77-map')[2].style.height = '1500px'
            document.getElementsByClassName('ymaps-2-1-77-map')[3].style.height = '1500px'
        }, 200)
        // alert(localStorage)
        true;
        let scrollEventHandler = function() {
            window.scroll(0, window.pageXOffset)
          }
        document.addEventListener('scroll', scrollEventHandler, false);
        document.getElementById('scrollbar').style.display = 'block';
        document.body.style.overflow = 'hidden';
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



    return (
        <View style={styles.webview__wrapper}>
            <WebView
                useWebKit
                scrollEnabled={false}
                originWhitelist={['*']}
                ref={webView => { refWeb = webView; }}
                source={{ uri: 'https://ag.orb.ru/map' }}
                onMessage={(event) => { }}
                injectedJavaScript={injectedJavaScript}
                renderLoading={ActivityIndicatorLoadingView}
                javaScriptEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                bounces={false}
                showsVerticalScrollIndicator={false}
                // allowsBackForwardNavigationGestures
                onNavigationStateChange={(event) => {
                    if (event.url !== 'https://ag.orb.ru/map') {
                        refWeb.stopLoading()
                        refWeb.goBack()
                        props.navigation.navigate('PointCard', { screen: 'PointCard', event, headerBackTitle: 'Назад' })
                    }
                }}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    webview__wrapper: {
        flex: 1,
        position: 'relative'
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