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
        .map-edit-overlay,
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

    const redirectTo = `
        let style = document.createElement('style');
        // style.innerHTML = '* {display: none;} body {display: none}';
        document.head.appendChild(style);
        let div = document.getElementById('dropdown-user');
        if(div !== null) {
            let a = div.getElementsByTagName('a');
            // alert(a[0].href)
            window.location = a[0].href;    
            for(let i = 0; i < document.getElementsByClassName('wrapper').length; i++){
                let link = document.createElement('a')
                link.setAttribute('href', a[0].href)
                link.setAttribute('style', 'padding: 5px; margin: 0; text-decoration-line:none; font-weight: bolder; width:100%; font-size: 14px; text-align: center;')
                link.setAttribute('id', 'open__profile')
                link.innerHTML += '<p style="color: rgb(44,217,120);  text-decoration-line:none;"><b>ОТКРЫТЬ ПРОФИЛЬ 🙍‍♂️</b></p>'
                let div2 = document.createElement('div')
                div2.setAttribute('style', ' text-decoration-line:none; color: white;  border-radius: 10%; font-weight:bold; margin: 0; background: white;  align-self: center;  width: 100px; position: fixed; bottom: 0; left: 10; display: flex; flex-direction:column; justify-content: center; ')
                div2.setAttribute('id', 'open__profile__div')
                div2.append(link)
                // div2.innerHTML += '<p><b>ПОСЛЕДНИЕ <br /> АКТИВНОСТИ В <br />ОБРАЩЕНИЯХ</b></p>'
                document.getElementsByClassName('wrapper')[i].setAttribute('style', 'position: relative;')
                document.getElementsByClassName('wrapper')[i].append(div2)
                document.getElementById('open__profile').click()

            }

            

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
                onLoadEnd={(e) => {
                    if (e.nativeEvent.url === 'https://ag.orb.ru/') {
                        refWeb.injectJavaScript(redirectTo);
                    }
                }}
                onNavigationStateChange={event => {
                    setbutton(false)
                    console.log('Profile', event.url);
                    if (event.url.includes('form') || event.url.includes('cat') || event.url.includes('points/id')) {
                        refWeb.stopLoading()
                        if (event.url.includes('points/id') || event.url.includes('form')) {
                            props.setModalVisible && props.setModalVisible(false)
                            props.navigation.navigate('PointCard', { screen: 'PointCard', event, headerBackTitle: 'Назад' })
                        }
                    } else if (event.url === 'https://esia.gosuslugi.ru/profile/login/') {
                        refWeb.injectJavaScript(`window.location = 'http://ag.orb.ru/login'`)
                    } else if (event.url.includes('https://ag.orb.ru/points/list/?user' || event.url === 'https://ag.orb.ru/')) {
                        setbutton(true)
                    } else if (event.url === 'https://ag.orb.ru/') {
                        // refWeb.injectJavaScript(`window.location = 'http://ag.orb.ru/login'`)
                        // refWeb.injectJavaScript(redirectTo);
                        refWeb.goBack()
                        // refWeb.goForward()
                        setbutton(true)
                    }
                }}
                startInLoadingState
                javaScriptEnabled={true}
                scalesPageToFit={false}
                onError={() => console.log('err')}
            />
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', height: 60 }}>
                {
                    button && <View style={styles.logout__button__wrapper}>
                        <TouchableOpacity onPress={() => {
                            refWeb.injectJavaScript(`window.location.href='/logout'`)
                            props.setModalVisible && props.setModalVisible(false)
                            !props.navigation.navigate('Main', { screen: 'Main' })
                        }}><View style={styles.logout__text__wrapper}><Text style={styles.logout__text} >Выйти</Text></View></TouchableOpacity>
                    </View>
                }
                {
                    button && <View style={styles.logout__button__wrapper}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('MapPoints', { screen: 'MapPoints', link: 'https://ag.orb.ru/map#create', headerBackTitle: 'Назад' })
                            props.setModalVisible && props.setModalVisible(false)
                            // !props.navigation.navigate('Main', { screen: 'Main' })
                        }}><View style={styles.logout__text__wrapper}><Text style={styles.logout__text} >Создать обращение</Text></View></TouchableOpacity>
                    </View>
                }
                {
                    button && <View style={styles.logout__button__wrapper}>
                        <TouchableOpacity onPress={() => {
                            refWeb.injectJavaScript(`
                                let div = document.getElementById('dropdown-user');
                                let a = div.getElementsByTagName('a');
                                window.location = a[0].href;   
                            `)
                            // refWeb.injectJavaScript(`document.getElementById('open__profile').click(); true;`)
                        }}><View style={styles.logout__text__wrapper}><Text style={styles.logout__text} >Профиль</Text></View></TouchableOpacity>
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