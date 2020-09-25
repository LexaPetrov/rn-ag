import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Button, TouchableOpacity } from 'react-native'
import WebView from 'react-native-webview'
import MapPoints from './MapPoints'

const Profile = (props) => {
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
        .box-content > p,
        .basefooter-wrap.p-footer,
        .banner,
        .teaser,
        .field.right.recovery,
        .reg-box,
        .goto-recovery,
        .map-edit-overlay {
            display: none;
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
        .map-edit-overlay
        footer {
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
        document.getElementsByClassName('map-edit-overlay')[0].style.display = 'none'
        // document.getElementsByClassName('wrapper')[3].innerHTML += '<div><button onclick="App.Methods.LoginESIA();">4login</button></div>'
        // document.getElementsByClassName('wrapper')[2].innerHTML += '<div class="logout"><a id="logout"  href="/logout/">Выйти</a></div>'
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
                source={{ uri: 'http://ag.orb.ru/login/' }}
                onMessage={(event) => { }}
                injectedJavaScript={injectedJavaScript}
                renderLoading={ActivityIndicatorLoadingView}
                onLoadStart={e => {
                    // refWeb.injectJavaScript(`document.getElementsByTagName('body')[0].style.display = 'none'`)
                }}
                onLoadEnd={(e) => {
                    if (e.nativeEvent.url === 'https://ag.orb.ru/') {
                        const redirectTo = `
                        let style = document.createElement('style');
                        style.innerHTML = '* {display: none;} body {display: none}';
                        document.head.appendChild(style);
                            let div = document.getElementById('dropdown-user');
                            if(div !== null) {
                                let a = div.getElementsByTagName('a');
                                window.location = a[0].href;    
                            } 
                            // else {
                            //     window.location.href='http://ag.orb.ru/login'
                            //     let div = document.getElementById('dropdown-user');
                            //     if(div !== null) {
                            //         let a = div.getElementsByTagName('a');
                            //         window.location = a[0].href;    
                            //     } 
                            // }
                      
                    `
                        refWeb.injectJavaScript(redirectTo);
                    }
                }}
                onNavigationStateChange={event => {
                    setbutton(false)
                    console.log('Profile', event.url);
                    if (event.url.includes('form') || event.url.includes('cat') || event.url.includes('points/id')) {
                        refWeb.stopLoading()
                        // refWeb.goBack()
                        // let redirect = `window.location = 'https://ag.orb.ru/'`
                        // refWeb.injectJavaScript(redirect)
                        // if (event.url.includes('form')) {
                        //     console.log('form');
                        //     props.navigation.navigate('Edit', { screen: 'Edit', event, headerBackTitle: 'Назад' })
                        // }  
                        if (event.url.includes('points/id') || event.url.includes('form')) {
                            props.setModalVisible && props.setModalVisible(false)
                            props.navigation.navigate('PointCard', { screen: 'PointCard', event, headerBackTitle: 'Назад' })
                            // console.log(event.url);
                            // refWeb.injectJavaScript(`window.location = '${event.url}'`)
                        }
                    } else if (event.url === 'https://esia.gosuslugi.ru/profile/login/') {
                        refWeb.injectJavaScript(`window.location = 'http://ag.orb.ru/login'`)
                    } else if (event.url.includes('https://ag.orb.ru/points/list/?user' || event.url === 'https://ag.orb.ru/')) {
                        setbutton(true)
                    } else if (event.url === 'https://ag.orb.ru/') {
                        const redirectTo = `
                                let style = document.createElement('style');
                                style.innerHTML = '* {display: none;} body {display: none}';
                                document.head.appendChild(style);
                                    let div = document.getElementById('dropdown-user');
                                    if(div !== null) {
                                        let a = div.getElementsByTagName('a');
                                        window.location = a[0].href;    
                                    } 
                                    // else {
                                    //     window.location.href='http://ag.orb.ru/login'
                                    //     let div = document.getElementById('dropdown-user');
                                    //     if(div !== null) {
                                    //         let a = div.getElementsByTagName('a');
                                    //         window.location = a[0].href;    
                                    //     } 
                                    // }
                              
                            `
                        refWeb.injectJavaScript(redirectTo);
                    } else if (event.url === 'https://ag.orb.ru/map#create') {
                        props.navigation.navigate('MapPoints', { screen: 'MapPoints', link: 'https://ag.orb.ru/map#create', headerBackTitle: 'Назад' })
                        props.setModalVisible(false)
                    }
                }}
                javaScriptEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={false}
            />
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {
                    button && <View style={styles.logout__button__wrapper}>
                        <TouchableOpacity onPress={() => {
                            // refWeb.injectJavaScript(`document.getElementById('logout').click()`)
                            refWeb.injectJavaScript(`window.location.href='/logout'`)
                            props.setModalVisible && props.setModalVisible(false)
                            !props.navigation.navigate('Main', { screen: 'Main' })
                        }}><View style={styles.logout__text__wrapper}><Text style={styles.logout__text} >Выйти</Text></View></TouchableOpacity>
                    </View>
                }
                {
                    button && <View style={styles.logout__button__wrapper}>
                        <TouchableOpacity onPress={() => {

                            //  props.navigation.navigate('MapPoints', { screen: 'MapPoints', link: 'https://ag.orb.ru/map#create', headerBackTitle: 'Назад' })
                            refWeb.injectJavaScript(`window.location = "https://ag.orb.ru/map#create"`)
                            // refWeb.stopLoading()
                            // refWeb.goBack()
                            //  props.setModalVisible(false)
                            // !props.navigation.navigate('Main', { screen: 'Main' })
                        }}><View style={styles.logout__text__wrapper}><Text style={styles.logout__text} >Создать обращение</Text></View></TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
        paddingBottom: 30
    },

    logout__button__wrapper: {
        color: '#2cd978',
        display: 'flex',
        justifyContent: 'center',
    },

    logout__text__wrapper: {
        color: '#2cd978',
        width: '100%',
        // marginHorizontal: '25%',
        borderBottomColor: '#2cd978',
        borderBottomWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5
    },

    logout__text: {
        color: '#2cd978',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
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