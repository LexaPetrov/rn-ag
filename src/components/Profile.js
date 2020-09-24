import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Button, TouchableOpacity } from 'react-native'
import WebView from 'react-native-webview'

const Profile = props => {
    const [button, setbutton] = useState(false)
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
        .box-content > p {
            display: none;
        }

        .logout {
            width: 100%;
            text-align: center;
            margin: 10px;
            opacity: 0;
            overflow: hidden;
            position: relative;
        }

        #logout {
            position: absolute;
            left: 9999px;
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
        document.getElementsByClassName('wrapper')[2].innerHTML += '<div class="logout"><a id="logout"  href="/logout/">Выйти</a></div>'
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





    return (
        <View style={styles.container}>
            <WebView
                ref={webView => { refWeb = webView; }}
                useWebKit
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                originWhitelist={['*']}
                source={{ uri: 'http://ag.orb.ru/login' }}
                onMessage={(event) => { }}
                injectedJavaScript={injectedJavaScript}
                renderLoading={ActivityIndicatorLoadingView}
                onLoadStart={e => {
                    refWeb.injectJavaScript(`document.getElementsByTagName('body')[0].style.display = 'none'`)
                }}
                onLoadEnd={(e) => {
                    if (e.nativeEvent.url === 'https://ag.orb.ru/') {
                        const redirectTo = `
                        let div = document.getElementById('dropdown-user');
                        let a = div.getElementsByTagName('a');
                        window.location = a[0].href;
                        true;
                    `
                        refWeb.injectJavaScript(`document.getElementsByTagName('body')[0].style.display = 'block'`)
                        refWeb.injectJavaScript(redirectTo);
                    }
                }}
                onNavigationStateChange={event => {
                    setbutton(false)
                    // if (event.url === 'https://ag.orb.ru/') {
                    //     console.log(1);
                    //     const redirectTo = `
                    //     // window.location.reload();
                    //     let div = document.getElementById('dropdown-user');
                    //     let a = div.getElementsByTagName('a');
                    //     window.location = a[0].href;
                    //     // alert(a[0].href)
                    //     true;
                    // `
                    //     refWeb.injectJavaScript(redirectTo);

                    // } else
                    if (event.url.includes('form') || event.url.includes('cat')) {
                        refWeb.stopLoading()
                        refWeb.goBack()
                        //создать edit компонент
                    } else if (event.url === 'http://ag.orb.ru/login') {
                        //     const redirectTo = `
                        //   document.getElementsByClassName('btn.btn-xs.btn-success.full-width')[0].click();
                        //   true;
                        // `
                        //     refWeb.injectJavaScript(redirectTo);
                    } else if (event.url === 'https://esia.gosuslugi.ru/profile/login/') {
                        refWeb.injectJavaScript(`window.location = 'http://ag.orb.ru/login'`)
                        // props.navigation.navigate('Main', {screen: 'Main'})
                    } else if (event.url.includes('https://ag.orb.ru/points/list/?user')) {
                        setbutton(true)
                    }
                }}
                javaScriptEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={false}
            />
            {
                button && <View style={styles.logout__button__wrapper}>
                    <Button color='#2cd978' title='Выйти' onPress={() => {
                        refWeb.injectJavaScript(`document.getElementById('logout').click()`)
                        props.navigation.navigate('Main', { screen: 'Main' })
                    }}></Button>
                </View>
            }

        </View>

    )
}

//https://esia.gosuslugi.ru/idp/rlogin
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative'
    },

    logout__button__wrapper: {
        color: '#2cd978',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal: '25%',
        position: 'absolute',
        bottom: 20
    },

    ActivityIndicatorStyle: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    }
})

export default Profile