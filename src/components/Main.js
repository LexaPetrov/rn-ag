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
        div.center,
        .fullmap {
            display: none;
        }
        .card-block > h3 > a, .item-icon {
            pointer-events: none;
            cursor: default;
            text-decoration: none;
        }

        .pagination {
            display: flex;
            flex-direction: row;
            width: 100%;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        .pagination > a, .pagination > strong {
            width: 44px;
            padding: 0px 0px !important;
            margin-right: 0px;
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

    let refWeb = null

    return (
        <View style={styles.webview__wrapper}>
            <WebView
                ref={webView => { refWeb = webView; }}
                useWebKit
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                originWhitelist={['*']}
                source={{ uri: 'https://ag.orb.ru/points/list' }}
                onMessage={(event) => { }}
                injectedJavaScript={injectedJavaScript}
                renderLoading={ActivityIndicatorLoadingView}
                javaScriptEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={false}
                onNavigationStateChange={(event) => {
                    Platform.OS === 'ios' && StatusBar.setBarStyle('dark-content');
                    // console.log('Main - ', event.url);
                    if (!event.url.includes('https://ag.orb.ru/points/list') && !event.url.includes('cat') && !event.url.includes('map')) {
                        refWeb.stopLoading()
                        refWeb.goBack()
                        let redirect = `window.location = 'https://ag.orb.ru/points/list'`
                        refWeb.injectJavaScript(redirect)
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

export default Main