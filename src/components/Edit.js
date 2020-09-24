import React from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import WebView from 'react-native-webview'

const Edit = props => {
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
        div.clear,
        br,
        div.center,
        div.header > p,
        div.header > div > a,
        section.fullmap,
        .box-content > p,
        .btn.btn-warning,
        .btn.btn-success {
            display: none;
        }

        .fright {
            position:relative;
            overflow:hidden;
        }
        .save {
            position: absolute;
            left: -9999px;
        }
    `
    const injectedJavaScript = `
        let meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
        let style = document.createElement('style');
        style.innerHTML = '${style.replace(/\r?\n?\s/g, "")}';
        document.head.appendChild(style);
        // document.getElementsByClassName('fright')[0].innerHTML += '<div class="save"><a id="save"  href="javascript://" data-role="save">Сохранить</a></div>'
        true;
    `

    props.navigation.setOptions({
        headerTitle:  'Редактировать' 
        // headerTitle: props.route.params.event.title.includes('http') ? 'Обращение' : props.route.params.event.title
    })

    return (
        <View><Text>sasa</Text></View>
        // <View style={styles.webview__wrapper}>
        //     <WebView
        //         ref={webView => { refWeb = webView; }}
        //         useWebKit
        //         scrollEnabled={true}
        //         showsVerticalScrollIndicator={false}
        //         originWhitelist={['*']}
        //         source={{ uri: props.route.params.event.url }}
        //         onMessage={(event) => { }}
        //         injectedJavaScript={injectedJavaScript}
        //         renderLoading={ActivityIndicatorLoadingView}
        //         // allowsBackForwardNavigationGestures
        //         onLoadStart={e => {
        //             // refWeb.injectJavaScript(`document.getElementsByTagName('body')[0].style.display = 'none'`)
        //         }}
        //         // onLoadEnd={(e) => {
        //         //     if (e.nativeEvent.url === 'https://ag.orb.ru/') {
        //         //         const redirectTo = `
        //         //         let div = document.getElementById('dropdown-user');
        //         //         let a = div.getElementsByTagName('a');
        //         //         window.location = a[0].href;
        //         //         true;
        //         //     `
        //         //         // refWeb.injectJavaScript(`document.getElementsByTagName('body')[0].style.display = 'block'`)
        //         //         refWeb.injectJavaScript(redirectTo);
        //         //     }
        //         // }}
        //         // onNavigationStateChange={event => {
        //         //     setbutton(false)
        //         //     if (event.url.includes('form') || event.url.includes('cat')) {
        //         //         refWeb.stopLoading()
        //         //         refWeb.goBack()
        //         //         //создать edit компонент
        //         //     } else if (event.url === 'https://esia.gosuslugi.ru/profile/login/') {
        //         //         refWeb.injectJavaScript(`window.location = 'http://ag.orb.ru/login'`)
        //         //     } else if (event.url.includes('https://ag.orb.ru/points/list/?user')) {
        //         //         setbutton(true)
        //         //     }
        //         // }}
        //         javaScriptEnabled={true}
        //         startInLoadingState={true}
        //         scalesPageToFit={false}
        //     />
        // </View>
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

export default Edit