import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View, StatusBar } from 'react-native'
import WebView from 'react-native-webview'

const Main = props => {
    let style = `
        * {
            margin: 0;
            padding: 0;
        }
        main {
            margin: 0;
            padding-top: 10px;
        }
        header,
        footer,
        .wrapper.wellcome,
        .statistics,
        div.header,
        div.clear,
        br,
        div.center {
            display: none;
        }
        .card-block > h3 > a, .item-icon {
            pointer-events: none;
            cursor: default;
            text-decoration: none;
        }
    `



    const injectedJavaScript = `
        let meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
        let style = document.createElement('style');
        style.innerHTML = '${style.replace(/\r?\n?\s/g, "")}';
        document.head.appendChild(style);
        // document.getElementsByClassName('item-icon').setAttribute('href', '')
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

    useEffect(() => {
        Platform.OS === 'ios' && StatusBar.setBarStyle('dark-content');
    })

    let refWeb = null


    return (
        <WebView
            ref={webView => { refWeb = webView; }}
            useWebKit
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            originWhitelist={['*']}
            source={{ uri: 'https://ag.orb.ru/' }}
            onMessage={(event) => { }}
            injectedJavaScript={injectedJavaScript}
            renderLoading={ActivityIndicatorLoadingView}
            javaScriptEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={false}
            onNavigationStateChange={(event) => {
                if (event.url !== 'https://ag.orb.ru/' && !event.url.includes('cat') && !event.url.includes('map')) {
                    refWeb.stopLoading()
                    refWeb.goBack()
                    let redirect = `window.location = 'https://ag.orb.ru/'`
                    refWeb.injectJavaScript(redirect)
                    props.navigation.navigate('PointCard', { screen: 'PointCard', event, headerBackTitle: 'Назад' })
                }
            }}
        />
    )
}

const styles = StyleSheet.create({
    ActivityIndicatorStyle: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    }
})

export default Main