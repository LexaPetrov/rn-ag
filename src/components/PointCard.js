import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'

const PointCard = props => {

    // console.log('props - ', props);

    let refWeb = null

    function ActivityIndicatorLoadingView() {
        return (
            <ActivityIndicator
                color="#2cd978"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }

    props.navigation.setOptions({
        headerTitle: props.route.params.event.title.includes('http') ? 'Обращение' : props.route.params.event.title
    })
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
        div.col-md-4.align-right {
            display: none;
        }

        .photo-container {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-between;
        }
        .col-md-4, .col-md-8 {
            padding: 0;
        }

        h3 {
            text-align: center;
            margin-top: 5px;
        }
     
    `



    const injectedJavaScript = `
        let meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
        let style = document.createElement('style');
        style.innerHTML = '${style.replace(/\r?\n?\s/g, "")}';
        document.head.appendChild(style);
        document.getElementsByClassName('col-md-8')[0].setAttribute('style', 'padding: 0;')
        document.getElementsByClassName('col-md-8')[1].setAttribute('style', 'padding: 0;')
        document.getElementsByClassName('col-md-8')[2].setAttribute('style', 'padding: 0;')
        document.getElementsByClassName('col-md-8')[3].setAttribute('style', 'padding: 0;')
        document.getElementsByClassName('col-md-8')[4].setAttribute('style', 'padding: 0;')
        true;
    `

    return (
        <WebView
            ref={webView => { refWeb = webView; }}
            useWebKit
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            originWhitelist={['*']}
            source={{ uri: props.route.params.event.url }}
            onMessage={(event) => { }}
            injectedJavaScript={injectedJavaScript}
            renderLoading={ActivityIndicatorLoadingView}
            javaScriptEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={false}
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

export default PointCard